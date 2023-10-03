import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import Order from '../models/orderModel.js';
import { isAuth } from '../utils.js';
import User from '../models/userModel.js';
import Product from '../models/productModel.js';
import { isAdmin } from '../utils.js';
import { mailgun, payOrderEmailTemplate } from '../utils.js';

//Create order route
const orderRouter = express.Router();

//Retriev orders to the Order list screen -> for Admin
orderRouter.get(
  '/',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const orders = await Order.find().populate('user', 'name');
    res.send(orders);
  })
);

//Add order
orderRouter.post(
  '/',
  isAuth, //Is a middleweare function
  expressAsyncHandler(async (req, res) => {
    const newOrder = new Order({
      orderItems: req.body.orderItems.map((x) => ({ ...x, product: x._id })),
      shippingAddress: req.body.shippingAddress,
      paymentMethod: req.body.paymentMethod,
      itemsPrice: req.body.itemsPrice,
      shippingPrice: req.body.shippingPrice,
      commisionCost: req.body.commisionCost,
      totalPrice: req.body.totalPrice,
      user: req.user._id,
    });

    const order = await newOrder.save();
    res.status(201).send({ message: 'New order created successfully!', order });
  })
);

//Delete order -> for Admin
orderRouter.delete(
  '/:id',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (order) {
      await order.deleteOne();
      res.send({ message: 'Order Deleted Successfully..!' });
    } else {
      res.status(404).send({ message: 'Order Not Found' });
    }
  })
);

//For order History -> Return List Of orders of current user
orderRouter.get(
  '/mine',
  isAuth, //Middleware
  expressAsyncHandler(async (req, res) => {
    const orders = await Order.find({ user: req.user._id });
    res.send(orders);
  })
);

// For Admin dashBoard
orderRouter.get(
  '/summary',
  expressAsyncHandler(async (req, res) => {
    //For order
    const orders = await Order.aggregate([
      {
        $group: {
          _id: null,
          numOrders: { $sum: 1 }, // Number of elements for Order collection in MongoDb
          totalSales: { $sum: '$totalPrice' },
        },
      },
    ]);

    //Create Delivery Status -> Admin
    orderRouter.put(
      '/:id/deliver',
      isAuth,
      expressAsyncHandler(async (req, res) => {
        const order = await Order.findById(req.params.id);
        if (order) {
          order.isDelivered = true;
          order.deliveredAt = Date.now();
          await order.save();
          res.send({ message: 'Order Approved!' });
        } else {
          res.status(404).send({ message: 'Order Not Found' });
        }
      })
    );
    //For users
    const users = await User.aggregate([
      {
        $group: {
          _id: null,
          numUsers: { $sum: 1 }, //Calculate number of users in users Collection in MongoDB
        },
      },
    ]);

    //Return num of orders and total prices regarding the days
    const dailyOrders = await Order.aggregate([
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } }, //Format is Year-Month-Day
          orders: { $sum: 1 }, //return number of orders
          sales: { $sum: '$totalPrice' },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    const productCategories = await Product.aggregate([
      {
        $group: {
          _id: '$category',
          count: { $sum: 1 },
        },
      },
    ]);
    res.send({ users, orders, dailyOrders, productCategories });
  })
);

//Retriview order details -> by using ID
orderRouter.get(
  '/:id',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id); //using the order ID
    if (order) {
      res.send(order);
    } else {
      res.status(404).send({ message: 'Order Not Found...!!' });
    }
  })
);

//update order data
orderRouter.put(
  '/:id/pay',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id).populate(
      'user',
      'email name'
    );
    if (order) {
      order.isPaid = true;
      order.paidAt = Date.now();
      order.paymentResult = {
        id: req.body.id,
        status: req.body.status,
        update_time: req.body.update_time,
        email_address: req.body.email_address,
      };

      const updatedOrder = await order.save();
      mailgun()
        .messages()
        .send(
          {
            from: 'Revonta <revonta@mg.revontaherbs.com>',
            to: `${order.user.name} <${order.user.email}>`,
            subject: `New order ${order._id}`,
            html: payOrderEmailTemplate(order),
          },
          (error, body) => {
            if (error) {
              console.log(error);
            } else {
              console.log(body);
            }
          }
        );

      res.send({ message: 'Order Paid', order: updatedOrder });
    } else {
      res.status(404).send({ message: 'Order Not Found' });
    }
  })
);
export default orderRouter;

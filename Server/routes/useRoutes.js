import express from 'express';
import bcrypt from 'bcryptjs';
import expressAsyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
import { isAuth, isAdmin, generateToken } from '../utils.js';

const userRouter = express.Router();

//Retrieve user details -> Admin
userRouter.get(
  '/',
  isAuth,

  expressAsyncHandler(async (req, res) => {
    const users = await User.find({});
    res.send(users);
  })
);

//For Update User Profile Data
userRouter.put(
  '/profile',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      if (req.body.password) {
        user.password = bcrypt.hashSync(req.body.password, 8);
      }

      const updatedUser = await user.save();
      res.send({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin,
        token: generateToken(updatedUser),
      });
    } else {
      res.status(404).send({ message: 'User not found' });
    }
  })
);

//Retrieve users -> Identifing by userID
userRouter.get(
  '/:id',
  isAuth,

  expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (user) {
      res.send(user);
    } else {
      res.status(404).send({ message: 'User Not Found' });
    }
  })
);

//Update user details -> Admin
userRouter.put(
  '/:id',
  isAuth,

  expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      user.isAdmin = Boolean(req.body.isAdmin);
      const updatedUser = await user.save();
      res.send({ message: 'User Updated', user: updatedUser });
    } else {
      res.status(404).send({ message: 'User Not Found' });
    }
  })
);

//Delete user Details -> Admin
userRouter.delete(
  '/:id',
  isAuth,

  expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (user) {
      if (user.email === 'admin@example.com') {
        res.status(400).send({ message: 'Can not Delete Admin User' });
        return;
      }
      await user.deleteOne();
      res.send({ message: 'User Deleted successfull!' });
    } else {
      res.status(404).send({ message: 'User Not Found' });
    }
  })
);

//post function for Sign in
userRouter.post(
  '/signin',
  expressAsyncHandler(async (req, res) => {
    //Indentify user by using the email
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      //Checking password

      //1 st para -> Visible/printed Password / 2nd para -> increpted password (bcrypt is use for create an encript password)
      res.send({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user), //Create a tocken for the each of the user
      });
      return;
    }
    // res.status(401).send({ message: 'User' + '$_id' });
    // res.status(401).send({ message: `Invalid Email: ${email}` });
    res.status(401).send({ message: `Invalid Email:  ${email}` });
  })
);

//For Sign Up
userRouter.post(
  '/signup',
  expressAsyncHandler(async (req, res) => {
    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });
    //Save new user in the database
    const user = await newUser.save();
    res.send({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user), //Create a tocken for the each of the user
    });
  })
);

export default userRouter;

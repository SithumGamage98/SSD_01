import React, { useContext, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import CheckoutSteps from '../components/CheckoutSteps';
import { Store } from '../Store';
import Pay from '../images/payHere.jpg';
import Pay1 from '../images/paypal_1.jpg';
//paypal_1.jpg

export default function PaymentMethodScreen() {
  const navigate = useNavigate();
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    cart: { shippingAddress, paymentMethod },
  } = state;

  const [paymentMethodName, setPaymentMethod] = useState(
    paymentMethod || 'PayPal'
  );

  useEffect(() => {
    if (!shippingAddress.address) {
      navigate('/shipping');
    }
  }, [shippingAddress, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();
    ctxDispatch({ type: 'SAVE_PAYMENT_METHOD', payload: paymentMethodName });
    localStorage.setItem('paymentMethod', paymentMethodName);
    navigate('/placeorder');
  };

  return (
    <div>
      <Helmet>
        <title>Payment Method</title>
      </Helmet>
      <h1>
        <b>Payment Method</b>
      </h1>
      <br></br>
      <Form onSubmit={submitHandler} className="container">
        {' '}
        <div style={{ width: '1000px', position: 'relative', left: '60px' }}>
          <CheckoutSteps step1 step2 step3></CheckoutSteps>
        </div>
        <br></br>
        <br></br>
        <br></br>
        {/* checkboxes for select paypal or */}
        <Form
          onSubmit={submitHandler}
          style={{ position: 'relative', right: '-100px' }}
        >
          <div className="mb-3">
            <Form.Check
              type="radio"
              id="PayPal"
              label="PayPal"
              value="PayPal"
              checked={paymentMethodName === 'PayPal'}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            <div>
              <img
                src={Pay1}
                height={50}
                width={150}
                style={{ top: '-150px' }}
                alt="Card image cap"
              />
            </div>
          </div>
          <br></br>
          <div className="mb-3">
            <Form.Check
              type="radio"
              id="Payhere"
              label="Payhere"
              value="Payhere"
              checked={paymentMethodName === 'Payhere'}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            <div>
              <img
                src={Pay}
                height={40}
                width={150}
                style={{ top: '-150px' }}
                alt="Card image cap"
              />
            </div>
          </div>
        </Form>{' '}
        <br></br>
        <div className="mb-3">
          <Button type="submit">Continue</Button>
        </div>
      </Form>{' '}
    </div>
  );
}

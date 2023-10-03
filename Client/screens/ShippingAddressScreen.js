import React, { useContext, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import { Store } from '../Store';
import { useState } from 'react';
import CheckoutSteps from '../components/CheckoutSteps';
import '../../src/style.css';
import Footer from '../components/Footer';
import Pay1 from '../images/dhl.jpg';
import Pay from '../images/Ups.jpg';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
//import CheckoutSteps from '../components/CheckoutSteps';

export default function ShippingAddressScreen() {
  const navigate = useNavigate();
  const { state, dispatch: ctxDispatch } = useContext(Store);

  const {
    userInfo,
    cart: { shippingAddress },
  } = state;
  const [fullName, setFullName] = useState(shippingAddress.fullName || '');
  const [address, setAddress] = useState(shippingAddress.address || '');
  const [city, setCity] = useState(shippingAddress.city || '');
  const [postalCode, setPostalCode] = useState(
    shippingAddress.postalCode || ''
  );
  const [country, setCountry] = useState(shippingAddress.country || '');

  //store data permenently
  useEffect(() => {
    if (!userInfo) {
      navigate('/signin?redirect=/shipping');
    }
  }, [userInfo, navigate]);

  //submitHandler function
  const submitHandler = (e) => {
    e.preventDefault();
    ctxDispatch({
      type: 'SAVE_SHIPPING_ADDRESS',
      payload: {
        fullName,
        address,
        city,
        postalCode,
        country,
      },
    });
    localStorage.setItem(
      'shippingAddress',
      JSON.stringify({
        fullName,
        address,
        city,
        postalCode,
        country,
      })
    );
    navigate('/payment');
  };

  return (
    <div>
      <Helmet>
        <title>Delivery Details </title>
      </Helmet>

      <br></br>
      <div className="container">
        {' '}
        <div style={{ position: 'relative', left: '60px' }}>
          <CheckoutSteps step1 step2></CheckoutSteps>
        </div>
        <br></br>
        <h1>
          <b>Delivery Details</b>
        </h1>
        <hr></hr>
        <Form
          onSubmit={submitHandler}
          style={{ position: 'relative', left: '100px' }}
        >
          {/*Full Name */}
          <Form.Group
            className="mb-3"
            controlId="fullName"
            style={{ width: '1000px' }}
          >
            <Form.Label>
              <b>Full Name</b>
            </Form.Label>
            <Form.Control
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
          </Form.Group>
          {/*Address */}
          <Form.Group className="mb-3" controlId="address">
            <Form.Label>
              <b>Home Address</b>
            </Form.Label>
            <Form.Control
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </Form.Group>
          {/*City */}
          <Form.Group className="mb-3" controlId="city">
            <Form.Label>
              <b>City</b>
            </Form.Label>
            <Form.Control
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
            />
          </Form.Group>
          {/*postalCode */}
          <Form.Group className="mb-3" controlId="postalCode">
            <Form.Label>
              <b>Postal Code</b>
            </Form.Label>
            <Form.Control
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
              required
            />
          </Form.Group>
          {/*Country */}
          <Form.Group className="mb-3" controlId="country">
            <Form.Label>
              <b>Country</b>
            </Form.Label>
            <Form.Control
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              required
            />
          </Form.Group>
          {/* For selecting Delivery Options */}
          <Card>
            <Card.Body>
              <Card.Title>
                <h6>
                  <b>Delivery Services</b>
                </h6>
              </Card.Title>
              <Form
                // onSubmit={submitHandler}
                style={{ position: 'relative', right: '-100px' }}
              >
                <Row>
                  <Col>
                    <div className="mb-3">
                      <Form.Check
                        type="radio"
                        id="DHL Express"
                        label="DHL Express"
                        value="DHL Express"
                      />
                      <div>
                        {' '}
                        <h4>$16.13</h4>
                        <img
                          src={Pay1}
                          height={50}
                          width={150}
                          style={{ top: '-150px' }}
                          alt="Card image cap"
                        />
                        <br></br>
                        <p>Full Tracking. Max 150 lbs (68 kg). No P.O. Box</p>
                      </div>
                    </div>
                  </Col>
                  <Col>
                    <div className="mb-3">
                      <Form.Check
                        type="radio"
                        id="UPS"
                        label="UPS"
                        value="UPS"
                      />

                      <div>
                        <h4>$22.45</h4>
                        <img
                          src={Pay}
                          height={70}
                          width={150}
                          style={{ top: '-150px' }}
                          alt="Card image cap"
                        />
                        <p>Full Tracking. Max 150 lbs (68 kg). No P.O. Box</p>
                      </div>
                    </div>
                  </Col>
                </Row>
              </Form>
            </Card.Body>
          </Card>
          <br></br>
          <div className="mb-3">
            <Button variant="primary" type="submit">
              Continue
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}

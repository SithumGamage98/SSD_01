import React from 'react';
import { Row, Col } from 'react-bootstrap';

export default function CheckoutSteps(props) {
  return (
    <div>
      <Row className="checkout-steps">
        <Col className={props.step1 ? 'active' : ''}>
          <b>Sign-In</b>
        </Col>
        <Col className={props.step2 ? 'active' : ''}>
          <b>Shipping</b>
        </Col>
        <Col className={props.step3 ? 'active' : ''}>
          <b>Payment Process</b>
        </Col>
        <Col className={props.step4 ? 'active' : ''}>
          <b>Pending</b>
        </Col>
        <Col className={props.step5 ? 'active' : ''}>
          <b>Dispatched</b>
        </Col>
      </Row>
    </div>
  );
}

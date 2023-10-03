import React from 'react';
import {
  MDBFooter,
  MDBContainer,
  MDBIcon,
  MDBInput,
  MDBCol,
  MDBRow,
  MDBBtn,
} from 'mdb-react-ui-kit';

export default function Footer() {
  return (
    <div>
      <MDBFooter
        bgColor="dark"
        className="text-center text-lg-start text-muted"
      >
        <section className="d-flex justify-content-center justify-content-lg-between p-9 border-bottom">
          <div className="me-5 d-none d-lg-block"></div>
        </section>

        <section className="">
          <MDBContainer className="text-center text-md-start mt-5">
            <MDBRow className="mt-3">
              <MDBCol md="3" lg="4" xl="3" className="mx-auto mb-4">
                <h6 className="text-uppercase fw-bold mb-4">
                  <MDBIcon color="white" icon="gem" className="me-3" />
                  <br></br>
                  <div style={{ color: 'white' }}>Revonta Herbs & oil(PVT)</div>
                </h6>
                <p>
                  revonta.com © Copyright 1997-2023 revonta, LLC. All rights
                  reserved. revonta® is a registered trademark of Revonta herbs
                  and oil(PVT), LLC. Trusted Brands. Healthy Rewards. and the
                  iHerb.com Trusted Brands. Healthy Rewards.
                </p>
              </MDBCol>

              <MDBCol md="2" lg="2" xl="2" className="mx-auto mb-4">
                <h6 className="text-uppercase fw-bold mb-4">Products</h6>
                <p>
                  <a href="#!" className="text-reset">
                    Kids and Babies
                  </a>
                </p>
                <p>
                  <a href="#!" className="text-reset">
                    Grocery
                  </a>
                </p>
                <p>
                  <a href="#!" className="text-reset">
                    Beauty
                  </a>
                </p>
                <p>
                  <a href="#!" className="text-reset">
                    Herbs and Homeopathy
                  </a>
                </p>
              </MDBCol>

              <MDBCol md="4" lg="3" xl="3" className="mx-auto mb-md-0 mb-4">
                <h6 className="text-uppercase fw-bold mb-4">Contact</h6>
                <p>
                  <MDBIcon color="secondary" icon="home" className="me-2" />
                  Sausiri Uyana , Pittugala , Malabe
                </p>
                <p>
                  <MDBIcon color="secondary" icon="envelope" className="me-3" />
                  revonta@herbs.com
                </p>
                <p>
                  <MDBIcon color="secondary" icon="phone" className="me-3" /> +
                  011 4457876
                </p>
                <p>
                  <MDBIcon color="secondary" icon="print" className="me-3" /> +
                  011 4457789
                </p>
              </MDBCol>
            </MDBRow>
          </MDBContainer>
        </section>

        <div
          className="text-center p-4"
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }}
        >
          © 2023 Copyright:
          <a className="text-reset fw-bold" href="https://mdbootstrap.com/">
            revonta.com
          </a>
        </div>
      </MDBFooter>
    </div>
  );
}

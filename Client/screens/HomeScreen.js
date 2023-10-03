import React, { useEffect, useReducer, useState } from 'react';
//import data from '../data';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import axios from 'axios';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Product from '../components/Product';
import { Helmet } from 'react-helmet-async';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import Header from '../components/Header';
//Define useReducer
const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };

    case 'FETCH_SUCCESS':
      return { ...state, products: action.payload, loading: false };

    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default function HomeScreen() {
  //const [products, setProducts] = useState([]);
  //useReducer
  const [{ loading, error, products }, dispatch] = useReducer(reducer, {
    products: [],
    loading: true,
    error: '',
  });

  //useEffect
  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' });
      try {
        const result = await axios.get('/api/products');
        dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: err.message });
      }

      //setProducts(result.data);
    };
    fetchData();
  }, []);

  return (
    <div>
      <Header />
      <Helmet>
        <title>Revonta Herbs & Oil (PVT)</title>
      </Helmet>
      <br></br>
      <h2 style={{ color: '#1a4f2b', fontFamily: 'monospace' }}>
        <b>Featured Products</b>
      </h2>
      <hr></hr>
      <div className="products">
        {loading ? (
          <LoadingBox />
        ) : error ? (
          <MessageBox varient="danger">{error}</MessageBox>
        ) : (
          <Row>
            {products.map((product) => (
              <Col key={product.slug} sm={6} md={4} lg={3} className="mb-3">
                <Product product={product}></Product>
              </Col>
            ))}
          </Row>
        )}
      </div>
    </div>
  );
}

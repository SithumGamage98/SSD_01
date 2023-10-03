import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import main from './main';
import './index.css';
import Navbar from 'react-bootstrap/Navbar';
import { NavDropdown } from 'react-bootstrap';
import Badge from 'react-bootstrap/Badge';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Navbar';
import { LinkContainer } from 'react-router-bootstrap';
import { Store } from './Store';
import { useContext, useEffect } from 'react';
import CartScreen from './screens/CartScreen';
import ShippingAddressScreen from './screens/ShippingAddressScreen';
import SigninScreen from './screens/SigninScreen';
import SignupScreen from './screens/SignupScreen';
import PaymentMethodScreen from './screens/PaymentMethodScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import OrderHistoryScreen from './screens/OrderHistoryScreen';
import ProfileScreen from './screens/ProfileScreen';
import OrderScreen from './screens/OrderScreen';
import { ToastContainer, toast } from 'react-toastify';
import Button from 'react-bootstrap/Button';
import 'react-toastify/dist/ReactToastify.css';
import { useState } from 'react';
import { getError } from './utils';
import { wait } from '@testing-library/user-event/dist/utils';
import axios from 'axios';
import SearchBox from './components/SearchBox';
import SearchScreen from './screens/SearchScreen';
import ProtectedRoute from './components/ProtectedRoute';
import DashboardScreen from './screens/DashboardScreen';
import AdminRoute from './components/AdminRoute';
import Footer from './components/Footer';
import Header from './components/Header';
import ProductListScreen from './screens/ProductListScreen';
import ProductEditScreen from './screens/ProductEditScreen';
import OrderListScreen from './screens/OrderListScreen';
import UserListScreen from './screens/UserListScreen';
import UserEditScreen from './screens/UserEditScreen';
import AddPayment from './screens/AddPayment';
//import Google from './screens/GoogleAuth';

function App() {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart, userInfo } = state;

  //SignOutHandler function -> These things happen when signOut
  const signoutHandler = () => {
    ctxDispatch({ type: 'USER_SIGNOUT' });
    localStorage.removeItem('userInfo');
    localStorage.removeItem('shippingAddress');
    localStorage.removeItem('paymentMethod');
    window.location.href = '/signin';
  };
  //Side Bar
  const [sidebarIsOpen, setSidebarIsOpen] = useState(false);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await axios.get(`/api/products/categories`);
        setCategories(data);
      } catch (err) {
        toast.error(getError(err));
      }
    };
    fetchCategories();
  }, []);

  return (
    <BrowserRouter>
      <div
        className={
          sidebarIsOpen
            ? 'd-flex flex-column site-container active-cont'
            : 'd-flex flex-column site-container'
        }
      >
        <ToastContainer position="bottom-center" limit={1} />
        <header>
          {/* Navigation Bar */}
          <Navbar className="navBar" expand="lg">
            <Container>
              {/* Button for open Side Bar */}
              <Button
                variant=""
                onClick={() => setSidebarIsOpen(!sidebarIsOpen)}
              >
                <i className="fas fa-bars"></i>
              </Button>
              <LinkContainer to="/" className="revonta" variant="success">
                <Navbar.Brand>
                  <div style={{ fontFamily: 'monospace' }}>
                    Revonta Hearbs&nbsp;
                    <i class="fa fa-home" aria-hidden="true"></i>
                  </div>
                </Navbar.Brand>
              </LinkContainer>{' '}
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <SearchBox /> <div></div>
                <Nav
                  className="me-auto  w-100  justify-content-end"
                  style={{ position: 'relative', left: '200px' }}
                >
                  {/*Cart Drop Down */}

                  <Link to="/cart" className="nav-link">
                    <i class="fa fa-shopping-cart" aria-hidden="true">
                      {' '}
                      &nbsp; Cart
                    </i>
                    {cart.cartItems.length > 0 && (
                      <Badge pill bg="danger">
                        {cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
                      </Badge>
                    )}
                  </Link>
                  {/* User Info Drop Down */}
                  {userInfo ? (
                    <NavDropdown
                      title=<i class="fa fa-user" aria-hidden="true">
                        {' '}
                        &nbsp;
                        {userInfo.name}
                      </i>
                      id="basic-nav-dropdown"
                    >
                      <LinkContainer to="/profile">
                        <NavDropdown.Item>User Profile</NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to="/orderhistory">
                        <NavDropdown.Item>Order History</NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to="/admin/users">
                        <NavDropdown.Item>Users</NavDropdown.Item>
                      </LinkContainer>
                      <NavDropdown.Divider />
                      <Link
                        className="dropdown-item"
                        to="#signout"
                        onClick={signoutHandler}
                      >
                        Sign Out
                      </Link>
                    </NavDropdown>
                  ) : (
                    <Link className="nav-link" to="/signin">
                      Sign In
                    </Link>
                  )}

                  {/* Admin Drop Down List */}
                  {userInfo && userInfo.isAdmin && (
                    <NavDropdown
                      title=<i class="fa fa-user-secret" aria-hidden="true">
                        {' '}
                        &nbsp; Admin
                      </i>
                      id="admin-nav-dropdown"
                    >
                      <LinkContainer to="/admin/dashboard">
                        <NavDropdown.Item>Dashboard</NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to="/admin/orders">
                        <NavDropdown.Item>Orders</NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to="/admin/users">
                        <NavDropdown.Item>Users</NavDropdown.Item>
                      </LinkContainer>
                    </NavDropdown>
                  )}

                  {/* Seller Drop Down List */}
                  {userInfo && (
                    <NavDropdown
                      title="Product Management"
                      id="admin-nav-dropdown"
                    >
                      <LinkContainer to="/admin/products">
                        <NavDropdown.Item>Products</NavDropdown.Item>
                      </LinkContainer>
                      {/* <LinkContainer to="/admin/orderlist">
                        <NavDropdown.Item>Orders</NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to="/admin/userlist">
                        <NavDropdown.Item>Users</NavDropdown.Item>
                      </LinkContainer>*/}
                    </NavDropdown>
                  )}
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
        </header>
        {/*<Header />*/}
        <div
          className={
            sidebarIsOpen
              ? 'active-nav side-navbar d-flex justify-content-between flex-wrap flex-column'
              : 'side-navbar d-flex justify-content-between flex-wrap flex-column'
          }
        >
          {/* Side nav Bar and search Box */}
          <Nav className="flex-column text-white w-100 p-2">
            <Nav.Item>
              <strong>Categories</strong>
            </Nav.Item>
            {categories.map((category) => (
              <Nav.Item key={category}>
                <LinkContainer
                  to={{
                    pathname: '/search',
                    search: `?category=${category}`,
                  }}
                  onClick={() => setSidebarIsOpen(false)}
                >
                  <Nav.Link>{category}</Nav.Link>
                </LinkContainer>
              </Nav.Item>
            ))}
          </Nav>
        </div>
        <main>
          <Container className="mt-3">
            <Routes>
              <Route path="product/:slug" element={<ProductScreen />}></Route>
              <Route path="/" element={<HomeScreen />} />
              <Route path="/cart" element={<CartScreen />} />
              <Route path="/signin" element={<SigninScreen />} />
              <Route path="/signup" element={<SignupScreen />} />
              <Route path="/payment" element={<PaymentMethodScreen />} />

              <Route path="/placeorder" element={<PlaceOrderScreen />} />
              {/*<Route path="/order/:id" element={<OrderScreen />} />*/}
              <Route path="/orderhistory" element={<OrderHistoryScreen />} />
              {/*<Route path="/profile" element={<ProfileScreen />} />*/}
              <Route path="/search" element={<SearchScreen />} />
              {/* Insetrt ProfileScreen to the Protected Route */}
              <Route path="/profile" element={<ProfileScreen />} />
              {/*Add Payment Screen */}
              <Route path="/addpay" element={<AddPayment />}></Route>

              {/*Route for Order */}
              <Route path="/order/:id" element={<OrderScreen />}></Route>

              {/*Route for Order history */}
              <Route
                path="/orderhistory"
                element={<OrderHistoryScreen />}
              ></Route>
              {/* Admin Routes */}
              <Route
                path="/admin/dashboard"
                element={<DashboardScreen />}
              ></Route>

              {/* Product List Routes ---> Seller */}
              <Route
                path="/admin/products"
                element={<ProductListScreen />}
              ></Route>

              {/* Product Edit Routes ---> Seller */}
              <Route
                path="/admin/product/:id"
                element={<ProductEditScreen />}
              ></Route>

              {/* Order List Routes ---> Admin */}
              <Route path="/admin/orders" element={<OrderListScreen />}></Route>

              {/* Shipping Route */}
              <Route
                path="/shipping"
                element={<ShippingAddressScreen />}
              ></Route>

              {/* User edit Route */}
              <Route
                path="/admin/user/:id"
                element={<UserEditScreen />}
              ></Route>

              {/* User List  Routes */}
              <Route path="/admin/users" element={<UserListScreen />}></Route>

              {/* Google */}
              {/*  <Route path="/google" element={<Google />}></Route> */}

              {/* Footer */}
              <Route path="/footer" element={<Footer />} />

              {/* Header */}
              <Route path="/Header" element={<Header />} />
            </Routes>
          </Container>
        </main>
        <Footer>
          <Footer />
        </Footer>
      </div>
    </BrowserRouter>
  );
}

export default App;

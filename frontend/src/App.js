import './App.css';

import { useEffect } from 'react';
import Home from './components/Home';
import Footer from './components/layouts/Footer';
import Header from './components/layouts/Header';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import store from './redux/store';
import ProductDetails from './components/product/ProductDetails';
// Auth or User Imports
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import { loadUser } from './redux/actions/auth';
import Profile from './components/user/Profile';
import ProtectedRoute from './components/routes/ProtectedRoute';
import AdminRoutes from './components/routes/AdminRoutes';
import UpdateProfile from './components/user/UpdateProfile';
import UpdatePassword from './components/user/UpdatePassword';
import ForgotPassword from './components/auth/ForgotPassword';
import ResetPassword from './components/auth/ResetPassword';
// Cart Imports
import Cart from './components/cart/Cart';
import Shipping from './components/cart/Shipping';
import ConfirmOrder from './components/cart/ConfirmOrder';
import Payment from './components/cart/Payment';
import OrderSuccess from './components/cart/OrderSuccess';
// Order Imports
import ListOrders from './components/order/ListOrders';
import OrderDetails from './components/order/OrderDetails';

// Admin Imports
import Dashboard from './components/admin/Dashboard';
import ProductsList from './components/admin/ProductsList';
import NewProduct from './components/admin/NewProduct';
import UpdateProduct from './components/admin/UpdateProduct';
import OrderList from './components/admin/OrderList';
import ProcessOrder from './components/admin/ProcessOrder';
import UsersList from './components/admin/UsersList';
import UpdateUser from './components/admin/UpdateUser';
import ProductReviews from './components/admin/ProductReviews';


function App() {
  const { loading, user, isAuthenticated } = useSelector((state) => state.auth);
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <div className="container container-fluid">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search/:keyword" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/success" element={<OrderSuccess />} />

            <Route
              path="/me"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/me/update"
              element={
                <ProtectedRoute>
                  <UpdateProfile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/password/update"
              element={
                <ProtectedRoute>
                  <UpdatePassword />
                </ProtectedRoute>
              }
            />
            <Route
              path="/shipping"
              element={
                <ProtectedRoute>
                  <Shipping />
                </ProtectedRoute>
              }
            />
            <Route
              path="/orders"
              element={
                <ProtectedRoute>
                  <ListOrders />
                </ProtectedRoute>
              }
            />
            <Route
              path="/orders/:id"
              element={
                <ProtectedRoute>
                  <OrderDetails />
                </ProtectedRoute>
              }
            />
            <Route
              path="/order/confirm"
              element={
                <ProtectedRoute>
                  <ConfirmOrder />
                </ProtectedRoute>
              }
            />
            <Route
              path="/order/payment"
              element={
                <ProtectedRoute>
                  <Payment />
                </ProtectedRoute>
              }
            />

            <Route path="/password/forgot" element={<ForgotPassword />} />
            <Route path="/password/reset/:token" element={<ResetPassword />} />
            <Route path="/products/:id" element={<ProductDetails />} />
          </Routes>
        </div>
        {/* Admin routes */}
        <Routes>
          <Route
            path="/dashboard"
            element={
              <AdminRoutes>
                <Dashboard />
              </AdminRoutes>
            }
          />
          <Route
            path="/admin/products"
            element={
              <AdminRoutes>
                <ProductsList />
              </AdminRoutes>
            }
          />

          <Route
            path="/admin/product"
            element={
              <AdminRoutes>
                <NewProduct />
              </AdminRoutes>
            }
          />
          <Route
            path="/admin/products/:id"
            element={
              <AdminRoutes>
                <UpdateProduct />
              </AdminRoutes>
            }
          />
          <Route
            path="/admin/orders"
            element={
              <AdminRoutes>
                <OrderList />
              </AdminRoutes>
            }
          />
          <Route
            path="/admin/orders/:orderId"
            element={
              <AdminRoutes>
                <ProcessOrder />
              </AdminRoutes>
            }
          />

          <Route
            path="/admin/users"
            element={
              <AdminRoutes>
                <UsersList />
              </AdminRoutes>
            }
          />
          <Route
            path="/admin/users/:id"
            element={
              <AdminRoutes>
                <UpdateUser />
              </AdminRoutes>
            }
          />
          <Route
            path="/admin/reviews"
            element={
              <AdminRoutes>
                <ProductReviews />
              </AdminRoutes>
            }
          />
        </Routes>

        {!loading && (!isAuthenticated || user.role !== 'admin') && <Footer />}
      </div>
    </BrowserRouter>
  );
}

export default App;

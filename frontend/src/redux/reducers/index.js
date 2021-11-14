import { combineReducers } from 'redux';
import {
  authReducer,
  userReducer,
  forgotPasswordReducer,
  allUsersReducer,
  userDetailsReducer,
} from './auth';
import { cartReducer } from './cart';
import {
  newOrderReducer,
  myOrdersReducer,
  orderDetailsReducer,
  allOrdersReducer,
  orderDeleteOrUpdateReducer,
} from './order';
import {
  productReducer,
  productDetailsReducer,
  newReviewReducer,
  newProductReducer,
  productDeleteOrUpdateReducer,
} from './products';

export default combineReducers({
  products: productReducer,
  productDetails: productDetailsReducer,
  newReview: newReviewReducer,
  newProduct: newProductReducer,
  product: productDeleteOrUpdateReducer,
  auth: authReducer,
  user: userReducer,
  userDetails: userDetailsReducer,
  allUsers: allUsersReducer,
  forgotPassword: forgotPasswordReducer,
  cart: cartReducer,
  allOrders: allOrdersReducer,
  newOrder: newOrderReducer,
  order: orderDeleteOrUpdateReducer,
  myOrders: myOrdersReducer,
  orderDetails: orderDetailsReducer,
});

import { combineReducers } from 'redux';
import { authReducer, userReducer, forgotPasswordReducer } from './auth';
import { cartReducer } from './cart';
import { newOrderReducer, myOrdersReducer, orderDetailsReducer } from './order';
import {
  productReducer,
  productDetailsReducer,
  newReviewReducer,
} from './products';

export default combineReducers({
  products: productReducer,
  productDetails: productDetailsReducer,
  newReview: newReviewReducer,
  auth: authReducer,
  user: userReducer,
  forgotPassword: forgotPasswordReducer,
  cart: cartReducer,
  newOrder: newOrderReducer,
  myOrders: myOrdersReducer,
  orderDetails: orderDetailsReducer,
});

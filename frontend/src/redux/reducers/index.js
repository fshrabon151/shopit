import { combineReducers } from 'redux';
import { authReducer, userReducer, forgotPasswordReducer } from './auth';
import { cartReducer } from './cart';
import {
  newOrderReducer,
  myOrdersReducer,
  orderDetailsReducer,
  allOrdersReducer,
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
  forgotPassword: forgotPasswordReducer,
  cart: cartReducer,
  allOrders: allOrdersReducer,
  newOrder: newOrderReducer,
  myOrders: myOrdersReducer,
  orderDetails: orderDetailsReducer,
});

import { combineReducers } from 'redux';
import { authReducer, userReducer, forgotPasswordReducer } from './auth';
import { cartReducer } from './cart';
import { newOrderReducer, myOrdersReducer } from './order';
import { productReducer, productDetailsReducer } from './products';

export default combineReducers({
  products: productReducer,
  productDetails: productDetailsReducer,
  auth: authReducer,
  user: userReducer,
  forgotPassword: forgotPasswordReducer,
  cart: cartReducer,
  newOrder: newOrderReducer,
  myOrders: myOrdersReducer,
});

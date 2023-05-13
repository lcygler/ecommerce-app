import { combineReducers } from 'redux';
import { cartReducer, filterReducer, productReducer } from './slices/index';

const rootReducer = combineReducers({
  cart: cartReducer,
  filters: filterReducer,
  products: productReducer,
});

export default rootReducer;

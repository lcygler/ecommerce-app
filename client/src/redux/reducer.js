import { combineReducers } from 'redux';
import cartReducer from './slices/cartSlice';
import catalogReducer from './slices/catalogSlice';

const rootReducer = combineReducers({
  catalog: catalogReducer,
  cart: cartReducer,
});

export default rootReducer;

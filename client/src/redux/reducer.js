import { combineReducers } from 'redux';
import { cartReducer, catalogReducer, filterReducer } from './slices/index';

const rootReducer = combineReducers({
  cart: cartReducer,
  catalog: catalogReducer,
  filters: filterReducer,
});

export default rootReducer;

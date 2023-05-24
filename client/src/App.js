import { Route, Routes } from 'react-router-dom';
import { AdminRoute, UserRoute } from './components/index';
import {
  Cart,
  Dashboard,
  Detail,
  Favorites,
  Home,
  Landing,
  Login,
  PurchaseDetail,
  Purchases,
  Register,
} from './views/index';

import CreateProduct from './components/CreateProduct';

import './App.css';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/home/:productId" element={<Detail />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/purchases/:purchaseId" element={<PurchaseDetail />} />
        <Route path="/purchases" element={<Purchases />} />
        <Route path="/dashboard" element={<AdminRoute element={Dashboard} />} />
        <Route path="/create" element={<AdminRoute element={CreateProduct} />} />
      </Routes>
    </div>
  );
}

export default App;

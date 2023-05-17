import { Route, Routes } from 'react-router-dom';
import { Cart, Dashboard, Detail, Favorites, Home, Landing, Login, Register } from './views/index';

import CreateProduct from './components/CreateProduct';

import './App.css';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path='/create' element={<CreateProduct/>}/>
        <Route path="/cart" element={<Cart />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/home/:productId" element={<Detail />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;

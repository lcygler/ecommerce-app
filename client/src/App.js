import { useState } from 'react';
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

import ChatBot from 'react-simple-chatbot';
import CreateProduct from './components/CreateProduct';

import { Button } from '@chakra-ui/react';
import { FaComment } from 'react-icons/fa';
import { ThemeProvider } from 'styled-components';
import { steps, theme } from './chatbot';

import './App.css';

function App() {
  const [isChatOpen, setIsChatOpen] = useState(false);

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

      {isChatOpen && (
        <div className="chatbot-container">
          <ThemeProvider theme={theme}>
            <ChatBot steps={steps} />
          </ThemeProvider>
        </div>
      )}

      <Button
        position="fixed"
        bottom="20px"
        right="40px"
        height="60px"
        width="60px"
        borderRadius="50%"
        boxShadow="md"
        onClick={() => setIsChatOpen((prevState) => !prevState)}
        zIndex="9999"
        colorScheme="blue"
        aria-label="Abrir chat"
      >
        <FaComment />
      </Button>
    </div>
  );
}

export default App;

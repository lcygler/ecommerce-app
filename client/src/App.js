import { useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { AdminRoute, CreateProduct, EditProduct, UserRoute } from './components/index';
import {
  Cart,
  Dashboard,
  Detail,
  EditProfile,
  Favorites,
  Home,
  Landing,
  Login,
  Profile,
  PurchaseDetail,
  Purchases,
  Register,
} from './views/index';

import ChatBot from 'react-simple-chatbot';

import { Button } from '@chakra-ui/react';
import { FaComment } from 'react-icons/fa';
import { ThemeProvider } from 'styled-components';
import { steps, theme } from './chatbot';

import './App.css';

function App() {
  const location = useLocation();
  const [isChatOpen, setIsChatOpen] = useState(false);

  const exactMatchRoutes = ['/', '/dashboard', '/create'];
  const startsWithRoutes = ['/edit'];

  const renderChatbot = !(
    (
      exactMatchRoutes.includes(location.pathname) ||
      startsWithRoutes.some((route) => location.pathname.startsWith(route)) ||
      true
    ) // Quitar "true" para mostrar chatbot
  );

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
        <Route path="/profile" element={<UserRoute element={Profile} />} />
        <Route path="/profile/edit" element={<UserRoute element={EditProfile} />} />
        <Route path="/dashboard" element={<AdminRoute element={Dashboard} />} />
        <Route path="/dashboard/create" element={<AdminRoute element={CreateProduct} />} />
        <Route path="/dashboard/edit/:productId" element={<AdminRoute element={EditProduct} />} />
      </Routes>

      {renderChatbot && isChatOpen && (
        <div className="chatbot-container">
          <ThemeProvider theme={theme}>
            <ChatBot steps={steps} />
          </ThemeProvider>
        </div>
      )}

      {renderChatbot && (
        <Button
          position="fixed"
          bottom="20px"
          right="20px"
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
      )}
    </div>
  );
}

export default App;

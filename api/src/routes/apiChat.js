const express = require('express');
const router = express.Router();
const  {createChatHandler}  = require('../controllers/ChatBot');

// Ruta POST para manejar las solicitudes de chat
router.post('/chat',  createChatHandler);

module.exports = router;

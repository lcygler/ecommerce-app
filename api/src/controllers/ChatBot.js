const { Product, Category } = require('../db');
const { Op } = require('sequelize');
const { openai } = require('openai');
require('dotenv').config();

// Objeto para almacenar el historial de consultas y respuestas
const chatHistory = {};

// Inicializar el cliente de OpenAI
const openaiClient = new openai.Completion({
  apiKey: process.env.OPENAI_API_KEY
});

async function createChatHandler(req, res) {
  const { message } = req.body;

  try {
    const reply = await generateChatResponse(message);
    res.json({ reply });
  } catch (error) {
    console.error('Error al procesar la solicitud:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
}

async function generateChatResponse(query) {
  // Verificar si la consulta se encuentra en el historial
  if (chatHistory[query]) {
    return chatHistory[query];
  }

  try {
    // Generar respuesta utilizando GPT
    const prompt = `Pregunta: ${query}\nRespuesta:`;
    const maxTokens = 50; // Máximo número de tokens en la respuesta generada
    const response = await openaiClient.complete(prompt, { max_tokens: maxTokens });

    const reply = response.choices[0].text.trim();

    // Guardar la respuesta en el historial
    chatHistory[query] = reply;
    return reply;
  } catch (error) {
    console.error('Error al generar la respuesta:', error);
    throw error;
  }
}

module.exports = {
  createChatHandler,
};

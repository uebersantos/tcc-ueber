const express = require('express');
const ChatGPTController = require('../controllers/ChatGPTController');
const router = express.Router();

router.post('/gerar-tabela', ChatGPTController.handleChatGPTRequest);

module.exports = router;
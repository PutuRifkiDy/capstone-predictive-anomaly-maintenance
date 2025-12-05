const express = require('express');
const { handleChatRequest } = require('../controllers/aiAgentController');
const router = express.Router();

router.post('/', handleChatRequest);

module.exports = router;
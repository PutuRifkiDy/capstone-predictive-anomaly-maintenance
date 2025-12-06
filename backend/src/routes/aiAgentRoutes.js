const express = require('express');
const aiAgentController = require('../controllers/aiAgentController');
const { authenticate } = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/', authenticate, aiAgentController.handleChatRequest);
router.get('/:userId', authenticate, aiAgentController.getAllChatLogsByUserId);
router.delete('/:userId', authenticate, aiAgentController.deleteAllChatLogsByUserId);

module.exports = router;
const express = require('express');
const router = express.Router();

const assignEngineerController = require('../controllers/assignEngineerController');
const { authenticate } = require('../middlewares/authMiddleware');
const { authorizeRoles } = require('../middlewares/roleMiddleware');

router.get('/:userId', authenticate, authorizeRoles('user'), assignEngineerController.getAssignEngineer);

module.exports = router;
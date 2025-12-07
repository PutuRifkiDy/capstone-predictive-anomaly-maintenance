const express = require('express');
const { authenticate } = require('../middlewares/authMiddleware');
const { authorizeRoles } = require('../middlewares/roleMiddleware');
const maintenanceTicketController = require('../controllers/maintenanceTicketController');

const router = express.Router();

router.get('/:userId', authenticate, authorizeRoles('admin'), maintenanceTicketController.getAllMaintenanceTickets);
module.exports = router;
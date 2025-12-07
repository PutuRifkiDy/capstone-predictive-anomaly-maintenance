const express = require('express');
const { authenticate } = require('../middlewares/authMiddleware');
const { authorizeRoles } = require('../middlewares/roleMiddleware');
const maintenanceTicketController = require('../controllers/maintenanceTicketController');
const { validate } = require('../middlewares/validationMiddleware');
const { maintenanceTicketSchema } = require('../validators/maintenanceTicketValidator');

const router = express.Router();

router.get('/:userId', authenticate, authorizeRoles('admin'), maintenanceTicketController.getAllMaintenanceTickets);
router.post('/:userId', authenticate, authorizeRoles('admin'), validate(maintenanceTicketSchema, 'body'), maintenanceTicketController.createMaintenanceTicket);
router.delete('/:id', authenticate, authorizeRoles('admin'), maintenanceTicketController.deleteMaintenanceTicketById);

module.exports = router;
const express = require('express');
const { authenticate } = require('../middlewares/authMiddleware');
const { authorizeRoles } = require('../middlewares/roleMiddleware');
const maintenanceTicketController = require('../controllers/maintenanceTicketController');
const { validate } = require('../middlewares/validationMiddleware');
const { maintenanceTicketSchema, maintenanceTicketUpdateSchame } = require('../validators/maintenanceTicketValidator');

const router = express.Router();

router.get('/:userId', authenticate, authorizeRoles('admin'), maintenanceTicketController.getAllMaintenanceTickets);
router.get('/single/:id', authenticate, authorizeRoles('admin'), maintenanceTicketController.getMaintenanceTicketById);
router.post('/:userId', authenticate, authorizeRoles('admin'), validate(maintenanceTicketSchema, 'body'), maintenanceTicketController.createMaintenanceTicket);
router.delete('/:id', authenticate, authorizeRoles('admin'), maintenanceTicketController.deleteMaintenanceTicketById);
router.patch('/:id', authenticate, authorizeRoles('admin'), validate(maintenanceTicketUpdateSchame, 'body'), maintenanceTicketController.updateMaintenanceTicketById);

module.exports = router;
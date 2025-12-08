const express = require('express');
const router = express.Router();

const assignEngineerController = require('../controllers/assignEngineerController');
const { authenticate } = require('../middlewares/authMiddleware');
const { authorizeRoles } = require('../middlewares/roleMiddleware');
const { statusMaintenanceSchema } = require('../validators/maintenanceTicketValidator');
const { validate } = require('../middlewares/validationMiddleware');

router.get('/:userId', authenticate, authorizeRoles('user'), assignEngineerController.getAssignEngineer);
router.patch('/:id', authenticate, authorizeRoles('user'),  validate(statusMaintenanceSchema, 'body'), assignEngineerController.updateAssignedEngineerTicketMaintenance);
router.get('/status/:id', authenticate, authorizeRoles('user'), assignEngineerController.getAssignedEngineerTicketById);
module.exports = router;
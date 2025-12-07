const maintenanceTicket = require('../services/maintenanceTicket');

class MaintenanceTicketController {
  async getAllMaintenanceTickets(req, res, next) {
    try {
      const userId = parseInt(req.params.id);
      const maintenanceTickets = await maintenanceTicket.getAllMaintenanceTicketsByUserId(userId);
      res.json({
        maintenanceTickets,
        status: 'successs'
      });
    } catch (error) {
      if (error.message === 'No maintenance tickets found') {
        return res.status(404).json({ error: error.message });
      }
      next(error);
    }
  }
}

module.exports = new MaintenanceTicketController();
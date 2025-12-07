const maintenanceTicket = require('../services/maintenanceTicket');

class MaintenanceTicketController {
  async getAllMaintenanceTickets(req, res, next) {
    try {
      const userId = parseInt(req.params.userId);
      const maintenanceTickets = await maintenanceTicket.getAllMaintenanceTicketsByUserId(userId);
      res.json({
        maintenanceTickets,
        status: 'success'
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
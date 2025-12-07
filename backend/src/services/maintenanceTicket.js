const db = require('../config/db');

class MaintenanceTickets {
  async getAllMaintenanceTicketsByUserId(userId) {
    const result = await db.query('SELECT maintenance_tickets.*, users.name, users.role FROM maintenance_tickets INNER JOIN users ON maintenance_tickets.user_id = users.id WHERE maintenance_tickets.user_id = $1', [userId]);
    if (!result.rows) {
      throw new Error('No maintenance tickets found');
    }
    return result.rows;
  }


}

module.exports = new MaintenanceTickets();
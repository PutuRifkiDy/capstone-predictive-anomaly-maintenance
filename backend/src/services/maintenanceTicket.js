const db = require('../config/db');

class MaintenanceTickets {
  async getAllMaintenanceTicketsByUserId(userId) {
    const result = await db.query('SELECT * FROM maintenance_tickets WHERE user_id = $1', [userId]);
    if (!result.rows) {
      throw new Error('No maintenance tickets found');
    }
    return result.rows;
  }


}

module.exports = new MaintenanceTickets();
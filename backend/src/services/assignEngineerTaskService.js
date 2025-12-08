const db = require('../config/db');

class AssignEngineerTaskService {
  async getAssignedEngineers(userId) {
    const result = await db.query('select maintenance_tickets.title, maintenance_tickets.description, maintenance_tickets.status, users.name, users.email, users.phone_number from assign_maintenance_tasks inner join maintenance_tickets on assign_maintenance_tasks.maintenance_ticket_id = maintenance_tickets.id inner join users on assign_maintenance_tasks.user_id = users.id where assign_maintenance_tasks.user_id = $1;', [userId]);

    return result.rows;
  }
}

module.exports = new AssignEngineerTaskService();
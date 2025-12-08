const assignEngineerTaskService = require('../services/assignEngineerTaskService');

class AssignEngineerController {
  async getAssignEngineer(req, res, next) {
    try {
      const { userId } = req.params;
      const assignedEngineers = await assignEngineerTaskService.getAssignedEngineers(userId);
      res.json({
        status: 'success',
        assignedEngineers,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new AssignEngineerController();
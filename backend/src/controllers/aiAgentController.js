const aiAgentService = require("../services/aiAgentService");
class AIAgentController {
  async handleChatRequest(req, res) {
    const { message, userId } = req.body;

    if (!message) {
      return res.status(400).json({
        error: "Message is required",
      });
    }

    try {
      const agentResponse = await aiAgentService.sendChatToAgent(message, userId);
      res.json({
        status: "success",
        agentResponse,
      });
    } catch (error) {
      res.status(500).json({
        error: error.message || "Internal server error",
      });
    }
  }

  async getAllChatLogs(req, res, next) {
    try {
      const chatLogs = await aiAgentService.getAllChatLogs();
      res.json({
        chatLogs,
        status: "success",
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new AIAgentController();

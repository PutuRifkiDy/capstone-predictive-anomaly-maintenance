const { sendChatToAgent } = require("../services/aiAgentService");

async function handleChatRequest(req, res) {
  const { message, userId } = req.body;

  if (!message) {
    return res.status(400).json({
      error: "Message is required",
    });
  }

  try {
    const agentResponse = await sendChatToAgent(message, userId);
    res.json({
      status: "success",
      data: agentResponse
    });
  } catch (error) {
    res.status(500).json({
      error: error.message || "Internal server error",
    });
  }
}

module.exports = {
  handleChatRequest
};

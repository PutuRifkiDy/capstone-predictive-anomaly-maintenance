const axios = require('axios');
const db = require('../config/db');

const N8N_WEBHOOK_URL = 'https://puturifkidy.app.n8n.cloud/webhook/35a4b870-8fa6-4784-88fe-ed1a87eccec2';
class AIAgentService {
  async sendChatToAgent(message, userId) {
    const created_at = new Date().toISOString();
    const updated_at = created_at;
    if (!N8N_WEBHOOK_URL.includes('webhook')) {
      console.warn('N8N_WEBHOOK_URL has not been seet, please set yaaa');
    }

    try {
      const n8nResponse = await axios.post(N8N_WEBHOOK_URL, {
        message,
        userId
      });
      console.log('Agent response:', n8nResponse.data);
      await db.query('INSERT INTO chat_logs (sender_type, message, user_id, created_at, updated_at) VALUES ($1, $2, $3, $4, $5)', ['user', message, userId, created_at, updated_at]);

      await db.query('INSERT INTO chat_logs (sender_type, message, user_id, created_at, updated_at) VALUES ($1, $2, $3, $4, $5)', ['agent', n8nResponse.data.message, userId, created_at, updated_at]);

      return n8nResponse.data;
    } catch (error) {
      console.log(error);
      console.error('Error while communicating with agent :', error.response);
      throw new Error('Failed to send message to agent');
    }
  }

  async getAllChatLogs() {
    const result = await db.query('SELECT * FROM chat_logs');
    return result.rows;
  }
}

module.exports = new AIAgentService();
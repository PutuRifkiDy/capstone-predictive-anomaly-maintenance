const axios = require('axios');

const N8N_WEBHOOK_URL = 'https://puturifkidy.app.n8n.cloud/webhook/35a4b870-8fa6-4784-88fe-ed1a87eccec2';

async function sendChatToAgent(message, userId) {
  if (!N8N_WEBHOOK_URL.includes('webhook-test')) {
    console.warn('N8N_WEBHOOK_URL has not been seet, please set yaaa');
  }

  try {
    const n8nResponse = await axios.post(N8N_WEBHOOK_URL, {
      message,
      userId
    });
    return n8nResponse.data;
  } catch (error) {
    console.error('Error while communicating with agent :', error.response);
    throw new Error('Failed to send message to agent');
  }
}

module.exports = {
  sendChatToAgent
};
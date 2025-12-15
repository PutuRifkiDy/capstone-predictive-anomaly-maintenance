const BASE_URL = "https://backend-prevo.vercel.app";
const ML_BASE_URL = "https://tridarma6-ml-prevo.hf.space";

function getAccessToken() {
  return localStorage.getItem("accessToken");
}

async function fetchWithToken(url, options = {}) {
  return fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${getAccessToken()}`,
    },
  });
}

async function chatCopilot({ message, userId }) {
  try {
    const response = await fetchWithToken(`${BASE_URL}/chatbot`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message, userId }),
    });

    const responseJson = await response.json();

    if (responseJson.status == "success") {
      return {
        error: false,
        data: responseJson.agentResponse,
      };
    }
    return {
      error: true,
      message: responseJson.error,
      data: null,
    };
  } catch (error) {
    console.error(error);
  }
}

async function getChatLogsCopilotByUserId(userId) {
  try {
    const response = await fetchWithToken(`${BASE_URL}/chatbot/${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const responseJson = await response.json();

    if (responseJson.status == "success") {
      return {
        error: false,
        message: responseJson.message,
        data: responseJson.chatLogs,
      };
    }
    return {
      error: true,
      message: responseJson.error,
      data: null,
    };
  } catch (error) {
    console.error(error);
  }
}

async function deleteAllChatLogsByUserId(userId) {
  try {
    const response = await fetchWithToken(
      `${BASE_URL}/chatbot/logs/${userId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const responseJson = await response.json();

    if (responseJson.status == "success") {
      return {
        error: false,
        message: responseJson.message,
      };
    }
    return {
      error: true,
      message: responseJson.error,
    };
  } catch (error) {
    console.log(error);
  }
}

async function deleteChatLogById(id) {
  try {
    const response = await fetchWithToken(`${BASE_URL}/chatbot/log/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const responseJson = await response.json();

    if (responseJson.status == "success") {
      return {
        error: false,
        message: responseJson.message,
      };
    }
    return {
      error: true,
      message: responseJson.error,
    };
  } catch (error) {
    console.log(error);
  }
}

export {
  chatCopilot,
  getChatLogsCopilotByUserId,
  deleteAllChatLogsByUserId,
  deleteChatLogById,
};
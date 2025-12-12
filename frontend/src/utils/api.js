const BASE_URL = "http://localhost:3000";
const ML_BASE_URL = "https://overrashly-unnationalized-chasidy.ngrok-free.dev";

function getAccessToken() {
  return localStorage.getItem("accessToken");
}

function putAccessToken(accessToken) {
  return localStorage.setItem("accessToken", accessToken);
}

function removeAccessToken() {
  return localStorage.removeItem("accessToken");
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

async function login({ email, password }) {
  try {
    const response = await fetch(`${BASE_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const responseJson = await response.json();

    if (responseJson.status !== "success") {
      return {
        error: true,
        message: responseJson.message || "Login failed",
      };
    }

    if (!responseJson.accessToken) {
      return {
        error: true,
        message: "Response data not valid",
      };
    }

    putAccessToken(responseJson.accessToken);
    return {
      error: false,
      message: responseJson.message,
      data: responseJson,
    };
  } catch (error) {
    return {
      error: true,
      message: error,
    };
  }
}

async function getUserLogged() {
  try {
    const response = await fetchWithToken(`${BASE_URL}/users/me`, {
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
        data: responseJson.user,
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

async function logout(refreshToken) {
  try {
    await fetch(`${BASE_URL}/auth/logout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ refreshToken }),
    });

    removeAccessToken();
    return { error: false };
  } catch (error) {
    console.error(error);
    removeAccessToken();
    return { error: false };
  }
}

async function deleteUser(id) {
  try {
    const response = await fetchWithToken(`${BASE_URL}/users/${id}`, {
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
    console.error(error);
  }
}

async function addUser({ name, email, phone_number, password, role }) {
  try {
    const response = await fetch(`${BASE_URL}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, phone_number, password, role }),
    });

    const responseJson = await response.json();

    if (responseJson.status == "success") {
      return {
        error: false,
        message: responseJson.message,
        data: responseJson.user,
      };
    }
    return {
      error: false,
      message: responseJson.error,
      data: null,
    };
  } catch (error) {
    console.error(error);
  }
}

async function editUser(id, { name, email, phone_number, role, password }) {
  try {
    const response = await fetchWithToken(`${BASE_URL}/users/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, phone_number, role, password }),
    });

    const responseJson = await response.json();


    if (responseJson.status == "success") {
      return {
        error: false,
        message: responseJson.message,
        data: responseJson.user,
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

async function getUsers() {
  try {
    const response = await fetchWithToken(`${BASE_URL}/users`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const responseJson = await response.json();

    if (responseJson.status == "success") {
      return {
        error: false,
        data: responseJson.users,
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

async function getUserById(id) {
  try {
    const response = await fetchWithToken(`${BASE_URL}/users/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const responseJson = await response.json();

    if (responseJson.status == "success") {
      return {
        error: false,
        data: responseJson.user,
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

async function countUserEngineer() {
  try {
    const response = await fetchWithToken(`${BASE_URL}/users/engineer/count`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const responseJson = await response.json();

    if (responseJson.status == "success") {
      return {
        error: false,
        data: responseJson.count,
      };
    }
    return {
      error: true,
      data: null,
    };
  } catch (error) {
    console.log(error);
  }
}

async function getAllMaintenanceTickets() {
  try {
    const response = await fetchWithToken(`${BASE_URL}/maintenance-tickets`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const responseJson = await response.json();

    if (responseJson.status == "success") {
      return {
        error: false,
        data: responseJson.maintenanceTickets,
      };
    }
    return {
      error: true,
      message: responseJson.error,
      data: null,
    };
  } catch (error) {
    console.log(error);
  }
}

async function getMaintenanceTicketByUserId(userId) {
  try {
    const response = await fetchWithToken(
      `${BASE_URL}/maintenance-tickets/${userId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const responseJson = await response.json();

    console.log(responseJson);

    if (responseJson.status == "success") {
      return {
        error: false,
        data: responseJson.maintenanceTickets,
      };
    }
    return {
      error: true,
      message: responseJson.error,
      data: null,
    };
  } catch (error) {
    console.log(error);
  }
}

async function createMaintenanceTicket({ title, description, status, userId }) {
  try {
    const response = await fetchWithToken(
      `${BASE_URL}/maintenance-tickets/${userId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, description, status }),
      }
    );

    const responseJson = await response.json();

    if (responseJson.status == "success") {
      return {
        error: false,
        message: responseJson.message,
        data: responseJson.maintenanceTicket,
      };
    }
    return {
      error: true,
      message: responseJson.error,
      data: null,
    };
  } catch (error) {
    console.log(error);
  }
}

async function deleteMaintenanceTicketById(id) {
  try {
    const response = await fetchWithToken(
      `${BASE_URL}/maintenance-tickets/${id}`,
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

async function countMaintenanceTicketNeedMaintenance() {
  try {
    const response = await fetchWithToken(
      `${BASE_URL}/maintenance-tickets/need-maintenance/count`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const responseJson = await response.json();

    if (responseJson.status == "success") {
      return {
        error: false,
        data: responseJson.count,
      };
    }
    return {
      error: true,
      data: null,
    };
  } catch (error) {
    console.log(error);
  }
}

async function countMaintenanceTicketCompleted() {
  try {
    const response = await fetchWithToken(
      `${BASE_URL}/maintenance-tickets/completed/count`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const responseJson = await response.json();

    if (responseJson.status == "success") {
      return {
        error: false,
        data: responseJson.count,
      };
    }
    return {
      error: true,
      data: null,
    };
  } catch (error) {
    console.log(error);
  }
}

async function getMaintenanceById(id) {
  try {
    const response = await fetchWithToken(
      `${BASE_URL}/maintenance-tickets/single/${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const responseJson = await response.json();

    if (responseJson.status == "success") {
      return {
        error: false,
        data: responseJson.maintenanceTicketSingle,
      };
    }
    return {
      error: true,
      message: responseJson.error,
      data: null,
    };
  } catch (error) {
    console.log(error);
  }
}

async function updateMaintenanceTicketById(id, { title, description, status }) {
  try {
    const response = await fetchWithToken(
      `${BASE_URL}/maintenance-tickets/${id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, description, status }),
      }
    );

    const responseJson = await response.json();

    if (responseJson.status == "success") {
      return {
        error: false,
        message: responseJson.message,
        data: responseJson.maintenanceTicketUpdate,
      };
    }
    return {
      error: true,
      message: responseJson.error,
      data: null,
    };
  } catch (error) {
    console.log(error);
  }
}

async function getAllAssignsAndUsers(maintenanceTicketId) {
  try {
    const response = await fetchWithToken(
      `${BASE_URL}/assign-maintenance-tasks/${maintenanceTicketId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const responseJson = await response.json();

    if (responseJson.status == "success") {
      return {
        error: false,
        data: responseJson.allTicketsAssignUsers,
      };
    }
    return {
      error: true,
      message: responseJson.error,
      data: null,
    };
  } catch (error) {
    console.log(error);
  }
}

async function getAssignedUsers(maintenanceTicketId) {
  try {
    const response = await fetchWithToken(
      `${BASE_URL}/assign-maintenance-tasks/assign/${maintenanceTicketId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const responseJson = await response.json();

    if (responseJson.status == "success") {
      return {
        error: false,
        data: responseJson.assignMaintenanceUsers,
      };
    }
    return {
      error: true,
      message: responseJson.error,
      data: null,
    };
  } catch (error) {
    console.log(error);
  }
}

async function createAssignmentTicket({ userId, maintenanceTicketId }) {
  try {
    const response = await fetchWithToken(
      `${BASE_URL}/assign-maintenance-tasks/assign`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, maintenanceTicketId }),
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

async function deleteAssignmentTicketById(id) {
  try {
    const response = await fetchWithToken(
      `${BASE_URL}/assign-maintenance-tasks/assign/${id}`,
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

async function getAssignedEngineersTickets(userId) {
  try {
    const response = await fetchWithToken(
      `${BASE_URL}/assign-engineer-tasks/${userId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const responseJson = await response.json();
    if (responseJson.status == "success") {
      return {
        error: false,
        data: responseJson.assignedEngineers,
      };
    }
    return {
      error: true,
      message: responseJson.error,
      data: null,
    };
  } catch (error) {
    console.log(error);
  }
}

async function updateAssignedEngineersTickets(id, { status }) {
  try {
    const response = await fetchWithToken(
      `${BASE_URL}/assign-engineer-tasks/${id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }),
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

async function getAssignedEngineerTicketStatusById(id) {
  try {
    const response = await fetchWithToken(
      `${BASE_URL}/assign-engineer-tasks/status/${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const responseJson = await response.json();

    if (responseJson.status == "success") {
      return {
        error: false,
        data: responseJson.assignedEngineerTicket,
      };
    }
    return {
      error: true,
      message: responseJson.error,
      data: null,
    };
  } catch (error) {
    console.log(error);
  }
}

async function countAssignedEngineerTicketNeedMaintenance(userId) {
  try {
    const response = await fetchWithToken(
      `${BASE_URL}/assign-engineer-tasks/need-maintenance/count/${userId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const responseJson = await response.json();

    if (responseJson.status == "success") {
      return {
        error: false,
        data: responseJson.countMaintenanceTicketNeedMaintenance.total_need_maintenance,
      };
    }
    return {
      error: true,
      data: null,
    };
  } catch (error) {
    console.log(error);
  }
}

async function countAssignedEngineerTicketInProgress(userId) {
  try {
    const response = await fetchWithToken(
      `${BASE_URL}/assign-engineer-tasks/in-progress/count/${userId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const responseJson = await response.json();

    if (responseJson.status == "success") {
      return {
        error: false,
        data: responseJson.countMaintenanceTicketInProgress.total_in_progress,
      };
    }
    return {
      error: true,
      data: null,
    };
  } catch (error) {
    console.log(error);
  }
}

async function countAssignedEngineerTicketCompleted(userId) {
  try {
    const response = await fetchWithToken(
      `${BASE_URL}/assign-engineer-tasks/completed/count/${userId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const responseJson = await response.json();

    if (responseJson.status == "success") {
      return {
        error: false,
        data: responseJson.countMaintenanceTicketCompleted.total_completed,
      };
    }
    return {
      error: true,
      data: null,
    };
  } catch (error) {
    console.log(error);
  }
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

async function uploadDataset(file) {
  try {
    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch(`${ML_BASE_URL}/dataset/upload`, {
      method: "POST",
      body: formData,
      headers: {
        "ngrok-skip-browser-warning": "true",
      },
    });

    const responseJson = await response.json();

    if (responseJson.status === "success") {
      return {
        error: false,
        message: responseJson.message,
        path: responseJson.path,
      };
    }

    return {
      error: true,
      errorMessage: responseJson.detail || "Upload failed",
    };
  } catch (error) {
    console.error("Upload Error:", error);
    return {
      error: true,
      message: "Network error or server unreachable",
    };
  }
}

async function runMachineLearningModel() {
  try {
    const response = await fetch(`${ML_BASE_URL}/model/run`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": "true",
      },
    });

    const responseJson = await response.json();

    if (responseJson.status === "success") {
      return {
        error: false,
        message: responseJson.message,
        data: responseJson.processed_records,
      };
    }

    return {
      error: true,
      message: responseJson.detail || "Model execution failed",
    };
  } catch (error) {
    console.error("Model Run Error:", error);
    return {
      error: true,
      message: "Network error or server unreachable",
    };
  }
}

export {
  getAccessToken,
  putAccessToken,
  removeAccessToken,
  login,
  getUserLogged,
  logout,
  fetchWithToken,
  addUser,
  deleteUser,
  editUser,
  getUsers,
  getUserById,
  countUserEngineer,
  getAllMaintenanceTickets,
  getMaintenanceTicketByUserId,
  getMaintenanceById,
  createMaintenanceTicket,
  updateMaintenanceTicketById,
  deleteMaintenanceTicketById,
  countMaintenanceTicketNeedMaintenance,
  countMaintenanceTicketCompleted,
  getAllAssignsAndUsers,
  getAssignedUsers,
  createAssignmentTicket,
  deleteAssignmentTicketById,
  getAssignedEngineersTickets,
  updateAssignedEngineersTickets,
  getAssignedEngineerTicketStatusById,
  countAssignedEngineerTicketNeedMaintenance,
  countAssignedEngineerTicketInProgress,
  countAssignedEngineerTicketCompleted,
  chatCopilot,
  getChatLogsCopilotByUserId,
  deleteAllChatLogsByUserId,
  deleteChatLogById,
  uploadDataset,
  runMachineLearningModel,
};

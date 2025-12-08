const BASE_URL = "http://localhost:3000";

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
      }
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
    const response = await fetchWithToken(`${BASE_URL}/chatbot/logs/${userId}`, {
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

async function getAllMaintenanceTickets() {
  try {
    const response = await fetchWithToken(`${BASE_URL}/maintenancetickets`, {
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

async function getMaintenanceTicketById(userId) {
  try {
    const response = await fetchWithToken(`${BASE_URL}/maintenancetickets/${userId}`, {
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

async function createMaintenanceTicket({ title, description, status, userId }) {
  try {
    const response = await fetchWithToken(`${BASE_URL}/maintenancetickets/${userId}`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, description, status })
    });

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
    const response = await fetchWithToken(`${BASE_URL}/maintenancetickets/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      }
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

async function getMaintenanceById(id) {
  try {
    const response = await fetchWithToken(`${BASE_URL}/maintenancetickets/single/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      }
    });

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
    const response = await fetchWithToken(`${BASE_URL}/maintenancetickets/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, description, status })
    });

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
    const response = await fetchWithToken(`${BASE_URL}/assignmaintenancetasks/${maintenanceTicketId}`, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
      }
    });

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
    const response = await fetchWithToken(`${BASE_URL}/assignmaintenancetasks/assign/${maintenanceTicketId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      }
    });

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
    console.log(error)
  }
}

async function createAssignmentTicket({ userId, maintenanceTicketId }) {
  try {
    const response = await fetchWithToken(`${BASE_URL}/assignmaintenancetasks/assign`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId, maintenanceTicketId }),
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

async function deleteAssignmentTicketById(id) {
  try {
    const response = await fetchWithToken(`${BASE_URL}/assignmaintenancetasks/assign/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      }
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
  chatCopilot,
  getChatLogsCopilotByUserId,
  deleteAllChatLogsByUserId,
  deleteChatLogById,
  getMaintenanceTicketById,
  createMaintenanceTicket,
  deleteMaintenanceTicketById,
  updateMaintenanceTicketById,
  getMaintenanceById,
  getAllAssignsAndUsers,
  getAssignedUsers,
  createAssignmentTicket,
  getAllMaintenanceTickets,
  deleteAssignmentTicketById
};

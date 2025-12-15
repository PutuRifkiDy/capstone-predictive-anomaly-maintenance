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

export {
  getAccessToken,
  fetchWithToken,
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
};
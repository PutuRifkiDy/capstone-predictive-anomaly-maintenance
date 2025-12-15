const BASE_URL = "https://backend-prevo.vercel.app";
const ML_BASE_URL = "https://tridarma6-ml-prevo.hf.space";

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

export {
  getAccessToken,
  putAccessToken,
  removeAccessToken,
  fetchWithToken,
  login,
  getUserLogged,
  logout,
  addUser,
  deleteUser,
  editUser,
  getUsers,
  getUserById,
  countUserEngineer
}
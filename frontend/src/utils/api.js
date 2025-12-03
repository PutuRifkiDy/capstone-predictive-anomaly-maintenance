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
  const response = await fetchWithToken(`${BASE_URL}/users/me`);
  const responseJson = await response.json();

  if (responseJson.status == "success") {
    return {
      error: false,
      data: responseJson.user,
    };
  }

  return { error: true, data: null };
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
    });

    const responseJson = await response.json();

    if (responseJson.status !== "success") {
      return {
        error: true,
        data: null,
      };
    }
    return {
      error: false,
      data: responseJson,
    };
  } catch (error) {
    console.error(error);
  }
}

async function addUser({ name, email, password, role }) {
  try {
    const response = await fetch(`${BASE_URL}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password, role }),
    });

    const responseJson = await response.json();
    console.log("Response:", responseJson);

    if (responseJson.status !== "success") {
      return {
        error: true,
        data: null,
      };
    }
    return {
      error: false,
      data: responseJson.data,
    };
  } catch (error) {
    console.error(error);
  }
}

async function editUser(id, { name, email, password, role }) {
  try {
    const response = await fetchWithToken(`${BASE_URL}/users/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password, role }),
    });

    const responseJson = await response.json();

    if (responseJson.status !== "success") {
      return {
        error: true,
        data: null,
      };
    }
    return {
      error: false,
      data: responseJson.data,
    };
  } catch (error) {
    console.error(error);
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
};

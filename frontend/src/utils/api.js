const BASE_URL = "http://localhost:3000";
// bagi 2
// candra

// tri

function getAccessToken() {
  return localStorage.getItem('accessToken');
}

function putAccessToken(accessToken) {
  return localStorage.setItem('accessToken', accessToken)
}

async function fetchWithToken(url, options = {}) {
  return fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${getAccessToken()}`
    }
  })
}

async function login({ email, password }) {
  const response = await fetch(`${BASE_URL}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password })
  });

  const responseJson = await response.json();
  
  if (responseJson.status !== 'success') {
    alert(responseJson.message);
    return {
      error: true,
      data: null
    }
  }
}

export {
  getAccessToken,
  putAccessToken,
  login,
  fetchWithToken
}
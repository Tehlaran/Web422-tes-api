
import { jwtDecode } from "jwt-decode";


const TOKEN_KEY = "access_token";

// Save token to browser localStorage
export function setToken(token) {
  localStorage.setItem(TOKEN_KEY, token);
}

// Get raw token string
export function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}

// Remove token (logout)
export function removeToken() {
  localStorage.removeItem(TOKEN_KEY);
}

// Decode the JWT token
export function readToken() {
  try {
    const token = getToken();
    return token ? jwtDecode(token) : null;
  } catch (err) {
    console.error("Error decoding token:", err);
    return null;
  }
}

// Return true if token exists and can be decoded
export function isAuthenticated() {
  const token = readToken();
  return token ? true : false;
}

// LOGIN — calls POST /login and stores token
export async function authenticateUser(user, password) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/login`, {
    method: "POST",
    headers: { 
      "Content-Type": "application/json" 
    },
    body: JSON.stringify({
      userName: user,
      password: password
    }),
  });

  if (res.status === 200) {
    const data = await res.json();

    // API returns { message: "...", token: "..." }
    setToken(data.token);
    return true;
  } else {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || "Authentication failed.");
  }
}

// REGISTER — calls POST /register but DOES NOT set token
export async function registerUser(user, password, password2) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/register`, {
    method: "POST",
    headers: { 
      "Content-Type": "application/json" 
    },
    body: JSON.stringify({
      userName: user,
      password: password,
      password2: password2
    }),
  });

  if (res.status === 200) {
    return true;                  // successful register
  } else {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || "Registration failed.");
  }
}

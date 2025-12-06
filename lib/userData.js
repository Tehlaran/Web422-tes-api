// lib/userData.js
import { getToken } from "./authenticate";

// Helper: make an authorized request to the User API
async function makeAuthorizedRequest(path, options = {}) {
  const token = getToken();

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: `JWT ${token}`,
      ...(options.headers || {}),
    },
  });

  if (res.status === 200) {
    return res.json();
  } else {
    // As per assignment, return [] on error
    return [];
  }
}

// PUT /favourites/:id
export async function addToFavourites(id) {
  return makeAuthorizedRequest(`/favourites/${id}`, {
    method: "PUT",
  });
}

// DELETE /favourites/:id
export async function removeFromFavourites(id) {
  return makeAuthorizedRequest(`/favourites/${id}`, {
    method: "DELETE",
  });
}

// GET /favourites
export async function getFavourites() {
  return makeAuthorizedRequest(`/favourites`, {
    method: "GET",
  });
}

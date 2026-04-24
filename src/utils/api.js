// src/utils/api.js
const BASE_URL = "http://localhost:5000/api/invites";

export async function createInvitation(data, token) {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  const text = await res.text();
  let parsed;
  try { parsed = JSON.parse(text); } catch { parsed = { error: text }; }

  if (!res.ok) {
    console.error("API error:", parsed);
    throw new Error(parsed.error || "Save failed");
  }

  return parsed;
}
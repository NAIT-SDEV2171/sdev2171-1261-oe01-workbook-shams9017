// todo: define the user and session types for the backend response
// todo: send the login credentials to /auth/login and return the session
// todo: send registration details to /auth/register and return the session
// todo: send the token to /auth/me and return the response so the caller can check the status

import { protectedGet, requestJson } from "./api";

export type AuthUser = { id: string; name: string; email: string };
export type AuthSession = { token: string; user: AuthUser };

export async function login(email: string, password: string) {
  // credentials go to the backend; the app never decides whether they are correct.
  const data = await requestJson("/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: email.trim(), password }),
  });
  return data as AuthSession;
}

export async function register(name: string, email: string, password: string) {
  // this backend returns a session after registration, so another login is optional.
  const data = await requestJson("/auth/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name: name.trim(), email: email.trim(), password }),
  });
  return data as AuthSession;
}

export function getCurrentUser(token: string) {
  return protectedGet("/auth/me", token);
}

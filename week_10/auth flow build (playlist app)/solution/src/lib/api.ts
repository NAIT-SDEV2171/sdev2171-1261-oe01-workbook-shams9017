// todo: set the backend base address for the android emulator and other local platforms
// todo: write a fetch helper and a response parser that reads json and throws a plain error on failure
// todo: use the backend error message or fall back to the response status
// todo: add a protected get helper that sends the bearer token and returns the response

import { Platform } from "react-native";

export const API_BASE_URL =
  Platform.OS === "android" ? "http://10.0.2.2:4000" : "http://localhost:4000";

export async function parseResponse(response: Response) {
  const body = await response.json();

  if (!response.ok) {
    throw new Error(body.error ?? `Response status: ${response.status}`);
  }

  return body;
}

export async function request(path: string, options: RequestInit = {}) {
  try {
    return await fetch(`${API_BASE_URL}${path}`, options);
  } catch {
    throw new Error(
      "Cannot reach the backend. Check its terminal and the API address.",
    );
  }
}

export async function requestJson(path: string, options: RequestInit = {}) {
  const response = await request(path, options);
  return parseResponse(response);
}

export function protectedGet(path: string, token: string) {
  return request(path, {
    headers: { Authorization: `Bearer ${token}` },
  });
}

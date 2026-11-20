// todo: 01: import expo-secure-store
import * as SecureStore from "expo-secure-store";

// todo: 02: define one storage key for the auth token
const tokenKey = "playlist.authToken";

// todo: 03: write helpers to save, read, and delete the token

export function saveToken(token: string) {
  return SecureStore.setItemAsync(tokenKey, token);
}

export function readToken() {
  return SecureStore.getItemAsync(tokenKey);
}

export function clearToken() {
  return SecureStore.deleteItemAsync(tokenKey);
}

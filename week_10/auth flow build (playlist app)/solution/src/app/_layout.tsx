// todo: create the root stack and put the auth provider above it so both route groups share the same session
// todo: hide the root stack headers so the group stacks can display their own

// authentication surrounds both route groups because both need user session data (credentials,token)
import { Stack } from "expo-router";
import { AuthProvider } from "../context/AuthContext";

export default function RootLayout() {
  return (
    <AuthProvider>
      <Stack screenOptions={{ headerShown: false }} />
    </AuthProvider>
  );
}

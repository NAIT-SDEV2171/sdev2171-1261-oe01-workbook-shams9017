// todo: read the token from auth context and redirect to available songs when it exists
// todo: render a stack for welcome, login, and register while signed out

import { Redirect, Stack } from "expo-router";

import { useAuth } from "../../context/AuthContext";

export default function PublicLayout() {
  const { authToken } = useAuth();
  if (authToken) return <Redirect href="/available-songs" />;

  return (
    <Stack>
      <Stack.Screen name="welcome" options={{ title: "Welcome" }} />
      <Stack.Screen name="login" options={{ title: "Login" }} />
      <Stack.Screen name="register" options={{ title: "Register" }} />
    </Stack>
  );
}

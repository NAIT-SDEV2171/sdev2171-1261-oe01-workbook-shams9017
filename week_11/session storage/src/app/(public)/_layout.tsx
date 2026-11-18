import { Redirect, Stack } from "expo-router";

import { useAuth } from "../../context/AuthContext";
// todo: 17: import the session status component in the public layout
import SessionStatus from "../../components/SessionStatus";

export default function PublicLayout() {
  // todo: 18: read restoration status from auth context in the public layout
  const { authToken, isRestoring, restoreError } = useAuth();
  // todo: 19: wait for restoration before redirecting from the public layout
  if (isRestoring || restoreError) return <SessionStatus />;

  if (authToken) return <Redirect href="/available-songs" />;

  return (
    <Stack>
      <Stack.Screen name="welcome" options={{ title: "Welcome" }} />
      <Stack.Screen name="login" options={{ title: "Login" }} />
      <Stack.Screen name="register" options={{ title: "Register" }} />
    </Stack>
  );
}

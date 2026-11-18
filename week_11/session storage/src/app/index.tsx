import { Redirect } from "expo-router";
import { useAuth } from "../context/AuthContext";
// todo: 14: import the session status component for the entry screen
import SessionStatus from "../components/SessionStatus";


export default function EntryScreen() {
  // todo: 15: read restoration status from auth context on the entry screen
const { authToken, isRestoring, restoreError } = useAuth();
  // todo: 16: show session status before redirecting from the entry screen
  if (isRestoring || restoreError) return <SessionStatus />;
  return <Redirect href={authToken ? "/available-songs" : "/welcome"} />;
}

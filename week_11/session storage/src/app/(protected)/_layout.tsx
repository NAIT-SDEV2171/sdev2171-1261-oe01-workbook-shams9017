import { Redirect, Stack } from "expo-router";
import { useAuth } from "../../context/AuthContext";
import { PlaylistProvider, usePlaylist } from "../../context/PlaylistContext";
// todo: 20: import the session status component in the protected layout
import SessionStatus from "../../components/SessionStatus";

export default function ProtectedLayout() {
  // todo: 21: read restoration status from auth context in the protected layout
  const { authToken, isRestoring, restoreError } = useAuth();
  // todo: 22: wait for restoration before checking protected screen access
  if (isRestoring || restoreError) return <SessionStatus />;

  if (!authToken) return <Redirect href="/login" />;

  return (
    <PlaylistProvider>
      <PlaylistStack />
    </PlaylistProvider>
  );
}

function PlaylistStack() {
  const { savedPlaylistDetails } = usePlaylist();
  return (
    <Stack>
      <Stack.Screen
        name="available-songs"
        options={{ title: "Available Songs" }}
      />
      <Stack.Screen
        name="playlist"
        options={{ title: savedPlaylistDetails?.title || "My Playlist" }}
      />
      <Stack.Screen
        name="saved-playlists"
        options={{ title: "Saved Playlists" }}
      />
      <Stack.Screen
        name="playlist-details"
        options={{ title: "Playlist Details" }}
      />
    </Stack>
  );
}

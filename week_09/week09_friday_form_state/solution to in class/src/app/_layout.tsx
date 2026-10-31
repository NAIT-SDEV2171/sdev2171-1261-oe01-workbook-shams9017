import { Stack } from "expo-router";
import { PlaylistProvider, usePlaylist } from "../context/PlaylistContext";

// keep this single provider above all screens so submitted details can be shared.
export default function RootLayout() {
  return (
    // one provider above the stack gives every route access to the same selection.
    // it stays mounted while navigating between these screens, preserving their playlist.
    <PlaylistProvider>
      <PlaylistStack />
    </PlaylistProvider>
  );
}

function PlaylistStack() {
  const playlist = usePlaylist();
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "Available Songs" }} />
      <Stack.Screen
        name="playlist"
        options={{
          title: playlist.savedPlaylistDetails?.title || "My Playlist",
        }}
      />
      <Stack.Screen
        name="playlist-details"
        options={{ title: "Playlist Details" }}
      />
    </Stack>
  );
}

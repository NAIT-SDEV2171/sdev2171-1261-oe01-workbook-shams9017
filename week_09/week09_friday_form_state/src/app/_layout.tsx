import { Stack } from "expo-router";
import { PlaylistProvider } from "../context/PlaylistContext";

// todo: the new playlist-details route is registered under the existing provider.
// keep this single provider above all screens so submitted details can be shared.
export default function RootLayout() {
  return (
    // one provider above the stack gives every route access to the same selection.
    // it stays mounted while navigating between these screens, preserving their playlist.
    <PlaylistProvider>
      <Stack>
        <Stack.Screen name="index" options={{ title: "Available Songs" }} />
        <Stack.Screen name="playlist" options={{ title: "My Playlist" }} />
        <Stack.Screen name="playlist-details" options={{ title: "Playlist Details" }} />
      </Stack>
    </PlaylistProvider>
  );
}

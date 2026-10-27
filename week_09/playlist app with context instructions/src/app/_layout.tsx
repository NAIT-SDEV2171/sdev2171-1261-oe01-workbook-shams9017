import { Stack } from "expo-router";

// solution - after implementing ../context/PlaylistContext, import PlaylistProvider here.
// this layout is above both routes, so it is the place to connect their shared state owner.

export default function RootLayout() {
  return (
    // solution - wrap this existing stack with one PlaylistProvider.
    // both screen registrations must stay inside that same provider.
    // the provider then stays mounted while navigating between the two routes.
    // this means the Provider remains active instead of being destroyed and recreated 
    // when you switch between the two routes.
    // do not put a separate provider inside each screen; that would create separate selections.
    // each Provider creates its own independent state.
    <Stack>
      <Stack.Screen name="index" options={{ title: "Available Songs" }} />
      <Stack.Screen name="playlist" options={{ title: "My Playlist" }} />
    </Stack>
  );
}

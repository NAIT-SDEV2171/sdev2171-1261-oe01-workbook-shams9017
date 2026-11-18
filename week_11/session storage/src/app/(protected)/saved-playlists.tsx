// todo: load the signed in user’s saved playlists using the token
// todo: use an async load function with try, catch, and finally to show loading, error, retry, and empty states
// todo: check the response status and sign out if the token was rejected
// todo: load the chosen playlist into shared state before navigating to my playlist
// todo: clear the current selection and saved details when starting a new playlist

import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Button, FlatList, Text, View } from "react-native";
import { useAuth } from "../../context/AuthContext";
import { usePlaylist } from "../../context/PlaylistContext";
import { parseResponse } from "../../lib/api";
import { getPlaylists, type SavedPlaylist } from "../../lib/playlistApi";

export default function SavedPlaylistsScreen() {
  const { authToken, signOut } = useAuth();
  const { openPlaylist, startNewPlaylist } = usePlaylist();

  const router = useRouter();

  const [playlists, setPlaylists] = useState<SavedPlaylist[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  async function loadPlaylists() {
    setLoading(true);
    setError("");

    try {
      const response = await getPlaylists(authToken);

      if (response.status === 401) signOut();

      const body = await parseResponse(response);
      setPlaylists(body.playlists);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadPlaylists();
  }, [authToken]);
  return (
    <View style={{ flex: 1, padding: 20, backgroundColor: "white" }}>
      <Button
        title="Start New Playlist"
        onPress={() => {
          startNewPlaylist();
          router.replace("/available-songs");
        }}
      />
      <Button title="Refresh" disabled={loading} onPress={loadPlaylists} />
      {loading && <Text>Loading playlists...</Text>}
      {!!error && <Text accessibilityRole="alert">{error}</Text>}
      <FlatList
        data={playlists}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={
          !loading && !error ? (
            <Text>No saved playlists yet. Select songs to create one.</Text>
          ) : null
        }
        renderItem={({ item }) => (
          <View style={{ paddingVertical: 16, gap: 8 }}>
            <Text style={{ fontSize: 20 }}>{item.title}</Text>
            <Text>{item.songs.length} songs</Text>
            <Text>{item.goal}</Text>
            <Button
              title="Open Playlist"
              onPress={() => {
                openPlaylist(item);
                router.push("/playlist");
              }}
            />
          </View>
        )}
      />
    </View>
  );
}

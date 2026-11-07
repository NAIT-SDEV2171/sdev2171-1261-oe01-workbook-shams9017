// todo: read the selected songs and saved summary from playlist context
// todo: show each selected song and remove it through the shared remove action
// todo: display the saved title, goal, and song count above the list
// todo: add navigation to available songs, playlist details, and saved playlists
// todo: connect the start new playlist action and return to available songs

import { useRouter } from "expo-router";
import { Button, FlatList, StyleSheet, Text, View } from "react-native";
import { usePlaylist } from "../../context/PlaylistContext";

export default function PlaylistScreen() {
  const router = useRouter();
  // this reads the same selection as available songs, without creating another copy.
  // removesong updates the provider, so both screens reflect the removal.
  const { addedSongs, removeSong, savedPlaylistDetails, startNewPlaylist } =
    usePlaylist();

  return (
    <View style={styles.container}>
      <Text style={styles.count}>Playlist songs: {addedSongs.length}</Text>
      <Button
        title="Back to Available Songs"
        onPress={() => router.replace("/available-songs")}
      />
      {/* the form route is available even when empty so validation can be demonstrated. */}
      <Button
        title="Edit Playlist Details"
        onPress={() => router.push("/playlist-details")}
      />
      <Button
        title="Saved Playlists"
        onPress={() => router.push("/saved-playlists")}
      />
      <Button
        title="Start New Playlist"
        onPress={() => {
          startNewPlaylist();
          router.replace("/available-songs");
        }}
      />
      <FlatList
        data={addedSongs}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={
          savedPlaylistDetails ? (
            <View style={styles.summary}>
              {/* the submitted details are shared data; unsaved form edits do not change them. */}
              <Text style={styles.count}>{savedPlaylistDetails.title}</Text>
              <Text>
                {savedPlaylistDetails.goal || "No listening goal provided."}
              </Text>
              <Text>Songs when saved: {savedPlaylistDetails.songCount}</Text>
            </View>
          ) : null
        }
        ListEmptyComponent={
          <Text style={styles.empty}>Your playlist is empty.</Text>
        }
        renderItem={({ item }) => (
          <View style={styles.row}>
            <View style={{ flex: 1 }}>
              <Text style={styles.title}>{item.title}</Text>
              <Text>{item.artist}</Text>
            </View>
            <Button title="Remove" onPress={() => removeSong(item.id)} />
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  summary: { paddingVertical: 16, gap: 8 },
  container: { flex: 1, padding: 20, backgroundColor: "white" },
  count: { fontSize: 18, marginBottom: 16 },
  empty: { marginTop: 20, fontSize: 16 },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#dddddd",
  },
  title: { flex: 1, fontSize: 18 },
});

import { useRouter } from "expo-router";
import { Button, FlatList, StyleSheet, Text, View } from "react-native";
import { usePlaylist } from "../context/PlaylistContext";

export default function PlaylistScreen() {
  const router = useRouter();
  // this reads the same selection as available songs, without creating another copy.
  // removeSong updates the provider, so both screens reflect the removal.
  // todo: also read savedPlaylistDetails from the shared provider.
  const { addedSongs, removeSong } = usePlaylist();

  return (
    <View style={styles.container}>
      <Text style={styles.count}>Playlist songs: {addedSongs.length}</Text>
      <Button title="Back to Available Songs" onPress={() => router.back()} />
      {/* the form route is available even when empty so validation can be demonstrated. */}
      <Button title="Edit Playlist Details" onPress={() => router.push("/playlist-details")} />
      {/* todo: use ListHeaderComponent to show the saved title, goal, and songCount. */}
      {/* show a helpful message when savedPlaylistDetails is null. */}
      {/* label songCount as the count at last save; addedSongs.length is the current count. */}
      {/* todo: verify typing and cancel leave this saved summary unchanged. */}
      <FlatList
        data={addedSongs}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={
          <Text style={styles.empty}>Your playlist is empty.</Text>
        }
        renderItem={({ item }) => (
          <View style={styles.row}>
            <Text style={styles.title}>{item.title}</Text>
            <Button title="Remove" onPress={() => removeSong(item.id)} />
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
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

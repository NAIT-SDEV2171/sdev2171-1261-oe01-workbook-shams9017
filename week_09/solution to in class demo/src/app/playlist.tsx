import { useRouter } from "expo-router";
import { Button, FlatList, StyleSheet, Text, View } from "react-native";
import { usePlaylist } from "../context/PlaylistContext";

// solution - once the context file is implemented, import usePlaylist from ../context/PlaylistContext.
// after removing the copied selection below, remove useLocalSearchParams, useState, and the Song import.
// keep useRouter because the back button still needs it.

export default function PlaylistScreen() {
  const router = useRouter();
  const { addedSongs, removeSong } = usePlaylist();

  return (
    <View style={styles.container}>
      <Text style={styles.count}>Playlist songs: {addedSongs.length}</Text>
      <Button title="Back to Available Songs" onPress={() => router.back()} />
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

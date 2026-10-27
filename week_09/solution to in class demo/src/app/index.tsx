import { useRouter } from "expo-router";
import { Button, FlatList, StyleSheet, Text, View } from "react-native";
import { usePlaylist } from "../context/PlaylistContext";
import { songs } from "../data/songs";

// solution - once the context file is implemented, import usePlaylist from ../context/PlaylistContext.
// after moving the state and addSong below, remove the unused useState and Song imports.
// keep the songs import because the hardcoded catalogue is still displayed here.

export default function AvailableSongsScreen() {
  const router = useRouter();

  const { addedSongs, addSong } = usePlaylist();

  function openPlaylist() {
    router.push("/playlist");
  }

  return (
    <View style={styles.container}>
      <Text style={styles.count}>Selected songs: {addedSongs.length}</Text>
      <Button title="Open My Playlist" onPress={openPlaylist} />
      <FlatList
        data={songs}
        extraData={addedSongs}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          const isAdded = addedSongs.some((song) => song.id === item.id);
          return (
            <View style={styles.row}>
              <Text style={styles.title}>{item.title}</Text>
              <Button
                title={isAdded ? "Added" : "Add"}
                disabled={isAdded}
                onPress={() => addSong(item)}
              />
            </View>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "white" },
  count: { fontSize: 18, marginBottom: 16 },
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

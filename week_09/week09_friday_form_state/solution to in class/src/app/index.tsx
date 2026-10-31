import { useRouter } from "expo-router";
import { Button, FlatList, StyleSheet, Text, View } from "react-native";
import { songs } from "../data/songs";
import { usePlaylist } from "../context/PlaylistContext";

export default function AvailableSongsScreen() {
  const router = useRouter();

  // read the provider's selection and add action instead of owning a local selection.
  const { addedSongs, addSong } = usePlaylist();

  function openPlaylist() {
    // only navigate; the destination reads the same provider instead of a copied parameter.
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
          // a removal on my playlist updates this shared selection too.
          // the removed song therefore shows add again when we return here.
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

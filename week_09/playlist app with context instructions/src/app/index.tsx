import { useRouter } from "expo-router";
import { useState } from "react";
import { Button, FlatList, StyleSheet, Text, View } from "react-native";
import { songs, type Song } from "../data/songs";

// solution - once the context file is implemented, import usePlaylist from ../context/PlaylistContext.
// after moving the state and addSong below, remove the unused useState and Song imports.
// keep the songs import because the hardcoded catalogue is still displayed here.

export default function AvailableSongsScreen() {
  const router = useRouter();

  // local state - this screen currently owns its selected songs.
  // solution - move this state into PlaylistProvider in ../context/PlaylistContext.tsx.
  // replace this local state declaration with a call to usePlaylist that reads addedSongs and addSong.
  // the screen will then read the provider's current selection instead of owning its own.
  const [addedSongs, setAddedSongs] = useState<Song[]>([]);

  // solution - move this whole function into PlaylistProvider beside the shared addedSongs state.
  // keep its duplicate check and new-array update, then remove the local function here.
  // the add buttons will call the addSong function returned by usePlaylist instead.
  function addSong(song: Song) {
    setAddedSongs((current) =>
      current.some((item) => item.id === song.id)
        ? current
        : [...current, song],
    );
  }

  function openPlaylist() {
    // navigation parameters currently transfer a snapshot of the selection.
    // solution - replace this push call with navigation to /playlist without song parameters.
    // my playlist will read the shared selection from the provider instead of receiving a snapshot.
    router.push({
      pathname: "/playlist",
      params: { songs: JSON.stringify(addedSongs) },
    });
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
          // solution - keep this check; after the refactor, addedSongs comes from the provider.
          // removing a song on my playlist will then make this check false for that song.
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

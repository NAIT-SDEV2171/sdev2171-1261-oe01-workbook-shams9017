import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import { Button, FlatList, StyleSheet, Text, View } from "react-native";
import type { Song } from "../data/songs";

// solution - once the context file is implemented, import usePlaylist from ../context/PlaylistContext.
// after removing the copied selection below, remove useLocalSearchParams, useState, and the Song import.
// keep useRouter because the back button still needs it.

export default function PlaylistScreen() {
  const router = useRouter();
  // solution - remove this parameter reader once both screens use context.
  // the songs will no longer arrive through navigation parameters.
  const params = useLocalSearchParams<{ songs?: string }>();

  // duplicated state - this screen creates its own selection from the snapshot.
  // solution - remove this state declaration and its JSON.parse initializer.
  // read addedSongs and removeSong from usePlaylist here instead.
  // do not copy the context value into another useState; read the provider's value directly.
  const [playlistSongs, setPlaylistSongs] = useState<Song[]>(() =>
    JSON.parse(params.songs ?? "[]"),
  );

  // solution - move this function into PlaylistProvider and change it to update addedSongs.
  // remove the local function here, then call the removeSong obtained through usePlaylist.
  function removeSong(id: string) {
    // doing this only this screen's state changes. AvailableSongs still has its old selection.
    setPlaylistSongs((current) => current.filter((song) => song.id !== id));
  }

  return (
    <View style={styles.container}>
      {/* solution - use addedSongs.length here so the count reflects the shared selection. */}
      <Text style={styles.count}>Playlist songs: {playlistSongs.length}</Text>
      <Button title="Back to Available Songs" onPress={() => router.back()} />
      {/* solution - use addedSongs for the data prop below instead of playlistSongs. */}
      {/* solution - keep the remove button; removeSong will come from the shared hook. */}
      <FlatList
        data={playlistSongs}
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

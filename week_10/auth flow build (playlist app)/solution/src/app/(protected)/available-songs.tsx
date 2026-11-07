// todo: show the signed in user and connect logout to the shared sign out action
// todo: add a check session button that sends the current token to /auth/me and displays the confirmed user
// todo: check the response status before reading the body and sign out if the token was rejected
// todo: display the public song catalogue and use playlist context to add songs and mark already selected rows
// todo: add navigation to my playlist and saved playlists

import { useRouter } from "expo-router";
import { Button, FlatList, StyleSheet, Text, View } from "react-native";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { getCurrentUser } from "../../lib/authApi";
import { useSongs } from "../../hooks/useSongs";
import { parseResponse } from "../../lib/api";
import { usePlaylist } from "../../context/PlaylistContext";


export default function AvailableSongsScreen() {
  const router = useRouter();
  const { authToken, currentUser, signOut } = useAuth();
  const { songs, isLoading, error, retry } = useSongs();
  
  const [sessionMessage, setSessionMessage] = useState("");
  const [isChecking, setIsChecking] = useState(false);

  async function checkSession() {
    if (isChecking) return;
    setIsChecking(true);
    setSessionMessage("");
    try {
      const response = await getCurrentUser(authToken);
      if (response.status === 401) signOut();
      const { user } = await parseResponse(response);
      setSessionMessage(`Backend confirmed: ${user.email}`);
    } catch (error: any) {
      setSessionMessage(error.message);
    } finally {
      setIsChecking(false);
    }
  }


  // read the provider's selection and add action instead of owning a local selection.
  const { addedSongs, addSong } = usePlaylist();

  function openPlaylist() {
    // only navigate; the destination reads the same provider instead of a copied parameter.
    router.push("/playlist");
  }

  return (
    <View style={styles.container}>
      <Text style={styles.count}>Signed in: {currentUser?.email}</Text>
      <Button title="Log Out" onPress={() => { signOut(); router.replace("/login"); }} />
      <Button title={isChecking ? "Checking..." : "Check Session"} disabled={isChecking} onPress={checkSession} />
      {sessionMessage !== "" && <Text>{sessionMessage}</Text>}
      {isLoading && <Text>Loading songs...</Text>}
      {error !== "" && <View><Text accessibilityRole="alert">{error}</Text><Button title="Retry" onPress={retry} /></View>}
      <Text style={styles.count}>Selected songs: {addedSongs.length}</Text>
      <Button title="Open My Playlist" onPress={openPlaylist} />
      <Button title="Saved Playlists" onPress={() => router.push("/saved-playlists")} />
      <FlatList
        data={songs}
        extraData={addedSongs}
        keyboardShouldPersistTaps="handled"
        ListEmptyComponent={!isLoading && !error ? <Text>The song catalogue is empty.</Text> : null}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          // a removal on my playlist updates this shared selection too.
          // the removed song therefore shows add again when we return here.
          const isAdded = addedSongs.some((song) => song.id === item.id);
          return (
            <View style={styles.row}>
              <View style={{ flex: 1 }}><Text style={styles.title}>{item.title}</Text><Text>{item.artist}</Text></View>
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

import { useRouter } from "expo-router";
import { useState } from "react";
import { Button, FlatList, StyleSheet, Text, View } from "react-native";
import { useAuth } from "../../context/AuthContext";
import { usePlaylist } from "../../context/PlaylistContext";
import { useSongs } from "../../hooks/useSongs";
import { parseResponse } from "../../lib/api";
import { getCurrentUser } from "../../lib/authApi";

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
      // todo: 23: on a rejected session check, await logout and return to login without parsing the rejected response
      if (response.status === 401) {
        await signOut();
        router.replace("/login");
        return;
      }
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
      {/* todo: 24: wait for secure storage cleanup on logout and show an error if it fails */}
      <Button
        title="Log Out"
        onPress={async () => {
          try {
            await signOut();
            router.replace("/login");
          } catch {
            setSessionMessage(
              "Could not clear the saved session. Please try logging out again.",
            );
          }
        }}
      />
      <Button
        title={isChecking ? "Checking..." : "Check Session"}
        disabled={isChecking}
        onPress={checkSession}
      />
      {sessionMessage !== "" && <Text>{sessionMessage}</Text>}
      {isLoading && <Text>Loading songs...</Text>}
      {error !== "" && (
        <View>
          <Text accessibilityRole="alert">{error}</Text>
          <Button title="Retry" onPress={retry} />
        </View>
      )}
      <Text style={styles.count}>Selected songs: {addedSongs.length}</Text>
      <Button title="Open My Playlist" onPress={openPlaylist} />
      <Button
        title="Saved Playlists"
        onPress={() => router.push("/saved-playlists")}
      />
      <FlatList
        data={songs}
        extraData={addedSongs}
        keyboardShouldPersistTaps="handled"
        ListEmptyComponent={
          !isLoading && !error ? (
            <Text>The song catalogue is empty.</Text>
          ) : null
        }
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          // a removal on my playlist updates this shared selection too.
          // the removed song therefore shows add again when we return here.
          const isAdded = addedSongs.some((song) => song.id === item.id);
          return (
            <View style={styles.row}>
              <View style={{ flex: 1 }}>
                <Text style={styles.title}>{item.title}</Text>
                <Text>{item.artist}</Text>
              </View>
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

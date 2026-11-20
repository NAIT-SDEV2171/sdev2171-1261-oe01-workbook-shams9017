// todo: show the welcome screen with buttons for login and registration
// todo: load and display the public song catalogue with the shared song hook
// todo: show loading, error, retry, and empty states for the catalogue

import { useRouter } from "expo-router";
import { Button, FlatList, StyleSheet, Text, View } from "react-native";
import { useSongs } from "../../hooks/useSongs";
export default function WelcomeScreen() {
  const router = useRouter();
  const { songs, isLoading, error, retry } = useSongs();
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>My Playlist</Text>
      <Button title="Log In" onPress={() => router.push("/login")} />
      <Button title="Create Account" onPress={() => router.push("/register")} />
      <Text style={styles.subheading}>Available Songs</Text>
      {/* browsing the catalogue is public; building and saving a playlist requires sign in. */}
      {isLoading && <Text>Loading songs...</Text>}
      {!!error && (
        <View>
          <Text accessibilityRole="alert">{error}</Text>
          <Button title="Retry" onPress={retry} />
        </View>
      )}
      <FlatList
        data={songs}
        keyExtractor={(song) => song.id}
        ListEmptyComponent={
          !isLoading && !error ? (
            <Text>The song catalogue is empty.</Text>
          ) : null
        }
        renderItem={({ item }) => (
          <View style={styles.row}>
            <Text style={styles.title}>{item.title}</Text>
            <Text>{item.artist}</Text>
          </View>
        )}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "white", gap: 12 },
  heading: { fontSize: 28, fontWeight: "bold" },
  subheading: { fontSize: 22, marginTop: 12 },
  row: {
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#dddddd",
  },
  title: { fontSize: 18 },
});

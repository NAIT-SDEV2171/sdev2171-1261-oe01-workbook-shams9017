import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Button,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { usePlaylist } from "../context/PlaylistContext";

export default function PlaylistDetailsScreen() {
  const router = useRouter();

  const { addedSongs, savedPlaylistDetails, savePlaylistDetails } =
    usePlaylist();

  const [title, setTitle] = useState(savedPlaylistDetails?.title ?? "");
  const [goal, setGoal] = useState(savedPlaylistDetails?.goal ?? "");
  const [error, setError] = useState("");

  function handleSubmit() {
    // trim removes surrounding whitespace, so spaces alone are not a valid title.
    const cleanedTitle = title.trim();

    // stop on the first failed check, before saving anything or navigating away.
    if (cleanedTitle.length === 0) {
      setError("Enter a playlist title.");
      return;
    }

    if (addedSongs.length === 0) {
      setError("Add at least one song before saving playlist details.");
      return;
    }

    setError("");

    // this explicit submit is the point where local drafts become shared data.
    // songCount records the selection size at submit time, rather than a live count.
    savePlaylistDetails({
      title: cleanedTitle,
      goal: goal.trim(),
      songCount: addedSongs.length,
    });

    // my playlist opens this form and reads the committed result when we return.
    router.back();
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      keyboardShouldPersistTaps="handled"
    >
      <Text style={styles.heading}>Playlist Details</Text>
      <Text style={styles.hint}>
        Your changes are saved only when you press Save Playlist Details.
      </Text>
      <Text style={styles.count}>Selected songs: {addedSongs.length}</Text>

      <Text style={styles.label}>Playlist title (required)</Text>
      <TextInput
        style={styles.input}
        accessibilityLabel="Playlist title"
        placeholder="For example, Evening Mix"
        value={title}
        onChangeText={setTitle}
      />

      <Text style={styles.label}>Listening goal (optional)</Text>
      <TextInput
        style={[styles.input, styles.goalInput]}
        accessibilityLabel="Listening goal"
        placeholder="For example, Relax after class"
        value={goal}
        onChangeText={setGoal}
        multiline
      />

      {error !== "" && (
        <Text
          style={styles.error}
          accessibilityRole="alert"
          accessibilityLiveRegion="polite"
        >
          {error}
        </Text>
      )}

      <View style={styles.button}>
        <Button title="Save Playlist Details" onPress={handleSubmit} />
      </View>
      {/* leaving without submit discards this screen's uncommitted draft. */}
      <Button title="Cancel" onPress={() => router.back()} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "white" },
  content: { padding: 20 },
  heading: { fontSize: 24, fontWeight: "bold", marginBottom: 12 },
  hint: { fontSize: 16, color: "#444444", marginBottom: 16 },
  count: { fontSize: 18, marginBottom: 20 },
  label: { fontSize: 16, fontWeight: "bold", marginBottom: 8 },
  input: {
    borderWidth: 1,
    borderColor: "#777777",
    borderRadius: 6,
    padding: 12,
    fontSize: 16,
    color: "#111111",
    marginBottom: 20,
  },
  goalInput: { minHeight: 90, textAlignVertical: "top" },
  error: { color: "#b00020", fontSize: 16, marginBottom: 16 },
  button: { marginBottom: 12 },
});

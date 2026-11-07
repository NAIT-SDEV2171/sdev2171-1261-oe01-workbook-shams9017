// todo: start the local title and goal fields from the current saved details when available
// todo: require a nonblank title and at least one selected song before saving
// todo: send the validated details through the shared save action and go back only after it succeeds
// todo: show save errors and prevent repeat submissions while saving
// todo: allow cancel to leave without committing the local edits

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
import { usePlaylist } from "../../context/PlaylistContext";

export default function PlaylistDetailsScreen() {
  const router = useRouter();

  const { addedSongs, savedPlaylistDetails, savePlaylistDetails } =
    usePlaylist();

  const [title, setTitle] = useState(savedPlaylistDetails?.title ?? "");
  const [goal, setGoal] = useState(savedPlaylistDetails?.goal ?? "");
  const [error, setError] = useState("");

  const [isSaving, setIsSaving] = useState(false);

  async function handleSubmit() {
    if (isSaving) return;
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

    setIsSaving(true);
    try {
      // the backend saves this account's playlist with the selected catalogue ids.
      await savePlaylistDetails({
        title: cleanedTitle,
        goal: goal.trim(),
        songCount: addedSongs.length,
      });
      router.back();
    } catch (error: any) {
      setError(error.message);
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      keyboardShouldPersistTaps="handled"
    >
      <Text style={styles.heading}>Playlist Details</Text>
      <Text style={styles.hint}>
        Your changes are saved only when you press Save Playlist.
      </Text>
      <Text style={styles.count}>Selected songs: {addedSongs.length}</Text>

      <Text style={styles.label}>Playlist title (required)</Text>
      <TextInput
        style={styles.input}
        accessibilityLabel="Playlist title"
        placeholder="For example, Evening Mix"
        editable={!isSaving}
        value={title}
        onChangeText={setTitle}
      />

      <Text style={styles.label}>Listening goal (optional)</Text>
      <TextInput
        style={[styles.input, styles.goalInput]}
        accessibilityLabel="Listening goal"
        placeholder="For example, Relax after class"
        editable={!isSaving}
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
        <Button
          title={isSaving ? "Saving..." : "Save Playlist"}
          disabled={isSaving}
          onPress={handleSubmit}
        />
      </View>
      {/* leaving without submit discards this screen's uncommitted draft. */}
      <Button
        disabled={isSaving}
        title="Cancel"
        onPress={() => router.back()}
      />
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

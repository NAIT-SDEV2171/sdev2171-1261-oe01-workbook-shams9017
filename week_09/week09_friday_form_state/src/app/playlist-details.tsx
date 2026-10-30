import { useRouter } from "expo-router";
import { Button, StyleSheet, Text, View } from "react-native";

export default function PlaylistDetailsScreen() {
  const router = useRouter();

  // todo: import useState, TextInput, and usePlaylist when building this form.
  // todo: read addedSongs, savedPlaylistDetails, and savePlaylistDetails from context.
  // todo: create local title, goal, and error state; start error as an empty string.
  // todo: initialize the draft title and goal from saved details, or empty strings.
  // todo: connect each input with value and onChangeText so it is controlled.
  // todo: add handleSubmit; trim the title and reject an empty result.
  // todo: reject a submission when addedSongs.length is zero.
  // todo: show one error message and return immediately when a check fails.
  // todo: after validation, save the title, optional goal, and current song count.
  // todo: call savePlaylistDetails only on submit, never on each keystroke.
  // todo: return to my playlist after saving; cancel should only navigate back.

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Playlist Details</Text>
      <Text style={styles.instructions}>
        The lesson 17 form will be built here. Follow the numbered todo comments.
      </Text>
      {/* todo: replace this placeholder with labeled title and goal inputs. */}
      {/* todo: render the local error message below the inputs when it is not empty. */}
      {/* todo: add a save button that calls handleSubmit. */}
      <Button title="Cancel" onPress={() => router.back()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "white" },
  heading: { fontSize: 24, fontWeight: "bold", marginBottom: 12 },
  instructions: { fontSize: 16, marginBottom: 20 },
  // todo: add input, label, and error styles as the form is implemented.
});

// todo: keep email, password, submission status, and feedback in local state
// todo: validate the fields and call the shared sign in action
// todo: show errors and prevent repeat submissions while the request is running
// todo: link to registration and navigate to available songs after sign in succeeds

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
import { useAuth } from "../../context/AuthContext";

export default function LoginScreen() {
  const router = useRouter();
  const { signIn } = useAuth();
  // credentials and request feedback belong to this form, rather than shared auth state.

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit() {
    if (isSubmitting) return;
    if (!email.trim() || !password) {
      setError("Enter your email and password.");
      return;
    }
    setError("");
    setIsSubmitting(true);
    try {
      // a valid response updates the provider before entering the protected screens.
      await signIn(email, password);
      router.replace("/available-songs");
    } catch (error: any) {
      setError(error.message);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      keyboardShouldPersistTaps="handled"
    >
      <Text style={styles.heading}>Log In</Text>

      <Text>Email</Text>
      <TextInput
        style={styles.input}
        accessibilityLabel="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
        editable={!isSubmitting}
      />
      <Text>Password</Text>
      <TextInput
        style={styles.input}
        accessibilityLabel="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        autoCapitalize="none"
        autoCorrect={false}
        editable={!isSubmitting}
      />
      {error !== "" && (
        <Text style={styles.error} accessibilityRole="alert">
          {error}
        </Text>
      )}
      <View style={styles.button}>
        <Button
          title={isSubmitting ? "Please wait..." : "Log In"}
          disabled={isSubmitting}
          onPress={handleSubmit}
        />
      </View>
      <Button
        title="Create Account"
        disabled={isSubmitting}
        onPress={() => router.replace("/register")}
      />
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "white" },
  content: { padding: 20, gap: 10 },
  heading: { fontSize: 26, fontWeight: "bold", marginBottom: 16 },
  input: {
    borderWidth: 1,
    borderColor: "#777777",
    padding: 12,
    fontSize: 16,
    marginBottom: 12,
    borderRadius: 6,
  },
  error: { color: "#b00020", fontSize: 16 },
  button: { marginBottom: 10 },
});

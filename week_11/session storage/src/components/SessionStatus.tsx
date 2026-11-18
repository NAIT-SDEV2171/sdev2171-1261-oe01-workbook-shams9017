// todo: 25: import the components and auth hook for the session status view
import {
    ActivityIndicator,
    Button,
    StyleSheet,
    Text,
    View,
} from "react-native";
import { useAuth } from "../context/AuthContext";
// todo: 26: show restoring progress or an error with a retry action
export default function SessionStatus() {
  const { isRestoring, restoreError, retryRestore } = useAuth();

  return (
    <View style={styles.container}>
      {isRestoring && <ActivityIndicator />}
      <Text style={styles.message}>
        {isRestoring ? "Checking your saved session..." : restoreError}
      </Text>
      {!isRestoring && restoreError !== "" && (
        <Button
          title="Retry session check"
          onPress={() => void retryRestore()}
        />
      )}
    </View>
  );
}
// todo: 27: style the session status view
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
    backgroundColor: "white",
  },
  message: { fontSize: 16, textAlign: "center", marginVertical: 16 },
});

import { useRouter } from "expo-router";
import { Pressable, Text, View } from "react-native";
import s1styles from "../styles/screen01_styles";

export default function Screen03() {
  const router = useRouter();
  return (
    <View style={s1styles.container}>
      <Text style={{ fontSize: 18, fontWeight: "bold" }}>I am screen 3</Text>
      <Pressable
        style={s1styles.pressable}
        onPress={() => router.navigate("/screen01")}
      >
        <Text style={s1styles.buttonText}>navigate to 1</Text>
      </Pressable>

      <Pressable style={s1styles.pressable} onPress={() => router.back()}>
        <Text style={s1styles.buttonText}>back</Text>
      </Pressable>
    </View>
  );
}

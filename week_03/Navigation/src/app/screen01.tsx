import { useRouter } from "expo-router";
import { Pressable, Text, View } from "react-native";
import s1styles from "../styles/screen01_styles";

export default function Screen01() {
  const router = useRouter();
  return (
    <View style={s1styles.container}>
      <Text style={{ fontSize: 18, fontWeight: "bold" }}>I am screen 1</Text>
      <Pressable
        style={s1styles.pressable}
        onPress={() => router.push("./screen02")}
      >
        <Text style={s1styles.buttonText}>Go to screen 2</Text>
      </Pressable>
      <Pressable style={s1styles.pressable} onPress={() => router.back()}>
        <Text style={s1styles.buttonText}>back</Text>
      </Pressable>
    </View>
  );
}

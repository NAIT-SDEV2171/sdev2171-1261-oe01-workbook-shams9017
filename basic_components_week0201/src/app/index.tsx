import { Image, ScrollView, Text, TextInput, View } from "react-native";

const imageSource = {
  uri: "https://www.mindyourlogic.com/static/blogs/how-many-animals-in-this-image-1.webp",
};

export default function HomeScreen() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
        marginTop: 50,
      }}
    >
      <ScrollView contentContainerStyle={{ padding: 20, alignItems: "center" }}>
        <View>
          <Text
            style={{ fontSize: 24, fontWeight: "bold", textAlign: "center" }}
          >
            How Many Animals Are in This Image?
          </Text>
          <Image
            source={imageSource}
            style={{ width: "100%", aspectRatio: 1200 / 800 }}
            resizeMode="contain"
          />
          <View>
            <Text
              style={{
                fontSize: 16,
                fontWeight: "bold",
                marginBottom: 8,
              }}
            >
              Your answer
            </Text>
            <TextInput
              style={{
                height: 50,
                borderWidth: 1,
                borderColor: "gray",
                borderRadius: 8,
                paddingHorizontal: 10,
                marginVertical: 20,
              }}
              placeholder="Enter the number of animals"
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

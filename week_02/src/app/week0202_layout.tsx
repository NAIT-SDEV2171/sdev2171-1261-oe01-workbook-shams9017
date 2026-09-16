import { Image, StyleSheet, Text, View } from "react-native";

const expoImage = require("../../assets/images/expo-logo.png");
const imgSource = {
  uri: "https://pngimg.com/uploads/spongebob/spongebob_PNG48.png",
};

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.textCornerHeader}>I am a header</Text>
      </View>

      <View style={styles.sectionContainer}>
        <View style={styles.firstSectionWithImage}>
          <Image source={imgSource} style={styles.spongebobImage} />
          <Text style={styles.firstSectionHeader}>Spongebob</Text>
          <Text style={styles.textBody}>Squarepants</Text>
        </View>

        <View style={styles.lightOrangeSection}>
          <View style={styles.smallBoxContainer}>
            <Image
              source={expoImage}
              style={[styles.smallBoxImage, styles.blueImage]}
            />
            <Text style={styles.textBody}>text</Text>
          </View>

          <View style={styles.smallBoxContainer}>
            <Image
              source={expoImage}
              style={[styles.smallBoxImage, styles.yellowImage]}
            />
            <Text style={styles.textBody}>text</Text>
          </View>

          <View style={styles.smallBoxContainer}>
            <Image
              source={expoImage}
              style={[styles.smallBoxImage, styles.pinkImage]}
            />
            <Text style={styles.textBody}>text</Text>
          </View>
        </View>

        <View style={styles.lightPurpleSection}>
          <Text style={styles.textCornerHeader}>text</Text>

          <View style={styles.longPurpleSectionContainer}>
            <Text style={styles.textBody}>text</Text>
          </View>
        </View>

        <View style={styles.lastSection}>
          <Text style={styles.textCornerHeader}>text</Text>

          <View style={styles.lastSectionRow}>
            <Image
              source={expoImage}
              style={[styles.lastSectionRowImage, styles.blueImage]}
            />

            <View style={styles.rowText}>
              <Text style={styles.rowTitle}>text</Text>
              <Text style={styles.rowSubtitle}>text</Text>
            </View>
          </View>

          <View style={styles.lastSectionRow}>
            <Image
              source={expoImage}
              style={[styles.lastSectionRowImage, styles.greenImage]}
            />

            <View style={styles.rowText}>
              <Text style={styles.rowTitle}>text</Text>
              <Text style={styles.rowSubtitle}>text</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#D0F8D0",
  },

  header: {
    height: "11%",
    backgroundColor: "#8DCAFA",
    alignItems: "center",
    justifyContent: "flex-end",
    paddingBottom: 12,
  },

  textCornerHeader: {
    color: "#000000",
    fontSize: 22,
    lineHeight: 28,
    fontWeight: "600",
  },

  sectionContainer: {
    flex: 1,
    paddingHorizontal: 12,
    paddingBottom: 12,
    gap: 11,
  },

  firstSectionWithImage: {
    height: 240,
    alignItems: "center",
    paddingTop: 18,
  },

  spongebobImage: {
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: "#CDB0FA",
    resizeMode: "contain",
  },

  firstSectionHeader: {
    marginTop: 8,
    marginBottom: 4,
    color: "#000000",
    fontSize: 22,
    lineHeight: 28,
    fontWeight: "600",
  },

  textBody: {
    color: "#000000",
    fontSize: 18,
    lineHeight: 22,
  },

  lightOrangeSection: {
    height: 159,
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#FFD5C2",
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingTop: 22,
    paddingBottom: 18,
  },

  smallBoxContainer: {
    width: "29%",
    alignItems: "center",
    gap: 4,
  },

  smallBoxImage: {
    flex: 1,
    width: "100%",
    borderRadius: 10,
    resizeMode: "contain",
  },

  blueImage: {
    backgroundColor: "#B0DDFC",
  },

  yellowImage: {
    backgroundColor: "#FFF1AA",
  },

  pinkImage: {
    backgroundColor: "#FAC2E8",
  },

  greenImage: {
    backgroundColor: "#B4F0B8",
  },

  lightPurpleSection: {
    height: 150,
    backgroundColor: "#D9C3FA",
    borderRadius: 12,
    padding: 12,
    gap: 8,
  },

  longPurpleSectionContainer: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#F4E5FC",
    borderRadius: 12,
    paddingHorizontal: 22,
  },

  lastSection: {
    flex: 1,
    backgroundColor: "#FFF0A3",
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingTop: 12,
    paddingBottom: 22,
    gap: 10,
  },

  lastSectionRow: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF7EB",
    borderRadius: 12,
    padding: 8,
    gap: 20,
  },

  lastSectionRowImage: {
    width: "24%",
    height: "100%",
    borderRadius: 9,
    resizeMode: "contain",
  },

  rowText: {
    flex: 1,
    justifyContent: "center",
    gap: 4,
  },

  rowTitle: {
    color: "#000000",
    fontSize: 18,
    lineHeight: 24,
    fontWeight: "600",
  },

  rowSubtitle: {
    color: "#000000",
    fontSize: 16,
    lineHeight: 20,
  },
});

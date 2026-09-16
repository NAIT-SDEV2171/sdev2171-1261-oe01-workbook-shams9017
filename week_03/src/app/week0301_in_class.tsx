import { Image, StyleSheet, Text, View } from "react-native";

const imageSource = {
  uri: "https://pngimg.com/uploads/batman/batman_PNG75.png",
};

const imageSource2 = {
  uri: "https://pngimg.com/uploads/porsche/porsche_PNG102870.png",
};

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.header}></View>
      <View style={styles.firstSectionWithImage}>
        <Image
          source={imageSource}
          resizeMode="contain"
          style={styles.batmanImage}
        />
      </View>
      <View style={styles.lightPurpleSection}>
        <Text style={styles.textCornerHeader}>Batman</Text>
        <Text>The Dark Knight</Text>
      </View>
      <View style={styles.lightGreenSection}>
        <View style={styles.firstChildVertFlexD}>
          <Text style={styles.textCornerHeader}>Text</Text>
          <View style={styles.smallBox}></View>
        </View>
        <View
          style={[
            styles.smallBox,
            styles.threeBoxPadding,
            { backgroundColor: "#FEB6BD" },
          ]}
        ></View>
        <View
          style={[
            styles.smallBox,
            styles.threeBoxPadding,
            { backgroundColor: "#FEEFA8" },
          ]}
        ></View>
        <View
          style={[
            styles.smallBox,
            styles.threeBoxPadding,
            { backgroundColor: "#CFBCFD" },
          ]}
        ></View>
      </View>
      <View style={styles.lightOrangeSection}>
        <Text style={styles.textCornerHeader}>Text</Text>
        <View style={styles.orangeSubSectionContainer}>
          <Text style={{ paddingLeft: 10, paddingTop: 10 }}>Text</Text>
        </View>
      </View>
      <View style={styles.lastSection}>
        <Text style={styles.textCornerHeader}>Text</Text>
        <View style={styles.lastSectionRow}>
          <Image
            source={imageSource2}
            style={[styles.lastSectionRowImage, styles.blueImage]}
          />

          <View style={styles.rowText}>
            <Text style={styles.rowTitle}>Text</Text>
            <Text style={styles.rowSubtitle}>Text</Text>
          </View>
        </View>

        <View style={styles.lastSectionRow}>
          <Image
            source={imageSource2}
            style={[styles.lastSectionRowImage, styles.greenImage]}
          />

          <View style={styles.lastSectionHeaderText}>
            <Text style={styles.lastSectionTitleText}>Text</Text>
            <Text style={styles.lastSectionSubTitle}>Text</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    backgroundColor: "#FDA7AD",
    height: 100,
  },
  firstSectionWithImage: {
    backgroundColor: "lightblue",
    height: 210,
    marginVertical: 10,
    marginHorizontal: 10,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  batmanImage: {
    width: 200,
    height: 300,
  },
  lightPurpleSection: {
    backgroundColor: "#E3D3FE",
    height: 85,
    marginHorizontal: 10,
    borderRadius: 15,
    paddingLeft: 10,
    paddingTop: 10,
  },
  textCornerHeader: {
    fontSize: 20,
    fontWeight: "bold",
  },
  lightGreenSection: {
    backgroundColor: "#CBF6CD",
    height: 120,
    marginVertical: 10,
    marginHorizontal: 10,
    borderRadius: 15,
    paddingTop: 10,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  firstChildVertFlexD: {},
  smallBox: {
    height: 65,
    width: 65,
    borderRadius: 10,
    backgroundColor: "#A5D6FE",
    marginTop: 5,
  },
  threeBoxPadding: {
    marginTop: 30,
  },
  lightOrangeSection: {
    backgroundColor: "#FED69A",
    height: 150,
    marginBottom: 10,
    marginHorizontal: 10,
    borderRadius: 15,
    paddingTop: 10,
    paddingLeft: 10,
  },
  orangeSubSectionContainer: {
    flex: 1,
    marginVertical: 10,
    marginRight: 10,
    backgroundColor: "#FEF2DD",
    borderRadius: 15,
  },
  lastSection: {
    flex: 1,
    backgroundColor: "#C1E1FC",
    marginHorizontal: 10,
    marginBottom: 10,
    borderRadius: 15,
    padding: 12,
  },

  lastSectionRow: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#EEF6FF",
    borderRadius: 15,
    marginTop: 10,
    padding: 8,
    gap: 18,
  },
  lastSectionRowImage: {
    width: "24%",
    height: "100%",
    borderRadius: 9,
    resizeMode: "contain",
  },
  blueImage: {
    backgroundColor: "#A5D6FE",
  },
  lastSectionHeaderText: {
    flex: 1,
    justifyContent: "center",
    gap: 4,
  },

  lastSectionTitleText: {
    color: "#000000",
    fontSize: 18,
    lineHeight: 24,
    fontWeight: "600",
  },

  lastSectionSubTitle: {
    color: "#000000",
    fontSize: 16,
    lineHeight: 20,
  },
  greenImage: {
    backgroundColor: "#B4F0B8",
  },
});

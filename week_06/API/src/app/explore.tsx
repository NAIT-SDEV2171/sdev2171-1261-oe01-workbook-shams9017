import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Alert, Button, FlatList, StyleSheet, Text, View } from "react-native";

type ApiCountry = {
  country: string;
  cities: string[];
};

type Country = {
  id: string;
  label: string;
  cities: string[];
};
export default function ExploreScreen() {
  const router = useRouter();
  const [countries, setCountries] = useState<Country[]>([]);

  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);

  async function loadCountries() {
    const response = await fetch(
      "https://countriesnow.space/api/v0.1/countries",
    );

    if (!response.ok) {
      throw new Error(`HTTP status: ${response.status}`);
    }

    const result = await response.json();

    if (result.error || !Array.isArray(result.data)) {
      throw new Error(result.msg || "Expected a country array");
    }

    const data: ApiCountry[] = result.data;

    console.log("First API item:", data[0]);

    const items: Country[] = data.map((item, index) => ({
      id: String(index),
      label: item.country,
      cities: item.cities,
    }));

    console.log("First mapped item:", items[0]);
    setCountries(items);
  }

  useEffect(() => {
    loadCountries();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>
        {selectedCountry ? selectedCountry.label : "Choose a country"}
      </Text>

      {selectedCountry ? (
        <FlatList
          data={selectedCountry.cities}
          keyExtractor={(item, index) => `${item}-${index}`}
          renderItem={({ item }) => (
            <View style={styles.row}>
              <Text style={styles.item}>{item}</Text>

              <Button
                title="Choose"
                onPress={() =>
                  Alert.alert(
                    "Your choice",
                    `${item}, ${selectedCountry.label}`,
                  )
                }
              />
            </View>
          )}
        />
      ) : (
        <FlatList
          data={countries}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.row}>
              <Text style={styles.item}>{item.label}</Text>

              <Button title="Choose" onPress={() => setSelectedCountry(item)} />
            </View>
          )}
        />
      )}

      <View style={styles.buttons}>
        {selectedCountry && (
          <Button
            title="Choose another country"
            onPress={() => setSelectedCountry(null)}
          />
        )}

        <Button title="Back Home" onPress={() => router.back()} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  heading: {
    fontSize: 24,
    marginBottom: 20,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  item: {
    flex: 1,
    fontSize: 18,
    marginRight: 10,
  },
  buttons: {
    gap: 12,
    marginTop: 12,
  },
});

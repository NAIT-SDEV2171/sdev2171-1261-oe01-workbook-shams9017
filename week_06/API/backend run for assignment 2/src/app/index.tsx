import { useEffect, useState } from "react";
import { Platform, ScrollView, Text } from "react-native";

const API_URL = "http://10.0.2.2:4000";


export default function HomeScreen() {
  const [entries, setEntries] = useState<any[]>([]);

  useEffect(() => {
    
    async function loadEntries() {
      const response = await fetch(`${API_URL}/sample-entries`);
      if (!response.ok) {
        throw new Error(`Server returned HTTP ${response.status}.`);
      }
      const data = await response.json();
      setEntries(data.records);
    }

    loadEntries().catch(console.error);
  }, []);

  return (
    <ScrollView>
      <Text>{JSON.stringify(entries, null, 2)}</Text>
    </ScrollView>
  );
}

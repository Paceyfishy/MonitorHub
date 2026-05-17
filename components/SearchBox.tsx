import {
  View,
  TextInput,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Text,
} from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router";
import { searchMonitors } from "@/lib/monitorApi";
import MonitorItem from "@/interfaces/MonitorItem";

interface SearchBoxProps {
  onSelectMonitor?: (monitor: MonitorItem) => void;
}

export default function SearchBox({ onSelectMonitor }: SearchBoxProps) {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState<MonitorItem[]>([]);
  const [showResults, setShowResults] = useState(false);

  const handleSearch = async (text: string) => {
    setSearchQuery(text);

    if (text.trim().length === 0) {
      setResults([]);
      setShowResults(false);
      return;
    }

    const searchResults = await searchMonitors(text);
    setResults(searchResults);
    setShowResults(true);
  };

  const handleSelectResult = (monitor: MonitorItem) => {
    setSearchQuery("");
    setShowResults(false);
    setResults([]);
    onSelectMonitor?.(monitor);
    router.push({ pathname: "/products", params: { id: monitor.id } });
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          placeholder="Search monitors..."
          placeholderTextColor="#888"
          style={styles.searchInput}
          value={searchQuery}
          onChangeText={handleSearch}
        />
      </View>

      {showResults && results.length > 0 && (
        <View style={styles.resultsContainer}>
          <FlatList
            data={results}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.resultItem}
                onPress={() => handleSelectResult(item)}
              >
                <Text style={styles.resultText}>{item.brand} - {item.name}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      )}

      {showResults && results.length === 0 && searchQuery.trim().length > 0 && (
        <View style={styles.noResultsContainer}>
          <Text style={styles.noResultsText}>No monitors found</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
    marginHorizontal: 25,
    marginBottom: 20,
  },

  searchContainer: {
    marginBottom: 0,
  },

  searchInput: {
    backgroundColor: "#1e1e1e16",
    color: "white",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    fontSize: 16,

    // Shadow
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.15,
    shadowRadius: 4,

    elevation: 3,
  },

  resultsContainer: {
    backgroundColor: "#2a2a2a",
    borderRadius: 12,
    marginTop: 4,
    maxHeight: 200,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },

  resultItem: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#3a3a3a",
  },

  resultText: {
    color: "white",
    fontSize: 14,
  },

  noResultsContainer: {
    backgroundColor: "#2a2a2a",
    borderRadius: 12,
    marginTop: 4,
    paddingVertical: 12,
    paddingHorizontal: 16,
  },

  noResultsText: {
    color: "#888",
    fontSize: 14,
    textAlign: "center",
  },
});

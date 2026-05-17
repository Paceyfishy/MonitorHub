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
    zIndex: 100,
  },

  searchContainer: {
    marginBottom: 0,
  },

  searchInput: {
    borderWidth: 1,
    borderColor: "#d8dcff",
    backgroundColor: "#f8f9ff",

    paddingVertical: 14,
    paddingHorizontal: 16,

    borderRadius: 14,
    fontSize: 16,
    color: "#111",

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.08,
    shadowRadius: 6,

    elevation: 3,
  },

  resultsContainer: {
    backgroundColor: "white",
    borderRadius: 14,
    marginTop: 6,
    overflow: "hidden",

    borderWidth: 1,
    borderColor: "#e5e7ff",

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.08,
    shadowRadius: 8,

    elevation: 5,
  },

  resultItem: {
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
    backgroundColor: "white",
  },

  resultText: {
    color: "#111",
    fontSize: 14,
    fontWeight: "500",
  },

  noResultsContainer: {
    backgroundColor: "white",
    borderRadius: 14,
    marginTop: 6,
    paddingVertical: 14,
    paddingHorizontal: 16,

    borderWidth: 1,
    borderColor: "#e5e7ff",
  },

  noResultsText: {
    color: "#777",
    fontSize: 14,
    textAlign: "center",
  },
});

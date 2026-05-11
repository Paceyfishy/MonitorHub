// app/(tabs)/compare.tsx

import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from "react-native";

import { Picker } from "@react-native-picker/picker";

const monitorData = [
  {
    id: "1",
    name: "LG UltraGear",
    refreshRate: "144Hz",
    resolution: "2560x1440",
    panel: "IPS",
    size: '27"',
  },
  {
    id: "2",
    name: "Samsung Odyssey",
    refreshRate: "240Hz",
    resolution: "3840x2160",
    panel: "VA",
    size: '32"',
  },
];

export default function CompareScreen() {
  const [leftMonitorId, setLeftMonitorId] = useState("1");
  const [rightMonitorId, setRightMonitorId] = useState("2");

  const leftMonitor = monitorData.find(
    (monitor) => monitor.id === leftMonitorId
  );

  const rightMonitor = monitorData.find(
    (monitor) => monitor.id === rightMonitorId
  );

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Compare Monitors</Text>

      {/* Dropdown Row */}
      <View style={styles.dropdownRow}>
        <View style={styles.dropdownContainer}>
          <Picker
            selectedValue={leftMonitorId}
            onValueChange={(value) =>
              setLeftMonitorId(value)
            }
            dropdownIconColor="#4654eb"
            style={styles.picker}
          >
            {monitorData.map((monitor) => (
              <Picker.Item
                key={monitor.id}
                label={monitor.name}
                value={monitor.id}
              />
            ))}
          </Picker>
        </View>

        <View style={styles.dropdownContainer}>
          <Picker
            selectedValue={rightMonitorId}
            onValueChange={(value) =>
              setRightMonitorId(value)
            }
            dropdownIconColor="#4654eb"
            style={styles.picker}
          >
            {monitorData.map((monitor) => (
              <Picker.Item
                key={monitor.id}
                label={monitor.name}
                value={monitor.id}
              />
            ))}
          </Picker>
        </View>
      </View>

      {/* Specs Comparison */}
      <View style={styles.comparisonContainer}>
        {/* Left Specs */}
        <View style={styles.specColumn}>
          <Text style={styles.monitorTitle}>
            {leftMonitor?.name}
          </Text>

          <Text style={styles.specText}>
            Refresh Rate: {leftMonitor?.refreshRate}
          </Text>

          <Text style={styles.specText}>
            Resolution: {leftMonitor?.resolution}
          </Text>

          <Text style={styles.specText}>
            Panel: {leftMonitor?.panel}
          </Text>

          <Text style={styles.specText}>
            Size: {leftMonitor?.size}
          </Text>
        </View>

        {/* Right Specs */}
        <View style={styles.specColumn}>
          <Text style={styles.monitorTitle}>
            {rightMonitor?.name}
          </Text>

          <Text style={styles.specText}>
            Refresh Rate: {rightMonitor?.refreshRate}
          </Text>

          <Text style={styles.specText}>
            Resolution: {rightMonitor?.resolution}
          </Text>

          <Text style={styles.specText}>
            Panel: {rightMonitor?.panel}
          </Text>

          <Text style={styles.specText}>
            Size: {rightMonitor?.size}
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
    paddingTop: 60,
  },

  header: {
    color: "white",
    fontSize: 28,
    fontWeight: "bold",
    paddingHorizontal: 16,
    marginBottom: 20,
  },

  dropdownRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    marginBottom: 24,
  },

  dropdownContainer: {
    flex: 1,
    backgroundColor: "#1e1e1e",
    borderRadius: 12,
    marginHorizontal: 4,
    overflow: "hidden",
  },

  picker: {
    color: "white",
  },

  comparisonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16,
  },

  specColumn: {
    flex: 1,
    backgroundColor: "#1e1e1e",
    padding: 16,
    borderRadius: 12,
    marginHorizontal: 4,
  },

  monitorTitle: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
  },

  specText: {
    color: "#d1d1d1",
    fontSize: 15,
    marginBottom: 10,
  },
});
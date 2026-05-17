import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, FlatList, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function MonitorDropdown({ data, selectedId, onSelect }: any) {
  const [visible, setVisible] = useState(false);
  const selectedItem = data.find((item: any) => item.id === selectedId);

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={() => setVisible(true)}>
        <Text style={styles.buttonText} numberOfLines={1}>{selectedItem?.name || "Select"}</Text>
        <Ionicons name="chevron-down" size={14} color="#4654eb" />
      </TouchableOpacity>
      <Modal visible={visible} transparent animationType="fade">
        <TouchableOpacity style={styles.overlay} onPress={() => setVisible(false)}>
          <View style={styles.modal}>
            <FlatList
              data={data}
              keyExtractor={(i) => i.id}
              renderItem={({ item }) => (
                <TouchableOpacity style={styles.item} onPress={() => { onSelect(item.id); setVisible(false); }}>
                  <Text style={[styles.itemText, item.id === selectedId && styles.activeItem]}>{item.name}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  button: { flexDirection: 'row', backgroundColor: '#F2F2F7', height: 48, borderRadius: 14, paddingHorizontal: 15, alignItems: 'center', justifyContent: 'space-between' },
  buttonText: { fontSize: 13, fontWeight: '700', color: '#1C1C1E', flex: 1 },
  overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.3)', justifyContent: 'center', alignItems: 'center' },
  modal: { width: '85%', backgroundColor: 'white', borderRadius: 24, padding: 10, maxHeight: '60%' },
  item: { padding: 18, borderBottomWidth: 1, borderBottomColor: '#F2F2F7' },
  itemText: { fontSize: 15, color: '#3A3A3C' },
  activeItem: { color: '#4654eb', fontWeight: 'bold' },
});
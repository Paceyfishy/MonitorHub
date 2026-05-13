import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, FlatList, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const ITEM_HEIGHT = 48; // กำหนดความสูงต่อแถว

export default function MonitorDropdown({ data, selectedId, onSelect }: any) {
  const [visible, setVisible] = useState(false);
  const selectedItem = data.find((item: any) => item.id === selectedId);

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={() => setVisible(true)}>
        <Text style={styles.buttonText} numberOfLines={1}>
          {selectedItem ? selectedItem.name : "Select..."}
        </Text>
        <Ionicons name="chevron-down" size={16} color="#4654eb" />
      </TouchableOpacity>

      <Modal visible={visible} transparent animationType="fade">
        <TouchableOpacity style={styles.overlay} activeOpacity={1} onPress={() => setVisible(false)}>
          <View style={styles.listCard}>
            <FlatList
              data={data}
              keyExtractor={(item) => item.id}
              // ล็อกความสูงไว้ที่ 4 รายการ (48 * 4 = 192)
              style={{ maxHeight: ITEM_HEIGHT * 4 }} 
              renderItem={({ item }) => (
                <TouchableOpacity 
                  style={[styles.item, { height: ITEM_HEIGHT }, item.id === selectedId && styles.selectedBg]} 
                  onPress={() => { onSelect(item.id); setVisible(false); }}
                >
                  <Text style={[styles.itemText, item.id === selectedId && styles.selectedText]}>{item.name}</Text>
                  {item.id === selectedId && <Ionicons name="checkmark" size={18} color="#4654eb" />}
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
  container: { flex: 1, marginHorizontal: 4 },
  button: { flexDirection: 'row', backgroundColor: '#1e1e1e', height: 42, borderRadius: 8, paddingHorizontal: 12, alignItems: 'center', justifyContent: 'space-between', borderWidth: 1, borderColor: '#333' },
  buttonText: { color: 'white', fontSize: 13 },
  overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.6)', justifyContent: 'center', alignItems: 'center' },
  listCard: { width: '80%', backgroundColor: '#1e1e1e', borderRadius: 12, borderWidth: 1, borderColor: '#444', overflow: 'hidden' },
  item: { flexDirection: 'row', paddingHorizontal: 15, alignItems: 'center', justifyContent: 'space-between', borderBottomWidth: 0.5, borderBottomColor: '#333' },
  selectedBg: { backgroundColor: '#1a1d3d' },
  itemText: { color: '#ccc', fontSize: 15 },
  selectedText: { color: '#4654eb', fontWeight: 'bold' },
});
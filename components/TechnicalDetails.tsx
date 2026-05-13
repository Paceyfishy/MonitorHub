import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

// รับ Props ข้อมูลสเปกและชื่อรุ่นของทั้งสองฝั่ง
interface TechnicalDetailsProps {
  leftSpecs: any;
  rightSpecs: any;
  leftName: string;
  rightName: string;
}

export default function TechnicalDetails({ 
  leftSpecs, 
  rightSpecs, 
  leftName, 
  rightName 
}: TechnicalDetailsProps) {
  
  // คอมโพเนนต์ย่อยสำหรับสร้างแถวข้อมูลแต่ละบรรทัด
  const SpecRow = ({ icon, label, left, right, highlight }: any) => (
    <View style={styles.specRow}>
      <View style={styles.labelCol}>
        <MaterialCommunityIcons name={icon} size={18} color="#4654eb" />
        <Text style={styles.labelText}>{label}</Text>
      </View>
      <Text style={styles.valText}>{left}</Text>
      <Text style={[styles.valText, highlight && styles.greenText]}>{right}</Text>
    </View>
  );

  return (
    <View style={styles.tableCard}>
      {/* ส่วนหัวข้อหลักของตาราง */}
      <Text style={styles.tableHeader}>Technical Details</Text>
      
      {/* ส่วน Header แสดงชื่อรุ่นมอนิเตอร์ (Model Name Header) */}
        <View style={styles.nameHeaderRow}>
            <View style={styles.labelCol} />
                <Text style={styles.modelNameText} numberOfLines={1}>
                    {leftName}
                </Text>
                <Text style={[styles.modelNameText, { color: 'white' }]} numberOfLines={1}>
                    {rightName}
                </Text>
        </View>

      {/* แถวข้อมูลสเปกต่างๆ ตามรูปตัวอย่าง */}
      <SpecRow 
        icon="currency-usd" 
        label="Price" 
        left={leftSpecs?.price} 
        right={rightSpecs?.price} 
      />
      <SpecRow 
        icon="monitor-screenshot" 
        label="Resolution" 
        left={leftSpecs?.res} 
        right={rightSpecs?.res} 
      />
      <SpecRow 
        icon="refresh" 
        label="Refresh Rate" 
        left={leftSpecs?.refresh} 
        right={rightSpecs?.refresh} 
        highlight={true} // ไฮไลท์สีเขียวในจุดที่เด่นกว่า
      />
      <SpecRow 
        icon="layers-outline" 
        label="Panel Type" 
        left={leftSpecs?.panel} 
        right={rightSpecs?.panel} 
      />
      <SpecRow 
        icon="arrow-expand-all" 
        label="Size" 
        left={leftSpecs?.size} 
        right={rightSpecs?.size} 
      />
      <SpecRow 
        icon="timer-outline" 
        label="Response" 
        left={leftSpecs?.response} 
        right={rightSpecs?.response} 
        highlight={true} 
      />
    </View>
  );
}

const styles = StyleSheet.create({
  tableCard: { 
    backgroundColor: '#1a1a1a', 
    marginHorizontal: 16, 
    borderRadius: 20, 
    padding: 20, 
    marginBottom: 30,
    // เพิ่มเงาให้ดูมีมิติเหมือนการ์ด
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
  },
  tableHeader: { 
    color: '#4654eb', 
    fontSize: 18, 
    fontWeight: 'bold', 
    marginBottom: 10 
  },
  nameHeaderRow: { 
    flexDirection: 'row', 
    paddingVertical: 12, 
    borderBottomWidth: 1, 
    borderBottomColor: '#333', 
    marginBottom: 5,
    alignItems: 'center'
  },
  modelNameText: { 
    flex: 1, 
    color: '#888', 
    textAlign: 'center', 
    fontSize: 12, 
    fontWeight: 'bold',
    paddingHorizontal: 4
  },
  specRow: { 
    flexDirection: 'row', 
    paddingVertical: 16, 
    borderBottomWidth: 1, 
    borderBottomColor: '#252525', 
    alignItems: 'center' 
  },
  labelCol: { 
    flex: 1.5, 
    flexDirection: 'row', 
    alignItems: 'center' 
  },
  labelText: { 
    color: '#888', 
    fontSize: 13, 
    marginLeft: 6 
  },
  valText: { 
    flex: 1, 
    color: 'white', 
    textAlign: 'center', 
    fontSize: 13 
  },
  greenText: { 
    color: '#28a745', 
    fontWeight: 'bold' 
  }
});
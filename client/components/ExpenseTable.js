import React from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';

export default function ExpenseTable({ data, onDelete }) {
  return (
    <View style={styles.container}>
      <View style={styles.tableHeader}>
        <Text style={[styles.cell, styles.bold]}>ID</Text>
        <Text style={[styles.cell, styles.bold]}>Name</Text>
        <Text style={[styles.cell, styles.bold]}>Price</Text>
        <Text style={[styles.cell, styles.bold]}>Action</Text>
      </View> 
      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}  

    renderItem={({ item }) => (
    <View style={styles.row}>
        <Text style={styles.cell}>{item.id}</Text>  
        <Text style={styles.cell}>{item.Item_name}</Text>
        <Text style={styles.cell}>
        ${item.Item_amount ? Number(item.Item_amount).toFixed(2) : "0.00"}
        </Text>
        <TouchableOpacity onPress={() => onDelete(item.id)}>
        <Text style={{ color: 'red', textAlign: 'center', paddingRight: 192 }}>Delete</Text>  
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onEdit(item.id)}>
        <Text style={{ color: 'blue', marginRight: 10 }}>Edit</Text>
        </TouchableOpacity>
        </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, marginTop: 10 },
  tableHeader: { flexDirection: 'row',backgroundColor: '#7ebdd4', paddingVertical: 12, borderRadius: 8, marginBottom: 10 },
  row: { flexDirection: 'row', backgroundColor: '#ffffff', paddingVertical: 12, marginVertical: 4, borderRadius: 8, alignItems: 'center', borderLeftColor: '#7ebdd4', borderLeftWidth: 4 },
  cell: { flex: 1, fontSize: 14, textAlign: 'center', paddingHorizontal: 2, color: '#34495e' },
  bold: { fontWeight: 'bold' }
});
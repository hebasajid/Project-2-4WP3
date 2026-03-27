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
          <View style={styles.tableRow}>
            <Text style={styles.cell}>{item.id}</Text>  
            <Text style={styles.cell}>{item.name}</Text>
           <Text style={styles.cell}>
            ${item.Item_amount ? Number(item.Item_amount).toFixed(2) : "0.00"}
          </Text>
            <TouchableOpacity onPress={() => onDelete(item.id)}>
            <Text style={{ color: 'red' }}>Delete</Text>  
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, marginTop: 10 },
  tableHeader: { flexDirection: 'row', borderBottomWidth: 2, paddingBottom: 5, marginBottom: 10 },
  row: { flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: '#eee', paddingVertical: 10, alignItems: 'center' },
  cell: { flex: 1, fontSize: 14 },
  bold: { fontWeight: 'bold' }
});
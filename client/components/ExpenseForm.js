import React from 'react';
import { StyleSheet, View, TextInput, Button } from 'react-native';

export default function ExpenseForm({ inputs, setInputs, onAdd }) {
  return ( 
    <View style={styles.formContainer}>
      <TextInput style={styles.input} placeholder="Date (YYYY-MM-DD)" value={inputs.date} onChangeText={(val) => setInputs({...inputs, date: val})} /> 
      <TextInput style={styles.input} placeholder="Amount" value={inputs.amount} onChangeText={(val) => setInputs({...inputs, amount: val})} keyboardType="numeric" />
      <TextInput style={styles.input} placeholder="Item Name" value={inputs.name} onChangeText={(val) => setInputs({...inputs, name: val})} />
      <TextInput style={styles.input} placeholder="Category" value={inputs.category} onChangeText={(val) => setInputs({...inputs, category: val})} />
      <Button title="Add Expense" onPress={onAdd} /> 
    </View>
  );
}

const styles = StyleSheet.create({
  formContainer: { marginBottom: 30, padding: 20, backgroundColor: '#ffffff', borderRadius: 15,
    shadowColor: '#000',shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 3},
  input: { borderBottomWidth: 1, borderBottomColor: '#2c3e50', marginBottom: 15, padding: 10, fontSize: 16 }
});


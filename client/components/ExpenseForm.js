import React from 'react';
import { StyleSheet, View, TextInput, Button } from 'react-native';

export default function ExpenseForm({ inputs, setInputs, onAdd }) {
  return ( 
    <View style={styles.formContainer}>
      <TextInput style={styles.input} placeholder="Date (YYYY-MM-DD)" value={inputs.date} onChangeText={(val) => setInputs({...inputs, date: val})} /> // Input for date
      <TextInput style={styles.input} placeholder="Amount" value={inputs.amount} onChangeText={(val) => setInputs({...inputs, amount: val})} keyboardType="numeric" />
      <TextInput style={styles.input} placeholder="Item Name" value={inputs.name} onChangeText={(val) => setInputs({...inputs, name: val})} />
      <TextInput style={styles.input} placeholder="Category" value={inputs.category} onChangeText={(val) => setInputs({...inputs, category: val})} />
      <Button title="Add Expense" onPress={onAdd} /> // Button to add expense
    </View>
  );
}
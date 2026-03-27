import React, { useState, useEffect } from 'react'; 
import { StyleSheet, Text, View, Alert } from 'react-native';
import ExpenseForm from './components/ExpenseForm'; //importing form and table components to  use in  app component
import ExpenseTable from './components/ExpenseTable';

export default function App() {
  //input states for the form fields into one object
  const [inputs, setInputs] = useState({
    date: '',
    amount: '',
    name: '',
    category: ''
  }); 

  //state for storing the list of expenses fetched from  API
  const [expenses, setExpenses] = useState([]);

  const API_URL = 'http://localhost:3000/api';

  //GET all espenses
  const fetchExpenses = async () => {
    try {
      const response = await fetch(API_URL); //fetching all expenses from  API endpoint
      const data = await response.json(); //parsing response as json
      setExpenses(data); //
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  useEffect(() => { 
    fetchExpenses(); 
  }, []);

  //POST new expense:

  const addExpense = async () => { //function to add expense by sending POST request to api
    if (!inputs.date || !inputs.amount || !inputs.name || !inputs.category) {
      Alert.alert("Error", "Please fill all fields");
      return;
    }

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }, //
        body: JSON.stringify({
          Item_date: inputs.date,
          Item_amount: parseFloat(inputs.amount), //turning string into number
          Item_name: inputs.name,
          Item_category: inputs.category
        }),
      });
      const result = await response.json(); //parsing response as json
      console.log(result.status);
      
      //clearing form fields after submission and refreshing list of expns
      setInputs({
        date: '',
        amount: '',
        name: '',
        category: ''
      });
      fetchExpenses(); 
    } catch (error) {
      console.error("Add error:", error);
    }
  };

  //DELETE expense by id:

  const deleteExpense = async (id) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, { //sending delete request to API endpoint w specific ID
        method: 'DELETE',
      });
      const result = await response.json();
      console.log(result.status);
      
      //refreshing list after deleting
      fetchExpenses(); 
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  
return (
    <View style={styles.container}> 
      <Text style={styles.header}>Expense Tracker</Text> 
      <ExpenseForm inputs={inputs} setInputs={setInputs} onAdd={addExpense} /> 
      <ExpenseTable data={expenses} onDelete={deleteExpense} /> 
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, paddingTop: 60, backgroundColor: '#fff' }, //main container style
  header: { fontSize: 22, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' } //header text style
});




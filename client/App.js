import React, { useState, useEffect } from 'react'; 
import { StyleSheet, Text, View, Alert, Button } from 'react-native';
import ExpenseForm from './components/ExpenseForm.js'; //importing form and table components to  use in  app component
import ExpenseTable from './components/ExpenseTable.js';

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

  //state to track editing move and id of expense being edited:
  const [editingId, setEditingId] = useState(null);

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

 const saveExpense = async () => {
  const method = editingId ? 'PUT' : 'POST'; //if editingId exists, we are updating to use PUT, otherwise creating post request
  const url = editingId ? `${API_URL}/${editingId}` : API_URL; 

  try {
    await fetch(url, {
      method: method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        Item_date: inputs.date,
        Item_amount: parseFloat(inputs.amount), //converting amount to number
        Item_name: inputs.name,
        Item_category: inputs.category
      }),
    });

    setEditingId(null); //clearing edit mode
    setInputs({ date: '', amount: '', name: '', category: '' });
    fetchExpenses(); //refresjing list after adding and updating
  } catch (error) {
    console.error("Save error:", error);
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

 const deleteAllExpenses = async () => {
  console.log("DELETE BUTTON CLICKED!");
  
  try {
    // 1. Send the command to the server
    const response = await fetch(API_URL, { 
      method: 'DELETE' 
    }); 
    
    // 2. Wait for the server to say "I'm done"
    const result = await response.json();
    console.log("Server says:", result.status);
    
    // 3. ONLY THEN refresh the UI
    fetchExpenses(); 
    
  } catch (error) {
    console.error("Network Error:", error);
  }
};

//function to handle editing an expense:
const handleEdit = async (id) => {
  try {
    //getting one item's data from API to pre-fill the form for editing:
    const response = await fetch(`${API_URL}/${id}`);
    const item = await response.json();
    
    //filling form w data of the item
    setInputs({
      date: item.Item_date,
      amount: item.Item_amount.toString(),
      name: item.Item_name,
      category: item.Item_category
    });
    setEditingId(id); //setting editingID
  } catch (error) {
    console.error("Edit load error:", error);
  }
};
  
return (
    <View style={styles.container}> 
      <Text style={styles.header}>My Personal Expense Tracker</Text> 
      <ExpenseForm inputs={inputs} setInputs={setInputs} onAdd={saveExpense} isEditing={!!editingId} /> 
      <ExpenseTable data={expenses} onDelete={deleteExpense} onEdit={handleEdit} /> 
      <Button title="Clear all Expenses" color="red" onPress={deleteAllExpenses} />
     
    </View>
  );
}

const styles = StyleSheet.create({
  container: 
  { flex: 1, 
    padding: 20,
    paddingTop: 40,
    backgroundColor: '#cdf9e7' }, //main container style
    
  header: { fontSize: 45, fontWeight: 'bold', marginBottom: 20, textAlign: 'center', color: '#2c3e50' } //header text style
});




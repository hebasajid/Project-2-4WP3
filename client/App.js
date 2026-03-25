import React, { useState, useEffect } from 'react';
import { 
  StyleSheet, Text, View, TextInput, Button,  //importing necessary components from react native
  FlatList, ScrollView, TouchableOpacity, Alert 
} from 'react-native';

export default function App() {
  //input states for the form fields
  const [date, setDate] = useState(''); //state for date input field
  const [amount, setAmount] = useState(''); 
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');  

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
    if (!date || !amount || !name || !category) {
      Alert.alert("Error", "Please fill all fields");
      return;
    }

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }, //
        body: JSON.stringify({
          Item_date: date,
          Item_amount: parseFloat(amount), //turning string into number
          Item_name: name,
          Item_category: category
        }),
      });
      const result = await response.json(); //parsing response as json
      console.log(result.status);
      
      //clearing form fields after submission and refreshing list of expns
      setDate(''); setAmount(''); setName(''); setCategory('');
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
}
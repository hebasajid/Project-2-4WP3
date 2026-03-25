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


}
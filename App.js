import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import { Text, Title } from 'react-native-paper';
import axios from 'axios';

export default function App() {
  const axios = require('axios');
  const [newsArticles, setNewsArticles] = useState([])

  useEffect(() => {
    axios.get('http://newsapi.org/v2/top-headlines?country=ph&apiKey=2e938b7bf1464889907ef4f0e99a19da')
    .then(function (response) {
      // handle success
      return response.data
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
    .then(function (data) {
      // always executed
      console.log(data.articles)
      setNewsArticles(data.articles)
    });
    
  }, [])

  return (
    <SafeAreaView style={styles.container}>
      <Title>React Native News</Title>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
});

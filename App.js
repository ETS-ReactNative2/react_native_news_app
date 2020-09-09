import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, View, Text, FlatList, TouchableOpacity } from 'react-native';
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';
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
      <Title style={styles.heading}>React Native News</Title>
      <FlatList
        data={newsArticles}
        keyExtractor={(item) => item.title}
        renderItem={({ item, key }) => {
          let date = new Date(item.publishedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric' }).replace(',', '');
          return (
            <>
              <Card style={styles.listItemStyle}>
              <Card.Title
                title={item.source.name}
                subtitle={date}
                left={(props) => <Avatar.Icon {...props} icon="card-bulleted-outline" backgroundColor='#0390fc'/>}
              />
                <Card.Content>
                  <Title>{item.title}</Title>
                  <Paragraph>
                  {item.description}
                  </Paragraph>
                </Card.Content>
                {
                  item 
                  ? <Card.Cover source={{ uri: item.urlToImage }} />
                  : <Card.Cover source={{ uri: 'https://picsum.photos/700' }} />
                }
              </Card>
              <View style={{borderBottomColor:'black', borderWidth:1 }} />
            </>
          );
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 10,
    // borderColor: 'red',
    // borderWidth: 1,
    backgroundColor: '#fff',
    alignItems: 'stretch',
    justifyContent: 'flex-start',
  },
  heading: {
    fontSize: 30,
  },
  listItemStyle: {
    margin: 10,
  },
});

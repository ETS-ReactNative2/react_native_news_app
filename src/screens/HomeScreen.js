import React, { useState, useEffect } from 'react';
import { StyleSheet, RefreshControl, } from 'react-native';
import { Title } from 'react-native-paper';
import { StatusBar } from 'expo-status-bar';
import axios from 'axios';
import NewsList from '../components/NewsList';

import { SafeAreaView } from 'react-native-safe-area-context';

const wait = (timeout) => {
  return new Promise(resolve => {
    setTimeout(resolve, timeout);
  });
}

const HomeScreen = ({ navigation }) => {
    const axios = require('axios');
    const [newsArticles, setNewsArticles] = useState([])

    const [refreshing, setRefreshing] = React.useState(false);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        fetchNews();
    }, []);

    const fetchNews = () => {
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
            setRefreshing(false)
        });
    }
  
    useEffect(() => {
        fetchNews();
    }, [])

    return (
        <SafeAreaView style={styles.container}>
        <StatusBar style="light" animated />
        <Title style={styles.heading}>React Native News</Title>
        <NewsList 
            refreshing={refreshing}
            onRefresh={onRefresh}
            data={newsArticles}
            onNewsPressed={(news) => navigation.navigate('NewsWebview', { news })}
        />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#156ba3',
      alignItems: 'stretch',
      justifyContent: 'flex-start',
    },
    heading: {
      marginLeft: 10,
      marginTop: 20,
      fontSize: 30,
      color:'white',
    },
});

export default HomeScreen;
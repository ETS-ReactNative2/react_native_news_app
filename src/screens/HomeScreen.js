import React, { useState, useEffect } from 'react';
import { View, StyleSheet, RefreshControl, ImageBackground, Image } from 'react-native';
import { Text, ActivityIndicator, Title } from 'react-native-paper';
import { StatusBar } from 'expo-status-bar';
import axios from 'axios';
import NewsList from '../components/NewsList';

import { SafeAreaView } from 'react-native-safe-area-context';
import { FlatList } from 'react-native-gesture-handler';

const categoryList = [
    {id:'1',category:'Latest'},
    {id:'2',category:'Technology'},
    {id:'3',category:'Science'},
    {id:'4',category:'Health'},
    {id:'5',category:'Business'},
    {id:'6',category:'Sports'},
    {id:'7',category:'Entertainment'}
]

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
            <ImageBackground source={require('../../assets/bg.jpg')} style={styles.bgImage}>
                <View style={{ backgroundColor: 'rgba(0,0,0,0.5)', flex:1 }}>
                    <View>
                        <Title style={styles.heading}>React Native News</Title>
                        <Text style={styles.subHeading}>Categories</Text>
                        <FlatList 
                            style={{margin:10}}
                            showsHorizontalScrollIndicator={false}
                            horizontal={true}
                            data={categoryList}
                            keyExtractor={(item) => item.id}
                            renderItem={({ item, index }) => {
                                return (
                                    <View style={{ backgroundColor: '#0390fc', flex:1, borderRadius: 20, marginRight: 10, padding: 10 }}>
                                        <Text style={{color:'white', fontWeight:'bold'}}>{item.category}</Text>
                                    </View>
                                );
                            }}
                        />
                    </View>
                    <View style={{marginTop: 5, flex:1, alignItems:'center', justifyContent:'center'}}>
                        <NewsList 
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                            // data={[]}
                            data={newsArticles}
                            onNewsPressed={(news) => navigation.navigate('NewsWebview', { news })}
                            ListEmptyComponent={<ActivityIndicator size="large" animating={true} color={'#fff'} />}
                        />
                    </View>
                </View>
            </ImageBackground>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'rgba(0,0,0,0.8)',
      alignItems: 'stretch',
      justifyContent: 'flex-start',
    },
    heading: {
      marginLeft: 10,
      marginTop: 20,
      fontSize: 30,
      color:'white',
    },
    subHeading: {
      marginLeft: 10,
      marginTop: 5,
      fontSize:16,
      color:'white',
    },
    bgImage: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center",
        tintColor: '#0000',
    },
});

export default HomeScreen;
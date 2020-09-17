import React, { useState, useEffect } from 'react';
import { View, StyleSheet, RefreshControl, ImageBackground, TouchableOpacity } from 'react-native';
import { Text, ActivityIndicator, Title } from 'react-native-paper';
import { StatusBar } from 'expo-status-bar';

import NewsList from '../components/NewsList';

import { SafeAreaView } from 'react-native-safe-area-context';
import { FlatList } from 'react-native-gesture-handler';

import NEWS_API from '../api/news_api';

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
    const [newsArticles, setNewsArticles] = useState([]);
    const [currentCategory, setCurrentCategory] = useState(categoryList[0].category)

    const [refreshing, setRefreshing] = React.useState(false);

    const onRefresh = React.useCallback((current_category) => {
        fetchNews({ category: current_category });
    }, []);

    const fetchNews = async ({
        endpoint='top-headlines', 
        language='en',   
        country='ph', 
        category='general'
        } = {}) => {
        setRefreshing(true);

        let requestURL = `${endpoint}?language=${language}&country=${country}&category=${category}`;
        
        let data = await NEWS_API.getNews(requestURL)
        setNewsArticles(data.articles)
        setRefreshing(false)
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
                                    <TouchableOpacity 
                                        style={{ backgroundColor: '#0390fc', flex:1, borderRadius: 20, marginRight: 10, padding: 10 }}
                                        onPress={() => {
                                            if(item.category === 'Latest') {
                                                setCurrentCategory('')
                                                fetchNews()
                                            }
                                            else {
                                                setCurrentCategory(item.category.toLowerCase())
                                                fetchNews({category:item.category.toLowerCase()});
                                            }
                                        }}
                                    >
                                        <Text style={{color:'white', fontWeight:'bold'}}>{item.category}</Text>
                                    </TouchableOpacity>
                                );
                            }}
                        />
                    </View>
                    <View style={{marginTop: 5, flex:1, alignItems:'center', justifyContent:'center'}}>
                        <NewsList 
                            refreshing={refreshing}
                            onRefresh={()=>onRefresh(currentCategory)}
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
import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, View, Text, FlatList, TouchableOpacity } from 'react-native';
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';

const NewsList = ({ data, onNewsPressed, onRefresh, refreshing, ...other }) => {
    return (
        <FlatList
            { ...other }
            refreshing={refreshing}
            onRefresh={onRefresh}
            data={data}
            keyExtractor={(item) => item.title}
            renderItem={({ item, key }) => {
            let date = new Date(item.publishedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric' }).replace(',', '');
            return (
                <TouchableOpacity onPress={() => onNewsPressed(item)}>
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
                    item.urlToImage 
                    ? <Card.Cover source={{ uri: item.urlToImage }} />
                    : null
                    }
                </Card>
                </TouchableOpacity>
            );
            }}
        />
    );
};

const styles = StyleSheet.create({
    listItemStyle: {
        margin: 10,
    },
})


export default NewsList;

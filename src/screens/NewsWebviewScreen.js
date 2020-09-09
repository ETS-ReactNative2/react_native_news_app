import React, { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';

const NewsWebviewScreen = ({ route, navigation }) => {
    const { url } = route.params.news;

    return (
        <WebView source={{ uri: url }} />
    );
};

const styles = StyleSheet.create({
    
});

export default NewsWebviewScreen;


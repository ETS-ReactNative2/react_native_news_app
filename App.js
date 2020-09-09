import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';

// Import navigators
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Import screens
import HomeScreen from './src/screens/HomeScreen';
import NewsWebviewScreen from './src/screens/NewsWebviewScreen';

const HomeStack = createStackNavigator();

function HomeStackScreen() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen 
        name="Home" 
        component={HomeScreen} 
        options={{
          headerShown: false
        }}
      />
      <HomeStack.Screen 
        name="NewsWebview" 
        component={NewsWebviewScreen}
        options={({ route }) => ({ title: 'News Reader' })}
      />
    </HomeStack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator 
        initialRouteName="News/Media"
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'News/Media') {
              iconName = focused
                ? 'newspaper'
                : 'newspaper'; 
            } else if (route.name === 'Wordpress') {
              iconName = focused ? 'wordpress' : 'wordpress-simple'
            }

            // You can return any component that you like here!
            return <FontAwesome5 name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: '#156ba3',
          inactiveTintColor: 'gray',
        }}
      >
        <Tab.Screen name="News/Media" component={HomeStackScreen} />
        <Tab.Screen name="Wordpress" component={HomeStackScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};




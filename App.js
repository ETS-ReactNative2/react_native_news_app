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
        <Tab.Screen name="News/Media" component={HomeScreen} />
        <Tab.Screen name="Wordpress" component={HomeScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}



/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from './app/screens/Home';
import Details from './app/screens/Details';
import NavBar from './app/components/NavBar';

const Stack = createNativeStackNavigator();

const App = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    name="Home"
                    component={Home}
                    options={{
                        headerTransparent: true,
                        headerTintColor: '#fff',
                        headerTitle: '',
                        headerBackVisible: false,
                        headerShadowVisible: false,
                    }}
                />
                <Stack.Screen
                    name="Details"
                    component={Details}
                    options={{
                        headerTransparent: true,
                        headerTintColor: '#fff',
                        headerTitle: '',
                        headerBackVisible: true,
                        headerShadowVisible: false,
                    }}
                />
            </Stack.Navigator>
        </NavigationContainer>
        // <Home />
    );
};

export default App;

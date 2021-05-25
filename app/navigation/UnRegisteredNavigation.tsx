import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import SplashScreen from '../screens/Splash/SplashScreen';

const Stack = createStackNavigator();

function RootStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="SplashScreen"
        component={SplashScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}

export default function unRegisteredNavigation() {
  return (
    <NavigationContainer>
      <RootStack />
    </NavigationContainer>
  );
}

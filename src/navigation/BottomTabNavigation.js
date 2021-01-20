import React, {Component} from 'react';
import { createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import Home from '../components/Home/Home';
import Profile from '../components/Profile/Profile';
import {NavigationContainer} from '@react-navigation/native'
import Settings from '../components/Settings/Settings'
import Icon from 'react-native-vector-icons/Ionicons';
const BottomTabNavigation = createBottomTabNavigator();


const Bottom= ()=>{
    return(
        <NavigationContainer>
            <BottomTabNavigation.Navigator>
                <BottomTabNavigation.Screen
                name='home'
                component={Home}
                options={{
                    tabBarLabel: 'Home',
                    tabBarIcon: ({ color}) => (
                        <Icon name="home" color={color} size={25}/>  
                    ),
                  }}
                />

                <BottomTabNavigation.Screen
                name='profile'
                component={Profile}
                options={{
                    tabBarLabel: 'Profile',
                    tabBarIcon: ({ color}) => (
                        <Icon name="ios-person-outline" color={color} size={25}/>  
                    ),
                  }}/>

                <BottomTabNavigation.Screen
                name='settings'
                component={Settings}
                options={{
                    tabBarLabel: 'Settings',
                    tabBarIcon: ({ color}) => (
                        <Icon name="ios-settings-outline" color={color} size={25}/>  
                    ),
                  }}
                />
            </BottomTabNavigation.Navigator>
        </NavigationContainer>
    )
}
export default Bottom
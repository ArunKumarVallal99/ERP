import React, {Component} from 'react';
import { createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import Home from '../components/Home/Home';
import Profile from '../components/Profile/Profile';
import {NavigationContainer} from '@react-navigation/native'
const BottomTabNavigation = createBottomTabNavigator();


const Bottom= ()=>{
    return(
        <NavigationContainer>
            <BottomTabNavigation.Navigator>
                <BottomTabNavigation.Screen
                name='home'
                component={Home}
                />

                <BottomTabNavigation.Screen
                name='profile'
                component={Profile}/>
            </BottomTabNavigation.Navigator>
        </NavigationContainer>
    )
}
export default Bottom
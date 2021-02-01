import React from 'react';
import { createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import Profile from '../views/Profile/Profile';
import {NavigationContainer} from '@react-navigation/native'
import Settings from '../views/Settings/Settings'
import Icon from 'react-native-vector-icons/Ionicons';
import {Image  } from "react-native";
import Home from "../views/Home/Home";
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
                        // <Icon name="home" color={color} size={25}/>  
                        <Image
                        style={{height:20,width:20}}
                        source={require('../assets/Images/home.png')}
                        />
                        ),
                  }}
                />

                <BottomTabNavigation.Screen
                name='profile'
                component={Profile}
                options={{
                    tabBarLabel: 'Profile',
                    tabBarIcon: ({ color}) => (
                        <Image
                        style={{height:22,width:20}}
                        source={require('../assets/Images/profile.png')}
                        />
                        //<Icon name="ios-person-outline" color={color} size={25}/>  
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
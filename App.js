import { BottomTabBar } from '@react-navigation/bottom-tabs';
import React, { Component } from 'react'
import {View,Text} from 'react-native';
import SplashScreen from 'react-native-splash-screen'
import Bottom from './src/navigation/BottomTabNavigation';
import BottomTabNavigation from './src/navigation/BottomTabNavigation'
class App extends Component{
  componentDidMount() {
    // do stuff while splash screen is shown
      // After having done stuff (such as async tasks) hide the splash screen
      SplashScreen.hide();
  }

  render(){
    return(
    <Bottom/>
      )
  }
}
export default App;

// import { BottomTabBar } from '@react-navigation/bottom-tabs';
import React, { Component } from 'react'
import {View,Text} from 'react-native';
import Login from './src/views/Login/Login';
import PermissionApply from './src/views/PermissionApply/PermissionApply';

import SplashScreen from 'react-native-splash-screen'
import Bottom from './src/navigation/BottomTabNavigation';
// import BottomTabNavigation from './src/navigation/BottomTabNavigation';
import ChangePassword from './src/views/Change password/ChangePassword';

class App extends Component{
  
  componentDidMount() {
    SplashScreen.hide();
  }

  render(){
    return(
        <Bottom/>
       /* <Login/> 
    /* <ChangePassword/> */
    //  <PermissionApply />
   
      )
  }
}
export default App;

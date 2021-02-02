
import React, { Component } from 'react'
import {View,Text} from 'react-native';
import Login from './src/views/Login/Login';
import SplashScreen from 'react-native-splash-screen'
import Bottom from './src/navigation/Bottom';
import PermissionApply from './src/views/PermissionApply/PermissionApply';
class App extends Component{
  
  componentDidMount() {
    SplashScreen.hide();
  }

  render(){
    return(
        // <Bottom/>
        //  <Login />  
         <PermissionApply />
   
      )
  }
}
export default App;

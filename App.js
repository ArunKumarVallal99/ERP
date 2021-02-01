
import React, { Component } from 'react'
import {View,Text} from 'react-native';
import Login from './src/views/Login/Login';
import PermissionApply from './src/views/PermissionApply/PermissionApply';

import SplashScreen from 'react-native-splash-screen';
import Bottom from './src/navigation/Bottom';

import ChangePassword from './src/views/Change password/ChangePassword';

class App extends Component{
  
  componentDidMount() {
    SplashScreen.hide();
  }

  render(){
    return(
        // <Bottom/>
        // <Login/> 
    /* <ChangePassword/> */
    //  <PermissionApply />
      <Login/>
    /* <ChangePassword/> */
     //<PermissionApply />
   
      )
  }
}
export default App;

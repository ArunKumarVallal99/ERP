
import React, { Component } from 'react'
import {View,Text} from 'react-native';
import Login from './src/views/Login/Login';
import PermissionApply from './src/views/PermissionApply/PermissionApply';
<<<<<<< HEAD

import SplashScreen from 'react-native-splash-screen'
import Bottom from './src/navigation/BottomTabNavigation';
// import BottomTabNavigation from './src/navigation/BottomTabNavigation';
=======
import SplashScreen from 'react-native-splash-screen'
import Bottom from './src/navigation/Bottom';
>>>>>>> af692a12168b6a603d46223c0f0759240c99294e
import ChangePassword from './src/views/Change password/ChangePassword';

class App extends Component{
  
  componentDidMount() {
    SplashScreen.hide();
  }

  render(){
    return(
        <Bottom/>
<<<<<<< HEAD
       /* <Login/> 
    /* <ChangePassword/> */
    //  <PermissionApply />
=======
      // <Login/>
    /* <ChangePassword/> */
     //<PermissionApply />
>>>>>>> af692a12168b6a603d46223c0f0759240c99294e
   
      )
  }
}
export default App;

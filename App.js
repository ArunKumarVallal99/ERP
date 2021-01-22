// import { BottomTabBar } from '@react-navigation/bottom-tabs';
import React, { Component } from 'react'
import {View,Text} from 'react-native';
import Login from './src/views/Login/Login';
// import Forgotpassword from './src/views/Forgot Password/ForgotPassword';
// import Password from './src/views/Change password/ChangePassword';
// import SplashScreen from 'react-native-splash-screen'
// import Bottom from './src/navigation/BottomTabNavigation';
// import BottomTabNavigation from './src/navigation/BottomTabNavigation';

class App extends Component{
  
  // componentDidMount() {
  //   SplashScreen.hide();
  // }

  render(){
    return(
      // <Bottom/>
      <Login/>
      // <Password />
      // <Forgotpassword />
      )
  }
}
export default App;

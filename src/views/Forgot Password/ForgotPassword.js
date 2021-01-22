import React, { Component } from 'react';
import {Text, View, StyleSheet, TextInput, TouchableOpacity, Alert} from 'react-native';
// import styles from '../Login/Style';
// import styles from '../Login/Style';

export default class Forgotpassword extends Component{
    render(){
        return(
            <View style={styles.container}>
             <View style={styles.inputcontainer}>
                 <Text style={styles.password}>Please enter your office email to update your password</Text>
             </View>
            </View>

        )
    }
}
const styles=StyleSheet.create({
    container:{
        flex: 1,
        // padding: 0,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:'#fff'
    },
    inputcontainer:{
        backgroundColor:'#D3D3D3',
    width:320,
    height:250
    },
    password:{
        fontSize:20
    }
})
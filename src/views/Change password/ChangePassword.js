import React, { Component } from 'react';
import {Text, View, StyleSheet, TextInput, TouchableOpacity, Alert} from 'react-native';
import styles from '../Change password/Styles'


export default class ChangePassword extends Component{
    state={
        CurrentPasswordValue:'',
        NewPasswordValue:'',
        ConfirmPasswordValue:'',

    };
    validation=()=>{
        const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if(!this.state.CurrentPasswordValue.trim()){
            console.log('Enter Your OldPassword')
            Alert.alert('Enter Your Oldpassword')
        }
        else if(reg.test(this.CurrentPasswordValue)){
            Alert.alert("Invalid Password")
          }
          else if(!this.state.NewPasswordValue.trim()){
            console.log('Enter NewPassword')
            Alert.alert('Type Your Newpassword')
        } 
        else if(!this.state.ConfirmPasswordValue.trim()){
            console.log('Retype NewPassword')
            Alert.alert('Retype Your Newpassword')
        } 
        else{
            alert('Your Password has been successfully changed')
        }
    }
    render(){
        return(
            <View style={styles.container}>
             <Text style={styles.toptext}>Change Password</Text>
                <View style={styles.inputcontainer}>
                    <Text style={styles.text}>Old Password</Text>

                    <View style={styles.inputview}>
                        <TextInput style={styles.inputtext}
                        keyboardType='visible-password'
                        placeholder='Current Password'
                        textContentType='password'
                        secureTextEntry={true}
                        onChangeText={text=>this.setState({CurrentPasswordValue:text})}
                         />
                         </View>
                        {/* <Text>Fiii</Text> */}
                        {/* // underlineColorAndroid='grey' /> */}

                   
                     <View style={styles.Newview}>
                     <Text style={styles.text}>New Password</Text>
                      <TextInput style={styles.inputtext}
                        keyboardType='visible-password'
                        placeholder='Enter NewPassword'
                        textContentType='password'
                        secureTextEntry={true} 
                        onChangeText={text=>this.setState({NewPasswordValue:text})}
                        />
                        
                        <View style={styles.inputview}>
                        <Text style={styles.text}>Confirm NewPassword</Text>
                        <TextInput style={styles.inputtext}
                        keyboardType='visible-password'
                        placeholder='Re-type NewPassword'
                        textContentType='password'
                        secureTextEntry={true} 
                        onChangeText={text=>this.setState({ConfirmPasswordValue:text})}
                        />

                        </View>
                        <View style={styles.buttonView}>
                           <TouchableOpacity style={styles.button}
                             onPress={this.validation} >
                             <Text style={styles.buttonText}>Submit</Text>
                           </TouchableOpacity>
                         </View> 

                    </View>
                </View>

            </View>
        )
    }
}


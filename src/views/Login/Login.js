import React, { Component } from 'react';
import { Text, View, StyleSheet, TextInput, TouchableOpacity, Alert} from 'react-native';
import styles from './Style';

export default class Login extends Component{
    state = {
        email:'',
        passwordValue:''
    };

    validation=()=>{
        const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if(!this.state.email.trim()){
            console.log('Missing email')
            Alert.alert('Missing email')
        }
        else if(reg.test(this.state.email)){
            Alert.alert("Invalid Email ID")
          } 
          else if(!this.state.passwordValue.trim()){
            console.log("Missing Password")
            Alert.alert("Missing Password")
          }
       
    }
    
    render(){
        return(
            <View style={styles.container}>
                <View style={styles.inputcontainer}>
                    <Text style={styles.text}>Email</Text>

                    <View style={styles.inputview}>
                        <TextInput style={styles.inputtext}
                        keyboardType='visible-password'
                        placeholder='optisolbusiness@gmail.com'
                        textContentType='password'
                        secureTextEntry={true}
                        onChangeText={text=>this.setState({email:text})} />
                        {/* <Text>Fiii</Text> */}
                        {/* // underlineColorAndroid='grey' /> */}
                    </View>

                    <Text style={styles.text}>Password</Text>
                     <View style={styles.inputview}>
                      <TextInput style={styles.inputtext}
                        keyboardType='visible-password'
                        placeholder='optisolbusiness'
                        textContentType='password'
                        secureTextEntry={true} 
                        onChangeText={text=>this.setState({passwordValue: text})}
                        />
                        <TouchableOpacity>
                        <Text style={styles.forg}>Forgot Password.?</Text>
                        </TouchableOpacity>
                        {/* // underlineColorAndroid='grey' /> */}
                     </View>
                    <View style={styles.buttonView}>
                    <TouchableOpacity style={styles.button}
                            onPress={this.validation} >
                    <Text style={styles.buttonText}>Sign In</Text>
                    </TouchableOpacity>
                    </View> 

                </View>
                {/* <View style={styles.userLogin}>
              <Text style={styles.user}>If Any Problem.?</Text>
              <TouchableOpacity onPress={()=>Alert.alert('Redirecting to Register Page - Please Wait')}>             
                <Text style={styles.joinus}> Contact Us</Text>
              </TouchableOpacity>
               </View> */}

            </View>
        )
    }
}


import React, { Component } from 'react';
import { Text, View, StyleSheet, TextInput, TouchableOpacity, Alert} from 'react-native';
import styles from './Style';

export default class Login extends Component{
    state={
        email:''
    };

    validation=()=>{
        const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        // if(!this.state.email.trim()){
        //     console.log('missing email')
        //     Alert.alert('missing email')
        // }
        // else if(reg.test(this.state.email)=== false){
        //     Alert.alert("Invalid Email ID")
        //   } 
    //     if (reg.test(this.state.email) === true){
    //         alert('valid');
    //     }
    //     else{
    //         alert();
    //     }
    // }
    // onLogin() {
    //     const { username} = this.state;
    
    //     Alert.alert('Credentials', `${username} `);
    //   }
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
                        onChangeText={text=>this.setState({emailValue:text})} />
                        {/* <Text>Fiii</Text> */}
                        {/* // underlineColorAndroid='grey' /> */}
                    </View>

                    <Text style={styles.text}>Password</Text>
                     <View style={styles.inputview}>
                      <TextInput style={styles.inputtext}
                        keyboardType='visible-password'
                        placeholder='optisolbusiness'
                        textContentType='password'
                        secureTextEntry={true} />
                        <Text style={styles.forg}>Forgot Password.?</Text>
                        {/* // underlineColorAndroid='grey' /> */}
                     </View>
                    <View style={styles.buttonView}>
                    <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>Sign In</Text>
                    </TouchableOpacity>
                    </View> 

                </View>
                <View style={styles.userLogin}>
              <Text style={styles.user}>If Any Problem.?</Text>
              <TouchableOpacity onPress={()=>Alert.alert('Redirecting to Register Page - Please Wait')}>             
                <Text style={styles.joinus}> Contact Us</Text>
              </TouchableOpacity>
               </View>

            </View>
        )
    }
}


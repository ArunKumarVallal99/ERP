import React, { Component } from 'react';
import { Text, View, StyleSheet, TextInput, TouchableOpacity, Alert, Modal, Image } from 'react-native';
import styles from './Style';

export default class Login extends Component{
    state = {
        email:'',
        passwordValue:'',
        show:false,
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
          else{
              alert('You have been Successfully Login')
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
                     <View style={styles.inputviewpassword}>
                     
                      <TextInput style={styles.inputtextpassword}
                        keyboardType='visible-password'
                        placeholder='optisolbusiness'
                        textContentType='password'
                        secureTextEntry={true} 
                        onChangeText={text=>this.setState({passwordValue: text})}
                        />
                        <TouchableOpacity>
                        <Image style={styles.image}
                     source={require('../../assets/Images/password.png')} />
                     </TouchableOpacity>
                        <TouchableOpacity
                        onPress={()=>{this.setState({show:true})}}>
                        <Modal
                           transparent={true}
                           visible={this.state.show}>
                          <View style={styles.viewforgot}>
                            <View style={styles.fotgot}>
                             <Text style={styles.textforgot}>Forgot Password.?</Text>
       
                       
                              <View style={styles.inputview}>
                              <Text style={styles.mailid}>please enter your office email to update your password</Text>
                                  <TextInput style={styles.passwordtext}
                                   keyboardType='visible-password'
                                   placeholder='optisolbusiness'
                                   textContentType='password'
                                   secureTextEntry={true} 
                               
                        />
              </View>
              <View style={styles.update}>
                  <TouchableOpacity style={styles.reset}
                  onPress={()=>{this.setState({show:false})}}>
                      <Text style={styles.resetpassword}>Reset Password</Text>
                  </TouchableOpacity>
              </View>
         </View>
        
         </View>
         
        </Modal>
                       
                        </TouchableOpacity>
                        {/* // underlineColorAndroid='grey' /> */}
                     </View>
                     <View style={styles.for}>
                     <TouchableOpacity
                        onPress={()=>{this.setState({show:true})}}>
                        <Text style={styles.forg}>Forgot Password.?</Text>
                        </TouchableOpacity>
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


import React, { Component } from 'react';
import { Text, View, StyleSheet, TextInput, TouchableOpacity} from 'react-native';

export default class Login extends Component{
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
                        secureTextEntry={true} />
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
                        <Text style={styles.forg}>ForgotPassword</Text>
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

const styles=StyleSheet.create({
    container:{
        padding:20,
        flex:1,
        justifyContent:'center'
    },
    inputcontainer:{
        padding:40,
        justifyContent:'center',
        // alignItems:'center'
    },
    text:{
        fontSize:20,
        fontWeight:'bold',
        paddingBottom:5,
        marginRight:10,
    },
    inputview:{
        paddingBottom:30
    },
    inputtext:{
        // flex:1,
        height:50,
        width:320,
        // borderColor:'grey',
        // borderBottomWidth:1,
        backgroundColor:'#D3D3D3',
        fontSize:17,
        borderRadius:10
    },
    userLogin:{
        padding:30,
        justifyContent:'center',
        flexDirection:'row',
    },
    buttonView:{
        justifyContent:'center',
        // alignItems:'center',
        padding:40,
        flex:1,
        marginRight:90,
        paddingLeft:0.5
        // paddingRight:40,
    },
    button:{
        height:60,
        width:320,
        borderRadius:10,
        marginLeft:.5,
        // justifyContent:'center',
        // borderWidth:5,
        backgroundColor:'#42A5F5',
        borderColor:'blue',
        alignItems:"center",
        justifyContent:'center',
    },
    buttonText:{
        fontSize:15,
        // backgroundColor:'#fff'
        color:'#fff'
    },
    user:{
        fontSize:15,
    },
    joinus:{
        fontSize:15,
        color:'blue'
    },
    forg:{
        fontSize:15,
        alignSelf: 'flex-end',
        paddingLeft:10
        // marginLeft:10
    }


})
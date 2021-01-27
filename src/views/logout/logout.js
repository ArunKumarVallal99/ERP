// import React, { Component } from 'react';
// import {Text, View, StyleSheet, TouchableOpacity, Modal, TextInput} from 'react-native';
// import fonts from '../../res/fonts'
// // import styles from '../Login/Style';
// // import styles from '../Login/Style';
// // import styles from '../Login/Style';

// export default class Settings extends Component{
//     state={
//         show:false
//     }
//     render(){
//         return(
//             <View style={styles.container}>
//              <TouchableOpacity
//               onPress={()=>{this.setState({show:true})}}>
//                 <Text style={styles.toptext}>LOGOUT</Text>
//                 </TouchableOpacity>

//                 <Modal
//                    transparent={true}
//                    visible={this.state.show}>
//                    <View style={styles.viewlog}>
//                        <View style={styles.inputlog}>
//                            <View style={styles.inputview}>
//                                <Text style={styles.inputtext}>Are you sure You want to Logout..?</Text>
//                                <View style={styles.conform}>
//                                <TouchableOpacity>
//                                    <TextInput style={styles.passwordtext}
//                                    keyboardType='visible-password'
//                                    placeholder='NO'
//                                    textContentType='password'
//                                    secureTextEntry={true} />
//                                </TouchableOpacity>
//                                <TouchableOpacity>
//                                    <TextInput style={styles.wordtext}
//                                    keyboardType='visible-password'
//                                    placeholder='YES'
//                                    textContentType='password'
//                                    secureTextEntry={true} />
//                                </TouchableOpacity>
//                            </View>
//                            </View>
                          
//                        </View>
//                    </View> 
                    
            
//                    </Modal>
//             </View>
//         )
//     }
// }
// const styles= StyleSheet.create({
//     container:{
//         padding:20,
//         // flex:1,
//         justifyContent:'center',
//     },
//     toptext:{
//         fontSize:26,
//         // fontWeight:'bold',
//         justifyContent:'center',
//         marginLeft:50,
//         marginTop:.5,
//         paddingTop:28,
//         fontFamily:fonts.name, 
//         paddingBottom:15
//     },
//     viewlog:{
//         backgroundColor:'#707070',
//         flex:1
        
        
//     },
//     inputlog:{
//         backgroundColor:'#fff',
//         margin:1,
//         marginTop:570,
//         width:407,
//         height:200,
//         borderRadius:10,
//         fontSize:20,
//         marginBottom:15,
//         paddingTop:10,
//     },
//     // inputtext:{
//     //     padding:80,
//     //     // paddingRight:78
//     //     // paddingLeft:50
//     // },
//     inputtext:{
//         // marginTop:50
//         paddingTop:50,
//         padding:110,
//         paddingBottom:10,
//         fontSize:15,
//         fontFamily:fonts.logintitle
//     },
//     conform:{
//         flexDirection:'row'
//     },
//     // no:{
//     //     paddingLeft:130,
//     //     padding:20,
//     //     fontSize:16,
//     //     fontFamily:fonts.name,
//     //     backgroundColor:'#0000005E',
//     //     // height:44,
//     //     // width:90
//     // },
//     // yes:{
//     //     padding:20,
//     //     fontSize:16,
//     //     fontFamily:fonts.name,
//     //     backgroundColor:'#278BFF',
//     //     // height:44,
//     //     // width:90
//     // },
//     passwordtext:{
//         height:40,
//         width:82,
//         paddingLeft:28,
//         backgroundColor:'#D3D3D3',
//         // marginLeft:35,
//         fontFamily:fonts.text,
//         marginLeft:109,
//         borderRadius:7
//     },
//     wordtext:{
//         height:44,
//         width:82,
//         paddingLeft:28,
//         backgroundColor:'#278BFF',
//         marginLeft:15,
//         fontFamily:fonts.text,
//         marginLeft:22,
//         borderRadius:7,
//         color:'#FFFFFF'
//     }


// })
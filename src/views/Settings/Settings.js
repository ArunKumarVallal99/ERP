import React, { Component } from "react";
import {Text, View, StyleSheet, TouchableOpacity, Modal, TextInput} from 'react-native';
import fonts from '../../res/fonts'
// import styles from "../Login/Style";
// import styles from "../Login/Style";

export default class Settings extends Component{
    state={
        show:false
    }
    render(){
        return(
         <View style={styles.tophead}>
                <Text style={styles.top}>Settings</Text>
            
            <View style={styles.container}>
            <TouchableOpacity>
                <Text style={styles.changepassword}>Change Password</Text>
            </TouchableOpacity>
             <TouchableOpacity
              onPress={()=>{this.setState({show:true})}}>
                <Text style={styles.toptext}>Log Out</Text>
                </TouchableOpacity>

                <Modal
                   transparent={true}
                   visible={this.state.show}>
                   <View style={styles.viewlog}>
                       <View style={styles.inputlog}>
                           <View style={styles.inputview}>
                               <Text style={styles.inputtext}>Are you sure You want to Logout..?</Text>
                               <View style={styles.conform}>
                               <TouchableOpacity>
                                   <Text style={styles.passwordtext}>No</Text>
                               </TouchableOpacity>
                               <TouchableOpacity
                                 onPress={()=>{this.setState({show:false})}}
                                 >
                               <Text style={styles.wordtext}>Yes</Text>
                               </TouchableOpacity>
                           </View>
                           </View>
                          
                       </View>
                   </View> 
                    
            
                   </Modal>
            </View>
         </View>
        )
    }
}
const styles= StyleSheet.create({
    container:{
        padding:20,
        // flex:1,
        justifyContent:'center',
    },
    toptext:{
        fontSize:16,
        // fontWeight:'bold',
        justifyContent:'center',
        marginLeft:50,
        marginTop:.5,
        // paddingTop:28,
        fontFamily:fonts.logintitle, 
        paddingBottom:15,
       
    },
    viewlog:{
        backgroundColor:'#707070',
        flex:1
        
        
    },
    inputlog:{
        backgroundColor:'#fff',
        margin:1,
        marginTop:570,
        width:407,
        height:200,
        borderRadius:10,
        fontSize:20,
        marginBottom:15,
        paddingTop:10,
    },
    
    inputtext:{
        // marginTop:50
        paddingTop:50,
        padding:110,
        paddingBottom:10,
        fontSize:15,
        fontFamily:fonts.logintitle
    },
    conform:{
        flexDirection:'row'
    },
    passwordtext:{
        height:40,
        width:82,
        paddingLeft:28,
        backgroundColor:'#D3D3D3',
        // marginLeft:35,
        fontFamily:fonts.text,
        marginLeft:109,
        borderRadius:7,
        fontSize:16,
        paddingTop:8
    },
    wordtext:{
        height:44,
        width:82,
        paddingLeft:28,
        backgroundColor:'#278BFF',
        marginLeft:15,
        fontFamily:fonts.text,
        marginLeft:22,
        borderRadius:7,
        color:'#FFFFFF',
        paddingTop:8,
        fontSize:16
    },
    tophead:{
        marginTop:60
    },
    top:{
        // marginLeft:170,
        paddingLeft:170,
        fontSize:16,
        fontFamily:fonts.name,
        // borderBottomWidth:4,
        // borderBottomColor:'#D3D3D3',
        paddingBottom:30
    },
    changepassword:{
        // paddingLeft:170,
        fontSize:16,
        fontFamily:fonts.logintitle,
        marginLeft:50,
        paddingBottom:25

    }
   


})
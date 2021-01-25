import React, { Component } from "react";
import {View,Text, TouchableOpacity  } from "react-native";
import DropDown from "../../components/DropDown";
import   Styles from "./Styles";
import CustomAlert from '../Alert/CustomAlert'
class Profile extends Component{
    constructor (props){
        super(props)
        this.state={
            menuItems:[
                {title:"jan", id:'1',value:false },
                {title:'Feb',id:'2', value:false }
            ],
            
        }
    }
    // click=()=>{
    //    this.setState({isenabled:!this.state.isenabled})
    // }
    render(){
        console.log(this.state.menuItems.value)
        return(
            // <View></View>
            // <DropDown
            // title={this.state.menuItems}
            // isvalue={this.state.menuItems.value}/>
            <CustomAlert/>
        
        )
    }
}

export default Profile
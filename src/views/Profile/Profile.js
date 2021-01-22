import React, { Component } from "react";
import {View,Text, TouchableOpacity  } from "react-native";
import DropDown from "../../components/DropDown";
import   Styles from "./Styles";
class Profile extends Component{
    constructor (props){
        super(props)
        this.state={
            menuItems:[
                {title:"jan", id:'1' },
                {title:'Feb',id:'2' }
            ],
            isenabled:false
        }
    }
    click=()=>{
       this.setState({isenabled:!this.state.isenabled})
    }
    render(){
        return(
         <View>
            <TouchableOpacity onPress={()=>this.click()}>
                <Text>Button</Text>
            </TouchableOpacity>
            {this.state.isenabled&&
            <DropDown
            title={this.state.menuItems}/>}
        </View>
        )
    }
}

export default Profile
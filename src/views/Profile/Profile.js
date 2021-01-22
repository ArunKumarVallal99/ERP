import React, { Component } from "react";
import {View,Text  } from "react-native";
import   Styles from "./Styles";
class Profile extends Component{

    render(){
        return(
            <View>
                <Text style={Styles.profileID}>Profile</Text>
            </View>
        )
    }
}

export default Profile
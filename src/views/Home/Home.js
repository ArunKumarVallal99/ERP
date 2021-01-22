import React, { Component } from "react";
import {View,Text,Image  } from "react-native";
//import { Icon } from "react-native-vector-icons/icon";
import   Styles from "./Styles";
import Icon from "react-native-vector-icons/Ionicons";
class Home extends Component{

    render(){
        return(
            <View style={Styles.container}>
                <View style={Styles.profileContainer} >

                    <View style={Styles.photoView} >
                        <Image
                        style={Styles.profileImage}
                        source={require('../../assets/Images/Placeholder.png')}
                        />
                    </View>

                    <View style={Styles.profileContent}>
                        <Text style={Styles.profileName}>Arun Kumar Vallal</Text>
                        <Text style={Styles.profileID}>Emp ID: 121 </Text>
                        <Text style={Styles.profileID}>Product Designer</Text>
                    </View>
                </View>


            </View>
        )
    }
}

export default Home
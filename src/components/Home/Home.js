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
                        source={{uri: 'https://reactnative.dev/img/tiny_logo.png'}}
                        />
                    </View>

                    <View style={Styles.profileContent}>
                        <Text style={Styles.profileName}>Arun Kumar Vallal</Text>
                        <Text style={Styles.profileId}>Emp ID: 121 </Text>
                        <Text style={Styles.profileId}>Product Designer</Text>
                    </View>
                </View>


            </View>
        )
    }
}

export default Home
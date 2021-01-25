import React, { Component } from "react";
import {View,Text, TouchableOpacity, Modal, Image  } from "react-native";
import Styles from "./Styles";

class CustomAlert extends Component{

    render(){
        return(
           <View>
           <Modal transparent={true}  visible={true}>
                <View style={Styles.mainContainer}>
                    <View style={Styles.container}>
                        <Image style={Styles.images}
                        source={require('../../assets/Images/tick.png')}/>
                        <Text style={Styles.textedit}>Your leave request </Text>
                        <Text style={Styles.textedit}>has submitted succesfully</Text>
                    </View>

                    <View style={Styles.close}>
                    
                    </View>
                </View>
            </Modal>

            </View>
        )
    }
}
export default CustomAlert;
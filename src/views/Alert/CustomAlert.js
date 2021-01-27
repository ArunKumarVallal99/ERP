import React, { Component } from "react";
import {View,Text, TouchableOpacity, Modal, Image  } from "react-native";
import Styles from "./Styles";

class CustomAlert extends Component{
    constructor(props){
        super(props);
        this.state={
            ismodalvisible:true,
        }
    }
    render(){
        return(
           <View>
           <Modal transparent={true}  visible={this.state.ismodalvisible}>
                <View style={Styles.mainContainer}>
                    <View style={Styles.container}>
                        <Image style={Styles.images}
                        source={require('../../assets/Images/tick.png')}/>
                        <Text style={Styles.textedit}>Your leave request </Text>
                        <Text style={Styles.textedit}>has submitted succesfully</Text>
                    </View>

                    <View style={Styles.close}>
                        <TouchableOpacity onpress={()=>this.setState({ismodalvisible:false})}>
                        <Image style={Styles.imagesClose}
                            source={require('../../assets/Images/x.png')}/>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

            </View>
        )
    }
}
export default CustomAlert;
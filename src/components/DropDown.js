import React, { Component } from 'react';
import { Text, View, StyleSheet, TextInput, TouchableOpacity, Alert, FlatList} from 'react-native';
class DropDown extends Component{
   constructor(props){
       super(props);
       this.state={
//menu:props.title,
        display:'Select the type',
        isenabled:false,
       }
   }
   renderData=({item,index})=>{
    return(
        <View style={styles.container}>
            <TouchableOpacity onPress={()=>this.valueChanged({index,item})}>
                <Text>{item.title}</Text>
            </TouchableOpacity>
        </View>

    )
    };
    click=()=>{
        this.setState({isenabled:!this.state.isenabled})
    }
    valueChanged=({index,item})=>{
        console.log(index,this.props.isvalue)
        this.setState({display:item.title,isenabled:!this.state.isenabled})
    }

    render(){
        console.log(this.props.title)
        return(
            
          <View style={styles.mainContainer}>
              <View style={styles.textContainer}>
                <TouchableOpacity onPress={()=>this.click()}>
                    <Text style={styles.text}>{this.state.display}</Text>
                </TouchableOpacity>
              </View>
                {this.state.isenabled&&            
                <FlatList data={this.props.title}
                renderItem={this.renderData}/>}
          </View>       
        );
        
    }
}

const styles=StyleSheet.create({
    mainContainer:{
        padding:20,
    },
    textContainer:{
       // borderWidth:1,
        borderColor:'grey',
        borderRadius:6,
        elevation:7,
        backgroundColor:'white',
        width:150,
        justifyContent:'center',
        alignItems:'center',
    },
    container:{
        //borderWidth:1,
        borderColor:'grey',
        width:150,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'white',
        borderRadius:2,
    },
});
export default DropDown;
import React, { Component } from 'react';
import { Text, View, StyleSheet, TextInput, TouchableOpacity, Alert, FlatList} from 'react-native';
class DropDown extends Component{
   constructor(props){
       super(props);
       this.state={
        menu:props.title,
       }
   }
   click=({item})=>{
    return(
        <View>
            <Text>{item.title}</Text>
        </View>

    )
 }
    render(){
        console.log(this.state.menu)
        return(
            
          <View>
              <FlatList data={this.state.menu}
              renderItem={this.click}/>
          </View>       
        );
        
    }
}
export default DropDown;
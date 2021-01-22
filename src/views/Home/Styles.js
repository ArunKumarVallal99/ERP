import {StyleSheet}from 'react-native';
import fonts from '../../res/fonts'
import color from '../../res/colors'
const Styles=StyleSheet.create({
    container:{
        padding:20,
        backgroundColor:'white',
    },
    profileContainer:{
        flexDirection:'row',
        //backgroundColor:'pink',
    },
    profileView:{
        justifyContent:'center',
        alignItems:'center',
        //backgroundColor:'pink',
    },
    profileImage:{
        height:60,
        width:60,
        //borderRadius:30,
    },
    profileContent:{
        //backgroundColor:'green'
        marginLeft:30,
        
    },
    profileName:{
        fontSize:16,
        fontFamily:fonts.title,
        //fontWeight:'bold',
    },
    profileID:{
        fontFamily:fonts.text,
        color:color.text,
        fontSize:16,
       
        
    },
});

export default Styles;
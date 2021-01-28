import {StyleSheet} from 'react-native';
import fonts from '../../res/fonts';

const styles=StyleSheet.create({
    container:{
        padding:20,
        // flex:1,
        justifyContent:'center',
        // marginTop:50
        // paddingBottom:50
    },
    inputcontainer:{
        padding:33,
        paddingBottom:13,
        // flex:1,
        justifyContent:'center'
    },
    text:{
        fontSize:20,
        marginBottom:16,
        // fontWeight:'bold'
        fontFamily:fonts.logintitle
    },
    inputview:{
        paddingBottom:12,
        // padding:12
        // paddingLeft:16,
        marginBottom:12
        // marginLeft:16
    },
    Newview:{
        paddingBottom:12,
        marginBottom:13
    },
    inputtext:{
        // flex:1,
        height:50,
        width:303,
        // borderColor:'grey',
        // borderBottomWidth:1,
        backgroundColor:'#D3D3D3',
        fontSize:17,
        borderRadius:10,
        paddingBottom:13,
        marginBottom:13,
        paddingLeft:16,
        // marginLeft:16,
        fontFamily:fonts.loginplaceholder
    },
     buttonView:{
        justifyContent:'center',
        // alignItems:'center',
        padding:40,
        flex:1,
        marginRight:90,
        paddingLeft:0.5
        // paddingRight:40,
    },
    button:{
        height:40,
        width:140,
        borderRadius:10,
        marginLeft:85,
        // justifyContent:'center',
        // borderWidth:5,
        backgroundColor:'#42A5F5',
        borderColor:'blue',
        alignItems:"center",
        justifyContent:'center',
        // marginTop:170
    },
    buttonText:{
        fontSize:15,
        // backgroundColor:'#fff'
        color:'#fff',
        fontFamily:fonts.name
    },
    toptext:{
        fontSize:26,
        // fontWeight:'bold',
        justifyContent:'center',
        marginLeft:65,
        marginTop:.5,
        paddingTop:28,
        fontFamily:fonts.name, 
        paddingBottom:15   }


});

export default styles;
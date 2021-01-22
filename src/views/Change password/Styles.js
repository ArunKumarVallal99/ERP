import {StyleSheet} from 'react-native';
import fonts from '../../res/fonts';

const styles=StyleSheet.create({
    container:{
        padding:20,
        flex:1,
        justifyContent:'center',
        // marginTop:50
        // paddingBottom:50
    },
    inputcontainer:{
        padding:10,
        // flex:1,
        justifyContent:'center'
    },
    text:{
        fontSize:20,
        // fontWeight:'bold'
        fontFamily:fonts.logintitle
    },
    inputview:{
        paddingBottom:30
    },
    inputtext:{
        // flex:1,
        height:50,
        width:330,
        // borderColor:'grey',
        // borderBottomWidth:1,
        backgroundColor:'#D3D3D3',
        fontSize:17,
        borderRadius:10
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
    },
    buttonText:{
        fontSize:15,
        // backgroundColor:'#fff'
        color:'#fff'
    },
    toptext:{
        fontSize:26,
        fontWeight:'bold',
        justifyContent:'center',
        marginLeft:65,
        marginTop:.5,
        paddingTop:1
    }


});

export default styles;
import { StyleSheet} from 'react-native';
import fonts from '../../res/fonts';
const styles=StyleSheet.create({
    container:{
        padding:20,
        flex:1,
        justifyContent:'center'
    },
    inputcontainer:{
        padding:30,
        justifyContent:'center',
        // alignItems:'center'
    },
    text:{
        fontSize:20,
        // fontWeight:'bold',
        paddingBottom:5,
        marginRight:10,
        fontFamily:fonts.logintitle,
        marginBottom:18
    },
    inputview:{
        // paddingBottom:30
        marginBottom:18
    },
    inputtext:{
        // flex:1,
        height:50,
        width:330,
        // borderColor:'grey',
        // borderBottomWidth:1,
        backgroundColor:'#D3D3D3',
        fontSize:17,
        borderRadius:10,
        fontFamily:fonts.loginplaceholder,
        paddingLeft:18,
        // marginBottom:18

    },
    userLogin:{
        padding:30,
        justifyContent:'center',
        flexDirection:'row',
    },
    buttonView:{
        justifyContent:'center',
        // alignItems:'center',
        padding:30,
        flex:1,
        marginRight:90,
        paddingLeft:0.5
       
    },
    button:{
        height:60,
        width:320,
        borderRadius:10,
        marginLeft:.5,
        // borderWidth:5,
        backgroundColor:'#42A5F5',
        borderColor:'blue',
        alignItems:"center",
        justifyContent:'center',
    },
    buttonText:{
        fontSize:16,
        // backgroundColor:'#fff'
        color:'#fff',
        fontFamily:fonts.signin
    },
    user:{
        fontSize:15,
    },
    joinus:{
        fontSize:15,
        color:'blue'
    },
    forg:{
        fontSize:14,
        fontFamily:fonts.loginplaceholder,
        // alignSelf: 'flex-end',
        paddingLeft:179
        // marginLeft:10
    },
    viewforgot:{
        backgroundColor:'grey',
        flex:1,
        padding:19
        // marginTop:250
    },
    fotgot:{
        backgroundColor:'#fff',
        margin:50,
        marginTop:330,
        width:276,
        height:297,
        borderRadius:10,
        fontSize:20,
        marginBottom:15,
        paddingTop:10,
       
    },
    textforgot:{
        fontSize:20,
        paddingBottom:10,
        borderBottomWidth:4,
        borderBottomColor:'#D3D3D3',
        paddingLeft:50,
        marginBottom:20,
        fontFamily:fonts.name,
    },
    mailid:{
        marginTop:10,
        paddingLeft:15,
        marginBottom:20,
        fontSize:16,
        fontFamily:fonts.text,
        height:40,
        width:242
    },
    passwordtext:{
        height:45,
        width:243,
        paddingLeft:15,
        backgroundColor:'#D3D3D3',
        marginLeft:15,
        fontFamily:fonts.text
    },
    update:{
        justifyContent:"center",
        paddingBottom:40
    },
    reset:{
        height:55,
        width:242,
        borderRadius:10,
        // marginLeft:.5,
        // borderWidth:5,
        backgroundColor:'#5827FF',
        borderColor:'blue',
        // alignItems:"center",
        justifyContent:'center',
        marginLeft:15,
        marginBottom:40
       
    },
    resetpassword:{
        fontSize:15,
        marginLeft:62,
        fontFamily:fonts.name
    }


});
export default styles;
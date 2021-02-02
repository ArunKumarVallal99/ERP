import { StyleSheet} from 'react-native';
import fonts from '../../res/fonts';
const styles=StyleSheet.create({
    container:{
        padding:20,
        flex:1,
        justifyContent:'center',
        marginRight:20,
        // backgroundColor:'pink'
    },
    inputcontainer:{
        padding:30,
        justifyContent:'center',
        // marginRight:20
        // alignItems:'center'
    },
    text:{
        fontSize:20,
        // fontWeight:'bold',
        paddingBottom:5,
        marginRight:10,
        fontFamily:fonts.font_Medium,
        marginBottom:18,
        padding:2
    },
    inputview:{
        // paddingBottom:30
        marginBottom:18
    },
    inputtext:{
        // flex:1,
        height:50,
        width:290,
        // borderColor:'grey',
        // borderBottomWidth:1,
        backgroundColor:'#F3F3F3',
        borderColor:'#00000029',
        // borderColor:'#00000029',
        fontSize:17,
        borderRadius:10,
        fontFamily:fonts.font_Medium,
        paddingLeft:18,
        marginBottom:13,
        marginRight:20

    },
    inputviewpassword:{
        flexDirection:'row',
        // marginBottom:16,
        backgroundColor:'#F2F3F5',
        justifyContent:'center',
        // alignContent:'center',
        paddingLeft:10,
        // marginLeft:20,
        // marginRight:20,
        alignItems:"center",
        // borderEndWidth:2,
        borderColor:'#F2F3F5',
        borderWidth:2,
        borderRadius:10,
        marginBottom:13
       

    },
    inputtextpassword:{
        height:50,
        width:270,
        paddingLeft:20,
        fontFamily:fonts.font_Medium,
        fontSize:17,
        // marginBottom:5
        

    },
    image:{
        height:18,
        width:20,
        marginRight:29
        // paddingLeft:30
        // marginRight:40,
        // marginLeft:20
        // paddingRight:40
        // paddingLeft:80

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
        width:288,
        borderRadius:10,
        marginLeft:.5,
        // borderWidth:5,
        backgroundColor:'#42A5F5',
        borderColor:'blue',
        paddingLeft:120,
        // alignItems:"center",
        justifyContent:'center',
        marginRight:20
    },
    buttonText:{
        fontSize:16,
        // backgroundColor:'#fff'
        color:'#fff',
        fontFamily:fonts.font_Medium
    },
    user:{
        fontSize:15,
    },
    joinus:{
        fontSize:15,
        color:'blue'
    },
    forg:{
        fontSize:13,
        fontFamily:fonts.font_Medium,
        // alignSelf: 'flex-end',
        paddingLeft:169,
        marginBottom:20,
       
        // height:16,
        // width:121
        // marginLeft:10
    },
    // for:{
    //     flexDirection:'column'

    // },
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
        fontSize:15,
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
        fontFamily:fonts.font_Medium
    }


});
export default styles;
import { StyleSheet} from 'react-native';

const styles=StyleSheet.create({
    container:{
        padding:20,
        flex:1,
        justifyContent:'center'
    },
    inputcontainer:{
        padding:10,
        justifyContent:'center',
        // alignItems:'center'
    },
    text:{
        fontSize:20,
        fontWeight:'bold',
        paddingBottom:5,
        marginRight:10,
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
    userLogin:{
        padding:30,
        justifyContent:'center',
        flexDirection:'row',
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
        height:60,
        width:320,
        borderRadius:10,
        marginLeft:.5,
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
    user:{
        fontSize:15,
    },
    joinus:{
        fontSize:15,
        color:'blue'
    },
    forg:{
        fontSize:16,
        // alignSelf: 'flex-end',
        paddingLeft:200
        // marginLeft:10
    }


});
export default styles;
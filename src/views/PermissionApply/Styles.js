import {StyleSheet} from 'react-native';
import fonts from '../../res/fonts';

const styles = StyleSheet.create({
    container:{
        // padding:20,
        marginLeft:20,
        marginRight:20,
        // backgroundColor:'pink'
        
        // paddingLeft:135
        // marginLeft:135
        // justifyContent:'center',
        // alignItems:'center',
        // alignContent:'center',
        // flex:1,
    },
    dateText:{
        fontSize:16,
        marginBottom:12,
        fontFamily:fonts.font_Medium,
    },
    dateView:{
        flexDirection:'row',
        marginBottom:16,
        backgroundColor:'#F2F3F5',
        justifyContent:'center',
        // alignContent:'center',
        // paddingLeft:10,
        // marginLeft:20,
        // marginRight:20,
        alignItems:"center",
        borderEndWidth:2,
        borderColor:'#00000029',
        borderWidth:2,
        borderRadius:10
    },
    dateInput:{
        // borderEndWidth:2,
        // borderColor:'#00000029',
        height:40,
        width:280,
        // marginLeft:20
        // borderRadius:10,
        // borderWidth:2,
        // flexDirection:'row',
        // // backgroundColor:'#F2F3F5',
        paddingLeft:15
    },
    CalendarIcon:{
        // marginLeft:20,
        color:'#278BFF',
        // paddingLeft:10
        // paddingRight:20
        marginRight:20
        //marginTop:10,
    },
    modalDate:{
        justifyContent:'center',
        alignItems:'center',
        elevation:4,
        height:150,
        marginTop:250,
        marginLeft:20,
        marginRight:20,
        backgroundColor:'white',
        flex: .8,
        borderRadius:10,
        // shadowColor: "#000",
        // shadowOffset: {
        //     width: 0,
        //     height: 2
        // },
        // shadowOpacity: 0.25,
        // shadowRadius: 3.84,
        padding:10,
    },
    calendarDetails:{
        borderWidth: 1,
        borderColor: '#00000029',
        color:'#278BFF'
        //height: 200,
    },
    // timeText:{
    //     fontSize:18,
    //     marginBottom:10,
    //     paddingRight:90,
    //     marginRight:90,
    //     fontFamily:fonts.name
    // },
    hoursView:{
        marginBottom:12,
    },
    hoursText:{
        fontSize:16,
        marginBottom:10,
        fontFamily:fonts.font_Medium,
    },
    hoursInput:{
        borderEndWidth:2,
        borderColor:'#00000029',
        height:40,
        width:372,
        borderRadius:10,
        borderWidth:2,
        backgroundColor:'#F2F3F5',
        // paddingBottom:20,
        marginBottom:40
    },
    descriptionView:{
        marginBottom:10,
    },
    descriptionText:{
        fontSize:16,
        marginBottom:10,
        fontFamily:fonts.font_Medium,
    },
    descriptionInput:{
        borderEndWidth:2,
        borderColor:'#00000029',
        backgroundColor:'#F2F3F5',
        height:98,
        width:372,
        borderRadius:10,
        borderWidth:2,
        marginBottom:20
    },
    submitContainer:{
        justifyContent:'center',
        elevation:5,
        backgroundColor:'#278BFF',
        height:55,
        // alignItems:'center',
        width:372,
        // marginLeft:100,
        borderRadius:10,
        paddingLeft:108
      },
    submitText:{
        fontSize:16,
        fontFamily:fonts.font_Medium,
        color:'#fff'
    },
    toptext:{
        marginTop:40,
        marginBottom:16,
        fontSize:18,
        fontFamily:fonts.font_SemiBold,
        paddingLeft:121

    },
    topView:{
        // flexDirection:'row',
        marginBottom:16,
        backgroundColor:'#FCF3B6'
    },
    insideContainer:{
        flexDirection:'row'

    },
    availableLeave:{
        marginTop:18,
        color:'#17BF63',
        fontSize:16,
        fontFamily:fonts.text,
        marginBottom:16,
        paddingLeft:128

    },
    leaveType:{
        // marginTop:51,
        fontSize:16,
        fontFamily:fonts.loginplaceholder,
        marginBottom:20,
        // paddingRight:30
        marginLeft:25,
        // padding:20
    },
    sickLeave:{
        fontSize:16,
        fontFamily:fonts.loginplaceholder,
        marginBottom:20,
        // marginTop:51,
        paddingLeft:70
    },
    inputContainer:{
        // padding:23
    },
    // inputtext:{
    //     height:42,
    //     width:355,
    //     // borderColor:'grey',
    //     // borderBottomWidth:1,
    //     backgroundColor:'#F2F3F5',
    //     fontSize:17,
    //     borderRadius:10,
    //     paddingBottom:13,
    //     marginBottom:13,
    //     paddingLeft:16,
    //     borderColor:'#00000029',
    //     borderWidth:2
    // },
    pickertext:{
        fontSize:16,
        marginBottom:13,
        fontFamily:fonts.font_Medium
    },
    pickers:{
        height:50,
        width:358,
        backgroundColor:'#D3D3D3',
        fontSize:17,
        borderRadius:10,
        paddingBottom:13,
        marginBottom:13,
        paddingLeft:16,
    }
});
export default styles;
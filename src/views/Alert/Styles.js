import {StyleSheet}from 'react-native';
import colors from '../../res/colors';
import fonts from '../../res/fonts';
const Styles=StyleSheet.create({
    mainContainer:{
        //flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 234,
       // marginBottom:266,
        marginLeft:1,
        //marginRight:42,
        width:390,
        height:260,
        

    },
    container:{
        //backgroundColor: "white",
        borderRadius: 8,
        //paddingTop: 50,
        elevation:4,
        backgroundColor:colors.background,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        //flex:1.5,
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        width:300,
        justifyContent:'center',
        paddingBottom:20,
        height:280,
        paddingLeft:35,
        paddingRight:35,
        marginBottom:90,
    },
    images:{
        height:90,
        width:90,
        paddingBottom:20,
        marginBottom:20,
    },
    textedit:{
        justifyContent:'center',
        fontFamily:fonts.title,
        fontSize:16,
    },
    close:{
        elevation:5,
        borderRadius: 50,
        backgroundColor:colors.background,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        height:60,
        width:60,
        justifyContent:'center',
        alignItems:'center',
    },
    imagesClose:{
        height:20,
        width:20,
    }
})
export default Styles;
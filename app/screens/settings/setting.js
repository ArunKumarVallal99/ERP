import React, { Component } from 'react';
import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity } from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from 'react-native-responsive-screen';
import Colors from '../../common/color';
import Fonts from '../../common/fonts';
import Strings from '../../common/string';
import Header from '../../components/headerComponent/Header';
import ChangePassword from './changePassword';
import Override from './overrideRequest';

class setting extends Component {
  constructor(props) {
    super(props);
  }

  renderButton = () => {
      return(
          <TouchableOpacity onPress>
          </TouchableOpacity>
      )
  }


  render() {
    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.parentContainer}>
            <Header
                backPress
                title={Strings.settings.settings}
              />
                <View style={{flexDirection: 'row'}}>
            <TouchableOpacity onPress style={styles.headerContainer}>
             <Text style={this.state.selectOverride ? styles.selectedTitle : styles.unselectTitle}>{Strings.settings.override}</Text>
             <View style={this.state.selectOverride ? styles.selectedView : styles.unselectView}/>
             </TouchableOpacity>

             <TouchableOpacity onPress style={styles.headerContainer}>
             <Text style={this.state.changePassword ? styles.selectedTitle : styles.unselectTitle}>{Strings.settings.changePassword}</Text>
             <View style={this.state.changePassword ? styles.selectedView : styles.unselectView}/>
             </TouchableOpacity>
             </View>

             {this.state.selectOverride == true && <Override />}
             {this.state.changePassword == true && <ChangePassword 
             navi/>}
             </View>
      </SafeAreaView>
    );
  }
}

export default setting;


const styles = StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: Colors.white,
    },
    parentContainer: {
        flex: 1,
        backgroundColor: Colors.white,
      },
      headerContainer: {
          width: wp('50%'),
          height: hp('8%'),
          justifyContent: 'flex-end',
          alignItems: 'center'
      },
      unselectTitle: {
          color: Colors.placeholder,
          fontFamily: Fonts.montserratSemiBold,
          fontSize: wp('4%')
      },
      selectedTitle: {
        color: Colors.black,
        fontFamily: Fonts.montserratBold,
        fontSize: wp('4.5%')
      },
      selectedView: {
        height: hp('0.5%'), 
        backgroundColor: Colors.themeColor, 
        width: wp('46%'), 
        marginTop: hp('1%')
      },
      unselectView: {
        height: hp('1%'), 
        backgroundColor: Colors.white, 
        width: wp('46%'), 
        marginTop: hp('1%')
      }
})
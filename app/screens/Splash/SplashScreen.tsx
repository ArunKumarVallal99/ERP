import React, {Component} from 'react';
import {StyleSheet, SafeAreaView, View, Image} from 'react-native';
import {View as AnimatableView} from 'react-native-animatable';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Images} from '../../resources/index';

const animationDuration = 3000;

export default class SplashScreen extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        {/* ANIMATED LOGO */}
        <View style={styles.parentContainer}>
          <AnimatableView
            animation="slideInDown"
            duration={animationDuration}
            style={styles.logoStyle}>
            <Image source={Images.logoFollo} />
          </AnimatableView>
          <AnimatableView
            animation="slideInRight"
            duration={animationDuration}
            style={styles.logoContainer}>
            <Image source={Images.logoArrow} style={styles.arrowStyle} />
          </AnimatableView>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  parentContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    width: wp('40%'),
    height: hp('14%'),
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  logoStyle: {
    width: wp('60%'),
    height: hp('14%'),
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  arrowStyle: {
    marginLeft: wp('2%'),
  },
});

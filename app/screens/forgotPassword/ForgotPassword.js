import React, {Component} from 'react';
import {View, StyleSheet, SafeAreaView, Platform, Text} from 'react-native';
import {connect} from 'react-redux';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Colors from '../../common/color';
import {storeUserid} from '../../actions/postAction';
import {
  Image as AnimatableImage,
  View as AnimatableView,
} from 'react-native-animatable';
import Images from '../../common/images';
import Strings from '../../common/string';
import HeaderAnimation from '../../components/logoAnimation/logoAnimation';
import Header from '../../components/headerComponent/Header';
import {TextField} from '../../components/textinput/Textinput';
import Fonts from '../../common/fonts';
import NextButton from '../../components/nextButton/NextButton';
import {FORGOT_PASSWORD} from '../../api/Constants';
import {forgotPassword} from '../../api/Api';
import Loader from '../../components/loader/Loader';
import Toastpopup from '../../components/toastpopup/Toastpopup';
import {isEmpty, isValidEmail} from '../../common/validators';
import Alert from '../../components/toastpopup/alert';
import {NavigationActions, StackActions} from 'react-navigation';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {BlurView} from '@react-native-community/blur'

const rotation = {
  from: {
    rotate: '0deg',
  },
  to: {
    rotate: '360deg',
  },
};

class Forgotpassword extends Component {
  constructor(props) {
    super(props);
  }


  //Main Render method
  render() {
    return (
      <SafeAreaView style={styles.safeArea}>
          <KeyboardAwareScrollView extraScrollHeight={50}>
        <View style={styles.parentContainer}>
          <HeaderAnimation />
          <View style={styles.subContainer}>
            <AnimatableView animation={'bounceInLeft'} duration={800}>
              <AnimatableImage
                animation={rotation}
                duration={800}
                source={Images.path3}
                style={styles.path}
              />
            </AnimatableView>

            <View
              style={{
                width: '100%',
                height: hp('77%'),
                backgroundColor: '#0000',
                justifyContent: 'flex-end',
              }}>
              <AnimatableView duration={500} style={styles.signupContainer}>
                <Header
                  backPress
                  title={Strings.login.forgotPassword}
                />

                <Text style={styles.enterEmail}>
                  {Strings.login.enterEmail}
                </Text>

                {/* <View style={{width: wp('90%'), alignItems: 'center', justifyContent: 'center'}}> */}
                <TextField
                  attrName={Strings.placeholders.email}
                  title={Strings.placeholders.email}
                  value
                  updateMasterState
                  textInputStyles={{
                    // here you can add additional TextInput styles
                    color: Colors.black,
                    fontSize: wp('4.5%'),
                  }}
                  container={{
                    width: wp('80%'),
                  }}
                  progressWidth={wp('80%')}
                />

                <NextButton
                  title={Strings.login.submit}
                  containerStyles={{
                    marginTop: hp('6%'),
                    marginRight: wp('10%'),
                  }}
                  nextClick
                />

                {/* </View> */}
              </AnimatableView>
            </View>
          </View>
        </View>
        </KeyboardAwareScrollView>

        {this.state.showLoader &&
          <BlurView
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              bottom: 0,
              right: 0
            }
            }
            viewRef
            blurType="light"
            blurAmount={10}
            reducedTransparencyFallbackColor="white"
            >
            <Loader />
          </BlurView>
  }     
       {this.state.showToaster && (
            <Toastpopup backPress
            toastMessage
            type
            container={{marginBottom: hp('12%')}}
            />
          )}

          {this.state.showAlert && 
          <Alert 
             title={Strings.popup.success}
             desc={Strings.popup.forgotSuccess}
             okTap
             />
             }
      </SafeAreaView>
    );
  }
}

const mapStateToProps = (state) => {

};

export default connect(mapStateToProps)(Forgotpassword);

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  parentContainer: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  subContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  enterEmail: {
    width: wp('80%'),
    alignSelf: 'center',
    marginTop: hp('2%'),
    color: Colors.planDesc,
    fontFamily: Fonts.montserratMedium,
    fontSize: wp('3.5%'),
  },
  signupContainer: {
    width: wp('100%'),
    height: hp('60%'),
    borderTopLeftRadius: hp('6%'),
    borderTopRightRadius: hp('6%'),
    zIndex: 999,
    backgroundColor: '#FFF',
    borderColor: Colors.shadowColor,
    borderWidth: Platform.OS == 'ios' ? 1 : 0.8,
    shadowOffset: {width: 10, height: 10},
    shadowOpacity: 1,
    elevation: 3,
    shadowColor: 'rgba(0,0,0,0.14)',
  },
  path: {
    width: wp('75%'),
    height: hp('43%'),
    marginBottom: -hp('25%'),
    marginRight: -wp('40%'),
    alignSelf: 'flex-end',
  },
});
import React, { Component } from "react";
import { View, StyleSheet, SafeAreaView, Platform } from "react-native";

import { connect } from "react-redux";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Colors from "../../common/color";
import { Image as AnimatableView } from "react-native-animatable";
import Images from "../../common/images";
import Strings from "../../common/string";
import HeaderAnimation from "../../components/logoAnimation/logoAnimation";
import Header from "../../components/headerComponent/Header";
import { TextField } from "../../components/textinput/Textinput";
import Fonts from "../../common/fonts";
import NextButton from "../../components/nextButton/NextButton";
import Toastpopup from "../../components/toastpopup/Toastpopup";
import Loader from "../../components/loader/Loader";
import Alert from "../../components/toastpopup/alert";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { BlurView } from "@react-native-community/blur";


class Login extends Component {
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
              <AnimatableView source={Images.path} style={styles.path} />
              <View style={styles.signupContainer}>
                <Header
                  backPress
                  title={Strings.login.resetPassword}
                />
                <View>
                  <TextField
                    attrName={Strings.placeholders.newPassword}
                    title={Strings.placeholders.newPassword}
                    value
                    updateMasterState
                    hideShow={true}
                    hideImage={
                      this.state.showPass ? Images.hide : Images.unhide
                    }
                    onPressHideImage
                    textInputStyles={{
                      color: Colors.black,
                      fontSize: 14,
                    }}
                    secureTextEntry={!this.state.showPass}
                  />

                  <TextField
                    attrName={Strings.placeholders.confirmPassword}
                    title={Strings.placeholders.confirmPassword}
                    value
                    updateMasterState
                    hideShow={true}
                    hideImage={
                      this.state.showCnfPass ? Images.hide : Images.unhide
                    }
                    onPressHideImage
                    textInputStyles={{
                      color: Colors.black,
                      fontSize: 14,
                    }}
                    secureTextEntry={!this.state.showCnfPass}
                  />

                  <NextButton
                    title={Strings.login.submit}
                    nextClick
                  />
                </View>
              </View>
            </View>
          </View>
        </KeyboardAwareScrollView>

        {this.state.showLoader && (
          <BlurView
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              bottom: 0,
              right: 0,
            }}
            viewRef
            blurType="light"
            blurAmount={10}
            reducedTransparencyFallbackColor="white"
          >
            <Loader />
          </BlurView>
        )}
        {this.state.showToaster && (
          <Toastpopup
            backPress
            toastMessage
            type
          />
        )}

        {this.state.showAlert && (
          <Alert
            title
            desc
            okTap
          />
        )}
      </SafeAreaView>
    );
  }
}

const mapStateToProps = (state) => {

};

export default connect(mapStateToProps)(Login);

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
    justifyContent: "flex-end",
    height: hp("85%"),
  },
  signupContainer: {
    width: wp("100%"),
    height: hp("60%"),
    borderTopLeftRadius: hp("6%"),
    borderTopRightRadius: hp("6%"),
    zIndex: 999,
    backgroundColor: "#FFF",
    borderColor: Colors.shadowColor,
    borderWidth: Platform.OS == "ios" ? 1 : 0.8,
    shadowOffset: { width: 10, height: 10 },
    shadowOpacity: 1,
    elevation: 3,
    shadowColor: "rgba(0,0,0,0.14)",
  },
  path: {
    width: wp("70%"),
    height: hp("25%"),
    marginBottom: -hp("4.5%"),
    marginLeft: -wp("25%"),
  },
  forgot: {
    color: Colors.themeColor,
    marginLeft: wp("6%"),
    textDecorationLine: "underline",
    fontSize: wp("3.5%"),
    fontFamily: Fonts.montserratMedium,
    marginBottom: hp("8%"),
  },
});

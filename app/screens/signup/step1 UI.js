import React, { Component } from "react";
import { View, StyleSheet, Platform } from "react-native";
import { connect } from "react-redux";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Image as AnimatableView } from "react-native-animatable";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import {
  AppView,
  AppLoader,
  HeaderAnimation,
  Header,
  TextField,
  Toastpopup,
  NextButton,
  Steps,
  Alert,
  MobilenumberInput,
  Dropdown,
} from "../../components";
import { Images, Strings } from "../../common";

class Step1 extends Component {
  //Main Render method
  render() {
    return (
      <AppView>
        <KeyboardAwareScrollView
          extraScrollHeight={50}
          nestedScrollEnabled={true}
        >
          <View style={styles.parentContainer}>
            <View style={styles.parentContainer}>
              <HeaderAnimation />
              <View style={styles.subContainer}>
                <AnimatableView source={Images.path} style={styles.path} />
                {/* <Image resizeMode={'center'} source={Images.path} style={{width: wp('50%')}}/> */}

                <View
                  style={[
                    styles.signupContainer,
                    // { height: isFromDeepLink == true ? hp("70%") : hp("50%") },
                  ]}
                >
                  <Header
                    backPress={}
                    title={Strings.step1.welcome}
                  />

                  <View style={{ flex: 1 }}>
                    <TextField
                      autoCapitalize="none"
                      editable={}
                      attrName={Strings.placeholders.email}
                      title={Strings.placeholders.email}
                      value={}
                      updateMasterState={}
                      textInputStyles={{
                        color: Colors.black,
                        fontSize: 14,
                      }}
                      onSubmitEditing={}
                    />

                    <MobilenumberInput
                      attrName={Strings.placeholders.mobile}
                      title={Strings.placeholders.mobile}
                      value={}
                      countryCode={}
                      imageSource={Images.downArr}
                      updateMasterState={}
                      maxLength={10}
                      keyboardType={"number-pad"}
                      onSubmitEditing={}
                      onPresscountry={}
                    />

                    { //isFromDeepLink == true && (
                      <TextField
                        attrName={Strings.placeholders.password}
                        title={Strings.placeholders.password}
                        value={}
                        updateMasterState={}
                        hideShow={true}
                        hideImage={
                         // this.state.showPass ? Images.unhide : Images.hide
                        }
                        onPressHideImage={}
                        textInputStyles={{
                          // here you can add additional TextInput styles
                          color: Colors.black,
                          fontSize: 14,
                        }}
                        secureTextEntry={}
                      />
                    }

                    { //isFromDeepLink == true && (
                      <TextField
                        attrName={Strings.placeholders.confirmPassword}
                        title={Strings.placeholders.confirmPassword}
                        value={}
                        updateMasterState={}
                        hideShow={true}
                        hideImage={
                          //this.state.showPassCon ? Images.unhide : Images.hide
                        }
                        onPressHideImage={}
                        textInputStyles={{
                          // here you can add additional TextInput styles
                          color: Colors.black,
                          fontSize: 14,
                        }}
                        secureTextEntry={}
                      />
                    }

                    <NextButton nextClick={} />

                    <View style={{ flex: 1, justifyContent: "flex-end" }}>
                      <Steps page={"1"} />
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </KeyboardAwareScrollView>

        <AppLoader viewRef={} />


          <Toastpopup
            backPress={}
            toastMessage={}
            type={}
          />


        <Alert
          title={Strings.popup.success}
          desc={Strings.popup.forgotSuccess}
          okTap={() => {
            this.okTap();
          }}
        />

        <Dropdown
          data={}
          title={Strings.addCompany.chooseCountry}
          value={}
          closeBtn={}
          onPress={}
          visible={}
          onbackPress={}
        />
      </AppView>
    );
  }
}

const mapStateToProps = (state) => {
  const {} = state;
  return {};
};

export default connect(mapStateToProps, {})(Step1);

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
    height: isFromDeepLink == true ? hp("70%") : hp("50%"),
    borderTopLeftRadius: hp("6%"),
    borderTopRightRadius: hp("6%"),
    zIndex: 999,
    backgroundColor: "#FFF",
    borderColor: Colors.shadowColor,
    borderWidth: Platform.OS == "ios" ? 1 : 0.8,
    // shadowOffset: {width: 10, height: 10},
    shadowOpacity: 1,
    elevation: 200,
    shadowColor: "rgba(0,0,0,0.14)",
  },
  path: {
    width: wp("70%"),
    height: hp("25%"),
    marginBottom: -hp("4.5%"),
    marginLeft: -wp("25%"),
  },
});

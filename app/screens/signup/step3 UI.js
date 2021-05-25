import React, { Component } from "react";
import { View, StyleSheet, Platform, } from "react-native";
import { connect } from "react-redux";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import {
  Image as AnimatableImage,
  View as AnimatableView,
} from "react-native-animatable";
import {
  AppView,
  AppLoader,
  HeaderAnimation,
  Header,
  TextField,
  NextButton,
  Steps,
  Alert,
  Toastpopup,
  Dropdown,
  Map,
} from "../../components";
import { Images, Strings } from "../../common/";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Modal from "react-native-modal";

const reverseRotation = {
  from: {
    rotate: "-180deg",
  },
  to: {
    rotate: "0deg",
  },
};

class Step3 extends Component {
  //Main Render method
  render() {
    return (
      <AppView>
        <KeyboardAwareScrollView
          extraScrollHeight={50}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.parentContainer}>
            <HeaderAnimation />

            <View style={styles.subContainer}>
              <AnimatableView animation={"bounceInRight"} duration={1300}>
                <AnimatableImage
                  animation={reverseRotation}
                  duration={1300}
                  source={Images.path}
                  style={styles.path}
                />
              </AnimatableView>

              <View style={styles.signupContainer}>
                <Header
                  backPress={}
                  title={Strings.step3.projectDetails}
                />

                <View style={{ flex: 1 }}>
                  <TextField
                    attrName={Strings.placeholders.ProjectName}
                    title={Strings.placeholders.ProjectName}
                    value={}
                    maxLength={150}
                    updateMasterState={}
                    textInputStyles={{
                      // here you can add additional TextInput styles
                      color: Colors.black,
                      fontSize: 14,
                    }}
                  />

                  <TextField
                    attrName={Strings.placeholders.location}
                    title={Strings.placeholders.location}
                    value
                    multiline={true}
          
                    showButton={true}
                    imageSource={Images.map}
                    textInputStyles={{
                      color: Colors.black,
                      fontSize: 14,
                      padding: Platform.OS == "android" ? 5 : 0,
                    }}
                    onPress={}
                  />

                  <NextButton
                    nextClick={}
                    title={
                   /*    this.state.showStep == true
                        ? Strings.step3.signUp
                        : Strings.step3.next */
                    }
                  />

                  {//this.state.showStep == true && (
                    <View style={{ flex: 1, justifyContent: "flex-end" }}>
                      <Steps page={" 3"} />
                    </View>
                  }
                </View>
              </View>
            </View>
          </View>
        </KeyboardAwareScrollView>

        <AppLoader viewRef={}/>

          <Toastpopup
          backPress={ }
          toastMessage={ }
          type={ }
          />
   
          <Alert
            title={Strings.popup.success}
            desc={Strings.popup.forgotSuccess}
            okTap={}
          />

        <Dropdown
          data={}
          title={Strings.addCompany.chooseLocation}
          value={}
          closeBtn={}
          onPress={}
          visible={}
          onbackPress={}
        />

        <Modal
          style={{ margin: 0 }}
          hasBackdrop={false}
          isVisible={}
          animationIn="bounceInUp"
          animationOut="bounceOutDown"
        >
          <Map
            initialLocation={}
            backPress={}
            pressContinue={}
          />
        </Modal>
      </AppView>
    );
  }
}

const mapStateToProps = (state) => {
  const { } = state.LoginReducer;

  return {
    
  };
};

export default connect(mapStateToProps, {
  
})(Step3);

const styles = StyleSheet.create({
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
    height: hp("50%"),
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
    marginBottom: -hp("3.5%"),
    marginLeft: -wp("25%"),
  },
});

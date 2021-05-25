import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Platform,
  TouchableOpacity,
  Text,
} from "react-native";
import { connect } from "react-redux";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { NavigationActions, StackActions } from "react-navigation";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
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
  AutoCompleteList,
} from "../../components";
import { Images, Strings} from '../../common'

const rotation = {
  from: {rotate: "0deg",},
  to: {rotate: "360deg",},
};

class Step2 extends Component {

  bottomContainer = () => {
    return (
      <View style={styles.bottomContainer}>
        <TouchableOpacity onPress={}>
          <View style={styles.cancel}>
            <Text style={styles.cancelText}>{Strings.addMember.cancel}</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={}>
          <View style={styles.submit}>
            <Text style={styles.submitText}>{Strings.addMember.submit}</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };
  
  //Main Render method
  render() {
    return (
      <AppView>
        <KeyboardAwareScrollView
          extraScrollHeight={100}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.parentContainer}>
            <HeaderAnimation />
            <View style={styles.subContainer}>
              <AnimatableView animation={"bounceInLeft"} duration={800}>
                <AnimatableImage
                  animation={rotation}
                  duration={800}
                  source={Images.path2}
                  style={styles.path}
                />
              </AnimatableView>

              <AnimatableView
                animation={"fadeInUpBig"}
                duration={500}
                style={styles.signupContainer}
              >
                <Header
                  backPress={}
                  title={Strings.step2.company}
                />

                <View style={{ flex: 1 }}>
                  <TextField
                    attrName={Strings.placeholders.firstname}
                    title={Strings.placeholders.firstname}
                    value={}
                    maxLength={50}
                    updateMasterState={}
                    textInputStyles={{
                      // here you can add additional TextInput styles
                      color: Colors.black,
                      fontSize: 14,
                    }}
                    onSubmitEditing={}
                  />

                  <TextField
                    attrName={Strings.placeholders.lastname}
                    title={Strings.placeholders.lastname}
                    value={}
                    maxLength={50}
                    updateMasterState={}
                    textInputStyles={{
                      // here you can add additional TextInput styles
                      color: Colors.black,
                      fontSize: 14,
                    }}
                    onSubmitEditing={}
                  />

                  <TextField
                    attrName={Strings.placeholders.companyName}
                    title={Strings.placeholders.companyName}
                    value={}
                    maxLength={50}
                    updateMasterState={}
                    textInputStyles={{
                      // here you can add additional TextInput styles
                      color: Colors.black,
                      fontSize: 14,
                    }}
                    onSubmitEditing={}
                  />

                  <TextField
                    attrName={Strings.placeholders.companyWebsite}
                    title={Strings.placeholders.companyWebsite}
                    value={}
                    autoCapitalize="none"
                    updateMasterState={}
                    textInputStyles={{
                      // here you can add additional TextInput styles
                      color: Colors.black,
                      fontSize: 14,
                    }}
                  />

                  {/* AutoComplete Google Places  */}

                  <TextField
                    attrName={Strings.placeholders.streetName}
                    title={Strings.placeholders.streetName}
                    value={}
                    updateMasterState={}
                    textInputStyles={{
                      // here you can add additional TextInput styles
                      color: Colors.black,
                      fontSize: 14,
                    }}
                  />

                  {//this.state.showAutoComplete && (
                    <AutoCompleteList
                      source={}
                      onSelectPlace={}
                    />
                  }

                  <TextField
                    ref={this.txt_country}
                    attrName={Strings.placeholders.country}
                    title={Strings.placeholders.country}
                    value={}
                    updateMasterState={}
                   
                    textInputStyles={{
                      // here you can add additional TextInput styles
                      color: Colors.black,
                      fontSize: 14,
                    }}
                    onPress={}
                  />

                  <TextField
                    attrName={Strings.placeholders.state}
                    title={Strings.placeholders.state}
                    value={}
                    updateMasterState={}
                    // showButton={true}
                    // imageSource={Images.downArr}
                    textInputStyles={{
                      // here you can add additional TextInput styles
                      color: Colors.black,
                      fontSize: 14,
                    }}
                    onPress={}
                  />

                  <TextField
                    attrName={Strings.placeholders.city}
                    title={Strings.placeholders.city}
                    value={}
                    updateMasterState={}
                    // showButton={true}
                    // imageSource={Images.downArr}
                    textInputStyles={{
                      // here you can add additional TextInput styles
                      color: Colors.black,
                      fontSize: 14,
                    }}
                    onPress={}
                  />

                  <TextField
                    attrName={Strings.placeholders.zipcode}
                    title={Strings.placeholders.zipcode}
                    value={}
                    updateMasterState={}
                    maxLength={10}
                    textInputStyles={{
                      // here you can add additional TextInput styles
                      color: Colors.black,
                      fontSize: 14,
                    }}
                  />

                  {//isFromDeepLink == false && (
                    <NextButton nextClick={ } />
                  }

                  {//isFromDeepLink == true &&
                    this.bottomContainer()}

                  <View style={{ flex: 1, justifyContent: "flex-end" }}>
                    <Steps page={" 2"} />
                  </View>
                </View>
              </AnimatableView>
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
            okTap={}
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

        <Dropdown
          data={}
          title={Strings.addCompany.chooseState}
          value={}
          closeBtn={}
          onPress={}
          visible={}
          onbackPress={}
        />

        <Dropdown
          data={}
          title={Strings.addCompany.chooseCity}
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
  const {  } = state;

  return {
    
  };
};

export default connect(mapStateToProps, {
 
})(Step2);

const styles = StyleSheet.create({
  parentContainer: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  subContainer: {
    flex: 1,
    justifyContent: "flex-end",
  },
  signupContainer: {
    flex: 1,
    width: wp("100%"),
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
    height: hp("43%"),
    marginBottom: -hp("33%"),
    marginRight: -wp("26%"),
    alignSelf: "flex-end",
  },
  bottomContainer: {
    width: wp("90%"),
    flexDirection: "row",
    justifyContent: "center",
    alignSelf: "center",
    marginBottom: hp("8%"),
    marginTop: hp("2%"),
    // backgroundColor: Colors.white
  },
  cancel: {
    width: wp("35%"),
    height: hp("6%"),
    backgroundColor: Colors.shadowColor,
    marginRight: wp("3%"),
    borderRadius: hp("3.5%"),
    justifyContent: "center",
    alignItems: "center",
  },
  submit: {
    width: wp("35%"),
    height: hp("6%"),
    backgroundColor: Colors.themeOpacity,
    marginLeft: wp("3%"),
    borderRadius: hp("3.5%"),
    justifyContent: "center",
    alignItems: "center",
  },
  cancelText: {
    color: "#757575",
    fontFamily: Fonts.montserratSemiBold,
    fontSize: wp("4%"),
  },
  submitText: {
    color: Colors.themeColor,
    fontFamily: Fonts.montserratSemiBold,
    fontSize: wp("4%"),
  },
});


  
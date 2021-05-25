import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity
} from "react-native";
import { connect } from "react-redux";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Colors from "../../common/color";
import Images from "../../common/images";
import Strings from "../../common/string";
import HeaderAnimation from "../../components/logoAnimation/logoAnimation";
import Fonts from "../../common/fonts";
import { View as AnimatableView } from "react-native-animatable";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  renderButton = (text) => {
    return (
      <TouchableOpacity activeOpacity={0.6} onPress={() => this.onPressFunction(text)}>
        <View
          style={
            text === Strings.dashboard.login
              ? styles.signinButton
              : styles.signupButton
          }
        >
          <Text style={styles.buttonText}>{text}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  //Main Render method
  render() {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.parentContainer}>
          <HeaderAnimation />
         {/*  <Text style={styles.loremText}>
            {`${Strings.landing.appDescription}`}
          </Text> */}
          <Text style={styles.loremText}>
            {Strings.landing.appDescText1}
            <Text style={styles.consectetuer}>
              {" "}
              {Strings.landing.appDescText2}
            </Text>
          </Text>
          <AnimatableView
            animation="fadeInUpBig"
            duration={2000}
            style={styles.folloContainer}
          >
            <Image
              source={Images.constImg}
              resizeMode={"contain"}
              style={{
                marginTop: hp("5%"),
                height: hp("30%"),
                width: wp("90%"),
              }}
            />
          </AnimatableView>

          <View style={{ flex: 1, justifyContent: "flex-end" }}>
            {this.renderButton(Strings.dashboard.login)}
            {this.renderButton(Strings.dashboard.createAccount)}
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = (state) => {
 
};

export default connect(mapStateToProps)(Dashboard);

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  parentContainer: {
    flex: 1,
    backgroundColor: Colors.white,
    alignItems: "center",
  },
  loremText: {
    color: Colors.black,
    //fontSize: wp("8%"),
    width: wp("80%"),
    textAlign: "center",
    marginTop: hp("2%"),
    fontFamily: Fonts.montserratRegular,
    fontSize: 25,
  },
  consectetuer: {
    color: Colors.themeColor,
    fontFamily: Fonts.montserratMedium,
    fontSize: 25,
  },
  signinButton: {
    backgroundColor: Colors.sign_in_btn_bg,
    width: wp("90%"),
    height: hp("7%"),
    borderRadius: hp("3.5%"),
    justifyContent: "center",
    alignItems: "center",
    marginBottom: hp("3%"),
  },
  signupButton: {
    backgroundColor: Colors.white,
    width: wp("90%"),
    height: hp("7%"),
    borderRadius: hp("3.5%"),
    justifyContent: "center",
    alignItems: "center",
    marginBottom: hp("3%"),
    borderWidth: hp("0.2%"),
    borderColor: Colors.themeColor,
  },
  buttonText: {
    color: Colors.themeColor,
    fontSize: 18,
    fontFamily: Fonts.montserratSemiBold,
  },
});
import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Text,
  Platform,
  Switch,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from "react-native";
import { connect } from "react-redux";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import {
  AppView,
  AppLoader,
  Header,
  Steps,
  Alert,
  Toastpopup,
} from "../../components";

import { Colors, Fonts, Strings } from "../../common";

import { storeUserid } from "../../actions/postAction";
import Swiper from "react-native-swiper";

import { SIGN_UP,CREATE_PROJECT } from "../../api/Constants";
import { signup,addProject} from "../../api/Api";
import { NavigationActions, StackActions } from "react-navigation";


class Step4 extends Component {
  constructor(props) {
    super(props);
  }

 

  // RENDER PLAN VIEW
  planContainer = (text1, text2, desc, amount, getStarted) => {
    let color = "#FFF";

    if (this.props.navigation.getParam("from") == "upgradePlan") {
      if (
        text1 == "Pro" &&
        this.state.UpgradeData &&
        this.state.UpgradeData.stripePlan.stripeProductName == "Project Plan"
      ) {
        if (
          !this.state.switch &&
          this.state.UpgradeData.stripePlan.stripePlanName == "monthly"
        ) {
          color = "#add8e6";
        } else if (
          this.state.switch &&
          this.state.UpgradeData.stripePlan.stripePlanName == "yearly"
        ) {
          color = "#add8e6";
        }
      }
    }

    //console.log("color", text1);

    return (
      <View style={styles.inner1}>
        <View style={[styles.inner2, { backgroundColor: color }]}>
          <View style={styles.inner3}>
            <View style={styles.round}>
              <Text style={styles.ciruclarText}>{text1}</Text>
            </View>
            <View style={styles.genTextContainer}>
              <Text style={styles.genText}>{text2}</Text>
            </View>
          </View>

          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <Text style={styles.description}>{desc}</Text>
          </View>

          {text1 !== "Ent" && (
            <Text style={styles.cost}>
              {text1 == "Tri"
                ? "Free"
                : this.state.switch == true
                ? "999 $"
                : "49 $"}
            </Text>
          )}
          <TouchableWithoutFeedback
            onPress
          >
            <View style={styles.getStarted}>
              <Text style={styles.startedText}>{getStarted}</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </View>
    );
  };

  //ON TAP PAGINATION DOT


  //RENDER PAGINATION
  renderPagination = (page, total, context) => {
    return (
      <View
        style={{
          alignItems: "center",
          left: 0,
          right: 0,
          position: "absolute",
          bottom: 50,
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        {this.state.pagArr.map((index) => {
          return (
            <TouchableOpacity
              onPress
              key={index.toString()}
              style={{
                backgroundColor:
                  this.state.slider + 1 == index ? "#B1B1B1" : "#FFF",
                width: wp("4%"),
                borderWidth: this.state.slider + 1 == index ? 0 : 1,
                borderColor: "#B1B1B1",
                borderRadius: wp("2%"),
                height: wp("4%"),
                marginLeft: 10,
              }}
            ></TouchableOpacity>
          );
        })}
        {/* <View
          style={{
            borderRadius: 7,
            padding: 3,
            paddingHorizontal: 7,
          }}>
          <Text
            style={{
              color: '#fff',
              fontSize: 14,
            }}>
            {index + 1} / {total}
          </Text>
        </View> */}
      </View>
    );
  };


  //Main Render method
  render() {
    return (
      <AppView>
        <View style={styles.parentContainer}>
          <Header backPress/>

          <Text style={styles.choose}>{Strings.step4.choose}</Text>

          <View style={styles.planContainer}>
            <View style={styles.swithContainer}>
              {this.state.slider == 1 && this.state.upgradePlan == false && (
                <View style={styles.swithContainer}>
                  <Text
                    style={
                      this.state.switch == false
                        ? styles.boldMonth
                        : styles.lightMonth
                    }
                  >
                    {Strings.step4.month}
                  </Text>
                  <Switch
                    style={
                      Platform.OS == "android"
                        ? styles.androidSwitchStyle
                        : styles.iosSwitchStyle
                    }
                    trackColor={{ false: "#000", true: "#000" }}
                    thumbColor={"#fff"}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange
                    value={this.state.switch}
                  />
                  <Text
                    style={
                      this.state.switch == true
                        ? styles.boldMonth
                        : styles.lightMonth
                    }
                  >
                    {Strings.step4.year}
                  </Text>
                </View>
              )}

              {this.state.showSwitch == true && (
                <View>
                  {this.state.upgradePlan == true &&
                    this.state.upgradeTo == "trail" &&
                    this.state.slider == 0 && (
                      <View style={styles.swithContainer}>
                        <Text
                          style={
                            this.state.switch == false
                              ? styles.boldMonth
                              : styles.lightMonth
                          }
                        >
                          {Strings.step4.month}
                        </Text>
                        <Switch
                          style={{
                            transform: [{ scaleX: 0.6 }, { scaleY: 0.6 }],
                          }}
                          trackColor={{ false: "#000", true: "#000" }}
                          thumbColor={"#fff"}
                          ios_backgroundColor="#3e3e3e"
                          onValueChange
                          value={this.state.switch}
                        />
                        <Text
                          style={
                            this.state.switch == true
                              ? styles.boldMonth
                              : styles.lightMonth
                          }
                        >
                          {Strings.step4.year}
                        </Text>
                      </View>
                    )}
                </View>
              )}
            </View>

            {this.state.upgradePlan == false && (
              <Swiper
                ref="swiper"
                style={styles.wrapper}
                onIndexChanged
                loop={false}
                renderPagination
              >
                <View style={{ flex: 1, alignItems: "flex-end" }}>
                  {this.planContainer(
                    "Tri",
                    "al Plan",
                    Strings.step4.trailDes,
                    "Free",
                    "Get Started"
                  )}
                </View>
                <View style={{ flex: 1, alignItems: "flex-end" }}>
                  {this.planContainer(
                    "Pro",
                    "ject Plan",
                    Strings.step4.projectDes,
                    this.state.projectAmount,
                    "Get Started"
                  )}
                </View>
                <View style={{ flex: 1, alignItems: "flex-end" }}>
                  {this.planContainer(
                    "Ent",
                    "erprise Plan",
                    Strings.step4.enterpriseDes,
                    "",
                    "Contact Sales"
                  )}
                </View>
              </Swiper>
            )}

            {this.state.upgradePlan == true && this.state.upgradeTo == "trail" && (
              <Swiper
                ref="swiper"
                style={styles.wrapper}
                onIndexChanged
                loop={false}
                renderPagination
              >
                <View style={{ flex: 1, alignItems: "flex-end" }}>
                  {this.planContainer(
                    "Pro",
                    "ject Plan",
                    Strings.step4.projectDes,
                    this.state.projectAmount,
                    "Get Started"
                  )}
                </View>
                <View style={{ flex: 1, alignItems: "flex-end" }}>
                  {this.planContainer(
                    "Ent",
                    "erprise Plan",
                    Strings.step4.enterpriseDes,
                    "",
                    "Contact Sales"
                  )}
                </View>
              </Swiper>
            )}

            {this.state.upgradePlan == true &&
              this.state.upgradeTo == "project" && (
                <Swiper
                  ref="swiper"
                  style={styles.wrapper}
                  onIndexChanged
                  loop={false}
                  renderPagination
                >
                  <View style={{ flex: 1, alignItems: "flex-end" }}>
                    {this.planContainer(
                      "Ent",
                      "erprise Plan",
                      Strings.step4.enterpriseDes,
                      "",
                      "Contact Sales"
                    )}
                  </View>
                </Swiper>
              )}
          </View>
          <View style={styles.endContainer}>
            {this.state.showStep == true && <Steps page={" 4"} />}
          </View>
        </View>

        {this.state.showLoader && <AppLoader viewRef={this.state.showLoader} />}

        {this.state.showToaster && (
          <Toastpopup
            backPress
            toastMessage
            type
          />
        )}

        {this.state.showAlert && (
          <Alert
            title={Strings.popup.success}
            desc
            okTap
          />
        )}
      </AppView>
    );
  }
}

const mapStateToProps = (state) => {

};

export default connect(mapStateToProps)(Step4);

const styles = StyleSheet.create({
  parentContainer: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  choose: {
    color: Colors.black,
    fontSize: 18,
    width: wp("80%"),
    textAlign: "center",
    alignSelf: "center",
    fontFamily: Fonts.montserratSemiBold,
  },
  planContainer: {
    flex: 2,
    alignItems: "flex-end",
    marginTop: hp("2%"),
  },
  inner1: {
    width: wp("83%"),
    height: hp("45%"),
    borderRadius: wp("5%"),
    zIndex: 999,
    backgroundColor: "#F3F3F3",
    marginRight: wp("6%"),
  },
  inner2: {
    width: wp("76%"),
    height: hp("45%"),
    borderRadius: wp("5%"),
    zIndex: 999,
    backgroundColor: "#FFF",
    borderWidth: Platform.OS == "ios" ? 1 : 0.8,
    shadowOffset: { width: 14, height: 6 },
    shadowOpacity: 1,
    elevation: 3,
    shadowColor: "rgba(0,0,0,0.14)",
    borderLeftWidth: 1,
    borderColor: "#E5E5E5",
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  inner3: {
    flexDirection: "row",
    width: wp("70%"),
    height: hp("10%"),
    marginTop: wp("4%"),
    justifyContent: "center",
  },
  round: {
    width: hp("10%"),
    height: hp("10%"),
    borderRadius: hp("5%"),
    justifyContent: "flex-end",
    alignItems: "center",
    alignSelf: "flex-end",
    backgroundColor: Colors.themeColor,
  },
  ciruclarText: {
    color: Colors.white,
    alignSelf: "flex-end",
    fontFamily: Fonts.montserratSemiBold,
    fontSize: wp("5.5%"),
    marginBottom: wp("2.5%"),
  },
  genTextContainer: {
    justifyContent: "flex-end",
    alignItems: "flex-start",
  },
  genText: {
    color: Colors.black,
    fontFamily: Fonts.montserratSemiBold,
    fontSize: wp("5.5%"),
    bottom: wp("2.5%"),
  },
  description: {
    color: Colors.planDesc,
    fontFamily: Fonts.montserratRegular,
    fontSize: 13,
    width: wp("35%"),
    alignSelf: "center",
    justifyContent: "center",
    textAlign: "center",
    lineHeight: hp("4%"),
    marginTop: hp("2%"),
  },
  cost: {
    marginTop: hp("4%"),
    color: Colors.planCost,
    alignSelf: "center",
    fontSize: 16,
    fontFamily: Fonts.montserratMedium,
  },
  getStarted: {
    width: wp("60%"),
    alignSelf: "center",
    backgroundColor: Colors.sign_in_btn_bg,
    height: hp("5%"),
    borderRadius: hp("2.5%"),
    marginTop: hp("2%"),
    justifyContent: "center",
    alignItems: "center",
  },
  startedText: {
    textAlign: "center",
    color: Colors.themeColor,
    fontSize: 14,
    fontFamily: Fonts.montserratSemiBold,
  },
  swithContainer: {
    width: wp("100%"),
    height: hp("4%"),
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    marginTop: wp("2%"),
    marginBottom: wp("2%"),
  },
  boldMonth: {
    color: Colors.black,
    fontFamily: Fonts.montserratSemiBold,
    fontSize: wp("3.5%"),
  },
  lightMonth: {
    color: Colors.yearLight,
    fontFamily: Fonts.montserratSemiBold,
    fontSize: wp("3.5%"),
  },
  endContainer: {
    width: wp("100%"),
    flex: 0.3,
    justifyContent: "flex-end",
  },
  androidSwitchStyle: { transform: [{ scaleX: 1 }, { scaleY: 1 }] },
  iosSwitchStyle: { transform: [{ scaleX: 0.6 }, { scaleY: 0.6 }] },
});

import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";

import {
  changeTab,
  showSideMenu,
  cameBack,
  editData,
  updateData,
  getUserDetails,
} from "../../actions/postAction";
import { connect } from "react-redux";
import { NavigationEvents } from "react-navigation";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import {
  AppLoader,
  AppView,
  Toastpopup,
  Alert,
  Dropdown,
  DeletePop,
  MobilenumberInput,
} from "../../components";

import { TextField } from "../../components/textinput/Textinput";
import { TextField as TextInput } from "../../components/textinput/addMemberTextinput";

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import {
  isEmpty,
  isName,
  isValidPassword,
  getuniqId,
  mobileCountryCodes,
  Images,
  Strings,
  Fonts,
  Colors,
} from "../../common";

import ScrollableTabView, {
  ScrollableTabBar,
} from "react-native-scrollable-tab-view";
import ModalDropdown from "react-native-modal-dropdown";
import moment from "moment";

let DROPDOWNOPTIONS = [
  { id: "upgrade", name: "upgrade" },
  { id: "Cancel", name: "Cancel" },
];
let UPGRADE = [{ id: "upgrade", name: "upgrade" }];

class Profile extends Component {
  constructor(props) {
    super(props);
  
  }

 
  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.updatedata == true) {
      this.getPlans();
      this.props.updateData(false);
    }
  }

 


  //HEADER COMPONENT
  renderHeader() {
    return (
      <View style={styles.header}>
        <TouchableWithoutFeedback
          onPress={() => {
            this.props.cameBack(true);
            this.props.navigation.goBack();
          }}
        >
          <Image source={Images.backArrow} style={{ marginBottom: 5 }} />
        </TouchableWithoutFeedback>
        <Text style={styles.title}>{Strings.profile.profile}</Text>
      </View>
    );
  }

  //RENDER IMAGE
  renderImage() {
    return (
      <View style={styles.imageContainer}>
        <TouchableWithoutFeedback
          onPress={() => {
            this.setState({
              imageModal: true,
            });
          }}
        >
          <View style={styles.imageButton}>
            <View>
              <Image
                source={
                  this.state.profilePicture
                    ? { uri: this.state.profilePicture }
                    : Images.placeholder
                }
                style={
                  this.state.profilePicture
                    ? {
                        width: hp("12%"),
                        height: hp("12%"),
                        borderRadius: hp("6%"),
                        //width: "100%",
                        // height:"100%",
                        // overflow:"hidden"
                      }
                    : {
                        width: hp("5%"),
                        height: hp("5%"),
                        borderRadius: hp("2.5%"),
                      }
                }
                resizeMode="stretch"
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback
          onPress={() => {
            this.setState({
              imageModal: true,
            });
          }}
        >
          <View style={styles.camera}>
            <Image source={Images.camRound} />
          </View>
        </TouchableWithoutFeedback>
      </View>
    );
  }



  renderChangrPassword = () => {
    return (
      <View style={{ flex: 1 }}>
        <TextField
          showLeft={true}
          attrName={Strings.placeholders.currentPassword}
          title={Strings.placeholders.currentPassword}
          value
          updateMasterState
          hideShow={true}
          maxLength={20}
          hideImage={this.state.showCurren ? Images.hide : Images.unhide}
          onPressHideImage
          textInputStyles={{
            // here you can add additional TextInput styles
            color: Colors.black,
            fontSize: 14,
            width: "75%",
            marginLeft: wp("10%"),
          }}
          textTitleStyles={{
            marginLeft: wp("10%"),
          }}
          leftImage={Images.lock}
          secureTextEntry={!this.state.showCurren}
        />

        <TextField
          showLeft={true}
          attrName={Strings.placeholders.newPassword}
          title={Strings.placeholders.newPassword}
          value
          updateMasterState
          hideShow={true}
          maxLength={20}
          hideImage={this.state.showNew ? Images.hide : Images.unhide}
          onPressHideImage
          textInputStyles={{
            // here you can add additional TextInput styles
            color: Colors.black,
            fontSize: 14,
            width: "75%",
            marginLeft: wp("10%"),
          }}
          leftImage={Images.lock}
          textTitleStyles={{
            marginLeft: wp("10%"),
          }}
          secureTextEntry={!this.state.showNew}
        />

        <TextField
          showLeft={true}
          attrName={Strings.placeholders.confirmPassword}
          title={Strings.placeholders.confirmPassword}
          value
          updateMasterState
          hideShow={true}
          maxLength={20}
          hideImage={this.state.showConfirm ? Images.hide : Images.unhide}
          onPressHideImage
          textInputStyles={{
            // here you can add additional TextInput styles
            color: Colors.black,
            fontSize: 14,
            width: "75%",
            marginLeft: wp("10%"),
          }}
          leftImage={Images.lock}
          textTitleStyles={{
            marginLeft: wp("10%"),
          }}
          secureTextEntry={!this.state.showConfirm}
        />

        <TouchableOpacity
          onPress
          style={{
            width: wp("50%"),
            alignSelf: "center",
            height: hp("7%"),
            marginTop: hp("5%"),
            backgroundColor: Colors.themeOpacity,
            borderRadius: hp("3.5%"),
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View
          // style={{
          //   width: wp("50%"),
          //   alignSelf: "center",
          //   height: hp("7%"),
          //   marginTop: hp("5%"),
          //   backgroundColor: Colors.themeOpacity,
          //   borderRadius: hp("3.5%"),
          //   justifyContent: "center",
          //   alignItems: "center",
          // }}
          >
            <Text
              style={{
                fontSize: wp("5%"),
                color: Colors.themeColor,
                fontFamily: Fonts.montserratSemiBold,
              }}
            >
              {Strings.profile.update}
            </Text>
          </View>
        </TouchableOpacity>

        {/* <NextButton
          title={Strings.login.signIn}
          nextClick={() => this.nextClick()}
        /> */}
      </View>
    );
  };

  renderProfileManagement = () => {
    return (
      <View style={{ flex: 1 }}>
        <TextInput
          attrName={Strings.placeholders.firstname}
          title={Strings.placeholders.firstname}
          value
          updateMasterState
          textInputStyles={{
            color: Colors.black,
            fontSize: 14,
          }}
          onSubmitEditing
          mandatory={true}
        />
        <TextInput
          attrName={Strings.placeholders.lastname}
          title={Strings.placeholders.lastname}
          value
          updateMasterState
          textInputStyles={{
            // here you can add additional TextInput styles
            color: Colors.black,
            fontSize: 14,
          }}
          onSubmitEditing
        />
        <TextInput
          attrName={Strings.placeholders.companyName}
          title={Strings.placeholders.companyName}
          value
          updateMasterState
          textInputStyles={{
            // here you can add additional TextInput styles
            color: Colors.black,
            fontSize: 14,
          }}
          onSubmitEditing
          mandatory={true}
        />
        <TextInput
          attrName={Strings.placeholders.workEmail}
          title={Strings.placeholders.workEmail}
          value
          updateMasterState
          textInputStyles={{
            // here you can add additional TextInput styles
            color: Colors.placeholder,
            fontSize: 14,
          }}
          onSubmitEditing
          editable={false}
          mandatory={true}
        />
        <TextInput
          attrName={Strings.placeholders.companyWebsite}
          title={Strings.placeholders.companyWebsite}
          value
          autoCapitalize="none"
          updateMasterState
          textInputStyles={{
            // here you can add additional TextInput styles
            color: Colors.black,
            fontSize: 14,
          }}
          mandatory={true}
        />

        <MobilenumberInput
          attrName={Strings.placeholders.mobile}
          title={Strings.placeholders.mobile}
          value
          countryCode
          imageSource={Images.downArr}
          updateMasterState
          maxLength={10}
          keyboardType={"number-pad"}
          onSubmitEditing
          onPresscountry
          mandatory={true}
        />

        <TextInput
          attrName={Strings.placeholders.role}
          title={Strings.placeholders.role}
          value
          updateMasterState
          textInputStyles={{
            // here you can add additional TextInput styles
            color: Colors.placeholder,
            fontSize: 14,
          }}
          editable={false}
          mandatory={true}
        />

        <TextInput
          attrName={Strings.placeholders.companyAddress}
          title={Strings.placeholders.companyAddress}
          value
          updateMasterState={(key, value) => {
            this.onchangeText(key, value);
          }}
          textInputStyles={{
            // here you can add additional TextInput styles
            color: Colors.black,
            fontSize: 14,
          }}
          mandatory={true}
        />

        <TextInput
          attrName={Strings.placeholders.addressline2}
          title={Strings.placeholders.addressline2}
          value
          updateMasterState
          textInputStyles={{
            // here you can add additional TextInput styles
            color: Colors.black,
            fontSize: 14,
          }}
        />

        <TouchableOpacity
          onPress={() => {
            this.editProfile();
          }}
          style={{
            width: wp("50%"),
            alignSelf: "center",
            height: hp("7%"),
            marginTop: hp("5%"),
            backgroundColor: Colors.themeOpacity,
            borderRadius: hp("3.5%"),
            justifyContent: "center",
            alignItems: "center",
            marginBottom: 15,
          }}
        >
          <View>
            <Text
              style={{
                fontSize: wp("5%"),
                color: Colors.themeColor,
                fontFamily: Fonts.montserratSemiBold,
              }}
            >
              {Strings.profile.update}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  renderPlans = () => {
    return (
      <View style={{ flex: 1 }}>
        <FlatList
          // nestedScrollEnabled={true}
          data
          renderItem={this.renderFlatListItem}
          style={{ marginBottom: 50 }}
          // ItemSeparatorComponent={this.itemSeparator}
          keyExtractor={(item, index) => index.toString()}
          onEndReached
          onEndReachedThreshold={0}
          onMomentumScrollBegin={() => {
            this.onEndReachedCalledDuringMomentum = false;
          }}
          onRefresh
          refreshing
        />
      </View>
    );
  };

  renderRow = (option, index, isSelected) => {
    return (
      <View
        style={{
          width: wp("40%"),
          flexDirection: "row",
          alignItems: "center",
          height: hp("5%"),
          backgroundColor: "white",
        }}
      >
        <Text
          style={{
            fontSize: wp("4%"),
            fontFamily: Fonts.montserratMedium,
            color: Colors.planDesc,
            marginLeft: 10,
          }}
        >
          {option.id}
        </Text>
      </View>
    );
  };


  renderSeparator = () => {
    return <View style={{ flex: 1, backgroundColor: Colors.white }} />;
  };

  renderFlatListItem = ({ item, index }) => {
    if (__DEV__) {
      //console.log("ITEM STATUS =====", item);
    }

    let itemStatus = "Active";

    if (item.status == "trialoverdue" || item.status == "canceled") {
      itemStatus = "Expired";
    }

    return (
      <View style={styles.FlatlistContainer}>
        <View
          style={{ flexDirection: "row", marginVertical: 15, marginLeft: 15 }}
        >
          <Text
            style={{
              color: Colors.black,
              width: wp("70%"),
              paddingTop: 10,
              fontFamily: Fonts.montserratMedium,
              fontSize: 14,
            }}
          >
            {item.projectName}
          </Text>
          <View style={{ width: wp("20") }}>
            <ModalDropdown
              style={styles.customDropdownStyle}
              dropdownStyle={
                item.status == "trialoverdue" ||
                item.status == "canceled" ||
                item.stripePlan.stripeProductName == "Trial Plan"
                  ? styles.customOptionStyle
                  : styles.customOptionsStyle
              }
              dropdownTextStyle={styles.customOptionsTextStyle}
              options={
                item.status == "trialoverdue" ||
                item.status == "canceled" ||
                item.stripePlan.stripeProductName == "Trial Plan"
                  ? UPGRADE
                  : DROPDOWNOPTIONS
              }
              renderRow
              renderSeparator
              showsVerticalScrollIndicator={false}
              onSelect
              defaultValue=""
            >
              <View>
                <Image source={Images.dotmenu} />
              </View>
            </ModalDropdown>
          </View>
        </View>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <View style={{ width: wp("40%"), marginLeft: 15 }}>
            <Text
              style={{
                color: "#5B5B5B",
                fontSize: wp("4%"),
                fontFamily: Fonts.montserratRegular,
              }}
            >
              Subscription Plan
            </Text>
            <Text
              style={{
                color: Colors.black,
                fontSize: 14,
                fontFamily: Fonts.montserratRegular,
              }}
            >
              {item.stripePlan.stripeProductName}
            </Text>
          </View>
          <View style={{ width: wp("40%"), right: 15, marginLeft: 10 }}>
            <Text
              style={{
                color: "#5B5B5B",
                fontSize: wp("4%"),
                fontFamily: Fonts.montserratRegular,
              }}
            >
              Subscribed On
            </Text>
            <Text
              style={{
                color: Colors.black,
                fontSize: 14,
                fontFamily: Fonts.montserratRegular,
              }}
            >
              {item.subscribedOn !== null
                ? moment(item.subscribedOn).format("L")
                : "---"}
            </Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 15,
            marginBottom: 15,
          }}
        >
          <View style={{ width: wp("40%"), marginLeft: 15 }}>
            <Text
              style={{
                color: "#5B5B5B",
                fontSize: wp("4%"),
                fontFamily: Fonts.montserratRegular,
              }}
            >
              Auto Renewal On
            </Text>
            <Text
              style={{
                color: Colors.black,
                fontSize: 14,
                fontFamily: Fonts.montserratRegular,
              }}
            >
              {item.status == "trialoverdue"
                ? "---"
                : item.subDetail
                ? moment(item.subDetail.autoRenewal).format("L")
                : "---"}
            </Text>
          </View>
          <View style={{ width: wp("40%"), right: 15, marginLeft: 10 }}>
            <Text
              style={{
                color: "#5B5B5B",
                fontSize: wp("4%"),
                fontFamily: Fonts.montserratRegular,
              }}
            >
              Status
            </Text>
            <Text
              style={{
                color: Colors.black,
                fontSize: 14,
                fontFamily: Fonts.montserratRegular,
              }}
            >
              {itemStatus}
            </Text>
          </View>
        </View>
      </View>
    );
  };

  

  //RENDER
  render() {
    return (
      <AppView>
        <NavigationEvents
          onDidFocus={() => {
           // this.getPlans();
            // this.getProjectList()
          }}
          onDidBlur={() => {
            // alert('blur')
          }}
        />
        <View style={styles.parentContainer}>
          {this.renderHeader()}

          {this.renderImage()}

          <ScrollableTabView
            nestedScrollEnabled={true}
            renderTabBar={() => <ScrollableTabBar />}
            style={{ marginTop: 20 }}
            initialPage={0}
            tabBarUnderlineStyle={{
              backgroundColor: Colors.themeColor,
            }}
            tabBarBackgroundColor={"#F5F5F5"}
            tabBarActiveTextColor={Colors.themeColor}
            tabBarInactiveTextColor={"#A8B2B9"}
            tabBarTextStyle={{
              fontSize: wp("4%"),
              fontFamily: Fonts.montserratMedium,
              fontWeight:'normal',
              //padding:10
            }}
          >
            <View tabLabel="Profile Management" >
              <KeyboardAwareScrollView extraScrollHeight={100}>
                {this.renderProfileManagement()}
              </KeyboardAwareScrollView>
            </View>

            {/*     {this.props.projectRoleId == 2 && (
              <View tabLabel="Plans And Projects">
                <KeyboardAwareScrollView extraScrollHeight={150}>
                  {this.renderPlans()}
                </KeyboardAwareScrollView>
              </View>
            )} */}

            <View tabLabel="Change Password">
              <KeyboardAwareScrollView>
                {this.renderChangrPassword()}
              </KeyboardAwareScrollView>
            </View>
          </ScrollableTabView>
        </View>

        {this.state.showLoader && <AppLoader viewRef={this.state.showLoader} />}

        {this.state.showToaster && (
          <Toastpopup
            backPress
            toastMessage
            type
            container={{ marginBottom: hp("12%") }}
          />
        )}

        {this.state.showAlert && (
          <Alert
            title={Strings.popup.success}
            desc={Strings.popup.changepasswordSuccess}
            okTap
          />
        )}

        {this.state.showCancel && (
          <DeletePop
            title={Strings.popup.success}
            desc={Strings.popup.cancelSub}
            descStyles={{
              width: "80%",
            }}
            acceptTap
            container={{ bottom: 0 }}
            declineTap
          />
        )}

        <Dropdown
          data
          title={Strings.addCompany.chooseCountry}
          value
          closeBtn
          onPress
          visible
          onbackPress
        />

        <Dropdown
          data
          title={Strings.profile.ChooseOption}
          value={""}
          closeBtn
          onPress
          visible
          onbackPress
          container={{ justifyContent: "center", alignItems: "center" }}
          textContainer={{ fontSize: 14 }}
        />
      </AppView>
    );
  }
}

const mapStateToProps = (state) => {
 
};

export default connect(mapStateToProps(Profile);

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  parentContainer: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  header: {
    width: wp("100%"),
    height: hp("12%"),
    flexDirection: "row",
    alignItems: "flex-end",
    paddingBottom: hp("3%"),
    paddingLeft: wp("4%"),
  },
  title: {
    width: wp("80%"),
    fontSize: wp("6%"),
    textAlign: "center",
    fontFamily: Fonts.montserratBold,
  },
  imageContainer: {
    width: wp("100%"),
    height: hp("13%"),
    alignItems: "center",
  },
  imageButton: {
    width: hp("12%"),
    height: hp("12%"),
    borderRadius: hp("6%"),
    backgroundColor: "#F5F5F5",
    borderWidth: 1,
    borderColor: "#00000029",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  placeholder: {
    width: wp("15%"),
    alignSelf: "center",
  },
  camera: {
    position: "absolute",
    bottom: 10,
    //right: -10,
    right: 140,
    width: wp("8%"),
    height: wp("8%"),
    borderRadius: wp("4%"),
    backgroundColor: Colors.white,
    justifyContent: "center",
    alignItems: "center",
  },
  FlatlistContainer: {
    width: wp("90%"),
    marginVertical: 10,
    backgroundColor: Colors.white,
    borderColor: Colors.shadowColor,
    borderWidth: 0.3,
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 1,
    elevation: 3,
    shadowColor: "rgba(0,0,0,0.14)",
    alignSelf: "center",
    borderRadius: wp("2%"),
  },
  customDropdownStyle: {
    justifyContent: "center",
    alignItems: "center",
    height: 40,
    marginRight: 10,
  },
  customOptionsStyle: {
    justifyContent: "flex-end",
    height: hp("10%"),
    width: wp("35%"),
    marginLeft: 5,
    borderColor: Colors.white,
    borderWidth: 0.3,
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 1,
    elevation: 3,
    shadowColor: "rgba(0,0,0,0.14)",
    alignSelf: "center",
    borderRadius: wp("5%"),
    //outlineProvider: 'bounds'
  },
  customOptionStyle: {
    justifyContent: "flex-end",
    height: hp("5%"),
    width: wp("35%"),
    marginLeft: 5,
    borderColor: Colors.white,
    borderWidth: 0.3,
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 1,
    elevation: 3,
    shadowColor: "rgba(0,0,0,0.14)",
    alignSelf: "center",
    borderRadius: wp("5%"),
  },
  customOptionsTextStyle: {
    fontSize: 11,
    fontFamily: Fonts.montserratMedium,
    textAlign: "center",
    color: Colors.planDesc,
    height: hp("3%"),
  },
});

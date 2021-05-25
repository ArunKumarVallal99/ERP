import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Platform,
} from "react-native";
import axios from "axios";
import {
  changeTab,
  showSideMenu,
  countryList,
  cameBack,
  editData,
  updateList,
  refreshPage,
  refreshDashboard,
} from "../../actions/postAction";
import { connect } from "react-redux";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import {
  AppView,
  AppLoader,
  Toastpopup,
  Alert,
  Dropdown,
  AutoCompleteList,
} from "../../components";
import { TextField } from "../../components/textinput/addMemberTextinput";

import {
  isCompany,
  isEmpty,
  isAlphaNumeric,
  getuniqId,
  Colors,
  Images,
  Strings,
  Fonts,
} from "../../common/";

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import {
  GET_STATE,
  GET_CITY,
  GET_COUNTRY,
  ADD_COMPANY,
  EDIT_COMPANY,
  GET_DEFINABLE,
  UPDATE_COMPANY_IMAGE,
} from "../../api/Constants";
import {
  getStateList,
  getCityList,
  getCountryList,
  addCompany,
  editCompany,
  getDefinableList,
  updateImage,
} from "../../api/Api";

import { ApiKeys, googleAutoCompleteAPI } from "../../api/GoogleServices";


const API_KEY = Platform.OS == "android" ? ApiKeys.android : ApiKeys.ios;

class AddCompanies extends Component {
  constructor(props) {
    super(props);
    
  }




  //HEADER COMPONENT
  renderHeader() {
    return (
      <View style={styles.header}>
        <TouchableWithoutFeedback
          onPress
        >
          <Image source={Images.backArrow} style={{ marginBottom: 5 }} />
        </TouchableWithoutFeedback>
        <Text style={styles.title}>{Strings.addCompany.add}</Text>
      </View>
    );
  }

  renderImage() {
    return (
      <View style={styles.imageContainer}>
        <TouchableWithoutFeedback
          onPress
        >
          <View style={styles.imageButton}>
            <Image
              resizeMode={"center"}
              source={
                this.state.logo ? { uri: this.state.logo } : Images.companyPlace
              }
              style={styles.imageButton}
            />
            <View style={styles.camera}>
              <Image source={Images.camRound} />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </View>
    );
  }

  renderMemberId() {
    return (
      <View style={styles.memberContainer}>
        <Text style={styles.idTitle}>{Strings.addMember.id}</Text>
        <Text style={styles.idText}>{this.props.lastid}</Text>
      </View>
    );
  }

 


  bottomContainer = () => {
    return (
      <View style={styles.bottomContainer}>
        <TouchableOpacity onPress>
          <View style={styles.cancel}>
            <Text style={styles.cancelText}>{Strings.addMember.cancel}</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress
        >
          <View style={styles.submit}>
            <Text style={styles.submitText}>
              {this.state.edit == true
                ? Strings.addMember.update
                : Strings.addMember.submit}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };


  render() {
    return (
      <AppView>
        <View style={styles.parentContainer}>
          {this.renderHeader()}

          <KeyboardAwareScrollView extraScrollHeight={50}>
            {this.renderImage()}

            <TextField
              attrName={Strings.placeholders.companyName}
              title={Strings.placeholders.companyName}
              value
              maxLength={150}
              updateMasterState
              mandatory={true}
              textInputStyles={{
                // here you can add additional TextInput styles
                color: Colors.black,
                fontSize: 14,
              }}
            />

            <TextField
              attrName={Strings.placeholders.addressline1}
              title={Strings.placeholders.addressline1}
              value
              maxLength={150}
              updateMasterState
              mandatory={true}
              textInputStyles={{
                // here you can add additional TextInput styles
                color: Colors.black,
                fontSize: 14,
              }}
            />

            {this.state.showAutoComplete && (
              <AutoCompleteList
                source
                onSelectPlace
              />
            )}

            <TextField
              attrName={Strings.placeholders.addressline2}
              title={Strings.placeholders.addressline2}
              value
              maxLength={150}
              updateMasterState
              mandatory={false}
              textInputStyles={{
                // here you can add additional TextInput styles
                color: Colors.black,
                fontSize: 14,
              }}
            />

            {/* <DropDownPicker
              items={this.state.dfowList}
              defaultValue={this.state.selectedRole}
              placeholder= {Strings.placeholders.company}
              placeholderStyle={{color: Colors.placeholder, fontSize: 14}}
              containerStyle={{height: hp('6%')}}
              style={{backgroundColor: Colors.white, width: wp('90%'), borderColor: '#0000', borderBottomColor: Colors.placeholder, alignSelf: 'center', height: hp('5%')}}
              itemStyle={{
                  justifyContent: 'flex-start'
              }}
              dropDownStyle={{backgroundColor: Colors.white, width: wp('90%'), alignSelf: 'center'}}
              onChangeItem={item => this.setState({
                selectedRole: null,
              })}
              zIndex={3000}
            /> */}

            <TextField
              attrName={Strings.placeholders.country}
              title={Strings.placeholders.country}
              value
              mandatory={true}
              textInputStyles={{
                // here you can add additional TextInput styles
                color: Colors.black,
                fontSize: 14,
              }}
              // showButton={true}
              onPress={() => {
                // this.setState({ roleModal: true });
              }}
              // imageSource={Images.downArr}
              // placeholder={"Select"}
              onPress={() => {
                // this.setState({ countryVisible: true });
              }}
            />

            <TextField
              attrName={Strings.placeholders.state}
              title={Strings.placeholders.state}
              value
              mandatory={true}
              textInputStyles={{
                // here you can add additional TextInput styles
                color: Colors.black,
                fontSize: 14,
              }}
              // showButton={true}
              // onPress={() => {
              //  this.setState({ roleModal: true });
              // }}
              //imageSource={Images.downArr}
              // placeholder={"Select"}
              //onPress={() => {
              // this.onPressStateDrop();
              // }}
            />

            <TextField
              attrName={Strings.placeholders.city}
              title={Strings.placeholders.city}
              value
              mandatory={true}
              textInputStyles={{
                // here you can add additional TextInput styles
                color: Colors.black,
                fontSize: 14,
              }}
              // showButton={true}
              // onPress={() => {
              // this.setState({ roleModal: true });
              // }}
              // imageSource={Images.downArr}
              //  placeholder={"Select"}
              // onPress={() => {
              //  this.onPressCityDrop();
              // }}
            />

            <TextField
              attrName={Strings.placeholders.zipcode}
              title={Strings.placeholders.zipcode}
              value
              updateMasterState
              maxLength={10}
              mandatory={true}
              textInputStyles={{
                // here you can add additional TextInput styles
                color: Colors.black,
                fontSize: 14,
              }}
            />

            <TextField
              attrName={Strings.placeholders.website}
              title={Strings.placeholders.website}
              value
              autoCapitalize="none"
              updateMasterState
              mandatory={true}
              textInputStyles={{
                // here you can add additional TextInput styles
                color: Colors.black,
                fontSize: 14,
              }}
            />

            <TextField
              attrName={Strings.placeholders.additionalNotes}
              title={Strings.placeholders.additionalNotes}
              value
              updateMasterState
              container={{ height: hp("20%") }}
              mandatory={false}
              maxLength={150}
              textInputStyles={styles.txtAdditonalNotes}
              multiline={true}
            />

            {this.bottomContainer()}
          </KeyboardAwareScrollView>
        </View>

        <Dropdown
          title={Strings.addCompany.chooseCountry}
          closeBtn={() => this.setState({ countryVisible: false })}
          data
          value
          onPress
          visible
          onbackPress
        />

        <Dropdown
          title={Strings.addCompany.chooseState}
          data
          value
          onPress
          visible
          onbackPress
          closeBtn
        />

        <Dropdown
          title={Strings.addCompany.chooseCity}
          data
          value
          onPress
          visible
          onbackPress
          closeBtn
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
            desc={Strings.popup.loginSuccess}
            okTap
          />
        )}
      </AppView>
    );
  }
}

const mapStateToProps = (state) => {

};

export default connect(mapStateToProps)(AddCompanies);

const styles = StyleSheet.create({
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
    height: hp("15%"),
    justifyContent: "center",
    alignItems: "center",
  },
  imageButton: {
    width: wp("35%"),
    height: wp("20%"),
    borderRadius: wp("4%"),
    backgroundColor: "#F5F5F5",
  },
  placeholder: {
    width: wp("15%"),
    alignSelf: "center",
  },
  camera: {
    position: "absolute",
    bottom: -10,
    right: -10,
    width: wp("8%"),
    height: wp("8%"),
    borderRadius: wp("4%"),
    backgroundColor: Colors.white,
    justifyContent: "center",
    alignItems: "center",
  },
  memberContainer: {
    width: wp("90%"),
    height: hp("10%"),
    alignSelf: "center",
    marginTop: hp("2%"),
    justifyContent: "center",
  },
  idTitle: {
    color: Colors.placeholder,
    fontSize: wp("4%"),
    fontFamily: Fonts.montserratMedium,
  },
  idText: {
    width: wp("90%"),
    height: hp("5%"),
    backgroundColor: "#EFEFEF",
    marginTop: wp("1%"),
    padding: hp("1%"),
    paddingLeft: 15,
    color: Colors.themeColor,
    fontFamily: Fonts.montserratMedium,
    fontSize: wp("4%"),
  },
  bottomContainer: {
    width: wp("90%"),
    flexDirection: "row",
    justifyContent: "center",
    alignSelf: "center",
    marginBottom: hp("4%"),
    marginTop: hp("8%"),
  },
  cancel: {
    width: wp("35%"),
    height: hp("7%"),
    backgroundColor: Colors.shadowColor,
    marginRight: wp("3%"),
    borderRadius: hp("3.5%"),
    justifyContent: "center",
    alignItems: "center",
  },
  submit: {
    width: wp("35%"),
    height: hp("7%"),
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
  txtAdditonalNotes: {
    // here you can add additional TextInput styles
    color: Colors.black,
    fontSize: 14,
    height: hp("17%"),
    marginTop: hp("2%"),
    paddingTop: hp("3%"),
  },
});

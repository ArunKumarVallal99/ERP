import React, { Component } from "react";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import { connect } from "react-redux";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Colors from "../../common/color";
import Toastpopup from "../../components/toastpopup/Toastpopup";
import Loader from "../../components/loader/Loader";
import Alert from "../../components/toastpopup/alert";
import Images from "../../common/images";
import Strings from "../../common/string";
import Fonts from "../../common/fonts";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { TextField } from "../../components/textinput/addMemberTextinput";
import Dropdown from "../../components/dropdown/dropdown";


class AddEquipment extends Component {
  constructor(props) {
    super(props);
  }


  //HEADER COMPONENT
  renderHeader() {
    return (
      <View style={styles.header}>
        <TouchableWithoutFeedback
          onPress={() => {
            this.props.cameBack(true);
            this.props.refreshPage(true);
            this.props.navigation.goBack();
          }}
        >
          <Image source={Images.backArrow} style={{ marginBottom: 5 }} />
        </TouchableWithoutFeedback>
        <Text style={styles.title}>{Strings.addEquipment.new}</Text>
      </View>
    );
  }

  renderMemberId() {
    return (
      <View style={styles.memberContainer}>
        <Text style={styles.idTitle}>{Strings.addEquipment.id}</Text>
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
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.parentContainer}>
          {this.renderHeader()}
          <KeyboardAwareScrollView extraScrollHeight={50}>
            {this.renderMemberId()}
            <TextField
              attrName={Strings.addEquipment.name}
              title={Strings.addEquipment.name}
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
              attrName={Strings.addEquipment.type}
              title={Strings.addEquipment.type}
              value
              updateMasterState
              mandatory={true}
              textInputStyles={{
                // here you can add additional TextInput styles
                color: Colors.black,
                fontSize: 14,
              }}
            />

            <TextField
              attrName={Strings.placeholders.controlledBy}
              title={Strings.placeholders.contactPerson}
              value
              updateMasterState
              mandatory={true}
              textInputStyles={{
                // here you can add additional TextInput styles
                color: Colors.black,
                fontSize: 14,
              }}
              showButton={true}
              onPress={() => {
                this.setState({ modalVisible: true });
              }}
              imageSource={Images.downArr}
              placeholder={"Select"}
            />
          </KeyboardAwareScrollView>
          {this.bottomContainer()}
        </View>

        {this.state.showLoader && (
          <BlurView
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              bottom: 0,
              right: 0,
            }}
            viewRef={this.state.showLoader}
            blurType="light"
            blurAmount={10}
            reducedTransparencyFallbackColor="white"
          >
            <Loader />
          </BlurView>
        )}
        {this.state.showToaster && (
          <Toastpopup
            backPress={() => this.setState({ showToaster: false })}
            toastMessage={this.state.toastMessage}
            type={this.state.toastType}
            container={{ marginBottom: hp("12%") }}
          />
        )}

        {this.state.showAlert && (
          <Alert
            title={Strings.popup.success}
            desc={Strings.popup.loginSuccess}
            okTap={() => {
              this.okTap();
            }}
          />
        )}
        <Dropdown
          data
          title={Strings.addEquipment.contact}
          value
          closeBtn
          onPress
          visible
          onbackPress
        />
      </SafeAreaView>
    );
  }
}

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
    height: hp("20%"),
    justifyContent: "center",
    alignItems: "center",
  },
  imageButton: {
    width: wp("24%"),
    height: wp("24%"),
    borderRadius: wp("12%"),
    backgroundColor: "#F5F5F5",
    borderWidth: 1,
    borderColor: "#00000029",
  },
  placeholder: {
    width: wp("15%"),
    alignSelf: "center",
  },
  camera: {
    position: "absolute",
    bottom: 10,
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
    flex: 1,
    width: wp("90%"),
    alignItems: "flex-end",
    justifyContent: "center",
    flexDirection: "row",
    alignSelf: "center",
    marginBottom: hp("4%"),
    bottom: 0,
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
});

const mapStateToProps = (state) => {

};

export default connect(mapStateToProps)(AddEquipment);

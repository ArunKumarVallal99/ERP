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
import { TextField } from "../../components/textinput/addMemberTextinput";
import { BlurView } from "@react-native-community/blur";

class AddGates extends Component {
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
            this.props.navigation.goBack();
          }}
        >
          <Image source={Images.backArrow} style={{ marginBottom: 5 }} />
        </TouchableWithoutFeedback>
        <Text style={styles.title}>{Strings.addGate.add}</Text>
      </View>
    );
  }

  renderImage() {
    return (
      <View style={styles.imageContainer}>
        <TouchableWithoutFeedback
          onPress={() => {
            // alert('coming soon')
          }}
        >
          <View style={styles.imageButton}>
            <Image
              resizeMode={"center"}
              source={Images.placeholder}
              style={styles.imageButton}
            />
            <View style={styles.camera}>
              <Image source={Images.camera} />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </View>
    );
  }


  bottomContainer = () => {
    return (
      <View style={styles.bottomContainer}>
        <TouchableOpacity
          onPress={() => {
            this.props.cameBack(true);
            this.props.navigation.goBack();
          }}
        >
          <View style={styles.cancel}>
            <Text style={styles.cancelText}>{Strings.addMember.cancel}</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress
        >
          <View style={styles.submit}>
            <Text style={styles.submitText}>
              {this.state.update == true
                ? Strings.addMember.update
                : Strings.addMember.submit}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  renderMemberId() {
    return (
      <View style={styles.memberContainer}>
        <Text style={styles.idTitle}>{Strings.gates.gateId}</Text>
        <Text style={styles.idText}>
          {this.state.gateAutoId !==0
            ? this.state.gateAutoId
            : this.state.memberId}
        </Text>
      </View>
    );
  }

  render() {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.parentContainer}>
          {this.renderHeader()}
          {this.renderMemberId()}

          <TextField
            attrName={Strings.placeholders.gateName}
            title={Strings.placeholders.gateName}
            value
            maxLength={150}
            updateMasterState
            mandatory={true}
            textInputStyles={{
              // here you can add additional TextInput styles
              color: Colors.black,
              fontSize: wp("4.5%"),
            }}
          />

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
    flexDirection: "row",
    marginBottom: hp("5%"),
    marginTop: hp("8%"),
    alignSelf: "center",
    alignItems: "flex-end",
    justifyContent: "center",
  },
  cancel: {
    width: wp("35%"),
    height: hp("7%"),
    backgroundColor: Colors.shadowColor,
    marginRight: wp("3%"),
    borderRadius: hp("3.5%"),
    justifyContent: "center",
    alignItems: "center",
    bottom: 0,
  },
  submit: {
    width: wp("35%"),
    height: hp("7%"),
    backgroundColor: Colors.themeOpacity,
    marginLeft: wp("3%"),
    borderRadius: hp("3.5%"),
    justifyContent: "center",
    alignItems: "center",
    bottom: 0,
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
  const {
    changeTab,
    showMenu,
    lastid,
    projectDetails,
    editedData,
  } = state.LoginReducer;

  return {
    changeTab,
    showMenu,
    lastid,
    projectDetails,
    editedData,
  };
};

export default connect(mapStateToProps)(AddGates);

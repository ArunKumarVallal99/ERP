import React, { Component } from "react";
import {
  View,
  Text,

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

import { AppView, AppLoader, Toastpopup, Alert } from "../../components";

import { TextField } from "../../components/textinput/addMemberTextinput";

import {
  Images,
  Strings,
  Fonts,
  Colors,
  isAlphaNumeric,
  isEmpty,

} from "../../common";

class AddDFOW extends Component {
  constructor(props) {
    super(props);
    this.state = {
      memberId: this.props.lastid,
      update: false,
      gateName: "",
      updateId: 0,
      showToaster: false,
    };
  }


  //HEADER COMPONENT
  renderHeader() {
    return (
      <View style={styles.header}>
        <TouchableWithoutFeedback
          onPress={() => {
            this.props.cameBack(true);
            // this.props.navigation.navigate('Plus');
            this.props.navigation.goBack();
          }}
        >
          <Image source={Images.backArrow} style={{ marginBottom: 5 }} />
        </TouchableWithoutFeedback>
        <Text style={styles.title}>{Strings.addGate.addNew}</Text>
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
          onPress
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
        <Text style={styles.idTitle}>{Strings.gates.id}</Text>
        <Text style={styles.idText}>{this.state.memberId}</Text>
      </View>
    );
  }

  render() {
    return (
      <AppView>
        <View style={styles.parentContainer}>
          {this.renderHeader()}
          {this.renderMemberId()}

          <TextField
            attrName={Strings.menu.dfow}
            title={Strings.menu.dfow}
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

          {this.bottomContainer()}
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
            desc={Strings.popup.loginSuccess}
            okTap
          />
        )}
      </AppView>
    );
  }
}

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
};

export default connect(mapStateToProps)(AddDFOW);

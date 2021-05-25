import React, { Component } from "react";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
  FlatList,
  Keyboard,
  Platform,
} from "react-native";
import { connect } from "react-redux";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Colors from "../../common/color";
import Images from "../../common/images";
import Strings from "../../common/string";
import Fonts from "../../common/fonts";
import ModalDropdown from "react-native-modal-dropdown";

let DROPDOWNOPTIONSROLE = [
  { id: "Project Admin", image: Images.edit1, name: "Project Admin" },
  { id: "General Contractor", image: Images.edit1, name: "General Contractor" },
  { id: "Sub Contractor", image: Images.edit1, name: "Sub Contractor" },
];

class InviteMember extends Component {
  constructor(props) {
    super(props);

  }}

  //HEADER COMPONENT
  renderHeader() {
    return (
      <View style={styles.header}>
        <TouchableWithoutFeedback
          onPress={() => {
            this.props.updateList(false);
            this.props.navigation.goBack();
          }}
        >
          <Image source={Images.backArrow} style={{ marginBottom: 5 }} />
        </TouchableWithoutFeedback>
        <Text style={styles.title1}>{Strings.inviteMember.title1}</Text>
      </View>
    );
  }

  renderImage() {
    return (
      <View style={styles.imageContainer}>
        <TouchableWithoutFeedback onPress={() => null}>
          <View style={styles.imageButton}>
            <Image
              source={Images.placeholder}
              style={{
                width: hp("5%"),
                height: hp("5%"),
                borderRadius: hp("2.5%"),
              }}
            />
          </View>
        </TouchableWithoutFeedback>
      </View>
    );
  }

  renderMemberId() {
    return (
      <View style={styles.memberContainer}>
        <Text style={styles.idTitle}>{Strings.addMember.id}</Text>
        <Text style={styles.idText}>{this.state.memberid}</Text>
      </View>
    );
  }


  bottomContainer = () => {
    return (
      <View style={styles.bottomContainer}>
        <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
          <View style={styles.cancel}>
            <Text style={styles.cancelText}>{Strings.addMember.cancel}</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            this.submit();
          }}
        >
          <View style={styles.submit}>
            <Text style={styles.submitText}>{Strings.addMember.invite}</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  renderRow = (option, index, isSelected) => {
    if (__DEV__) {
      //console.log("OPTION =====", option);
    }

    return (
      <View
        style={{
          width: 150,
          flexDirection: "row",
          alignItems: "center",
          height: hp("4%"),
        }}
      >
        <Text
          style={{
            fontSize: wp("4%"),
            fontFamily: Fonts.montserratMedium,
            color: Colors.planDesc,
            marginLeft: 5,
          }}
        >
          {option.id}
        </Text>
      </View>
    );
  };

  renderSeparator = () => <View style={styles.seperator} />;

  renderItem = (obj) => {
    const { mail, role } = obj.item;

    return (
      <View
        style={{
          flex: 1,
          marginTop: 10,
          marginBottom: 10,
          flexDirection: "row",
        }}
      >
        <View style={{ flex: 1, height: 50, justifyContent: "center" }}>
          <Text
            style={{
              marginLeft: 3,
              marginRight: 10,
              fontSize: wp("3.5%"),
              fontFamily: Fonts.montserratRegular,
            }}
          >
            {mail}
          </Text>
        </View>

        <View style={{ width: 150, height: 50, marginRight: 10 }}>
          <ModalDropdown
            style={styles.customDropdownStyle}
            dropdownStyle={[styles.customOptionsStyle, { height: hp("14%") }]}
            dropdownTextStyle={styles.customOptionsTextStyle}
            options={DROPDOWNOPTIONSROLE}
            renderRow={this.renderRow}
            renderSeparator={this.renderSeparator}
            showsVerticalScrollIndicator={false}
            onSelect={(options) =>
              this.onSelectDropdown(options, obj.index, obj.item)
            }
            defaultValue=""
          >
            <View style={{ flex: 1, flexDirection: "row" }}>
              <View
                style={{ width: 100, height: 50, justifyContent: "center" }}
              >
                <Text
                  style={{
                    marginLeft: 15,
                    marginRight: 5,
                    fontSize: wp("3.5%"),
                    fontFamily: Fonts.montserratMedium,
                  }}
                >
                  {role == "" ? "Role *" : role}
                </Text>
              </View>

              <View
                style={{
                  width: 50,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Image
                  style={{ flex: 1 }}
                  resizeMode={"center"}
                  source={Images.downArr}
                />
              </View>
            </View>
          </ModalDropdown>
        </View>
      </View>
    );
  };

  renderSeleRow = (id, onPress, item, style) => {
    return (
      <TouchableOpacity
        activeOpacity={0.6}
        key={id}
        onPress={onPress}
        style={{
          width: wp("90%"),
          height: 30,
          alignSelf: "center",
          justifyContent: "center",
        }}
      >
        <Text
          style={{
            color: "rgba(0, 0, 0, 0.87)",
            width: wp("90%"),
            marginLeft: 10,
            marginTop: 2,
          }}
        >
          {item.email}
        </Text>
      </TouchableOpacity>
    );
  };

  

  renderChip = (id, onClose, item, style, iconStyle) => {
    const exists = this.state.unwantedData.some((obj) => obj === id);

    if (!exists) {
      return (
        <View style={[styles.root, style]}>
          <View style={styles.container}>
            <Text style={styles.text} numberOfLines={1}>
              {id}
            </Text>
            <TouchableOpacity
              style={[styles.iconWrapper, iconStyle]}
              onPress={() => {
                this.setState(
                  {
                    inviteMember: this.state.inviteMember.filter(
                      (member) => member.id == item.id
                    ),
                  },
                  () => {
                    onClose();
                  }
                );
              }}
            >
              <Text
                style={[
                  styles.icon,
                  this.isIOS ? styles.iconIOS : styles.iconAndroid,
                ]}
              >
                ✕
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    } else {
      onClose(id);
      return null;
    }
  };

  render() {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.parentContainer} extraScrollHeight={200}>
          {this.renderHeader()}

          <Text style={styles.title2}>{Strings.inviteMember.title2}</Text>

          <View style={{ flex: 1, margin: 15 }}>
            <Text style={styles.title3}>{Strings.inviteMember.title3}</Text>

            <Selectize
              tintColor={Colors.themeColor}
              items
              selectedItems
              ref={(ref) => {
                this.input = ref;
              }}
              containerStyle={{
                zIndex: 1,
              }}
              listStyle={{
                position: "absolute",
              }}
              renderRow
              renderChip
              onChangeSelectedItems
              textInputProps={{
                onChangeText: this.onChangeperson,
              }}
            />

            <Text style={styles.title4}>
              {Platform.OS === "ios"
                ? Strings.inviteMember.notesIos
                : Strings.inviteMember.notesAndroid}
            </Text>

            <FlatList
              style={
                this.state.keyboardHeight == 0
                  ? { flex: 1 }
                  : { flex: 1, maxHeight: this.state.keyboardHeight }
              }
              data
              extraData={this.state}
              renderItem
            />

            {this.bottomContainer()}
          </View>
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
            viewRef
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
            toastMessage={this.state.toastMessage}
            type={this.state.toastType}
            container={{ marginBottom: hp("40%") }}
            container={
              this.state.isKeyboardShow == true
                ? { marginBottom: hp("40%") }
                : { marginBottom: hp("16%") }
            }
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
  title1: {
    width: wp("80%"),
    fontSize: wp("6%"),
    textAlign: "center",
    fontFamily: Fonts.montserratBold,
  },

  title2: {
    margin: 5,
    marginLeft: 10,
    marginTop: 15,
    textAlign: "center",
    fontSize: wp("4.0%"),
    color: "#A8B2B9",
    fontFamily: Fonts.montserratRegular,
  },
  title3: {
    textAlign: "left",
    fontSize: wp("3.5%"),
    color: "#A8B2B9",
    marginTop: 15,
    fontFamily: Fonts.montserratRegular,
  },
  title4: {
    textAlign: "left",
    fontSize: wp("3%"),
    color: "#A8B2B9",
    marginTop: 5,
    marginBottom: 10,
    fontFamily: Fonts.montserratRegular,
  },
  profilePic: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },

  memberEmail: {
    marginRight: 10,
    fontSize: wp("3.9%"),
    fontFamily: Fonts.montserratRegular,
  },
  imageContainer: {
    flexDirection: "row",
    flex: 1,
    height: 50,
    alignItems: "center",
    backgroundColor: "red",
  },
  imageButton: {
    width: wp("24%"),
    height: wp("24%"),
    borderRadius: wp("12%"),
    backgroundColor: "#F5F5F5",
    borderWidth: 1,
    borderColor: "#00000029",
    justifyContent: "center",
    alignItems: "center",
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
    width: wp("90%"),
    flexDirection: "row",
    justifyContent: "center",
    alignSelf: "center",
    marginBottom: hp("4%"),
    marginTop: hp("8%"),
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
  root: {
    justifyContent: "center",
    borderRadius: 50,
    backgroundColor: "#e0e0e0",
    paddingHorizontal: 10,
    paddingVertical: 4,
    height: 28,
    marginBottom: 4,
    marginRight: 4,
  },
  container: {
    flexDirection: "row",
    overflow: "hidden",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  text: {
    color: "rgba(0, 0, 0, 0.87)",
  },
  iconWrapper: {
    borderRadius: 50,
    backgroundColor: "#a6a6a6",
    height: 16,
    width: 16,
    overflow: "hidden",
    marginLeft: 4,
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    textAlign: "center",
    color: "#e0e0e0",
  },
  iconIOS: {
    fontSize: 14,
  },
  iconAndroid: {
    fontSize: 13,
    lineHeight: 15,
  },
  customDropdownStyle: {
    flex: 1,
    flexDirection: "row",
    width: "100%",
    height: 44,
    borderColor: "#A8B2B9",
    borderWidth: 1,
    borderRadius: 5,
  },
  customOptionsStyle: {
    // marginTop:10,
    // left:'59%',
    // right: 0,
    marginTop: 10,
    // width:wp("40%"),
    // justifyContent: "flex-end",
    height: hp("14%"),
    //   width: wp("50%"),
    maxWidth: 155,
    borderColor: Colors.white,
    borderWidth: 0.3,
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 1,
    elevation: 3,
    shadowColor: "rgba(0,0,0,0.14)",
    alignSelf: "center",
    borderRadius: wp("5%"),

    // //outlineProvider: 'bounds',
    // backgroundColor:'red'
  },
  customOptionsTextStyle: {
    fontFamily: Fonts.montserratMedium,
    color: Colors.planDesc,
    height: hp("5%"),
    backgroundColor: "red",
  },
  seperator: { flex: 1, backgroundColor: Colors.green },
});

const mapStateToProps = (state) => {
  
};

export default connect(mapStateToProps)(InviteMember);

import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  FlatList,
  TouchableOpacity,
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
import Loader from "../../components/loader/Loader";
import Toastpopup from "../../components/toastpopup/Toastpopup";
import ModalDropdown from "react-native-modal-dropdown";
import DeletePop from "../../components/toastpopup/logoutPop";
import Modal from "react-native-modal";
import { TextField } from "../../components/textinput/Textinput";
import DropDownPicker from "react-native-dropdown-picker";
import { BlurView } from "@react-native-community/blur";

let DROPDOWNOPTIONS = [
  { id: "Edit", image: Images.edit1, name: "Edit" },
  { id: "Delete", image: Images.delete1, name: "Delete" },
];

class EquipmentList extends Component {
  constructor(props) {
    super(props);
  }

  renderEmail = (title, name) => {
    return (
      <View style={styles.emailContainer}>
        <Text style={styles.emailTitle}>{title}</Text>
        <Text style={styles.emailText}>{name}</Text>
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
          height: hp("7%"),
          backgroundColor: "white",
        }}
      >
        <Image
          resizeMode={"center"}
          source={option.image}
          style={{
            width: option.id == "Edit" ? wp("5%") : wp("6%"),
            height: option.id == "Edit" ? hp("4%") : hp("5%"),
            marginLeft: 10,
          }}
        />
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
      //console.log("FLATLIST ITEM ======", item);
    }

    return (
      <View style={styles.flatlistContainer}>
        <View style={{ width: wp("90%") }}>
          <View style={styles.nameContainer}>
            <Text
              numberOfLines={1}
              style={{
                width: wp("70%"),
                color: "#1E1E1E",
                fontSize: 15,
                margin: 10,
                fontFamily: Fonts.montserratSemiBold,
              }}
            >
              {item.equipmentName}
            </Text>
            <View style={styles.dotMenu}>
              <ModalDropdown
                style={styles.customDropdownStyle}
                dropdownStyle={styles.customOptionsStyle}
                dropdownTextStyle={styles.customOptionsTextStyle}
                options={DROPDOWNOPTIONS}
                renderRow={this.renderRow}
                renderSeparator={this.renderSeparator}
                showsVerticalScrollIndicator={false}
                onSelect={(options) =>
                  this.onSelectDropdown(options, index, item)
                }
                defaultValue=""
              >
                <View style={styles.imageContainer}>
                  <Image
                    style={{ height: 10, width: 30 }}
                    source={Images.dotmenu}
                  />
                </View>
              </ModalDropdown>
            </View>
          </View>

          <View style={styles.equipContainer}>
            <View style={{ flexDirection: "row" }}>
              <Text style={[styles.titleEquip]}>{Strings.equip.resp}</Text>
              <Text style={[styles.titleEquip, { marginLeft: 15 }]}>
                {Strings.equip.contact}
              </Text>
            </View>

            <View style={{ flexDirection: "row" }}>
              <Text style={[styles.valueEquip]}>
                {item.controllUserDetails.User.email}
              </Text>

              <Text style={[styles.valueEquip, { marginLeft: 15 }]}>
                {item.userDetails.User.email}
              </Text>
            </View>

            <View style={{ flexDirection: "row" }}>
              <Text style={styles.titleEquip}>{Strings.equip.type}</Text>

              <Text style={[styles.titleEquip, { marginLeft: 15 }]}>
                {Strings.equip.id}
              </Text>
            </View>

            <View style={{ flexDirection: "row", marginBottom: 15 }}>
              <Text style={styles.valueEquip}>{item.equipmentType}</Text>

              <Text style={[styles.valueEquip, { marginLeft: 15 }]}>
                {item.equipmentAutoId}
              </Text>
            </View>
          </View>
        </View>
      </View>
    );
  };

  renderHeader() {
    let count = 0;

    if (this.state.selectedEquipName !== null) {
      count = 1;
    }

    if (this.state.searchId !== "") {
      count = count + 1;
    }

    if (this.state.selectedControlledBy !== null) {
      count = count + 1;
    }

    if (this.state.searchText !== "") {
      count = count + 1;
    }

    return (
      <View style={styles.headerContainer}>
        <Text style={styles.title}>{Strings.menu.equip}</Text>
        <View style={styles.headerRowContainer}>
          <TouchableOpacity
            style={[styles.image, { marginTop: wp("1%") }]}
            onPress={() => this.setState({ showFilter: true })}
          >
            <Image source={Images.filter} />
            {this.state.filter == true && (
              <View
                style={{
                  position: "absolute",
                  marginTop: -10,
                  right: -10,
                  backgroundColor: Colors.themeColor,
                  width: 16,
                  justifyContent: "center",
                  alignItems: "center",
                  height: 16,
                  borderRadius: 8,
                }}
              >
                <Text style={{ color: "white" }}>{count}</Text>
              </View>
            )}
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.image}
            onPress={() => this.props.onTapSearch("equipSearch")}
          >
            <Image source={Images.search} />
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  renderFilter = () => {
    return (
      <View style={modalStyles.container}>
        <View style={modalStyles.topContainer}>
          <TouchableOpacity
            onPress
            style={{ width: 40 }}
          >
            <Image source={Images.closeBlack} />
          </TouchableOpacity>
          <View style={modalStyles.titleContainer}>
            <Text style={modalStyles.title}>{Strings.filter.title}</Text>
          </View>
          <View style={{ width: 40, height: 40 }} />
        </View>

        <TextField
          showLeft={true}
          attrName={Strings.placeholders.equipmentName}
          title={Strings.placeholders.equipmentName}
          value
          updateMasterState
          hideShow={false}
          hideImage={""}
          textInputStyles={{
            color: Colors.black,
            fontSize: 14,
            width: "75%",
            marginLeft: wp("10%"),
            fontFamily: Fonts.montserratMedium,
            paddingTop: 10,
          }}
          textTitleStyles={{
            marginLeft: wp("10%"),
            fontSize: wp("4%"),
            fontFamily: Fonts.montserratMedium,
          }}
          leftImage={Images.searchGray}
          leftButton={{ bottom: 0 }}
        />

        <TextField
          container={{ marginTop: 0 }}
          showLeft={true}
          attrName={Strings.placeholders.id}
          title={Strings.placeholders.id}
          value
          updateMasterState
          hideShow={false}
          hideImage={""}
          textInputStyles={{
            color: Colors.black,
            fontSize: 14,
            width: "75%",
            marginLeft: wp("10%"),
            fontFamily: Fonts.montserratMedium,
            paddingTop: 10,
          }}
          textTitleStyles={{
            marginLeft: wp("10%"),
            fontSize: wp("4%"),
            fontFamily: Fonts.montserratMedium,
          }}
          leftImage={Images.searchGray}
          leftButton={{ bottom: 0 }}
        />

        <DropDownPicker
          items
          defaultValue
          placeholder={Strings.placeholders.type}
          placeholderStyle={{ color: Colors.placeholder, fontSize: 14 }}
          containerStyle={{ height: hp("6%"), marginTop: 10 }}
          style={{
            backgroundColor: Colors.white,
            width: wp("90%"),
            borderColor: "#0000",
            borderBottomColor: Colors.placeholder,
            alignSelf: "center",
            height: hp("5%"),
          }}
          itemStyle={{
            justifyContent: "flex-start",
          }}
          customArrowUp={(size) => (
            <Image
              source={Images.downArr}
              style={{ width: size, height: size, alignSelf: "flex-end" }}
            />
          )}
          customArrowDown={(size) => (
            <Image
              source={Images.downArr}
              style={{ width: size, height: size, alignSelf: "flex-end" }}
            />
          )}
          dropDownStyle={{
            backgroundColor: Colors.white,
            width: "90%",
            alignSelf: "center",
          }}
          onChangeItem
          selectedLabelStyle={{ color: Colors.black }}
          zIndex={4000}
        />

        <DropDownPicker
          items
          defaultValue
          placeholder={Strings.placeholders.controlledBy}
          placeholderStyle={{ color: Colors.placeholder, fontSize: 14 }}
          containerStyle={{ height: hp("6%"), marginTop: 30 }}
          style={{
            backgroundColor: Colors.white,
            width: wp("90%"),
            borderColor: "#0000",
            borderBottomColor: Colors.placeholder,
            alignSelf: "center",
            height: hp("5%"),
          }}
          itemStyle={{
            justifyContent: "flex-start",
          }}
          customArrowUp={(size) => (
            <Image
              source={Images.downArr}
              style={{ width: size, height: size, alignSelf: "flex-end" }}
            />
          )}
          customArrowDown={(size) => (
            <Image
              source={Images.downArr}
              style={{ width: size, height: size, alignSelf: "flex-end" }}
            />
          )}
          dropDownStyle={{
            backgroundColor: Colors.white,
            width: "90%",
            alignSelf: "center",
          }}
          onChangeItem
          selectedLabelStyle={{ color: Colors.black }}
          zIndex={3000}
        />

        <View style={modalStyles.buttonContainer}>
          <TouchableOpacity
            style={
              this.state.filter == true
                ? [
                    modalStyles.cancelButton,
                    { backgroundColor: Colors.themeOpacity },
                  ]
                : modalStyles.cancelButton
            }
            onPress
          >
            <Text
              style={[
                modalStyles.cancelText,
                {
                  color:
                    this.state.filter == true
                      ? Colors.themeColor
                      : Colors.buttonBackground,
                },
              ]}
            >
              {this.state.filter == true
                ? Strings.addMember.reset
                : Strings.addMember.cancel}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={modalStyles.applyButton}
            onPress={() => this.applyFilter()}
          >
            <Text style={modalStyles.applyText}>{Strings.filter.apply}</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  render() {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.parentContainer}>
          {this.renderHeader()}

          <FlatList
            data
            renderItem={this.renderFlatListItem}
            keyExtractor={(item, index) => index.toString()}
            onEndReached
            onEndReachedThreshold={0}
            onMomentumScrollBegin
            onRefresh
            refreshing
          />

          {this.state.showNoData == true && (
            <Text
              style={{
                alignSelf: "center",
                position: "absolute",
                fontSize: wp("6%"),
                fontFamily: Fonts.montserratRegular,
                marginTop: hp("45%"),
              }}
            >
              No Equipment list found
            </Text>
          )}
        </View>
        {this.state.showLoader && (
          <Modal
            isVisible={true}
            backdropOpacity={0}
            style={{
              paddingTop: 45,
              paddingBottom: 30,
              margin: 0,
              backgroundColor: "#0000",
            }}
          >
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
          </Modal>
        )}
        {this.state.showToaster && (
          <Toastpopup
            backPress
            toastMessage
            type
            container={{ marginBottom: hp("12%") }}
          />
        )}

        {this.state.showDelete && (
          <DeletePop
            title={Strings.popup.success}
            desc={Strings.popup.delete}
            acceptTap
            declineTap
          />
        )}

        <Modal
          isVisible
          style={{
            paddingTop: 45,
            paddingBottom: 30,
            margin: 0,
            backgroundColor: Colors.white,
          }}
        >
          {this.renderFilter()}
        </Modal>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.white,
    height: hp("50%"),
  },
  parentContainer: {
    flex: 1,
    backgroundColor: "#FCFBFC",
  },
  headerContainer: {
    width: wp("100%"),
    height: hp("12%"),
    flexDirection: "row",
    alignItems: "flex-end",
    backgroundColor: "#FFF",
    borderColor: Colors.shadowColor,
    borderBottomWidth: 0.3,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  title: {
    color: Colors.black,
    fontSize: 22,
    fontFamily: Fonts.montserratBold,
    marginBottom: hp("2%"),
    marginLeft: wp("4%"),
  },
  headerRowContainer: {
    flex: 1,
    height: hp("15%"),
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
  image: {
    marginRight: wp("6%"),
    marginBottom: hp("2%"),
  },
  flatlistContainer: {
    width: wp("90%"),
    marginVertical: 10,
    backgroundColor: Colors.white,
    borderColor: Colors.shadowColor,
    borderWidth: 0.3,
    alignSelf: "center",
    borderRadius: wp("2%"),
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 6,
  },
  nameContainer: {
    height: hp("7%"),
    width: wp("90%"),
    alignSelf: "center",
    // alignItems: 'center',
    flexDirection: "row",
    borderRadius: wp("2%"),
  },
  detailContainer: {
    width: wp("53%"),
    marginLeft: 20,
    justifyContent: "center",
  },
  imagePlaceholder: {
    width: wp("14%"),
    height: wp("14%"),
    borderRadius: wp("7%"),
    marginLeft: wp("6%"),
  },
  nameText: {
    color: Colors.black,
    fontSize: wp("5%"),
    fontFamily: Fonts.montserratSemiBold,
  },
  companyText: {
    color: "#5B5B5B",
    fontSize: wp("4%"),
    fontFamily: Fonts.montserratRegular,
    marginTop: hp("1%"),
  },
  dotMenu: {
    marginTop: hp("1%"),
  },
  emailContainer: {
    flex: 1,
    marginLeft: 10,
    marginRight: 10,
  },
  emailTitle: {
    color: "#5B5B5B",
    fontSize: wp("4%"),
    fontFamily: Fonts.montserratRegular,
    margin: 5,
  },
  emailText: {
    color: "#1E1E1E",
    fontSize: 14,
    fontFamily: Fonts.montserratRegular,
    margin: 5,
    marginTop: 0,
  },
  equipContainer: {
    flex: 1,
    width: wp("90%"),
    justifyContent: "space-between",
  },
  titleEquip: {
    width: wp("38%"),
    fontSize: 11,
    color: "#5B5B5B",
    fontFamily: Fonts.montserratRegular,
    margin: 5,
    marginLeft: 10,
  },
  valueEquip: {
    fontSize: 14,
    color: "#1E1E1E",
    fontFamily: Fonts.montserratRegular,
    margin: 5,
    marginLeft: 10,
    width: wp("38%"),
  },
  customDropdownStyle: {
    justifyContent: "center",
    alignItems: "center",
    width: wp("30%"),
    height: 40,
    marginRight: 10,
  },
  customOptionsStyle: {
    justifyContent: "flex-end",
    height: hp("14%"),
    width: wp("35%"),
    marginLeft: 5,
    borderColor: Colors.white,
    marginRight: wp("15%"),
    borderWidth: 0.3,
    alignSelf: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.44,
    shadowRadius: 10.32,
    elevation: 16,
  },
  customOptionsTextStyle: {
    fontSize: 11,
    fontFamily: Fonts.montserratMedium,
    textAlign: "center",
    color: Colors.planDesc,
    height: hp("5%"),
  },
  imageContainer: {
    marginRight: wp("15%"),
  },
});

const modalStyles = StyleSheet.create({
  container: {
    flex: 1,
    width: wp("100%"),
    height: hp("95%"),
  },
  topContainer: {
    flexDirection: "row",
    margin: 20,
    height: 40,
    alignItems: "center",
  },
  titleContainer: {
    flex: 1,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 20,
  },
  title: {
    color: Colors.black,
    fontSize: wp("5.5%"),
    fontFamily: Fonts.montserratMedium,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-end",
    marginBottom: 50,
    justifyContent: "space-around",
  },
  cancelButton: {
    backgroundColor: `rgba(117,117,117,0.2)`,
    width: wp("40%"),
    height: hp("5%"),
    borderRadius: hp("2.5%"),
    justifyContent: "center",
    alignItems: "center",
  },
  cancelText: {
    color: Colors.buttonBackground,
    fontSize: 14,
    fontFamily: Fonts.montserratBold,
  },
  applyButton: {
    backgroundColor: Colors.themeOpacity,
    width: wp("40%"),
    height: hp("5%"),
    borderRadius: hp("2.5%"),
    justifyContent: "center",
    alignItems: "center",
  },
  applyText: {
    color: Colors.themeColor,
    fontSize: 14,
    fontFamily: Fonts.montserratBold,
  },
});

const mapStateToProps = (state) => {

};

export default connect(mapStateToProps)(EquipmentList);

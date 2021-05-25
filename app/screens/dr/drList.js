import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";

import { connect } from "react-redux";

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import { Images, Strings, Fonts, Colors } from "../../common";


import {
  AppView,
  AppLoader,
  Alert,
  Toastpopup,
  DeletePop,
  TextField,
  DRCard,
} from "../../components";

import Modal from "react-native-modal";
import DropDownPicker from "react-native-dropdown-picker";
import _ from "lodash";
import search from "../search/search";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

let DROPDOWNOPTIONS = [
  { id: "Edit", image: Images.edit_blue, name: "Edit" },
  { id: "Void", image: Images.void, name: "Void" },
];

class DrList extends Component {
  constructor(props) {
    super(props);
  }



  searchBar = () => {
    return (
      <View style={searchStyles.searchHeader}>
        <View style={searchStyles.mainContainer}>
          <TouchableOpacity
            style={searchStyles.closeBtn}
            onPress
          >
            <Image
              resizeMode={"contain"}
              source={Images.closeBlack}
              style={searchStyles.closeImg}
            />
          </TouchableOpacity>

          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <Text style={searchStyles.titleText}>{Strings.search.title}</Text>
          </View>

          <TouchableOpacity
            style={searchStyles.closeBtn}
            onPress
          >
            {this.state.showright == true && (
              <Image
                resizeMode={"contain"}
                source={Images.delete1}
                style={searchStyles.closeImg}
              />
            )}
          </TouchableOpacity>
        </View>
        <View style={{ flexDirection: "row", justifyContent: "center" }}>
          <TextField
            showLeft={true}
            attrName={Strings.placeholders.SearchHere}
            title={Strings.placeholders.SearchHere}
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
          <View
            style={{
              position: "absolute",
              right: wp("5%"),
              width: wp("10%"),
              height: hp("5%"),
              marginTop: hp("3%"),
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          >
            {this.state.showIndicator == true && (
              <ActivityIndicator style={{ marginBottom: 5 }} />
            )}
            {this.state.clearSearch == true && (
              <TouchableOpacity onPres>
                <Image source={Images.closeBlack} style={{ marginBottom: 5 }} />
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    );
  };


  renderHeader() {
    let count = 0;

    if (this.state.descriptionFilter !== "") {
      count = count + 1;
    }

    if (this.state.selectedCompanyId !== 0) {
      count = count + 1;
    }

    if (this.state.selectedResponsibleNameId !== 0) {
      count = count + 1;
    }

    if (this.state.selectedGateNameId !== 0) {
      count = count + 1;
    }

    if (this.state.selectedEquipNameId !== 0) {
      count = count + 1;
    }

    if (
      this.state.selectedStatusName !== "" &&
      this.state.selectedStatusName !== null
    ) {
      count = count + 1;
    }

    return (
      <View style={styles.headerContainer}>
        <View style={{ flex: 1, flexDirection: "row" }}>
          {this.props.checkCameBack == true && (
            <View style={styles.backIconView}>
              <TouchableWithoutFeedback
                onPress
              >
                <Image source={Images.backArrow} style={{ marginBottom: 5 }} />
              </TouchableWithoutFeedback>
            </View>
          )}
          <View
            //style={{ flex: 1, minHeight: 50 }}
            style={[
              styles.titleView,
              { marginLeft: this.props.checkCameBack == true ? 0 : 10 },
            ]}
          >
            <Text style={styles.title}>{Strings.menu.dr}</Text>
          </View>
        </View>

        <View style={styles.headerRowContainer}>
          <TouchableOpacity
            style={[styles.image, { marginTop: wp("1%") }]}
            onPress
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
            onPress
          >
            <Image source={Images.search} />
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  renderRow = (option, index, isSelected) => {
    if (__DEV__) {
      //console.log("OPTION =====", option);
    }

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
          source={option.image}
          style={{
            // width: option.id == "Edit" ? wp("5%") : wp("5%"),
            // height: option.id == "Edit" ? hp("4%") : hp("4%"),
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

        <KeyboardAwareScrollView>
          <TextField
            showLeft={true}
            attrName={Strings.placeholders.description}
            title={Strings.placeholders.description}
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
            placeholder={Strings.placeholders.company}
            placeholderStyle={{
              color: Colors.placeholder,
              fontSize: 14,
            }}
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
            }
            selectedLabelStyle={{ color: Colors.black }}
            zIndex={5000}
          />

          <DropDownPicker
            items
            defaultValue
            placeholder={Strings.placeholders.responisblePerson}
            placeholderStyle={{
              color: Colors.placeholder,
              fontSize: 14,
            }}
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
            zIndex={4000}
          />

          <DropDownPicker
            items
            defaultValue
            placeholder={Strings.placeholders.gate}
            placeholderStyle={{
              color: Colors.placeholder,
              fontSize: 14,
            }}
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

          <DropDownPicker
            items
            defaultValue
            placeholder={Strings.placeholders.equip}
            placeholderStyle={{
              color: Colors.placeholder,
              fontSize: 14,
            }}
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
            zIndex={2000}
          />

          <DropDownPicker
            items
            defaultValue
            placeholder={"Status"}
            placeholderStyle={{
              color: Colors.placeholder,
              fontSize: 14,
            }}
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
            zIndex={1000}
          />

          <View
            style={[
              modalStyles.buttonContainer,
              { marginBottom: 0, marginTop: 50 },
            ]}
          >
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
              onPress
            >
              <Text style={modalStyles.applyText}>{Strings.filter.apply}</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAwareScrollView>
      </View>
    );
  };

  renderFlatListItem = ({ item, index }) => {
    if (__DEV__) {
      //console.log("");
    }

    return (
      <DRCard
        item={item}
        key={index}
        onPress
        onSelect
      />
    );
  };

  voidListLink = () => {
    return (
      this.state.searchbarShow == false && (
        <Text
          style={[styles.void, { marginBottom: 0 }]}
          onPress
        >
          {Strings.addDR.void}
        </Text>
      )
    );
  };

  renderNoDeliveryRequest = () => {
    return (
      this.state.showNoData == true && (
        <Text style={styles.showNoData}>No Delivery Request List found</Text>
      )
    );
  };



  render() {
    return (
      <AppView>
        <View
          style={[
            styles.parentContainer,
            {
              backgroundColor:
                this.state.searchbarShow == true ? Colors.white : "FCFBFC",
            },
          ]}
        >
          {this.renderSearchBar()}

          {this.voidListLink()}

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

          {this.renderNoDeliveryRequest()}
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
            desc={Strings.popup.forgotSuccess}
            okTap
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
          style={modalStyles.filterModal}
        >
          {this.renderFilter()}
        </Modal>
      </AppView>
    );
  }
}

const mapStateToProps = (state) => {
 
};

export default connect(mapStateToProps)(DrList);

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.white,
    // height: hp("50%"),
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
  void: {
    alignSelf: "flex-end",
    color: "#FF3939",
    margin: 15,
    fontSize: 14,
    textDecorationLine: "underline",
    fontFamily: Fonts.montserratMedium,
  },
  title: {
    color: Colors.black,
    fontSize: 22,
    fontFamily: Fonts.montserratBold,
    //marginBottom: hp("2%"),
    //marginLeft: wp("2%"),
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
    width: wp("95%"),
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
    width: wp("95%"),
    alignSelf: "center",
    // alignItems: 'center',
    flexDirection: "row",
  },
  detailContainer: {
    width: wp("85%"),
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
    fontSize: 14,
    fontFamily: Fonts.montserratMedium,
    marginTop: 10,
    marginLeft: 10,
    width: "85%",
  },
  companyText: {
    color: "#5B5B5B",
    fontSize: wp("4%"),
    fontFamily: Fonts.montserratRegular,
    marginTop: hp("1%"),
  },
  dotMenu: {
    marginTop: hp("2%"),
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
    marginRight: wp("20%"),
    borderWidth: 0.3,
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 1,
    elevation: 3,
    shadowColor: "rgba(0,0,0,0.14)",
    alignSelf: "center",
    borderRadius: wp("5%"),
    //outlineProvider: 'bounds'
  },
  customOptionsTextStyle: {
    fontSize: 11,
    fontFamily: Fonts.montserratMedium,
    textAlign: "center",
    color: Colors.planDesc,
    height: hp("5%"),
  },
  imageContainer: {
    marginRight: wp("20%"),
  },
  subContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 5,
  },
  subtext: {
    width: "45%",
    color: "#5B5B5B",
    fontSize: 14,
    marginLeft: 10,
    fontFamily: Fonts.montserratRegular,
  },
  titleView: {
    flex: 1,
    minHeight: 50,
    //backgroundColor: "green",

    minWidth: "60%",
    alignItems: "center",
    justifyContent: "center",
  },
  backIconView: {
    width: 50,
    minHeight: 50,
    justifyContent: "center",
    alignItems: "center",
    //backgroundColor:"red"
  },
  showNoData: {
    alignSelf: "center",
    position: "absolute",
    fontSize: wp("6%"),
    fontFamily: Fonts.montserratRegular,
    marginTop: hp("45%"),
  },
});

const searchStyles = StyleSheet.create({
  searchHeader: {
    marginTop: hp("2%"),
    height: hp("18%"),
    width: wp("95%"),
    alignSelf: "center",
  },
  mainContainer: {
    width: "100%",
    height: hp("6%"),
    flexDirection: "row",
    alignItems: "center",
  },
  closeBtn: {
    width: wp("15%"),
    height: hp("8%"),
    marginLeft: wp("2%"),
    justifyContent: "center",
    alignItems: "center",
  },
  closeImg: {
    width: wp("5%"),
    height: hp("5%"),
  },
  titleText: {
    color: Colors.black,
    fontSize: wp("6%"),
    fontFamily: Fonts.montserratSemiBold,
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
  filterModal: {
    paddingTop: 45,
    paddingBottom: 30,
    margin: 0,
    backgroundColor: Colors.white,
  },
});

import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  TouchableWithoutFeedback,
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
import { TextField } from "../../components/textinput/Textinput";
import _ from "lodash";
import Toastpopup from "../../components/toastpopup/Toastpopup";
import ModalDropdown from "react-native-modal-dropdown";
import DeletePop from "../../components/toastpopup/logoutPop";
import { BlurView } from "@react-native-community/blur";

const DROPDOWNOPTIONS = [
  { id: "Edit", image: Images.edit1, name: "Edit" },
  { id: "Delete", image: Images.delete1, name: "Delete" },
];

const DROPDOWNEDIT = [{ id: "Edit", image: Images.edit1, name: "Edit" }];

class Search extends Component {
  constructor(props) {
    super(props);
  }

  renderSearchBar = () => {
    return (
      <View style={styles.searchHeader}>
        <View
          style={{
            width: "100%",
            height: hp("6%"),
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <TouchableOpacity
            style={styles.closeBtn}
            onPress
          >
            <Image
              resizeMode={"contain"}
              source={Images.closeBlack}
              style={styles.closeImg}
            />
          </TouchableOpacity>
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <Text style={styles.titleText}>{Strings.search.title}</Text>
          </View>
          <TouchableOpacity
            style={styles.closeBtn}
            onPress
          >
            {this.state.showright == true && (
              <Image
                resizeMode={"contain"}
                source={Images.delete1}
                style={styles.closeImg}
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
              fontSize: 12,
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
              <TouchableOpacity onPress>
                <Image source={Images.closeBlack} style={{ marginBottom: 5 }} />
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    );
  };


  renderDropDownRow = (option, index, isSelected) => {
    return (
      <View
        style={{
          width: wp("40%"),
          flexDirection: "row",
          backgroundColor: "white",
          alignItems: "center",
          height: hp("5%"),
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

  renderMemberRow = (option, index, isSelected) => {
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

  

  renderEquip = (item, index) => {
    if (__DEV__) {
      //console.log("RENDER =======", item.equipmentName);
    }

    return (
      <View style={equipStyles.equipContainer}>
        <View style={{ flexDirection: "row", width: wp("90%") }}>
          <Text style={equipStyles.equipName}>{item.equipmentName}</Text>
          <ModalDropdown
            style={equipStyles.dropDownContainer}
            dropdownStyle={equipStyles.dropdownOption}
            dropdownTextStyle={equipStyles.dropDownText}
            options={DROPDOWNOPTIONS}
            renderRow
            showsVerticalScrollIndicator={false}
            onSelect
            renderSeparator
            defaultValue=""
          >
            <View style={styles.imageContainer}>
              <Image source={Images.dotmenu} />
            </View>
          </ModalDropdown>
        </View>
        <View style={equipStyles.equipType}>
          <View style={{ width: wp("45%") }}>
            <Text style={[equipStyles.equipTitle, { height: hp("6%") }]}>
              {Strings.equip.resp}
            </Text>
            <Text numberOfLines={2} style={equipStyles.equipValue}>
              {item.controllUserDetails.User.email}
            </Text>
            <Text style={[equipStyles.equipTitle]}>{Strings.equip.type}</Text>
            <Text
              numberOfLines={1}
              style={[equipStyles.equipValue, { marginBottom: 15 }]}
            >
              {item.equipmentType}
            </Text>
          </View>
          <View style={{ width: wp("45%") }}>
            <Text style={[equipStyles.equipTitle, { height: hp("6%") }]}>
              {Strings.equip.contact}
            </Text>

            <Text numberOfLines={2} style={equipStyles.equipValue}>
              {item.userDetails.User.email}
            </Text>

            <Text style={[equipStyles.equipTitle]}>{Strings.equip.id}</Text>

            <Text style={[equipStyles.equipValue, { marginBottom: 15 }]}>
              {item.id}
            </Text>
          </View>
        </View>
      </View>
    );
  };

  renderGate = (item, index) => {
    if (__DEV__) {
      //console.log("ITEM =======", item);
    }

    return (
      <View>
        <View style={gateStyles.flHeader}>
          <View style={gateStyles.checkbox}>
            <TouchableWithoutFeedback
              onPress
            >
              <Image
                resizeMode={"contain"}
                source={item.selected == true ? Images.check : Images.uncheck}
                style={{ width: wp("9%"), height: hp("4%") }}
              />
            </TouchableWithoutFeedback>
          </View>
          <View style={[gateStyles.checkbox, { width: wp("15%") }]}>
            <Text style={gateStyles.flatlistTitle}>{item.gateAutoId}</Text>
          </View>
          <View style={[gateStyles.checkbox, { width: wp("50%") }]}>
            <Text style={gateStyles.flatlistTitle}>{item.gateName}</Text>
          </View>
          <View
            style={[
              gateStyles.checkbox,
              {
                width: wp("18%"),
                flexDirection: "row",
                justifyContent: "space-around",
              },
            ]}
          >
            <TouchableWithoutFeedback
              onPress
            >
              <Image
                resizeMode={"contain"}
                source={Images.edit}
                style={{ width: wp("7%") }}
              />
            </TouchableWithoutFeedback>

            <TouchableWithoutFeedback
              onPress
            >
              <Image
                resizeMode={"contain"}
                source={Images.delete}
                style={{ width: wp("7%") }}
              />
            </TouchableWithoutFeedback>
            {/* <Text style={styles.flatlistTitle}>{Strings.gates.action}</Text> */}
          </View>
        </View>
        <View
          style={{
            backgroundColor: "#EFEFEF",
            height: hp("0.3%"),
            width: wp("96%"),
            alignSelf: "center",
          }}
        />
      </View>
    );
  };

  renderCompany = (item, index) => {

    return (
      <View style={CompanyStyles.flatlistContainer}>
        <View>
          <View style={{ width: wp("85%") }}>
            <View style={CompanyStyles.nameContainer}>
              <View
                style={{
                  width: wp("3%"),
                  backgroundColor: Colors.themeColor,
                  borderTopLeftRadius: wp("4%"),
                  borderBottomLeftRadius: wp("4%"),
                }}
              ></View>
              <View style={CompanyStyles.detailContainer}>
                <Text style={CompanyStyles.nameText}>
                  {index == 0
                    ? `${item.companyName} (Parent Company)`
                    : item.companyName}
                </Text>
                <Text
                  style={CompanyStyles.companyText}
                >{`${item.address.trim()}`}</Text>
                <Text
                  style={[
                    CompanyStyles.companyText,
                    { marginBottom: hp("2%") },
                  ]}
                >
                  {item.scope}
                </Text>
              </View>
              <View style={CompanyStyles.dotMenu}>
                <ModalDropdown
                  style={equipStyles.dropDownContainer}
                  dropdownStyle={equipStyles.dropdownOption}
                  dropdownTextStyle={equipStyles.dropDownText}
                  options={index == 0 ? DROPDOWNEDIT : DROPDOWNOPTIONS}
                  renderRow
                  renderSeparator
                  showsVerticalScrollIndicator={false}
                  onSelect
                  defaultValue=""
                >
                  <View style={CompanyStyles.imageContainer}>
                    <Image source={Images.dotmenu} />
                  </View>
                </ModalDropdown>
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  };

  renderEmail = (title, name) => {
    return (
      <View style={memberStyles.emailContainer}>
        <Text style={memberStyles.emailTitle}>{title}</Text>
        <Text style={memberStyles.emailText}>{name}</Text>
      </View>
    );
  };

  renderMember = (item, index) => {
    if (__DEV__) {
      //console.log("FLATLIST ITEM ======", item);
    }

    return (
      <View style={memberStyles.flatlistContainer}>
        <View style={{ width: wp("95%") }}>
          <View style={memberStyles.nameContainer}>
            <View
              style={{
                width: wp("22%"),
                minHeight: hp("16%"),
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Image
                source={Images.placeholder}
                style={memberStyles.imagePlaceholder}
              />
            </View>
            <View style={memberStyles.detailContainer}>
              <Text style={memberStyles.nameText}>{item.firstName}</Text>
              <View style={{ flexDirection: "row" }}>
                <Text
                  style={[
                    memberStyles.companyText,
                    {
                      fontFamily: Fonts.montserratSemiBold,
                      fontWeight: "800",
                      color: Colors.black,
                    },
                  ]}
                >{`${Strings.addMember.company} : `}</Text>
                <Text
                  style={[memberStyles.companyText, { width: wp("45%") }]}
                  numberOfLines={2}
                >{`${item.Company ? item.Company.companyName : ""}`}</Text>
              </View>
              {/* <Text style={memberStyles.companyText}    >{`${Strings.addMember.company} : ${item.Company.companyName}`}</Text> */}
              <Text style={memberStyles.companyText}>{item.Role.roleName}</Text>
            </View>
            <View style={memberStyles.dotMenu}>
              <ModalDropdown
                style={memberStyles.customDropdownStyle}
                dropdownStyle={[
                  memberStyles.customOptionsStyle,
                  {
                    height:
                      this.props.userDetails.email == item.User.email
                        ? hp("7%")
                        : hp("14%"),
                  },
                ]}
                dropdownTextStyle={memberStyles.customOptionsTextStyle}
                options={
                  this.props.userDetails.email == item.User.email
                    ? DROPDOWNEDIT
                    : DROPDOWNOPTIONS
                }
                renderRow={this.renderMemberRow}
                renderSeparator={this.renderSeparator}
                showsVerticalScrollIndicator={false}
                onSelect={(options) =>
                  this.onSelectDropdown(options, index, item)
                }
                defaultValue=""
              >
                <View style={memberStyles.imageContainer}>
                  <Image source={Images.dotmenu} />
                </View>
              </ModalDropdown>

            </View>
          </View>
          <View style={[memberStyles.nameContainer, { minHeight: hp("12%") }]}>
            {this.renderEmail(Strings.addMember.email, item.User.email)}
            {this.renderEmail(
              Strings.addMember.phone,
              `${item.phoneCode} ${item.phoneNumber}`
            )}
          </View>
        </View>
      </View>
    );
  };

  renderDfow = (item, index) => {
    if (__DEV__) {
      //console.log("DFOW ITEM CHECK ======", item);
    }

    return (
      <View>
        <View style={gateStyles.flHeader}>
          <View style={gateStyles.checkbox}>
            <TouchableWithoutFeedback
              onPress={() => {
                this.selectGate(item, index);
              }}
            >
              <Image
                resizeMode={"contain"}
                source={item.selected == true ? Images.check : Images.uncheck}
                style={{ width: wp("9%"), height: hp("4%") }}
              />
            </TouchableWithoutFeedback>
          </View>
          <View style={[gateStyles.checkbox]}>
            <Text style={[gateStyles.flatlistTitle, { marginLeft: 5 }]}>
              {item.autoId}
            </Text>
          </View>
          <View style={{ width: wp("50%"), alignItems: "flex-start" }}>
            <Text style={[gateStyles.flatlistTitle, { marginLeft: 5 }]}>
              {item.DFOW}
            </Text>
          </View>
          <View
            style={[
              gateStyles.checkbox,
              {
                width: wp("18%"),
                marginLeft: 7,
                alignItems: "center",
                flexDirection: "row",
                justifyContent: "space-around",
              },
            ]}
          >
            <TouchableWithoutFeedback
              onPress={() => {
                this.props.editData({
                  item: item,
                  index: index,
                });
                this.props.navigation.navigate("AddDFOW", {
                  updateData: this.updateData,
                  from: "search",
                });
              }}
            >
              <Image
                resizeMode={"contain"}
                source={Images.edit}
                style={{ width: wp("7%") }}
              />
            </TouchableWithoutFeedback>

            <TouchableWithoutFeedback
              onPress={() =>
                this.setState({
                  showDelete: true,
                  selectedItem: item,
                  selectedIndex: index,
                })
              }
            >
              <Image
                resizeMode={"contain"}
                source={Images.delete}
                style={{ width: wp("7%") }}
              />
            </TouchableWithoutFeedback>
          </View>
        </View>
        <View
          style={{
            backgroundColor: "#EFEFEF",
            height: hp("0.3%"),
            width: wp("96%"),
            alignSelf: "center",
          }}
        />
      </View>
    );
  };

  renderSearchItem = ({ item, index }) => {
    if (this.state.from == "Equip") {
      return this.renderEquip(item, index);
    } else if (this.state.from == "Gate") {
      return this.renderGate(item, index);
    } else if (this.state.from == "Company") {
      return this.renderCompany(item, index);
    } else if (this.state.from == "Member") {
      return this.renderMember(item, index);
    } else if (this.state.from == "DFOW") {
      return this.renderDfow(item, index);
    }
  };

  acceptDelete = (item, index) => {
    if (this.state.from == "Equip") {
      this.deleteEquipment(item, index);
    } else if (this.state.from == "Gate") {
      return this.onPressGateDelete(item, index);
    } else if (this.state.from == "Company") {
      this.deleteCompany(item, index);
    } else if (this.state.from == "Member") {
      this.deleteMember(item, index);
    } else if (this.state.from == "DFOW") {
      this.onPressGateDelete(item, index);
    }
  };

  showError = (type, message) => {
    this.setState(
      {
        showToaster: true,
        toastType: type,
        toastMessage: message,
        showLoader: false,
      },
      () => this.hideToast()
    );
  };

  gateHeader = () => {
    return (
      <View>
        <View style={gateStyles.flHeader}>
          <View style={gateStyles.checkbox}>
            <TouchableWithoutFeedback
              onPress
            >
              <Image
                resizeMode={"contain"}
                source={this.state.selectedAll ? Images.check : Images.uncheck}
                style={{ width: wp("9%"), height: hp("4%") }}
              />
            </TouchableWithoutFeedback>
          </View>
          <View style={[gateStyles.checkbox, { width: wp("15%") }]}>
            <Text style={gateStyles.flatlistTitle}>
              {Strings.gates.gateAutoId}
            </Text>
          </View>
          <View style={[gateStyles.checkbox, { width: wp("50%") }]}>
            <Text style={gateStyles.flatlistTitle}>
              {Strings.gates.gateName}
            </Text>
          </View>
          <View style={[gateStyles.checkbox, { width: wp("18%") }]}>
            <Text style={gateStyles.flatlistTitle}>{Strings.gates.action}</Text>
          </View>
        </View>
        <View
          style={{
            backgroundColor: "#EFEFEF",
            height: hp("0.3%"),
            width: wp("96%"),
            alignSelf: "center",
          }}
        />
      </View>
    );
  };

  dfowHeader = () => {
    return (
      <View>
        <View style={gateStyles.flHeader}>
          <View style={gateStyles.checkbox}>
            <TouchableWithoutFeedback
              onPress
            >
              <Image
                resizeMode={"contain"}
                source={this.state.selectedAll ? Images.check : Images.uncheck}
                style={{ width: wp("9%"), height: hp("4%") }}
              />
            </TouchableWithoutFeedback>
          </View>
          <View style={[gateStyles.checkbox, { width: wp("15%") }]}>
            <Text style={gateStyles.flatlistTitle}>{Strings.gates.id}</Text>
          </View>
          <View
            style={[
              gateStyles.checkbox,
              { width: wp("50%"), alignItems: "flex-start" },
            ]}
          >
            <Text style={gateStyles.flatlistTitle}>{Strings.menu.dfow}</Text>
          </View>
          <View style={[gateStyles.checkbox, { width: wp("18%") }]}>
            <Text style={gateStyles.flatlistTitle}>{Strings.gates.action}</Text>
          </View>
        </View>
        <View
          style={{
            backgroundColor: "#EFEFEF",
            height: hp("0.3%"),
            width: wp("96%"),
            alignSelf: "center",
          }}
        />
      </View>
    );
  };

  rendertHeader = () => {
    if (
      this.state.from == "Gate" &&
      this.state.showNoData == false &&
      this.state.dataList.length !== 0
    ) {
      return this.gateHeader();
    } else if (
      this.state.from == "DFOW" &&
      this.state.showNoData == false &&
      this.state.dataList.length !== 0
    ) {
      return this.dfowHeader();
    } else {
      return null;
    }

  };

  render() {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.parentContainer}>
          {this.renderSearchBar()}

          <FlatList
            data
            renderItem={this.renderSearchItem}
            // ItemSeparatorComponent={this.itemSeparator}
            keyExtractor={(item, index) => index.toString()}
            onEndReached
            ListHeaderComponent
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
              {Strings.errors.noRecords}
            </Text>
          )}
        </View>

        {this.state.showToaster && (
          <Toastpopup
            backPress
            toastMessage={this.state.toastMessage}
            type={this.state.toastType}
            container={{ marginBottom: hp("12%") }}
          />
        )}

        {this.state.showDelete && (
          <DeletePop
            container={{
              bottom: 0,
            }}
            title={Strings.popup.success}
            desc={Strings.popup.delete}
            acceptTap
            declineTap
          />
        )}

        {this.state.showAllDelete && (
          <DeletePop
            container={{
              bottom: 0,
            }}
            title={Strings.popup.success}
            desc={Strings.popup.delete}
            acceptTap
            declineTap
          />
        )}

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
      </SafeAreaView>
    );
  }
}

const mapStateToProps = (state) => {

};

export default connect(mapStateToProps)(Search);

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  parentContainer: {
    flex: 1,
    backgroundColor: "#fff",
  },
  searchHeader: {
    marginTop: hp("2%"),
    height: hp("18%"),
    width: wp("95%"),
    alignSelf: "center",
  },
  closeBtn: {
    width: wp("15%"),
    height: hp("8%"),
    justifyContent: "center",
    alignItems: "center",
  },
  closeImg: {
    width: 17,
    height: 17,
  },
  titleText: {
    color: Colors.black,
    fontSize: 20,
    fontFamily: Fonts.montserratSemiBold,
  },
});

const equipStyles = StyleSheet.create({
  equipContainer: {
    width: wp("90%"),
    minHeight: hp("5%"),
    backgroundColor: "#FFF",
    borderColor: "rgba(0,0,0,0.14)",
    borderBottomWidth: 0.3,
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 1,
    elevation: 3,
    shadowColor: "rgba(0,0,0,0.14)",
    alignSelf: "center",
    marginVertical: 10,
    borderRadius: hp("1%"),
    borderWidth: 0.3,
  },
  equipName: {
    width: wp("70%"),
    color: "#1E1E1E",
    fontSize: wp("5%"),
    margin: 10,
    fontFamily: Fonts.montserratSemiBold,
  },
  dropDownContainer: {
    marginRight: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  dropdownOption: {
    height: hp("10%"),
    width: wp("35%"),
    marginLeft: 5,
    borderColor: Colors.white,
    borderWidth: 0.3,
    shadowOffset: { width: 4, height: 4 },
    shadowColor: "rgba(0,0,0,0.14)",
    alignSelf: "center",
    borderRadius: wp("2%"),
    justifyContent: "flex-end",
    shadowOpacity: 1,
    elevation: 3,
  },
  dropDownText: {
    fontSize: 11,
    fontFamily: Fonts.montserratMedium,
    textAlign: "center",
    color: Colors.planDesc,
    height: hp("5%"),
  },
  equipType: {
    flexDirection: "row",
  },
  equipTitle: {
    width: wp("45%"),
    fontSize: wp("4%"),
    color: "#5B5B5B",
    fontFamily: Fonts.montserratRegular,
    margin: 5,
    marginLeft: 10,
    height: hp("4.5%"),
  },
  equipValue: {
    fontSize: wp("4%"),
    color: "#1E1E1E",
    fontFamily: Fonts.montserratRegular,
    margin: 5,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 2,
  },
});

const gateStyles = StyleSheet.create({
  flHeader: {
    width: wp("96%"),
    height: hp("6%"),
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
  },
  checkbox: {
    width: wp("13%"),
    height: hp("6%"),
    justifyContent: "center",
    alignItems: "center",
  },
  flatlistTitle: {
    color: "#292529",
    fontSize: 14,
    fontFamily: Fonts.montserratMedium,
  },
});

const CompanyStyles = StyleSheet.create({
  flatlistContainer: {
    width: wp("85%"),
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
  nameContainer: {
    minHeight: hp("14%"),
    width: wp("85%"),
    alignSelf: "center",
    // alignItems: 'center',
    flexDirection: "row",
  },
  detailContainer: {
    width: wp("58%"),
    marginLeft: 20,
    justifyContent: "center",
    backgroundColor: Colors.white,
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
    marginTop: hp("2%"),
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
});

const memberStyles = StyleSheet.create({
  flatlistContainer: {
    width: wp("95%"),
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
  nameContainer: {
    minHeight: hp("16%"),
    width: wp("95%"),
    alignSelf: "center",
    // alignItems: 'center',
    flexDirection: "row",
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
});

const dfowStyles = StyleSheet.create({
  flHeader: {
    width: wp("96%"),
    height: hp("6%"),
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
    marginTop: hp("3%"),
  },
  checkbox: {
    width: wp("13%"),
    height: hp("6%"),
    justifyContent: "center",
  },
  flatlistTitle: {
    color: Colors.planDesc,
    fontSize: 14,
    fontFamily: Fonts.montserratMedium,
  },
});

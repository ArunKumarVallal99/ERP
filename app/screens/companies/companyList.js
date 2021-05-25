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

import { connect } from "react-redux";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";


import {
  AppView,
  AppLoader,
  Alert,
  Toastpopup,
  TextField,
  DeletePop,
} from "../../components";

import { Images, Strings, Fonts, Colors } from "../../common";
import ModalDropdown from "react-native-modal-dropdown";
import Modal from "react-native-modal";
import DropDownPicker from "react-native-dropdown-picker";

let DROPDOWNOPTIONS = [
  { id: "Edit", image: Images.edit1, name: "Edit" },
  { id: "Delete", image: Images.delete1, name: "Delete" },
];
let PARENTDROPDOWNOPTIONS = [{ id: "Edit", image: Images.edit1, name: "Edit" }];

class CompanyList extends Component {
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
    //console.log("OPTION =====", option);
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

  renderParentRow = (option, index, isSelected) => {
    //console.log("OPTION =====", option);
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


  renderParent = (item) => {
    return (
      <View style={styles.flatlistContainer}>
        <View>
          <View style={{ width: wp("95%") }}>
            <View style={[styles.nameContainer]}>
              <View
                style={{
                  width: wp("2%"),
                  backgroundColor: Colors.cardBorder,
                  borderTopLeftRadius: wp("4%"),
                  borderBottomLeftRadius: wp("4%"),
                }}
              ></View>

              <View>
                <View
                  style={[
                    styles.detailContainer,
                    {
                      flexDirection: "row",
                      width: "95%",
                      marginLeft: 0,
                      marginTop: 15,
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.nameText,
                      { width: wp("72%"), marginLeft: 20 },
                    ]}
                    numberOfLines={2}
                  >
                    {item.companyName}
                  </Text>

                  <ModalDropdown
                    style={styles.customDropdownStyle}
                    dropdownStyle={[
                      styles.customOptionsStyle,
                      { height: hp("7%") },
                    ]}
                    dropdownTextStyle={styles.customOptionsTextStyle}
                    options={PARENTDROPDOWNOPTIONS}
                    renderRow
                    renderSeparator
                    showsVerticalScrollIndicator={false}
                    onSelect
                    defaultValue=""
                  >
                    <View style={styles.imageContainer}>
                      <Image style={styles.dotMenu} source={Images.dotmenu} />
                    </View>
                  </ModalDropdown>
                </View>

                <View style={{ flexDirection: "row" }}>
                  <View style={{ width: wp("50%") }}>
                    <View
                      style={{
                        flexDirection: "row",
                        marginLeft: 15,
                        alignItems: "center",
                        marginTop: 10,
                      }}
                    >
                      <Image source={Images.company_address} />
                      <Text
                        style={[
                          styles.companyText,
                          { marginLeft: 10, marginTop: 0 },
                        ]}
                      >{`${item.address.trim()}`}</Text>
                    </View>

                    <View
                      style={{
                        flexDirection: "row",
                        marginLeft: 15,
                        marginTop: 15,
                        marginBottom: hp("3%"),
                        alignItems: "center",
                      }}
                    >
                      <Image source={Images.company_desc} />
                      <Text
                        style={[
                          styles.companyText,
                          { marginLeft: 10, marginTop: 0 },
                        ]}
                      >
                        {item.scope ? item.scope : "-----"}
                      </Text>
                    </View>
                  </View>

                  <View
                    style={{
                      width: wp("40%"),
                      //alignItems: "center",
                      justifyContent: "center",
                      alignItems: "flex-end",
                    }}
                  >
                    <Image
                      source={
                        item.logo ? { uri: item.logo } : Images.companyPlace
                      }
                      resizeMode={"contain"}
                      style={{
                        width: wp("35%"),
                        height: hp("5%"),
                        alignSelf: "flex-end",
                      }}
                    />
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  };

  renderFlatListItem = ({ item, index }) => {
    if (__DEV__) {
      //console.log("FLATLIST ITEM ======", item);
    }

    return (
      <View style={styles.flatlistContainer}>
        <View>
          <View style={{ width: wp("95%") }}>
            <View style={[styles.nameContainer]}>
              <View
                style={{
                  width: wp("2%"),
                  backgroundColor: Colors.cardBorder,
                  borderTopLeftRadius: wp("4%"),
                  borderBottomLeftRadius: wp("4%"),
                }}
              ></View>

              <View>
                <View
                  style={[
                    styles.detailContainer,
                    {
                      flexDirection: "row",
                      width: "95%",
                      marginLeft: 0,
                      marginTop: 15,
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.nameText,
                      { width: wp("72%"), marginLeft: 20 },
                    ]}
                    numberOfLines={2}
                  >
                    {item.companyName}
                  </Text>

                  <ModalDropdown
                    style={styles.customDropdownStyle}
                    dropdownStyle={styles.customOptionsStyle}
                    dropdownTextStyle={styles.customOptionsTextStyle}
                    options={DROPDOWNOPTIONS}
                    renderRow
                    renderSeparator
                    showsVerticalScrollIndicator={false}
                    onSelect
                    defaultValue=""
                  >
                    <View style={styles.imageContainer}>
                      <Image style={styles.dotMenu} source={Images.dotmenu} />
                    </View>
                  </ModalDropdown>
                </View>

                <View style={{ flexDirection: "row" }}>
                  <View style={{ width: wp("50%") }}>
                    <View
                      style={{
                        flexDirection: "row",
                        marginLeft: 15,
                        alignItems: "center",
                        marginTop: 10,
                      }}
                    >
                      <Image source={Images.company_address} />
                      <Text
                        style={[
                          styles.companyText,
                          { marginLeft: 10, marginTop: 0 },
                        ]}
                      >{`${item.address.trim()}`}</Text>
                    </View>

                    <View
                      style={{
                        flexDirection: "row",
                        marginLeft: 15,
                        marginTop: 15,
                        marginBottom: hp("3%"),
                        alignItems: "center",
                      }}
                    >
                      <Image source={Images.company_desc} />
                      <Text style={[styles.companyText, { marginLeft: 10 }]}>
                        {item.scope ? item.scope : "---"}
                      </Text>
                    </View>
                  </View>

                  <View
                    style={{
                      width: wp("40%"),
                      //alignItems: "center",
                      justifyContent: "center",
                      alignItems: "flex-end",
                    }}
                  >
                    <Image
                      source={
                        item.logo ? { uri: item.logo } : Images.companyPlace
                      }
                      resizeMode={"contain"}
                      style={{
                        width: wp("35%"),
                        height: hp("5%"),
                        alignSelf: "flex-end",
                      }}
                    />
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  };

  renderHeader() {
    let count = 0;
    if (this.state.selecteddfow !== null) {
      count = 1;
    }
    if (this.state.searchText !== "") {
      count = count + 1;
    }
    return (
      <View style={styles.headerContainer}>
        <View style={{ flex: 1, flexDirection: "row" }}>
          {this.props.checkCameBack == true && (
            <View
              style={{
                width: 50,
                maxHeight: 50,
                marginBottom: hp("2%"),
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <TouchableWithoutFeedback
                onPress
              >
                <Image source={Images.backArrow} style={{}} />
              </TouchableWithoutFeedback>
            </View>
          )}
          <View style={{ flex: 1, maxHeight: 50,maxWidth:'100%'}}>
            <Text style={styles.title}>{Strings.menu.company}</Text>
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



  //RENDER FILTER
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
          attrName={Strings.placeholders.companyName}
          title={Strings.placeholders.companyName}
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
          placeholder={Strings.placeholders.definable}
          placeholderStyle={{ color: Colors.placeholder, fontSize: 14 }}
          containerStyle={{ height: hp("6%"), marginTop: 15 }}
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
          dropDownStyle={{
            backgroundColor: Colors.white,
            width: "90%",
            alignSelf: "center",
          }}
          onChangeItem
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
          selectedLabelStyle={{ color: Colors.black }}
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
            onPress={() =>
              this.setState(
                {
                  showFilter: false,
                  selecteddfow: null,
                  selecteddfowId: 0,
                  searchText: "",
                },
                () => {
                  if (this.state.filter == true) {
                    this.setState({ filter: false }, () => {
                      this.getCompanyList();
                    });
                  }
                }
              )
            }
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
      </View>
    );
  };




  render() {
    //console.log("checkCameBack =====", this.props.checkCameBack);

    return (
      <AppView style={styles.safeArea}>
        <View style={styles.parentContainer}>
          {this.renderHeader()}

          {this.state.parentCompany.companyName &&
            this.renderParent(this.state.parentCompany)}

          <FlatList
            data
            renderItem={this.renderFlatListItem}
            // ItemSeparatorComponent={this.itemSeparator}
            keyExtractor={(item, index) => index.toString()}
            onEndReached
            onEndReachedThreshold={0}
            onMomentumScrollBegin
            onRefresh
            refreshing
          />
        
        </View>

        <Modal
          isVisible
          style={modalStyles.filterModal}
        >
          {this.renderFilter()}
        </Modal>

        {this.state.showLoader && (
          <Modal
            isVisible={true}
            backdropOpacity={0}
            style={modalStyles.loaderModal}
          >
            <AppLoader viewRef={this.state.showLoader} />
          </Modal>
        )}

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
      </AppView>
    );
  }
}

const styles = StyleSheet.create({
  safeArea: {
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
    elevation: 6,
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
    elevation: 8,
  },
  nameContainer: {
    minHeight: hp("14%"),
    width: wp("95%"),
    alignSelf: "center",
    // alignItems: 'center',
    flexDirection: "row",
  },
  detailContainer: {
    marginLeft: 30,
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
    fontSize: 15,
    fontFamily: Fonts.montserratSemiBold,
  },
  companyText: {
    color: "#5B5B5B",
    fontSize: 11,
    fontFamily: Fonts.montserratRegular,
    marginTop: hp("1%"),
  },
  dotMenu: {
    height: 8,
    width: 25,
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
    padding: 8,
  },
  customOptionsStyle: {
    justifyContent: "flex-end",
    height: hp("14%"),
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
  customOptionsTextStyle: {
    fontSize: 11,
    fontFamily: Fonts.montserratMedium,
    textAlign: "center",
    color: Colors.planDesc,
    height: hp("5%"),
  },
  imageContainer: {
    marginRight: 0,
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
    fontSize: wp("4.5%"),
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
    fontSize: wp("4.5%"),
    fontFamily: Fonts.montserratBold,
  },
  filterModal: {
    paddingTop: 45,
    paddingBottom: 30,
    margin: 0,
    backgroundColor: Colors.white,
  },
  loaderModal: {
    paddingTop: 45,
    paddingBottom: 30,
    margin: 0,
    backgroundColor: "#0000",
  },
});

const mapStateToProps = (state) => {
  
};

export default connect(mapStateToProps)(CompanyList);

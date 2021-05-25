import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
  FlatList,
  TouchableOpacity,
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
  DeletePop,
  TextField,
  MemberCard,
} from "../../components";

import { Images, Strings, Fonts, Colors } from "../../common";

import Modal from "react-native-modal";
import DropDownPicker from "react-native-dropdown-picker";

let DROPDOWNOPTIONS = [
  { id: "Edit", image: Images.edit1, name: "Edit" },
  { id: "Delete", image: Images.delete1, name: "Delete" },
];
let DROPDOWNOPTIONSEDIT = [{ id: "Edit", image: Images.edit1, name: "Edit" }];

class MemberList extends Component {
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

  renderFlatListItem = ({ item, index }) => {
    if (__DEV__) {
      //console.log("FLATLIST ITEM ======", item);
    }

    return (
      <MemberCard
        item={item}
        options={
          this.props.userDetails.email == item.User.email
            ? DROPDOWNOPTIONSEDIT
            : DROPDOWNOPTIONS
        }
        onSelect
        userDetails={this.props.userDetails}
        projectRoleId={this.props.projectRoleId}
      />
    );
  };

  renderHeader() {
    let count = 0;

    if (this.state.selectedRole !== null) {
      count = 1;
    }
    if (this.state.searchText !== "") {
      count = count + 1;
    }

    if (this.state.selectedCompany !== null) {
      count = count + 1;
    }

    return (
      <View style={styles.headerContainer}>
        <View style={{ flex: 1, flexDirection: "row" }}>
          {this.props.checkCameBack == true && (
            <View
              style={{
                width: 50,
                minHeight: 50,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <TouchableWithoutFeedback
                onPress
              >
                <Image source={Images.backArrow} style={{ marginBottom: 5 }} />
              </TouchableWithoutFeedback>
            </View>
          )}
          <View
            style={{
              flex: 1,
              minHeight: 50,
              marginLeft: this.props.checkCameBack == true ? 0 : 10,
              alignContent: "center",
              justifyContent: "center",
            }}
          >
            <Text style={styles.title}>{Strings.menu.members}</Text>
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


  renderFilter = () => {
    if (__DEV__) {
      //console.log("ROLE LIST =====", this.state.rolelist);
    }

    return (
      <View style={modalStyles.container}>
        <View style={modalStyles.topContainer}>
          <TouchableOpacity
            onPress={() => this.setState({ showFilter: false })}
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
          attrName={Strings.placeholders.name}
          title={Strings.placeholders.name}
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
          placeholderStyle={{ color: Colors.placeholder, fontSize: 14 }}
          containerStyle={{ height: hp("6%") }}
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
          onChangeItem={(item) => {
            this.setState({
              selectedCompany: item.value,
              selectedCompanyId: item.id,
            });
          }}
          selectedLabelStyle={{ color: Colors.black }}
          zIndex={4000}
        />

        <DropDownPicker
          items
          defaultValue
          placeholder={Strings.placeholders.role}
          placeholderStyle={{ color: Colors.placeholder, fontSize: 14 }}
          containerStyle={{ height: hp("6%"), marginTop: 25 }}
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
          onChangeItem={(item) => {
            this.setState({
              selectedRole: item.value,
              selectedRoleId: item.id,
            });
          }}
          selectedLabelStyle={{ color: Colors.black }}
          zIndex={3000}
        />

        <View style={modalStyles.buttonContainer}>
          <TouchableOpacity
            style={[
              modalStyles.cancelButton,
              { backgroundColor: Colors.white },
            ]}
            onPress={() =>
              this.setState(
                {
                  showFilter: false,
                  selectedRole: null,
                  selectedRoleId: "",
                  searchText: "",
                  selectedCompanyId: 0,
                  selectedCompany: null,
                },
                () => {
                  if (this.state.filter == true) {
                    this.setState({ filter: false }, () => {
                      this.getMemeberList();
                    });
                  }
                }
              )
            }
          >
            <View
              style={
                this.state.filter == true
                  ? [
                      modalStyles.cancelButton,
                      { backgroundColor: Colors.themeOpacity },
                    ]
                  : modalStyles.cancelButton
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
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={modalStyles.applyButton}
            onPress={() => {
              this.applyFilter();
            }}
          >
            <Text style={modalStyles.applyText}>{Strings.filter.apply}</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  renderNoMember = () => {
    return (
      this.state.showNoData == true && (
        <Text style={styles.noMember}>No Members list found</Text>
      )
    );
  };


  render() {
    return (
      <AppView style={{ height: hp("50%") }}>
        <View style={styles.parentContainer}>
          {this.renderHeader()}

          <FlatList
            data
            renderItem={this.renderFlatListItem}
            keyExtractor
            onEndReached
            onEndReachedThreshold={0}
            onMomentumScrollBegin
            onRefresh
            refreshing
          />

          {this.renderNoMember()}
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

const styles = StyleSheet.create({
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
    fontSize: 15,
    fontFamily: Fonts.montserratSemiBold,
  },
  companyText: {
    color: "#1E1E1E",
    fontSize: 14,
    fontFamily: Fonts.montserratMedium,
    marginTop: hp("1%"),
  },
  dotMenu: {
    // marginTop: hp('2%')
  },
  emailContainer: {
    flex: 1,
    marginLeft: 10,
    marginRight: 10,
  },
  emailTitle: {
    color: "#5B5B5B",
    fontSize: 14,
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
    width: wp("32%"),
    borderColor: Colors.white,
    marginRight: wp("28%"),
    borderWidth: 0.3,
    alignSelf: "center",
    borderRadius: wp("5%"),
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
    marginRight: wp("28%"),
  },
  noMember: {
    alignSelf: "center",
    position: "absolute",
    fontSize: wp("6%"),
    fontFamily: Fonts.montserratRegular,
    marginTop: hp("45%"),
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
    marginBottom: 10,
    justifyContent: "space-around",
    backgroundColor: Colors.white,
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
  noMember: {
    alignSelf: "center",
    position: "absolute",
    fontSize: wp("6%"),
    fontFamily: Fonts.montserratRegular,
    marginTop: hp("45%"),
  },
  filterModal: {
    paddingTop: 45,
    paddingBottom: 30,
    margin: 0,
    backgroundColor: Colors.white,
  },
});

const mapStateToProps = (state) => {

};

export default connect(mapStateToProps)(MemberList);

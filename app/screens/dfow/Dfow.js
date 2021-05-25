import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  Platform,
  PermissionsAndroid,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import AsyncStorage from "@react-native-community/async-storage";

import {
  changeTab,
  showSideMenu,
  storeLastid,
  cameBack,
  editData,
  clickAdd,
  onTapSearch,
  updateList,
} from "../../actions/postAction";
import { connect } from "react-redux";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import {
  AppLoader,
  AppView,
  Alert,
  Toastpopup,
  Dropdown,
  DeletePop,
} from "../../components";

import { Colors, Images, Strings, Fonts } from "../../common";

import { NavigationEvents } from "react-navigation";

class DFOW extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.requestCameraPermission();
    this.renderIntial();
  }

  renderEmail = (title, name) => {
    return (
      <View style={styles.emailContainer}>
        <Text style={styles.emailTitle}>{title}</Text>
        <Text style={styles.emailText}>{name}</Text>
      </View>
    );
  };

  renderFlatListItem = ({ item, index }) => {
    if (__DEV__) {
      // //console.log("FLATLIST DFOW ITEM ======", item)
    }

    return (
      <View>
        <View style={styles.flHeader}>
          <View style={styles.checkbox}>
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

          <View style={[styles.checkbox]}>
            <Text style={styles.flatlistTitle}>{item.autoId}</Text>
          </View>

          <View style={{ width: wp("48%") }}>
            <Text style={styles.flatlistTitle} numberOfLines={2}>
              {item.DFOW}
            </Text>
          </View>

          {/*   <View
            style={[
              styles.checkbox,
              {
                width: wp("18%"),
                alignItems: "center",
                flexDirection: "row",
                justifyContent: "space-around",
              },
            ]}
          >

            <TouchableWithoutFeedback
              onPress={() => this.editGate(item, index)}
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
                  selectedGate: item,
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
          </View> */}
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

  
  

  renderHeader() {
    let showButton = false;

    if (this.state.selectedGates.length > 0 || this.state.selectedAll == true) {
      showButton = true;
    } 
    /* else {
      showButton = false;
    } */

    return (
      <View style={styles.headerContainer}>
        <View style={styles.headerview}>
          <Text style={styles.title}>{Strings.menu.dfow}</Text>
          <View style={{ flexDirection: "row" }}>
            {showButton == true && (
              <TouchableOpacity
                onPress={() => {
                  this.setState({ showAllDelete: true });
                }}
                style={[styles.image]}
              >
                <Image source={Images.deleteBin} />
              </TouchableOpacity>
            )}

            <TouchableOpacity
              style={styles.image}
              onPress={() =>
                this.setState(
                  {
                    sort: this.state.sort == "ASC" ? "DESC" : "ASC",
                  },
                  () => {
                    this.renderIntial();
                  }
                )
              }
            >
              <Image source={Images.sort} />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.image}
              onPress={() =>
                this.setState({ showImportModal: !this.state.showImportModal })
              }
            >
              <Image source={Images.import} />
            </TouchableOpacity>

            {!this.state.showNoData && (
              <TouchableOpacity
                style={styles.image}
                onPress={() => this.exportDfow()}
              >
                <Image source={Images.export} />
              </TouchableOpacity>
            )}

            <TouchableOpacity
              style={styles.image}
              onPress={() => this.props.onTapSearch("dfowSearch")}
            >
              <Image source={Images.search} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }

 
  renderFlatlistHeader = () => {
    if (this.state.showNoData == true || this.state.memberslist.length == 0) {
      return null;
    } else {
      return (
        <View style={{}}>
          <View style={styles.flHeaderTitle}>
            <View style={styles.checkbox}>
              <TouchableWithoutFeedback
                onPress={() => {
                  this.checkAll();
                }}
              >
                <Image
                  resizeMode={"contain"}
                  source={
                    this.state.selectedAll ? Images.check : Images.uncheck
                  }
                  style={{ width: wp("9%"), height: hp("4%") }}
                />
              </TouchableWithoutFeedback>
            </View>
            <View style={[styles.checkbox]}>
              <Text
                style={[styles.flatlistHeaderTitle, { fontWeight: "bold" }]}
              >
                {Strings.gates.id}
              </Text>
            </View>
            <View style={[styles.checkbox, { width: wp("48%") }]}>
              <Text
                style={[styles.flatlistHeaderTitle, { fontWeight: "bold" }]}
              >
                {Strings.menu.dfow}
              </Text>
            </View>
            {/*  <View
              style={[
                styles.checkbox,
                {
                  width: wp("18%"),
                  justifyContent: "center",
                  alignItems: "center",
                },
              ]}
            >
              <Text
                style={[styles.flatlistHeaderTitle, { fontWeight: "bold" }]}
              >
                {Strings.gates.action}
              </Text>
            </View> */}
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
    }
  };

  renderNoDFOW = () => {
    return (
      this.state.showNoData == true && (
        <Text style={styles.noDFOW}>No DFOW list found</Text>
      )
    );
  };



  render() {
    return (
      <AppView ref={this.props.refer} style={styles.safeArea}>
        <NavigationEvents
          onDidFocus={() => {
            this.renderIntial();
          }}
        />
        <View style={styles.parentContainer}>
          {this.renderHeader()}

          <FlatList
            data
            renderItem={this.renderFlatListItem}
            ListHeaderComponent={this.renderFlatlistHeader()}
            // ItemSeparatorComponent={this.itemSeparator}
            keyExtractor={(item, index) => index.toString()}
            onEndReached
            onEndReachedThreshold={0}
            onMomentumScrollBegin
            onRefresh
            refreshing
          />

          {this.renderNoDFOW()}
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
            desc={Strings.popup.forgotSuccess}
            okTap
          />
        )}

        <Dropdown
          data
          title={Strings.profile.Choose}
          value={""}
          closeBtn
          onPress
          visible
          onbackPress
          container={{ justifyContent: "center", alignItems: "center" }}
          textContainer={{ fontSize: 14 }}
        />

        <Dropdown
          data
          title={Strings.profile.Choose}
          value={""}
          closeBtn
          onPress
          visible
          onbackPress
          container={{ justifyContent: "center", alignItems: "center" }}
          textContainer={{ fontSize: 14 }}
        />

        {this.state.showDelete && (
          <DeletePop
            container={{ bottom: hp("15%") }}
            title={Strings.popup.success}
            desc={Strings.popup.delete}
            acceptTap={this.deletePopupAcceptTap}
            declineTap={this.deletePopupDeclineTap}
          />
        )}

        {this.state.showAllDelete && (
          <DeletePop
            container={{ bottom: hp("15%") }}
            title={Strings.popup.success}
            desc={Strings.popup.delete}
            acceptTap={this.deleteAllPopupAcceptTap}
            declineTap={this.deleteAllPopupDeclineTap}
          />
        )}
      </AppView>
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
    backgroundColor: Colors.white,
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
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },
  title: {
    flex: 1,
    color: Colors.black,
    fontSize: 22,
    fontFamily: Fonts.montserratBold,
  },
  headerRowContainer: {
    height: hp("15%"),
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
  image: {
    marginLeft: 8,
    width: wp("5%"),
    height: hp("2%"),
  },
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
    height: hp("14%"),
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
  flHeader: {
    flexDirection: "row",
    alignItems: "center",
    // alignSelf: "center",
   /*  marginTop: 2,
    marginBottom: 2, */
    //////modified
    marginLeft: 10,
    marginTop: 10,
    marginBottom: 10,

  },
  flHeaderTitle: {
    flexDirection: "row",
    alignItems: "center",
    // alignSelf: "center",
   /*  paddingTop: 4,
    paddingBottom: 4, */
    ////modified
    marginLeft: 10,
    marginTop: 10,
    marginBottom: 10,
    
  },
  checkbox: {
    width: wp("13%"),
    justifyContent: "center",
  },
  flatlistTitle: {
    color: Colors.planDesc,
    fontSize: 14,
    fontFamily: Fonts.montserratMedium,
  },
  flatlistHeaderTitle: {
    color: Colors.planCost,
    fontSize: 14,
    fontFamily: Fonts.montserratBold,
  },
  noDFOW: {
    alignSelf: "center",
    position: "absolute",
    fontSize: wp("6%"),
    fontFamily: Fonts.montserratRegular,
    marginTop: hp("45%"),
  },
  headerview: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    alignContent: "center",
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 20,
  },
});

const mapStateToProps = (state) => {
  const {
    changeTab,
    showMenu,
    projectDetails,
    checkCameBack,
    updatelist,
  } = state.LoginReducer;

  return {
    changeTab,
    showMenu,
    projectDetails,
    checkCameBack,
    updatelist,
  };
};

export default connect(mapStateToProps, {
  changeTab,
  showSideMenu,
  storeLastid,
  cameBack,
  editData,
  clickAdd,
  onTapSearch,
  updateList,
})(DFOW);

import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  FlatList,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";

import {
  changeTab,
  showSideMenu,
  storeLastid,
  cameBack,
  editData,
  clickAdd,
  onTapSearch,
  updateList,
  refreshPage,
} from "../../actions/postAction";
import { connect } from "react-redux";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Colors from "../../common/color";
import Images from "../../common/images";
import Strings from "../../common/string";
import Fonts from "../../common/fonts";
import { GET_GATE_LIST, DELETE_GATES } from "../../api/Constants";
import { getGateList, deleteGate } from "../../api/Api";
import Loader from "../../components/loader/Loader";
import Alert from "../../components/toastpopup/alert";
import Toastpopup from "../../components/toastpopup/Toastpopup";
import { NavigationEvents } from "react-navigation";
import DeletePop from "../../components/toastpopup/logoutPop";
import { BlurView } from "@react-native-community/blur";
import Modal from "react-native-modal";

class GateList extends Component {
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
 
  renderFlatListItem = ({ item, index }) => {
    if (__DEV__) {
      // //console.log("FLATLIST GATE ITEM ======", item)
    }

    return (
      <View>
        <View style={styles.flHeader}>
          <View style={styles.checkbox}>
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
          <View style={[styles.checkbox, { width: wp("15%") }]}>
            <Text style={styles.flatlistTitle}>{item.gateAutoId}</Text>
          </View>
          <View
            style={[
              styles.checkbox,
              { width: wp("50%"), marginBottom: hp("1%") },
            ]}
          >
            <Text style={styles.flatlistTitle} numberOfLines={2}>
              {item.gateName}
            </Text>
          </View>
          <View
            style={[
              styles.checkbox,
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

  
  renderHeader() {
    let showButton = false;

    if (this.state.selectedGates.length > 0 || this.state.selectedAll == true) {
      showButton = true;
    }
    /*   else {
      showButton = false;
    } */

    return (
      <View style={styles.headerContainer}>
        <Text style={styles.title}>{Strings.menu.gates}</Text>
        <View style={styles.headerRowContainer}>
          {showButton == true && (
            <TouchableOpacity
              onPress
              style={[styles.image, { marginTop: wp("1%") }]}
            >
              <Image source={Images.delete} />
            </TouchableOpacity>
          )}

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


 

  renderFlatlistHeader = () => {
    if (this.state.showNoData == true || this.state.memberslist.length == 0) {
      return null;
    } else {
      return (
        <View>
          <View style={[styles.flHeader, { backgroundColor: "#f5f5f5" }]}>
            <View style={styles.checkbox}>
              <TouchableWithoutFeedback
                onPress
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
            <View style={[styles.checkbox, { width: wp("15%") }]}>
              <Text
                style={[
                  styles.flatlistTitle,
                  { fontFamily: Fonts.montserratBold, fontWeight: "bold" },
                ]}
              >
                {Strings.gates.id}
              </Text>
            </View>
            <View style={[styles.checkbox, { width: wp("50%") }]}>
              <Text
                style={[
                  styles.flatlistTitle,
                  { fontFamily: Fonts.montserratBold, fontWeight: "bold" },
                ]}
              >
                {Strings.gates.gateName}
              </Text>
            </View>
            <View style={[styles.checkbox, { width: wp("18%") }]}>
              <Text
                style={[
                  styles.flatlistTitle,
                  { fontFamily: Fonts.montserratBold, fontWeight: "bold" },
                ]}
              >
                {Strings.gates.action}
              </Text>
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
    }
  };

  render() {
    return (
      <SafeAreaView ref={this.props.refer} style={styles.safeArea}>
        <NavigationEvents
          onDidFocus
        />
        <View style={styles.parentContainer}>
          {this.renderHeader()}

          <FlatList
            data
            renderItem={this.renderFlatListItem}
            ListHeaderComponent={this.renderFlatlistHeader()}
            // ItemSeparatorComponent={this.itemSeparator}
            keyExtractor
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
              No Gate list found
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

        {this.state.showAllDelete && (
          <DeletePop
            title={Strings.popup.success}
            desc={Strings.popup.delete}
            acceptTap
            declineTap
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
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 6,
  },
  title: {
    color: Colors.black,
    fontSize: wp("7%"),
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
    width: wp("100%"),
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
    paddingTop: 5,
    paddingBottom: 5,
  },
  checkbox: {
    width: wp("13%"),
    // height: hp('6%'),
    justifyContent: "center",
    alignItems: "center",
  },
  flatlistTitle: {
    color: "#292529",
    fontSize: 14,
    fontFamily: Fonts.montserratMedium,
  },
});

const mapStateToProps = (state) => {
  const {
    changeTab,
    showMenu,
    projectDetails,
    checkCameBack,
    updatelist,
    refresh,
  } = state.LoginReducer;

  return {
    changeTab,
    showMenu,
    projectDetails,
    checkCameBack,
    updatelist,
    refresh,
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
  refreshPage,
})(GateList);

import React, { Component } from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

import { connect } from "react-redux";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import { Colors, Images, Strings, Fonts } from "../../common";
import moment from "moment";
import Modal from "react-native-modal";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import {
  AppView,
  AppLoader,
  TextField,
  DeletePop,
  Toastpopup,
  NotificationCard,
} from "../../components";

import DropDownPicker from "react-native-dropdown-picker";
import DateTimePicker from "@react-native-community/datetimepicker";


class notification extends Component {
  constructor(props) {
    super(props);
    
  }
 
  renderSearchBar = () => {
    if (this.state.searchbarShow == true) {
      return this.searchBar();
    } else {
      return this.renderHeader();
    }
  }; 

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
            {(
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
            updateMasterState={}
            hideShow={false}
            hideImage={""}
            textInputStyles={styles.textInputStyles}
            textTitleStyles={styles.textTitleStyles}
            leftImage={Images.searchGray}
            leftButton={{ bottom: 0 }}
          />
          <View style={styles.clearSearch}>
            {this.state.showIndicator == true && (
              <ActivityIndicator style={{ marginBottom: 5 }} />
            )}
            {this.state.clearSearch == true && (
              <TouchableOpacity onPress={() => this.clearSearch()}>
                <Image source={Images.closeBlack} style={{ marginBottom: 5 }} />
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    );
  };

  renderHeader = () => {
    let count = 0;

    if (this.state.descriptionFilter !== "") {
      count = count + 1;
    }

    if (this.state.selectedProjectId !== 0) {
      count = count + 1;
    }

    if (this.state.delDate !== "") {
      count = count + 1;
    }

    return (
      <View style={styles.headerContainer}>
        <Text style={styles.title}>{Strings.notification.notification}</Text>
        <View style={styles.headerRowContainer}>
          <TouchableOpacity
            style={[styles.image, { marginTop: wp("1%") }]}
            onPress
          >
            <Image source={Images.filter} />
            { (
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
  };

  

  renderFlatListItem = ({ item, index }) => {
    return (
      <NotificationCard
        item={item}
        onPress
        onDelete
      />
    );
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
          <DropDownPicker
            items
            defaultValue
            placeholder={Strings.placeholders.ProjectName}
            placeholderStyle={{
              color: Colors.placeholder,
              fontSize: 14,
            }}
            containerStyle={{
              height: hp("6%"),
              marginTop: 10,
              fontSize: 14,
            }}
            style={{
              backgroundColor: Colors.white,
              width: wp("90%"),
              borderColor: "#0000",
              borderBottomColor: Colors.placeholder,
              alignSelf: "center",
              height: hp("5%"),
              marginTop: 10,
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
            zIndex={5000}
          />

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
              paddingTop: 5,
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
            attrName={Strings.placeholders.deliveryDate}
            title={Strings.placeholders.deliveryDate}
            value
            updateMasterState
            mandatory={true}
            textInputStyles={{
              // here you can add additional TextInput drStyles
              color: Colors.black,
              fontSize: wp("5.5%"),
            }}
            textTitleStyles={{
              fontSize: wp("4%"),
              fontFamily: Fonts.montserratMedium,
            }}
            showButton={true}
            onPress
            container={{
              marginTop: 5,
            }}
            imageSource={Images.calGray}
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
        <Modal
          isVisible
          onBackdropPress
          style={{
            marginTop: 100,
            margin: 20,
            justifyContent: "flex-start",
          }}
        >
          <DateTimePicker
            value={new Date()}
            style={{
              backgroundColor: "#fff",
            }}
            display="default"
            // mode={mode}
            onChange
          />
        </Modal>
      </View>
    );
  };

 

  renderNoNotification = () => {
    return (
    true && (
        <Text style={styles.noNotification}>No Notification List found</Text>
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
          {this.renderNoNotification()}
        </View>

        { <AppLoader viewRef />}

        {(
          <Toastpopup
            backPress
            toastMessage
            type
            container={{ marginBottom: hp("12%") }}
          />
        )}

        {(
          <Alert
            title={Strings.popup.success}
            desc={Strings.popup.forgotSuccess}
            okTap
          />
        )}

        {(
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
      </AppView>
    );
  }
}

const mapStateToProps = (state) => {
  const { projectDetails, projectlist } = state.LoginReducer;

  return {
    projectDetails,
    projectlist,
  };
};

export default connect(mapStateToProps)(notification);

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

    elevation: 6,
  },
  void: {
    alignSelf: "flex-end",
    color: "#FF3939",
    margin: 15,
    fontSize: wp("4%"),
    textDecorationLine: "underline",
  },
  title: {
    color: Colors.black,
    fontSize: wp("6%"),
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
    color: Colors.themeColor,
    fontSize: wp("5%"),
    fontFamily: Fonts.montserratSemiBold,
    marginTop: 10,
    marginLeft: 10,
    width: "75%",
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
    marginTop: 5,
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
    color: "#A8B2B9",
    fontSize: wp("4%"),
    marginLeft: 10,
    fontFamily: Fonts.montserratMedium,
  },
  desctext: {
    width: wp("92%"),
    color: "#5b5b5b",
    fontSize: wp("4%"),
    marginLeft: 10,
    fontFamily: Fonts.montserratMedium,
  },
  datetext: {
    color: "#5b5b5b",
    fontSize: wp("4%"),
    marginLeft: 10,
    fontFamily: Fonts.montserratMedium,
  },
  noNotification: {
    alignSelf: "center",
    position: "absolute",
    fontSize: wp("6%"),
    fontFamily: Fonts.montserratRegular,
    marginTop: hp("45%"),
  },
  textInputStyles: {
    color: Colors.black,
    fontSize: 14,
    width: "75%",
    marginLeft: wp("10%"),
    fontFamily: Fonts.montserratMedium,
    paddingTop: 10,
  },
  textTitleStyles: {
    marginLeft: wp("10%"),
    fontSize: wp("4%"),
    fontFamily: Fonts.montserratMedium,
  },
  clearSearch: {
    position: "absolute",
    right: wp("5%"),
    width: wp("10%"),
    height: hp("5%"),
    marginTop: hp("3%"),
    justifyContent: "flex-end",
    alignItems: "center",
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

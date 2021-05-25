import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
  TextInput,
  Keyboard,
  Platform,
} from "react-native";

import { connect } from "react-redux";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import {
  AppView,
  AppLoader,
  Toastpopup,
  Alert,
  Dropdown,
  DeletePop,
} from "../../components";

import AttachDropdown from "../../components/dropdown/attachDropdown";
import { TextField } from "../../components/textinput/addMemberTextinput";
import { Strings, Fonts, Images, Colors, isEmpty } from "../../common";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import ScrollableTabView, {
  ScrollableTabBar,
} from "react-native-scrollable-tab-view";

import moment from "moment";




let HEADERDROPDOWNOPTIONS = [
  { id: "Save", image: Images.save, name: "Save" },
  { id: "Edit", image: Images.edit_blue, name: "Edit" },
  { id: "Void", image: Images.crossred, name: "Void" },
];

let HEADERDROPDOWNOPTIONSSC = [
  { id: "Edit", image: Images.edit_blue, name: "Edit" },
  { id: "Void", image: Images.crossred, name: "Void" },
];

import FileViewer from "react-native-file-viewer";
import RNFS from "react-native-fs";
var commentListHeight = 0.0;
var commentHeight = 0.0;

class Details extends Component {
  constructor(props) {
    super(props);
  }

  //HEADER COMPONENT
  renderHeader() {
    return (
      <View style={styles.header}>
        <TouchableWithoutFeedback
          onPress={() => {
            this.props.navigation.navigate("Plus");
            this.props.navigation.goBack();
          }}
        >
          <Image source={Images.closeBlack} style={{ marginBottom: 5 }} />
        </TouchableWithoutFeedback>
        <Text style={styles.title}>
          {Strings.deliverydetails.deliverydetails}
        </Text>
        <View style={styles.closecontainer}></View>
      </View>
    );
  }

  renderDetails = () => {
    return (
      <View style={{ flex: 1, margin: 20 }}>
        <Text style={styles.detailsHeadingStyle}>
          {Strings.deliverydetails.deliverydetails}
        </Text>
        <Text numberOfLines={2} style={styles.detailsTextStyle}>
          {this.state.itemdescription}
        </Text>
        <View style={{ flexDirection: "row", marginTop: 8 }}>
          <View style={{ width: wp("50%") }}>
            <Text style={styles.detailsHeadingRowStyle}>
              {Strings.deliverydetails.deliveryid}
            </Text>
            <Text numberOfLines={0} style={styles.detailsTextRowStyle}>
              {this.state.deliveryid}
            </Text>
          </View>
          <View style={{ width: wp("50%") }}>
            <Text style={styles.detailsHeadingRowStyle}>
              {Strings.deliverydetails.deliverydetails}
            </Text>
            <Text style={styles.detailsTextRowStyle}>
              {this.state.deliverydetails}
            </Text>
          </View>
        </View>

        <View style={{ flexDirection: "row" }}>
          <View style={{ width: wp("50%") }}>
            <Text style={styles.detailsHeadingRowStyle}>
              {Strings.deliverydetails.responsiblecompany}
            </Text>
            <Text numberOfLines={2} style={styles.detailsTextRowStyle}>
              {this.state.responsiblecompany}
            </Text>
          </View>
          <View style={{ width: wp("50%") }}>
            <Text style={styles.detailsHeadingRowStyle}>
              {Strings.deliverydetails.gateno}
            </Text>
            <Text numberOfLines={2} style={styles.detailsTextRowStyle}>
              {this.state.gateno}
            </Text>
          </View>
        </View>
        <View style={{ flexDirection: "row" }}>
          <View style={{ width: wp("50%") }}>
            <Text style={styles.detailsHeadingRowStyle}>
              {Strings.deliverydetails.equipmentneeded}
            </Text>
            <Text numberOfLines={0} style={styles.detailsTextRowStyle}>
              {this.state.equipementneeded}
            </Text>
          </View>
          <View style={{ width: wp("50%") }}>
            <Text style={styles.detailsHeadingRowStyle}>
              {Strings.deliverydetails.featureofwork}
            </Text>
            <Text numberOfLines={0} style={styles.detailsTextRowStyle}>
              {this.state.featureofwork}
            </Text>
          </View>
        </View>
        <View style={{ flexDirection: "row" }}>
          <View style={{ width: wp("50%") }}>
            <Text style={styles.detailsHeadingRowStyle}>
              {Strings.deliverydetails.deliveryvehicledetail}
            </Text>
            <Text numberOfLines={0} style={styles.detailsTextRowStyle}>
              {this.state.deliveryvehicledet}
            </Text>
          </View>
          <View style={{ width: wp("50%") }}>
            <Text style={styles.detailsHeadingRowStyle}>
              {Strings.deliverydetails.appliedby}
            </Text>
            <Text numberOfLines={2} style={styles.detailsTextRowStyle}>
              {this.state.appliedby}
            </Text>
          </View>
        </View>
        <Text style={styles.detailsHeadingStyle}>
          {Strings.deliverydetails.note}
        </Text>
        <Text
          numberOfLines={0}
          style={[styles.detailsTextStyle, { marginBottom: 15 }]}
        >
          {this.state.note}
        </Text>

        <View style={{ marginBottom: 50 }}>
          {this.state.showDropDown == true && (
            <TextField
              attrName={Strings.placeholders.selectstatus}
              title={Strings.placeholders.selectstatus}
              value={this.state.updatestatus}
              updateMasterState={(key, value) => {
                this.updateMasterState(key, value);
              }}
              mandatory={true}
              textInputStyles={{
                // here you can add additional TextInput styles
                color: Colors.black,
                fontSize: 14,
              }}
              showButton={true}
              onPress={() => {
                if (this.state.projectRoleId != 4) {
                  this.setState({ statusModal: true });
                }
              }}
              imageSource={Images.downArr}
              //   placeholder={'Select'}
            />
          )}

          {this.state.showGCDropDown == true &&
            this.state.selectstatus == "Approved" && (
              <TextField
                attrName={Strings.placeholders.selectstatus}
                title={Strings.placeholders.selectstatus}
                value={this.state.updatestatus}
                updateMasterState={(key, value) => {
                  this.updateMasterState(key, value);
                }}
                mandatory={true}
                textInputStyles={{
                  // here you can add additional TextInput styles
                  color: Colors.black,
                  fontSize: 14,
                }}
                showButton={true}
                onPress={() => {
                  if (this.state.projectRoleId == 3) {
                    this.setState({ gcStatusModal: true });
                  }
                }}
                imageSource={Images.downArr}
              />
            )}
        </View>
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


 
  renderFlatListItem = ({ item, index }) => {
    if (__DEV__) {
      //console.log("");
    }

    return (
      <View
        style={{
          minHeight: 40,
          marginVertical: hp("3%"),
          width: wp("95%"),
          alignSelf: "center",
          flexDirection: "row",
        }}
      >
        <TouchableOpacity
          onPress={() => {
            // console.log("onpress item", item);
            this.setState({ downloadModal: true, downloaditem: item });
          }}
        >
          <View style={[styles.flatlistContainer, { width: wp("95%") }]}>
            <View style={styles.nameContainer}>
              <View
                style={{
                  width: wp("18%"),
                  minHeight: hp("10%"),
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {(item.extension === "jpg" ||
                  item.extension === "jpeg" ||
                  item.extension === "png") && (
                  <Image
                    source={{ uri: item.attachement }}
                    style={styles.imagePlaceholder}
                  />
                )}
                {item.extension === "pdf" && (
                  <Image
                    source={Images.pdf_place}
                    resizeMode={"contain"}
                    style={styles.imagePlaceholder}
                  />
                )}
                {item.extension === "doc" && (
                  <Image
                    source={Images.doc_place}
                    resizeMode={"contain"}
                    style={styles.imagePlaceholder}
                  />
                )}
              </View>
              <View style={styles.detailContainer}>
                <Text style={styles.nameText}>{item.filename}</Text>
                <Text style={styles.companyText}>
                  {moment(item.createdAt).format("MMMM DD,YYYY, hh:mm:ss a")}
                </Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
        <View
          style={[
            styles.dotMenu,
            {
              width: wp("10%"),
              height: hp("8%"),
              position: "absolute",
              right: 10,
            },
          ]}
        >
          <TouchableWithoutFeedback
            onPress={() => {
              this.setState({
                selectedAttachmentId: item.id,
                showDelete: true,
              });
              // this.deleteattachement(item.id)
            }}
          >
            <Image source={Images.delete} />
          </TouchableWithoutFeedback>
        </View>
      </View>
    );
  };


  renderAttachement = () => {
    return (
      <View style={{ flex: 1 }}>
        <View style={styles.flatlistContainer}>
          <TouchableWithoutFeedback
            onPress={() => {
              this.pickupDocument();
            }}
          >
            <View style={{ width: wp("95%") }}>
              <View style={styles.nameContainer}>
                <View
                  style={{
                    width: wp("18%"),
                    minHeight: hp("10%"),
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <View
                    style={{
                      width: wp("15%"),
                      height: wp("15%"),
                      borderRadius: wp("3%"),
                      marginLeft: wp("6%"),
                      backgroundColor: "#ECECEC",
                      justifyContent: "center",
                    }}
                  >
                    <Image
                      source={Images.plus_attach}
                      style={{
                        justifyContent: "center",
                        alignItems: "center",
                        alignSelf: "center",
                      }}
                    />
                  </View>
                </View>
                <View style={styles.detailContainer}>
                  <Text
                    style={{
                      color: "#707070",
                      fontSize: 14,
                      fontFamily: Fonts.montserratSemiBold,
                    }}
                  >
                    {Strings.deliverydetails.addattachment}
                  </Text>
                </View>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
        <FlatList
          data={this.state.attachmentList}
          renderItem={this.renderFlatListItem}
          // ItemSeparatorComponent={this.itemSeparator}
          keyExtractor={(item, index) => index.toString()}
          onEndReached={() => this.onEndReached()}
          onEndReachedThreshold={0}
          onMomentumScrollBegin={() => {
            this.onEndReachedCalledDuringMomentum = false;
          }}
          onRefresh={() => this._onReset()}
          refreshing={this.state.refreshing}
          style={{ height: hp("50%") }}
        />
      </View>
    );
  };

 
  renderCommentListItem = ({ item, index }) => {
    if (__DEV__) {
      // console.log("comment ITEM ======", item);
    }

    return (
      <View style={styles.flatlistContainer}>
        <View style={{ width: wp("95%") }}>
          <View style={{ flexDirection: "row", width: wp("90%") }}>
            <Image
              source={
                item.Member.User.profilePic
                  ? { uri: item.Member.User.profilePic }
                  : Images.placeholder
              }
              style={{
                width: wp("10%"),
                height: wp("10%"),
                borderRadius: wp("5%"),
                //  backgroundColor: "gray",
                marginRight: 10,
                marginLeft: 10,
              }}
            ></Image>
            <Text
              style={
                (styles.historyCompanyText, { marginTop: 10, width: wp("70%") })
              }
            >
              {item.Member.User.firstName}
            </Text>
          </View>
          <View style={styles.historyDetailContainer}>
            <Text style={styles.historyNameText}>{item.comment.trim()}</Text>
            <Text style={styles.historyDateText}>
              {moment(item.createdAt).format("MMMM DD,YYYY, hh:mm:ss a")}
            </Text>
          </View>
        </View>

        <View
          style={{ marginTop: 10, height: 0.5, backgroundColor: "#A8B2B9" }}
        ></View>
      </View>
    );
  };

  renderTextField = () => {
    const { height } = this.state;

    let newStyle = {
      height,
    };

    return (
      <View
        style={{
          marginLeft: 20,
          marginRight: 20,
          width: wp("90%"),
          backgroundColor: "white",
        }}
        onLayout={(event) => {
          /* console.log(
            "ddddddd",
            (commentHeight = event.nativeEvent.layout.height)
          ); */
        }}
      >
        <View style={{}}>
          <Text style={styles.commentsTextBox}>
            {Strings.deliverydetails.entercomments}
          </Text>
          <View
            style={{
              height: hp("10%"),
              borderRadius: 5,
              borderColor: "#BEBEBE",
              borderWidth: 0.5,
              marginTop: 10,
            }}
          >
            <TextInput
              placeholder="Your Placeholder"
              onChangeText={(value) => this.setState({ commenttext: value })}
              style={([newStyle], { margin: 5 })}
              editable
              multiline
              maxLength={150}
              value={this.state.commenttext}
              onContentSizeChange={(e) =>
                this.updateSize(e.nativeEvent.contentSize.height)
              }
            />
          </View>
          <TouchableOpacity
            onPress={() => {
              let comStr = this.state.commenttext;
              if (isEmpty(comStr.trim())) {
                this.setState(
                  {
                    showToaster: true,
                    toastMessage: "Please enter the comments",
                    toastType: "error",
                  },
                  () => this.hideToast()
                );
              } else {
                if (comStr.length < 3) {
                  this.setState(
                    {
                      showToaster: true,
                      toastMessage:
                        "comment lenght must be atleast 3 characters long",
                      toastType: "error",
                    },
                    () => this.hideToast()
                  );
                } else {
                  this.nextCommentClick();
                }
              }
            }}
            style={{
              width: wp("50%"),

              height: hp("7%"),
              marginTop: hp("3%"),
              backgroundColor: Colors.themeOpacity,
              borderRadius: hp("3.5%"),
              justifyContent: "center",
              alignItems: "center",
              alignSelf: "flex-end",
            }}
          >
            <View
              style={{
                width: wp("50%"),
                alignSelf: "center",
                height: hp("7%"),
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  fontSize: wp("5%"),
                  color: Colors.themeColor,
                  fontFamily: Fonts.montserratSemiBold,
                }}
              >
                {Strings.profile.submit}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  renderComments = () => {
    return (
      <KeyboardAwareScrollView extraScrollHeight={hp("33")}>
        <View style={{ flex: 1, height: commentListHeight - hp("30") }}>
          <FlatList
            style={{ marginTop: 10 }}
            data={this.state.commentList}
            renderItem={this.renderCommentListItem}
            keyExtractor={(item, index) => index.toString()}
            onEndReached={() => this.onEndReached()}
            onEndReachedThreshold={0}
            onMomentumScrollBegin={() => {
              this.onEndReachedCalledDuringMomentum = false;
            }}
            onRefresh={() => this._onReset()}
            refreshing={this.state.refreshing}
          />
        </View>
        <View style={{ flex: 1, height: hp("30") }}>
          {this.renderTextField()}
        </View>
      </KeyboardAwareScrollView>
    );
  };

  renderHistoryListItem = ({ item, index }) => {
    if (__DEV__) {
      //  console.log("FLATLIST ITEM ======", item);
    }

    return (
      <View style={styles.flatlistContainer}>
        <View style={{ width: wp("95%") }}>
          <View style={styles.historyDetailContainer}>
            <Text style={styles.historyDateText}>
              {moment(item.createdAt).format("MMMM DD,YYYY, hh:mm:ss a")}
            </Text>
            <Text style={styles.historyCompanyText}>
              {item.description.trim()}
            </Text>
          </View>
          <View
            style={{ marginTop: 10, height: 0.5, backgroundColor: "#A8B2B9" }}
          ></View>
        </View>
      </View>
    );
  };

  renderHistory = () => {
    return (
      <View style={{ flex: 1, marginBottom: hp("10%") }}>
        <FlatList
          data={this.state.historylist}
          renderItem={this.renderHistoryListItem}
          // ItemSeparatorComponent={this.itemSeparator}
          keyExtractor={(item, index) => index.toString()}
          onEndReached={() => this.onEndReached()}
          onEndReachedThreshold={0}
          onMomentumScrollBegin={() => {
            this.onEndReachedCalledDuringMomentum = false;
          }}
          onRefresh={() => this._onReset()}
          refreshing={this.state.refreshing}
        />
      </View>
    );
  };

  updateSize = (height) => {
    this.setState({
      height,
    });
  };

  renderBottomContainer = () => {
    return (
      <View style={styles.bottomContainer}>
        {this.state.showSave == true && (
          <View style={styles.bottomView}>
            <TouchableOpacity
              onPress={() => this.onSelectDropdown("Save")}
              style={styles.footerAction}
            >
              <Image source={HEADERDROPDOWNOPTIONS[0].image} />
              <Text style={styles.footerActionText}>
                {HEADERDROPDOWNOPTIONS[0].name}
              </Text>
            </TouchableOpacity>
          </View>
        )}

        <View style={styles.bottomView}>
          <TouchableOpacity
            onPress={() => this.onSelectDropdown("Edit")}
            style={styles.footerAction}
          >
            <Image source={HEADERDROPDOWNOPTIONS[1].image} />
            <Text style={styles.footerActionText}>
              {HEADERDROPDOWNOPTIONS[1].name}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.bottomView}>
          <TouchableOpacity
            onPress={() => this.onSelectDropdown("Void")}
            style={styles.footerAction}
          >
            <Image source={HEADERDROPDOWNOPTIONS[2].image} />
            <Text style={styles.footerActionText}>
              {HEADERDROPDOWNOPTIONS[2].name}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  cancelPopupAcceptTap = () => {
    this.setState({ showCancel: false });
    this.onCancelSubscription();
  };

  cancelPopupDeclineTap = () => {
    this.setState({ showCancel: false });
  };

  deletePopupAcceptTap = () => {
    this.setState({ showDelete: false });
    this.deleteattachement(this.state.selectedAttachmentId);
  };

  deletePopupDeclineTap = () => {
    this.setState({
      showDelete: false,
      selectedAttachmentId: null,
    });
  };

  render() {
    return (
      <AppView>
        <View style={styles.parentContainer}>
          {this.renderHeader()}

          <ScrollableTabView
            nestedScrollEnabled={true}
            onChangeTab
            renderTabBar
            style={{ marginTop: 20 }}
            initialPage={0}
            tabBarUnderlineStyle={{ backgroundColor: Colors.themeColor }}
            tabBarBackgroundColor={"#F5F5F5"}
            tabBarActiveTextColor={Colors.themeColor}
            tabBarInactiveTextColor={"#A8B2B9"}
            tabBarTextStyle={{
              fontSize: wp("3.8%"),
              fontFamily: Fonts.montserratExtraLight,
            }}
          >
            <View tabLabel="Details">
              <KeyboardAwareScrollView extraScrollHeight={50}>
                {this.renderDetails()}
              </KeyboardAwareScrollView>
            </View>

            <View tabLabel="Attachments">
              <KeyboardAwareScrollView scrollEnabled={false}>
                {this.renderAttachement()}
              </KeyboardAwareScrollView>
            </View>

            <View tabLabel="Comments">
              <View
                style={{ width: "100%", height: "95%" }}
                onLayout
              >
                {this.renderComments()}
              </View>
            </View>

            <View tabLabel="History">
              <KeyboardAwareScrollView extraScrollHeight={50}>
                {this.renderHistory()}
              </KeyboardAwareScrollView>
            </View>
          </ScrollableTabView>

          {this.renderBottomContainer()}
        </View>

        <Dropdown
          data
          title={Strings.placeholders.selectstatus}
          value
          closeBtn
          onPress
          visible
          onbackPress
        />

        <Dropdown
          data
          title={Strings.profile.Choose}
          value={""}
          closeBtn
          onPress
          visible
          onbackPresstainer={{ justifyContent: "center", alignItems: "center" }}
          textContainer={{ fontSize: 14 }}
        />

        <Dropdown
          data
          title={Strings.placeholders.selectstatus}
          value
          closeBtn
          onPress
          visible
          onbackPress
        />

        <AttachDropdown
          data
          title={Strings.deliverydetails.files}
          value
          closeBtn
          onRemove
          onDone
          visible
          onbackPress
        />

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
            desc={Strings.popup.changepasswordSuccess}
            okTap
          />
        )}

        {this.state.showCancel && (
          <DeletePop
            title={Strings.popup.success}
            desc={Strings.popup.cancelSub}
            descStyles={{
              width: "80%",
            }}
            container={{ bottom: 0 }}
            acceptTap
            declineTap
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
      </AppView>
    );
  }
}
const mapStateToProps = (state) => {
  
};

export default connect(mapStateToProps)(Details);

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
  title: {
    width: wp("80%"),
    fontSize: wp("6%"),
    textAlign: "center",
    fontFamily: Fonts.montserratSemiBold,
  },
  // imageContainer: {
  //   width: wp("100%"),
  //   height: hp("13%"),
  //   alignItems: "center"
  // },
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
  closecontainer: {
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
  customOptionsStyle: {
    justifyContent: "flex-end",
    height: hp("21%"),
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
    marginRight: wp("20%"),
    //outlineProvider: 'bounds'
  },
  detailsHeadingStyle: {
    width: wp("80%"),
    color: "#787993",
    fontSize: wp("3.5%"),
    fontFamily: Fonts.montserratMedium,
    marginTop: 20,
  },
  detailsTextStyle: {
    width: wp("90%"),
    color: "#555561",
    fontSize: wp("3.5%"),
    marginLeft: 2,
    marginTop: 8,
    fontFamily: Fonts.montserratMedium,
  },
  detailsHeadingRowStyle: {
    width: wp("40%"),
    color: "#787993",
    fontSize: wp("3.5%"),
    fontFamily: Fonts.montserratMedium,
    marginTop: 20,
  },
  detailsTextRowStyle: {
    width: wp("40%"),
    color: "#555561",
    fontSize: wp("3.5%"),
    marginLeft: 2,
    marginTop: 8,
    fontFamily: Fonts.montserratMedium,
  },
  flatlistContainer: {
    width: wp("95%"),
    marginVertical: 3,
    marginTop: 5,
    // backgroundColor: Colors.white,
    // borderColor: Colors.shadowColor,
    // borderWidth: 0.3,
    // shadowOffset: {width: 4, height: 4},
    // shadowOpacity: 1,
    // elevation: 3,
    // shadowColor: 'rgba(0,0,0,0.14)',
    alignSelf: "center",
    // borderRadius: wp('2%')
  },
  nameContainer: {
    minHeight: hp("10%"),
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
    width: wp("15%"),
    height: wp("15%"),
    borderRadius: wp("1%"),
    marginLeft: wp("6%"),
  },
  nameText: {
    color: "#292529",
    fontSize: wp("4%"),
    fontFamily: Fonts.montserratSemiBold,
    marginTop: 10,
  },
  companyText: {
    color: "#A8B2B9",
    fontSize: wp("3.5%"),
    fontFamily: Fonts.montserratRegular,
    marginTop: hp("1%"),
  },
  customDropdownStyle: {
    justifyContent: "center",
    alignItems: "center",
    width: wp("30%"),
    height: 40,
    marginRight: 10,
  },
  customOptionsStyle1: {
    justifyContent: "flex-end",
    height: hp("14%"),
    width: wp("35%"),
    marginLeft: 5,
    borderColor: Colors.white,
    marginRight: wp("10%"),
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
  dotMenu: {
    marginTop: hp("2%"),
  },
  customheaderDropdownStyle: {
    justifyContent: "flex-end",
    alignItems: "flex-end",
    height: 40,
    width: wp("30%"),
  },
  historyDetailContainer: {
    width: wp("90%"),
    marginLeft: 20,
    justifyContent: "center",
  },
  historyNameText: {
    color: "#5B5B5B",
    fontSize: wp("3.5%"),
    fontFamily: Fonts.montserratRegular,
    marginTop: hp("1%"),
  },
  historyDateText: {
    color: "#A8B2B9",
    fontSize: wp("3.5%"),
    fontFamily: Fonts.montserratRegular,
    marginTop: hp("1%"),
  },
  historyCompanyText: {
    color: "#5B5B5B",
    fontSize: wp("3.5%"),
    fontFamily: Fonts.montserratSemiBold,
    marginTop: hp("1%"),
    width: wp("90%"),
  },
  commentsTextBox: {
    color: "#5B5B5B",
    fontSize: wp("3.5%"),
    fontFamily: Fonts.montserratRegular,
    marginTop: hp("1%"),
    // marginTop: 20,
  },
  bottomContainer: {
    position: "absolute",
    width: wp("100%"),
    borderTopWidth: 0.5,
    shadowOpacity: 1,
    elevation: 200,
    //shadowColor: "rgba(0,0,0,0.14)",
    backgroundColor: "#fff",
    shadowColor: Colors.placeholder,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    height: hp("10%"),
    bottom: 0,
  },
  bottomView: {
    width: wp("30%"),
    justifyContent: "center",
    alignItems: "center",
    height: hp("8%"),
    marginHorizontal: 20,
  },
  footerAction: { justifyContent: "center", alignItems: "center" },
  footerActionText: {
    fontFamily: Fonts.montserratRegular,
    marginTop: 5,
  },
});
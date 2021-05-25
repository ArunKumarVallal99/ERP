import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  ScrollView,
  TouchableWithoutFeedback,
  TouchableOpacity,
  FlatList,
} from "react-native";
import Colors from "../../common/color";
import Images from "../../common/images";
import Strings from "../../common/string";
import Fonts from "../../common/fonts";
import { connect } from "react-redux";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { View as AnimatableView } from "react-native-animatable";
import {
  getProjectList,
  getprojectRole,
  getCompanyprojectlist,
  _getData,
} from "../../api/Api";

} from "../../api/Constants";
import Loader from "../../components/loader/Loader";
import Toastpopup from "../../components/toastpopup/Toastpopup";
import DeletePop from "../../components/toastpopup/logoutPop";
import { BlurView } from "@react-native-community/blur";
import Modal from "react-native-modal";

//keep apiCalls count
class menu extends Component {
  constructor(props) {
    super(props);
  }

  renderHeader = () => {
    const { userDetails } = this.props;

    if (__DEV__) {
      //console.log("USER DETAILS ======", this.state.userDetails);
    }

    return (
      <AnimatableView
        animation={"fadeIn"}
        style={[styles.header, { width: wp("93%") }]}
      >
        <View style={[styles.header, { width: wp("80%") }]}>
          <TouchableWithoutFeedback
            onPress
          >
            <View style={[styles.header]}>
              <Image
                 source={
                  this.state.userDetails.profilePic
                    ? { uri: this.state.userDetails.profilePic }
                    : Images.placeholder
                }
               /*  source={
                  userDetails.profilePic
                    ? { uri: userDetails.profilePic }
                    : Images.placeholder
                } */
                style={{
                  width: hp("6%"),
                  height: hp("6%"),
                  borderRadius: hp("3%"),
                }}
              />
              <Text
                numberOfLines={2}
                style={[styles.usrname, { width: wp("60%") }]}
              >
                {this.state.userDetails.firstName}
              </Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
        <View style={styles.closecontainer}>
          <TouchableWithoutFeedback
            onPress
          >
            <Image
              resizeMode={"contain"}
              source={Images.close}
              style={{ width: wp("12%"), height: hp("3%") }}
            />
          </TouchableWithoutFeedback>
        </View>
      </AnimatableView>
    );
  };


  renderProductFlatListItem = ({ item, index }) => {
    if (__DEV__) {
      //      //console.log("Notification ITEM =======", item);
    }
    return (
      <View>
        {/* <TouchableOpacity onPress={() => {
            //console.log("DR item", item.id);
        }}> */}
        <View style={{ width: wp("96%"), marginTop: hp("1%") }}>
          <TouchableOpacity
            onPress
            style={{ flexDirection: "row" }}
          >
            <Text
              style={[styles.subtext, { width: wp("85%") }]}
              numberOfLines={1}
            >
              {item.projectName}
            </Text>
            <Image
              resizeMode={"contain"}
              source={Images.arrow_right}
              style={{
                width: wp("3%"),
                height: hp("3%"),
              }}
            />
          </TouchableOpacity>
        </View>
        <View
          style={{ height: 0.5, backgroundColor: "#A8B2B9", marginTop: 5 }}
        ></View>
      </View>
    );
  };

  renderCompanyFlatListItem = ({ item, index }) => {
    if (__DEV__) {
      //  //console.log("Notification ITEM =======", item);
    }
    return (
      <View>
        <View style={{ marginLeft: 20, marginRight: 20, marginBottom: 20 }}>
          <Text style={styles.nameText} numberOfLines={1}>
            {item.companyName}
          </Text>

          <FlatList
            data
            renderItem={this.renderProductFlatListItem}
            // ItemSeparatorComponent={this.itemSeparator}
            //  keyExtractor={(item, index) => index.toString()}
            //  onEndReached={() => this.onEndReached()}
            onEndReachedThreshold={0}
            onMomentumScrollBegin

            //  onRefresh={() => this._onReset()}
            //  refreshing={this.state.refreshing}
          />
        </View>
      </View>
    );
  };

  renderCompanyContainer = () => {
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
            <Text style={modalStyles.title}>{Strings.menu.projects}</Text>
          </View>
          <View style={{ width: 40, height: 40 }} />
        </View>
        <View>
          <FlatList
            data
            renderItem={this.renderCompanyFlatListItem}
            // ItemSeparatorComponent={this.itemSeparator}
            // keyExtractor={(item, index) => index.toString()}
            //  onEndReached={() => this.onEndReached()}
            onEndReachedThreshold={0}
            onMomentumScrollBegin
            //  onRefresh={() => this._onReset()}
            //  refreshing={this.state.refreshing}
          />
        </View>
        {/* <View style={[modalStyles.buttonContainer, { marginBottom: 0, marginTop: 80 }]}>
          <TouchableOpacity onPress={() => { this.addnewProject() }} style={{ width: wp('85%'), height: hp('5%'), flexDirection: 'row', backgroundColor: Colors.themeOpacity, justifyContent: 'center', alignItems: 'center', borderRadius: hp('2.5%') }}>
            <Image source={Images.newpro} />
            <Text style={{ color: Colors.themeColor, marginHorizontal: 10, fontSize: wp('4%'), fontFamily: Fonts.montserratMedium }}>{Strings.menu.addNew}</Text>
          </TouchableOpacity>
        </View> */}
      </View>
    );
  };

  renderProjectContainer = () => {
    return (
      <AnimatableView animation={"zoomInUp"} style={styles.projectContainer}>
        <ScrollView>
          {this.state.projectDetails &&
            this.state.projectDetails.map((item, index) => {
              return (
                <View key={index.toString()} style={{ flex: 1, margin: 5 }}>
                  <TouchableWithoutFeedback
                    onPress
                  >
                    <View
                      key={index.toString()}
                      style={{
                        justifyContent: "center",
                        flex: 1,
                        marginLeft: wp("5%"),
                      }}
                    >
                      <Text
                        numberOfLines={1}
                        style={[styles.textTitle, { color: Colors.black }]}
                      >
                        {item.projectName.trim()}
                      </Text>
                    </View>
                  </TouchableWithoutFeedback>
                </View>
              );
            })}
        </ScrollView>

        <TouchableOpacity
          onPress
          style={{
            width: wp("85%"),
            height: hp("7%"),
            flexDirection: "row",
            backgroundColor: Colors.themeOpacity,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image source={Images.newpro} />
          <Text
            style={{
              color: Colors.themeColor,
              marginHorizontal: 10,
              fontSize: wp("4%"),
              fontFamily: Fonts.montserratMedium,
            }}
          >
            {Strings.menu.addNew}
          </Text>
        </TouchableOpacity>
      </AnimatableView>
    );
  };

  render() {
    // //console.log("PROJECT SELECTED =====", this.state.projectSelected)

    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.parentContainer}>
          {/* <NavigationEvents
            onDidFocus={() => {
             this.getProjectList();
            }}
            onDidBlur={() => {
               alert('blur')
            }}
          /> */}
          {this.renderHeader()}

          <ScrollView style={styles.parentContainer}>
            {this.state.data.map((item, index) => {
              return (
                <View key={index.toString()} style={styles.themeContainer}>
                  <TouchableWithoutFeedback
                    onPress
                  >
                    <View style={styles.subContainer}>
                      <Text style={styles.textTitle}>{item.title}</Text>
                      <Image
                        resizeMode={"contain"}
                        source={item.image}
                        style={{
                          width: wp("6%"),
                          height: hp("3%"),
                          marginLeft: 10,
                        }}
                      />
                    </View>
                  </TouchableWithoutFeedback>
                </View>
              );
            })}
          </ScrollView>

          <View
            style={[
              styles.themeContainer,
              {
                width: wp("100%"),
                marginBottom: hp("18%"),
                borderBottomWidth: hp("0.3%"),
                borderTopWidth: hp("0.3%"),
                borderColor: "rgba(255, 255, 255, 0.1)",
              },
            ]}
          >
            <TouchableWithoutFeedback
              onPress
            >
              <View style={[styles.subContainer, { marginRight: wp("7%") }]}>
                <Text style={styles.textTitle}>{Strings.menu.logout}</Text>
                <Image
                  resizeMode={"contain"}
                  source={Images.logout}
                  style={{
                    width: wp("6%"),
                    height: hp("3%"),
                    marginLeft: 10,
                  }}
                />
              </View>
            </TouchableWithoutFeedback>
          </View>
          <View style={styles.bottomContainer}>
            <Text style={styles.projectTitle}>{Strings.menu.project}</Text>
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                alignItems: "center",
                marginLeft: 10,
                marginRight: 10,
              }}
            >
              <Text style={styles.projectName} numberOfLines={2}>
                {this.state.projectSelected.projectName
                  ? this.state.projectSelected.projectName.trim()
                  : ""}
              </Text>
              <TouchableOpacity
                onPress
              >
                <Image source={Images.upArrow} />
              </TouchableOpacity>
            </View>
          </View>
          {this.state.showProjects && this.renderProjectContainer()}
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
            viewRef={this.state.showLoader}
            blurType="light"
            blurAmount={10}
            reducedTransparencyFallbackColor="white"
          >
            <Loader />
          </BlurView>
        )}

        <Modal
          isVisible={this.state.SCcompanyList}
          style={{
            paddingTop: 45,
            paddingBottom: 30,
            margin: 0,
            backgroundColor: Colors.white,
          }}
        >
          {this.renderCompanyContainer()}
        </Modal>

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
            desc={Strings.popup.logout}
            acceptTap
            container={{ bottom: 0 }}
            declineTap
          />
        )}
      </SafeAreaView>
    );
  }
}

const mapStateToProps = (state) => {
  
};

export default connect(mapStateToProps)(menu);

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.themeColor,
  },
  parentContainer: {
    flex: 1,
    backgroundColor: Colors.themeColor,
  },
  header: {
    height: hp("10%"),
    alignItems: "center",
    alignSelf: "center",
    flexDirection: "row",
  },
  usrname: {
    color: Colors.white,
    fontSize: wp("4%"),
    fontFamily: Fonts.montserratRegular,
    marginLeft: wp("3%"),
  },
  closecontainer: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
  themeContainer: {
    width: wp("90%"),
    height: wp("12%"),
    alignSelf: "center",
    margin: 5,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  subContainer: {
    height: wp("12%"),
    alignSelf: "center",
    margin: 5,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  textTitle: {
    color: Colors.white,
    fontSize: wp("3.5%"),
    fontFamily: Fonts.montserratMedium,
  },
  projectTitle: {
    color: Colors.placeholder,
    fontSize: wp("4%"),
    fontFamily: Fonts.montserratSemiBold,
    margin: 10,
    marginBottom: 5,
  },
  projectName: {
    width: wp("70%"),
    color: Colors.themeColor,
    fontFamily: Fonts.montserratSemiBold,
    fontSize: wp("4%"),
  },
  bottomContainer: {
    width: wp("85%"),
    height: hp("10%"),
    position: "absolute",
    backgroundColor: Colors.white,
    alignSelf: "center",
    bottom: hp("3%"),
    borderRadius: wp("3%"),
  },
  projectContainer: {
    position: "absolute",
    width: wp("85%"),
    height: hp("20%"),
    bottom: hp("14%"),
    alignSelf: "center",
    backgroundColor: Colors.white,
    borderRadius: wp("2%"),
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
  nameText: {
    color: "#A8B2B9",
    fontSize: wp("5%"),
    fontFamily: Fonts.montserratMedium,
    marginTop: 10,
    marginBottom: 10,
    width: "75%",
  },
  subtext: {
    width: "80%",
    color: "#292529",
    fontSize: wp("3.5%"),
    fontFamily: Fonts.montserratMedium,
  },
});

const modalStyles = StyleSheet.create({
  container: {
    flex: 1,
    width: wp("100%"),
    height: hp("95%"),
    backgroundColor: "white",
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
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-end",
    marginBottom: 50,
    justifyContent: "space-around",
  },
});

const data1 = [
  {
    id: "1",
    title: "No. of deliveries",
    amt: "company 1",
  },
  {
    id: "2",
    title: "No. of members",
  },
  {
    id: "3",
    title: "No. of companies",
  },
];

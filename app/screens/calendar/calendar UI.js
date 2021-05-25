import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Image,
  ActivityIndicator,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import moment from "moment";
import { ExpandableCalendar, CalendarProvider } from "react-native-calendars";
import { AppView, AppLoader, Timeline, TextField } from "../../components";
import { FlatList } from "react-native-gesture-handler";
import { connect } from "react-redux";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Modal from "react-native-modal";
import DropDownPicker from "react-native-dropdown-picker";
import { Images, Strings } from "../../common";

class Calendar extends Component {
  renderEmptyItem() {
    return (
      <View style={styles.emptyItem}>
        <Text style={styles.emptyItemText}>No Events Planned</Text>
      </View>
    );
  }

  renderItem = ({ item }) => {

    if (_.isEmpty(item)) {
      return this.renderEmptyItem();
    }

    return (
      <TouchableOpacity style={styles.item}>
        <View>
          <Text style={styles.itemHourText}>{item.hour}</Text>
          <Text style={styles.itemDurationText}>{item.duration}</Text>
        </View>
        <Text style={styles.itemTitleText}>{item.title}</Text>
        <View style={styles.itemButtonContainer}>
          <Button title={"Info"} />
        </View>
      </TouchableOpacity>
    );
  };

  getTheme = () => {
    const themeColor = "#2E2E2E";
    const disabledColor = "#a6acb1";
    const white = "#ffffff";

    return {
      // arrows
      arrowColor: "#CFD5DA",
      arrowStyle: { paddingLeft: 15, paddingRight: 15 },
      // month
      monthTextColor: "#292529",
      textMonthFontSize: wp("4.5%"),
      textMonthFontFamily: Fonts.montserratBold,
      textMonthFontWeight: "bold",
      // day names
      textSectionTitleColor: "#2C3593",
      textDayHeaderFontSize: wp("3%"),
      textDayHeaderFontFamily: Fonts.montserratSemiBold,
      // textDayHeaderFontWeight: 'medium',
      // today
      //  todayBackgroundColor: lightThemeColor,
      // todayTextColor: themeColor,
      // dates
      dayTextColor: themeColor,
      textDayFontSize: wp("4%"),
      textDayFontFamily: Fonts.montserratRegular,
      // textDayFontWeight: '500',
      textDayStyle: { marginTop: Platform.OS === "android" ? 2 : 4 },
      // selected date
      selectedDayBackgroundColor: Colors.themeColor,
      selectedDayTextColor: "white",

      // disabled datet
      textDisabledColor: disabledColor,
      // dot (marked date)
      dotColor: themeColor,
      selectedDotColor: white,
      disabledDotColor: disabledColor,
      dotStyle: { marginTop: -2, height: 8, width: 8, borderRadius: 4 },
    };
  };

  renderFlatListItem = ({ item, index }) => {
    return (
      <View style={styles.flatlistContainer}>
        <TouchableOpacity
          onPress={}
        >
          <View style={{ flexDirection: "column" }}>
            {item.day && (
              <Text
                style={{
                  marginTop: hp("1%"),
                  marginBottom: hp("1%"),
                  color: "#292529",
                  fontSize: wp("4.5%"),
                  fontFamily: "Montserrat-bold",
                }}
              >
                {moment(item.day).format("ddd MMM DD")}
              </Text>
            )}
            <View style={{ flexDirection: "row", margin: 10 }}>
              <View style={{ flexDirection: "column", marginRight: 10 }}>
                <Text
                  style={{
                    fontSize: wp("3.5%"),
                    fontFamily: "Montserrat-regular",
                    color: "#BEBEBE",
                    marginBottom: hp("3%"),
                    marginTop: hp("1%"),
                  }}
                >
                  {moment(item.start).format("HH:mm")}
                </Text>
                <Text
                  style={{
                    fontSize: wp("3.5%"),
                    fontFamily: "Montserrat-regular",
                    color: "#BEBEBE",
                  }}
                >
                  {moment(item.end).format("HH:mm")}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "column",
                  width: wp("80%"),
                  backgroundColor: item.color,
                  borderRadius: 5,
                  marginTop: hp("1%"),
                }}
              >
                <Text
                  style={{
                    marginLeft: 20,
                    marginTop: hp("1%"),
                    marginBottom: hp("1%"),
                    color: "#25265E",
                    fontSize: wp("4%"),
                    fontFamily: "Montserrat-semibold",
                  }}
                  numberOfLines={1}
                >
                  {item.title}
                </Text>
                {/* <Text>{item.summary}</Text> */}
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  itemSeparator = () => (
    <View
      style={{
        backgroundColor: "rgb(216,216,216)",
        height: 0.5,
      }}
    />
  );

  renderSearchBar = () => {
  /**
   * this function returns UI
   */
    if (condition) {
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
            onPress={}
          >
            <Image
              resizeMode={"contain"}
              source={Images.closeBlack}
              style={searchStyles.closeImg}
            />
          </TouchableOpacity>

          <View style={searchStyles.searchPageTitle}>
            <Text style={searchStyles.titleText}>{Strings.search.title}</Text>
          </View>

          <TouchableOpacity
            style={searchStyles.closeBtn}
            onPress={}
          >
            {//this.state.showright == true && (
              <Image
                resizeMode={"contain"}
                source={Images.delete1}
                style={searchStyles.closeImg}
              />
            }
          </TouchableOpacity>
        </View>

        <View style={{ flexDirection: "row", justifyContent: "center" }}>
          <TextField
            showLeft={true}
            attrName={Strings.placeholders.SearchHere}
            title={Strings.placeholders.SearchHere}
            value={}
            updateMasterState={}
            hideShow={false}
            hideImage={""}
            textInputStyles={searchStyles.txtInputStyles}
            textTitleStyles={searchStyles.txtTitleStyles}
            leftImage={Images.searchGray}
            leftButton={{ bottom: 0 }}
          />

          <View style={searchStyles.clearSearchView}>
            {//this.state.showIndicator == true && (
              <ActivityIndicator style={{ marginBottom: 5 }} />
            }
            { //this.state.clearSearch == true && (
              <TouchableOpacity onPress={}>
                <Image source={Images.closeBlack} style={{ marginBottom: 5 }} />
              </TouchableOpacity>
            }
          </View>
        </View>
      </View>
    );
  };

  renderHeader() {
  
    return (
      <View style={styles.headerContainer}>
        <Text style={styles.title}>{Strings.calender.calendar}</Text>

        <View style={styles.headerRowContainer}>
          <TouchableOpacity
            style={[
              styles.image,
              {
                marginTop: wp("1%"),
               // marginBottom:
                 // this.state.listClick === true ? hp("1%") : hp("2%"),
              }
            ]}
            onPress={}
          >
            <Image
              source={
               // this.state.listClick === true
               //   ? Images.list_click
               //   : Images.list_unclick
              }
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.image, { marginTop: wp("1%") }]}
            onPress={}
          >
            <Image source={Images.filter} />

            {//this.state.filter == true && (
              <View style={styles.filterCountView}>
                <Text style={{ color: "white" }}>{}</Text>
              </View>
            }
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.image}
            onPress={}
          >
            <Image source={Images.search} />
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  renderNoDeliveryRequest = () => {
    return (
        <View style={styles.noDRView}>
          <Text style={styles.noDRText}>No Delivery Request</Text>
        </View>
    );
  };

  render() {
    return (
      <AppView>
        <View style={styles.parentContainer}>
          {this.renderSearchBar()}

          { //!this.state.listClick && (
            <CalendarProvider
              date={}
              onDateChanged={}
              onMonthChange={}
              theme={{ todayButtonTextColor: "#2E2E2E" }}
              showTodayButton={false}
              disabledOpacity={0.6}
            >
              <ExpandableCalendar
                firstDay={1}
                markedDates={}
                theme={this.getTheme()}
                leftArrowImageSource={Images.arrow_left}
                rightArrowImageSource={Images.arrow_right}
              />
              <Timeline
                format24h={true}
                eventTapped={}
                events={}
      
              />
            </CalendarProvider>
          }

          {//this.state.listClick && this.state.event.length > 0 && (
            <FlatList
              data={}
              renderItem={this.renderFlatListItem}
              ItemSeparatorComponent={this.itemSeparator}
              keyExtractor={}
              onEndReached={}
              onEndReachedThreshold={0}
              onMomentumScrollBegin={}
              onRefresh={}
              refreshing={}
            />
          }

          {this.renderNoDeliveryRequest()}
        </View>

          <AppLoader viewRef={} />

        <Modal
          isVisible={}
          style={modalStyles.filtermodal}
        >
          {this.renderFilter()}
        </Modal>
      </AppView>
    );
  }

  renderFilter = () => {
    return (
      <View style={modalStyles.container}>
        <View style={modalStyles.topContainer}>
          <TouchableOpacity
            onPress={}
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
            value={}
            updateMasterState={}
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
            items={}
            defaultValue={}
            placeholder={Strings.placeholders.company}
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
            dropDownStyle={{
              backgroundColor: Colors.white,
              width: "90%",
              alignSelf: "center",
            }}
            onChangeItem={}
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
            zIndex={5000}
          />

          <DropDownPicker
            items={}
            defaultValue={}
            placeholder={Strings.placeholders.responisblePerson}
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
            dropDownStyle={{
              backgroundColor: Colors.white,
              width: "90%",
              alignSelf: "center",
            }}
            onChangeItem={}
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
            zIndex={4000}
          />

          <DropDownPicker
            items={}
            defaultValue={}
            placeholder={Strings.placeholders.gate}
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
            dropDownStyle={{
              backgroundColor: Colors.white,
              width: "90%",
              alignSelf: "center",
            }}
            onChangeItem={}
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
            zIndex={3000}
          />

          <DropDownPicker
            items={}
            defaultValue={}
            placeholder={Strings.placeholders.equip}
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
            dropDownStyle={{
              backgroundColor: Colors.white,
              width: "90%",
              alignSelf: "center",
            }}
            onChangeItem={
            }
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
            zIndex={2000}
          />

          <DropDownPicker
            items={}
            defaultValue={}
            placeholder={"Status"}
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
            dropDownStyle={{
              backgroundColor: Colors.white,
              width: "90%",
              alignSelf: "center",
            }}
            onChangeItem={
            }
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
               // this.state.filter == true
                //  ?
                [
                      modalStyles.cancelButton,
                      { backgroundColor: Colors.themeOpacity },]
               //     ]
               //   : modalStyles.cancelButton
              }
              onPress={}
            >
              <Text
                style={[
                  modalStyles.cancelText,
                  {
                  /*   color:
                      this.state.filter == true */
                        //? Colors.themeColor
                        //: Colors.buttonBackground,
                  },
                ]}
              >
               {/*  {this.state.filter == true
                  ? Strings.addMember.reset
                  : Strings.addMember.cancel} */}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={modalStyles.applyButton}
              onPress={}
            >
              <Text style={modalStyles.applyText}>{Strings.filter.apply}</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAwareScrollView>
      </View>
    );
  };
}

const mapStateToProps = (state) => {
  const { } = state;
  return {
  };
};

export default connect(mapStateToProps, {
})(Calendar);

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
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 1,
    elevation: 3,
    shadowColor: "rgba(0,0,0,0.14)",
  },
  image: {
    marginRight: wp("6%"),
    marginBottom: hp("2%"),
  },
  headerRowContainer: {
    flex: 1,
    height: hp("15%"),
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
  title: {
    color: Colors.black,
    fontSize: wp("7%"),
    fontFamily: Fonts.montserratBold,
    marginBottom: hp("2%"),
    marginLeft: wp("4%"),
  },
  calendar: {
    paddingLeft: 0,
  },
  section: {
    backgroundColor: "#f0f4f7",
    color: "#79838a",
  },
  item: {
    padding: 20,
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderBottomColor: "#e8ecf0",
    flexDirection: "row",
  },
  itemHourText: {
    color: "black",
  },
  itemTitleText: {
    color: "black",
    marginLeft: 16,
    fontWeight: "bold",
    fontSize: wp("4.5%"),
    fontFamily: "Montserrat-semibold",
  },
  itemButtonContainer: {
    flex: 1,
    alignItems: "flex-end",
  },
  emptyItem: {
    paddingLeft: 20,
    height: 52,
    justifyContent: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#e8ecf0",
  },
  emptyItemText: {
    color: "#79838a",
    fontSize: 14,
  },
  flatlistContainer: {
    width: wp("95%"),
    marginVertical: 3,
    alignSelf: "center",
    flexDirection: "row",
    flex: 1,
  },
  noDRView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  noDRText: {
    alignSelf: "center",
    position: "absolute",
    fontSize: wp("6%"),
    fontFamily: Fonts.montserratRegular,
    marginTop: hp("45%"),
  },
  filterCountView: {
    position: "absolute",
    marginTop: -10,
    right: -10,
    backgroundColor: Colors.themeColor,
    width: 16,
    justifyContent: "center",
    alignItems: "center",
    height: 16,
    borderRadius: 8,
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
  filtermodal: {
    paddingTop: 45,
    paddingBottom: 30,
    margin: 0,
    backgroundColor: Colors.white,
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
  searchPageTitle: { flex: 1, justifyContent: "center", alignItems: "center" },
  txtInputStyles: {
    color: Colors.black,
    fontSize: 14,
    width: "75%",
    marginLeft: wp("10%"),
    fontFamily: Fonts.montserratMedium,
    paddingTop: 10,
  },
  txtTitleStyles: {
    marginLeft: wp("10%"),
    fontSize: wp("4%"),
    fontFamily: Fonts.montserratMedium,
  },
  clearSearchView: {
    position: "absolute",
    right: wp("5%"),
    width: wp("10%"),
    height: hp("5%"),
    marginTop: hp("3%"),
    justifyContent: "flex-end",
    alignItems: "center",
  },
});

import React, { Component } from "react";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Switch,
  Keyboard,
  Platform,
  Alert,
} from "react-native";


import { connect } from "react-redux";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Colors from "../../common/color";
import Toastpopup from "../../components/toastpopup/Toastpopup";
import Loader from "../../components/loader/Loader";
import Images from "../../common/images";
import Strings from "../../common/string";
import Fonts from "../../common/fonts";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { TextField } from "../../components/textinput/addMemberTextinput";
import { isEmpty } from "../../common/validators";

import Modal from "react-native-modal";
import { Selectize, Chip } from "react-native-material-selectize";
import DateTimePicker from "@react-native-community/datetimepicker";
import DropDownPicker from "react-native-dropdown-picker";
import MultiSelectDropDown from "../../components/multi-select-dropdown/multiSelectdropDown";
import { BlurView } from "@react-native-community/blur";

class AddNewDR extends Component {
  constructor(props) {
    super(props);

  }

  bottomContainer = () => {
    return (
      <View style={drStyles.bottomContainer}>
        <TouchableOpacity
          onPress
        >
          <View style={drStyles.cancel}>
            <Text style={drStyles.cancelText}>{Strings.addMember.cancel}</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress
        >
          <View style={drStyles.submit}>
            <Text style={drStyles.submitText}>
              {this.state.edit == true
                ? Strings.addMember.update
                : Strings.addMember.submit}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  

  renderHeader = () => {
    return (
      <View style={drStyles.header}>
        <TouchableWithoutFeedback
          onPress
        >
          <Image source={Images.backArrow} style={{ marginBottom: 5 }} />
        </TouchableWithoutFeedback>
        <Text style={drStyles.title}>{Strings.addDR.ndr}</Text>
        <TouchableOpacity
          style={{
            width: 25,
            height: 25,
            borderRadius: 25 / 2,
            marginRight: 15,
            justifyContent: "center",
            alignItems: "center",
            borderWidth: 2,
            borderColor: Colors.black,
          }}
          onPress
        >
          <Text style={{ color: Colors.black, fontSize: wp("5%") }}>i</Text>
        </TouchableOpacity>
      </View>
    );
  };

  renderSeleRow = (id, onPress, item, style) => {
    return (
      <TouchableOpacity
        activeOpacity={0.6}
        key={id}
        onPress={onPress}
        style={{
          width: wp("90%"),
          //height: 30,
          alignSelf: "center",
          justifyContent: "center",
        }}
      >
        <Text
          /* style={{
            color: "rgba(0, 0, 0, 0.87)",
            width: wp("90%"),
            marginLeft: 10,
            marginTop: 2,
          }} */
          style={{
            color: "rgba(0, 0, 0, 0.87)",
            width: wp("90%"),
            marginLeft: 10,
            marginTop: 2,
            padding: 5,
          }}
        >
          {item.email}
        </Text>
      </TouchableOpacity>
    );
  };

  renderChip = (id, onClose, item, style, iconStyle) => (
    <Chip
      key={id}
      iconStyle={iconStyle}
      onClose
      text={id}
      style={style}
    />
  );

  render() {
    return (
      <SafeAreaView style={drStyles.safeArea}>
        <View style={drStyles.parentContainer}>
          {this.renderHeader()}

          <KeyboardAwareScrollView
            keyboardShouldPersistTaps={true}
            extraScrollHeight={60}
          >
            <TextField
              attrName={Strings.placeholders.description}
              title={Strings.placeholders.description}
              value
              updateMasterState
              mandatory={true}
              maxLength={150}
              textInputStyles={{
                // here you can add additional TextInput drStyles
                color: Colors.black,
                fontSize: 14,
              }}
            />

            <View style={drStyles.memberContainer}>
              <Text style={drStyles.idTitle}>
                {Strings.placeholders.deliveryId}
              </Text>

              <Text style={drStyles.idText}>{this.state.deliveryId}</Text>
            </View>

            <Text
              style={[
                drStyles.idTitle,
                {
                  fontSize: wp("4%"),
                  marginLeft: 10,
                  marginTop: hp("3%"),
                  alignSelf: "center",
                  width: wp("90%"),
                },
              ]}
            >
              {Strings.placeholders.responsibleCompany}{" "}
              <Text style={{ color: Colors.red }}>*</Text>
            </Text>

            <MultiSelectDropDown
              dataItems
              title={"Select"}
              selectedDataItem
            />

            <Text
              style={[
                drStyles.idTitle,
                {
                  fontSize: wp("4%"),
                  marginLeft: 10,
                  marginTop: hp("4%"),
                  alignSelf: "center",
                  width: wp("90%"),
                },
              ]}
            >
              {Strings.placeholders.definable}{" "}
              <Text style={{ color: Colors.red }}>*</Text>
            </Text>

            <MultiSelectDropDown
              dataItems
              title={"Select"}
              selectedDataItem
            />

            <View style={drStyles.escortContainer}>
              <Text style={drStyles.escortText}>
                {Strings.addDR.escortNeeded}{" "}
                <Text style={{ color: Colors.red }}>*</Text>
              </Text>

              <Switch
                style={{ transform: [{ scaleX: 0.9 }, { scaleY: 0.8 }] }}
                trackColor={{ false: Colors.placeholder, true: "#11FF00" }}
                thumbColor={"#fff"}
                ios_backgroundColor="#3e3e3e"
                onValueChange
                value
              />
            </View>

            <View
              style={[
                drStyles.escortContainer,
                { flexDirection: "column", marginTop: hp("2%") },
              ]}
              // pointerEvents={this.state.escortNeeded ? "auto" : "none"}
            >
              <Text style={drStyles.escortText}>
                {Strings.addDR.responsible}{" "}
                <Text style={{ color: Colors.red }}>*</Text>
              </Text>

              {this.state.showMultipleSec === false && (
                <Selectize
                  tintColor={Colors.themeColor}
                  items={this.state.responsiblePersonData}
                  selectedItems={this.state.selectedItem}
                  containerStyle={{
                    zIndex: 1,
                  }}
                  // listStyle={{
                  //   position: "absolute",
                  // }}
                  renderRow
                  renderChip={(id, onClose, item, style, iconStyle) => (
                    <View style={[styles.root, style]}>
                      <View style={styles.container}>
                        <Text style={styles.text} numberOfLines={1}>
                          {id}
                        </Text>
                        {this.state.responsiblePersonData.length > 0 &&
                          id != this.props.userDetails.email && (
                            <TouchableOpacity
                              style={[styles.iconWrapper, iconStyle]}
                              onPress={onClose}
                            >
                              <Text
                                style={[
                                  styles.icon,
                                  this.isIOS
                                    ? styles.iconIOS
                                    : styles.iconAndroid,
                                ]}
                              >
                                âœ•
                              </Text>
                            </TouchableOpacity>
                          )}
                      </View>
                    </View>
                  )}
                  onChangeSelectedItems
                  textInputProps
                />
              )}

              {this.state.showMultipleSec === true && (
                <Selectize
                  tintColor={Colors.themeColor}
                  items
                  selectedItems
                  containerStyle={{
                    zIndex: 1,
                  }}
                  listStyle={{
                    position: "absolute",
                  }}
                  renderRow
                  renderChip={(id, onClose, item, style, iconStyle) => (
                    <View style={[styles.root, style]}>
                      <View style={styles.container}>
                        <Text style={styles.text} numberOfLines={1}>
                          {id}
                        </Text>

                        {id != this.props.userDetails.email && (
                          <TouchableOpacity
                            style={[styles.iconWrapper, iconStyle]}
                            onPress={onClose}
                          >
                            <Text
                              style={[
                                styles.icon,
                                this.isIOS
                                  ? styles.iconIOS
                                  : styles.iconAndroid,
                              ]}
                            >
                              âœ•
                            </Text>
                          </TouchableOpacity>
                        )}
                      </View>
                    </View>
                  )}
                  // renderChip={(id, onClose, item, style, iconStyle) => {this.renderChip(id, onClose, item, style, iconStyle)}}
                  // listStyle={{
                  //   position: "absolute",
                  // }}
                  onChangeSelectedItems
                  textInputProp
                />
              )}
            </View>

            <TextField
              attrName={Strings.placeholders.deliveryDate}
              title={Strings.placeholders.deliveryDate}
              value
              updateMasterState
              mandatory={true}
              textInputStyles={{
                // here you can add additional TextInput drStyles
                color: Colors.black,
                fontSize: 14,
              }}
              showButton={true}
              onPress
              container={{
                marginTop: hp("3%"),
              }}
              imageSource={Images.calGray}
              placeholder={"Select"}
            />

            <View
              style={{
                width: wp("90%"),
                alignSelf: "center",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <TextField
                attrName={Strings.placeholders.startTime}
                title={Strings.placeholders.startTime}
                value
                updateMasterState
                mandatory={true}
                textInputStyles={{
                  // here you can add additional TextInput drStyles
                  color: Colors.black,
                  fontSize: 14,
                }}
                showButton={true}
                onPress
                container={{
                  width: wp("42%"),
                  alignSelf: "flex-start",
                }}
                imageSource={Images.clock}
                placeholder={"Select"}
                progressWidth={wp("42%")}
                buttonContainer={{
                  width: wp("42%"),
                }}
              />

              <TextField
                attrName={Strings.placeholders.endTime}
                title={Strings.placeholders.endTime}
                value
                updateMasterState
                mandatory={true}
                textInputStyles={{
                  // here you can add additional TextInput drStyles
                  color: Colors.black,
                  fontSize: 14,
                }}
                showButton={true}
                onPress
                container={{
                  width: wp("42%"),
                  alignSelf: "flex-start",
                }}
                imageSource={Images.clock}
                placeholder={"Select"}
                progressWidth={wp("42%")}
                buttonContainer={{
                  width: wp("42%"),
                }}
              />
            </View>

            <Text
              style={[
                drStyles.idTitle,
                {
                  fontSize: wp("4%"),
                  marginLeft: 10,
                  marginTop: hp("1%"),
                  alignSelf: "center",
                  width: wp("90%"),
                },
              ]}
            >
              {Strings.placeholders.equip}{" "}
              <Text style={{ color: Colors.red }}>*</Text>
            </Text>

            {/* <MultiSelectDropDown 
            dataItems={this.state.equipTypeList}
            title={'Select'}
            selectedDataItem={this.getSelectedEquipList}
        /> */}

            <DropDownPicker
              items={this.state.equipTypeList}
              defaultValue={this.state.selectedEquipName}
              placeholder={"Select"}
              placeholderStyle={{
                color: Colors.placeholder,
                fontSize: 14,
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
              //     containerStyle={{ height: hp("5%") }}
              style={{
                backgroundColor: Colors.white,
                width: wp("90%"),
                borderColor: "#0000",
                borderBottomColor: Colors.placeholder,
                alignSelf: "center",
                //    height: hp("3%"),
              }}
              itemStyle={{
                justifyContent: "flex-start",
                fontSize: 14,
              }}
              dropDownStyle={{
                backgroundColor: Colors.white,
                width: "90%",
                alignSelf: "center",
              }}
              onChangeItem
              labelStyle={{
                fontSize: 14,
                fontFamily: Fonts.montserratRegular,
              }}
              arrowStyle={{
                height: hp("2%"),
              }}
              selectedLabelStyle={{ color: Colors.black }}
              zIndex={3000}
            />

            <Text
              style={[
                drStyles.idTitle,
                {
                  fontSize: wp("4%"),
                  marginLeft: 10,
                  marginTop: hp("4%"),
                  alignSelf: "center",
                  width: wp("90%"),
                },
              ]}
            >
              {Strings.placeholders.gate}{" "}
              <Text style={{ color: Colors.red }}>*</Text>
            </Text>

            {/* <MultiSelectDropDown 
            dataItems={this.state.gateList}
            title={'Select'}
            selectedDataItem={this.getSelectedGateList}
        /> */}

            <DropDownPicker
              items
              defaultValue
              placeholder={"Select"}
              placeholderStyle={{
                color: Colors.placeholder,
                fontSize: 14,
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
              containerStyle={{
                //   height: hp("5%"),
                marginBottom: hp("2%"),
              }}
              style={{
                backgroundColor: Colors.white,
                width: wp("90%"),
                borderColor: "#0000",
                borderBottomColor: Colors.placeholder,
                alignSelf: "center",
                //    height: hp("3%"),
              }}
              itemStyle={{
                justifyContent: "flex-start",
                fontSize: 14,
              }}
              dropDownStyle={{
                backgroundColor: Colors.white,
                width: "90%",
                alignSelf: "center",
              }}
              onChangeItem
              labelStyle={{
                fontSize: 14,
                fontFamily: Fonts.montserratRegular,
              }}
              arrowStyle={{
                height: hp("2%"),
              }}
              selectedLabelStyle={{ color: Colors.black }}
              zIndex={2000}
            />

            <TextField
              attrName={Strings.placeholders.deliveryVehical}
              title={Strings.placeholders.deliveryVehical}
              value
              updateMasterState
              mandatory={true}
              textInputStyles={{
                // here you can add additional TextInput drStyles
                color: Colors.black,
                fontSize: 14,
              }}
              showButton={false}
              imageSource={Images.calGray}
              placeholder={"Select"}
            />

            <TextField
              attrName={Strings.placeholders.additional}
              title={Strings.placeholders.additional}
              value
              updateMasterState
              container={{ height: hp("14%") }}
              mandatory={false}
              maxLength={150}
              textInputStyles={{
                // here you can add additional TextInput drStyles
                color: Colors.black,
                fontSize: 14,
                height: hp("9%"),
                marginTop: hp("2%"),
                // paddingTop: hp("2%")
              }}
              multiline={true}
              showButton={false}
              imageSource={Images.calGray}
            />
            {this.bottomContainer()}
          </KeyboardAwareScrollView>
        </View>

        <Modal
          isVisible={this.state.showInfo}
          onBackdropPress={() => {
            this.setState({ showInfo: false });
          }}
          style={{
            paddingTop: 45,
            paddingBottom: 30,
            margin: 0,
            backgroundColor: "rgba(0, 0, 0, 0.3)",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View
            style={{
              backgroundColor: "white",
              width: wp("90%"),
              borderRadius: 10,
            }}
          >
            <Text
              style={{
                color: "#575E63",
                fontSize: wp("4%"),
                fontFamily: Fonts.montserratMedium,
                marginVertical: 15,
                marginHorizontal: 10,
              }}
            >
              {Strings.addDR.info}
            </Text>
          </View>
        </Modal>

        {/* Calender iOS */}

        {Platform.OS == "ios" && (
          <Modal
            isVisible={this.state.showDateModal}
            onBackdropPress
            style={{
              paddingTop: 45,
              margin: 0,
              justifyContent: "flex-end",
            }}
          >
            <DateTimePicker
              testID="datePicker"
              // timeZoneOffsetInMinutes={0}
              // minuteInterval={interval}
              minimumDate={this.state.minimumDate}
              value={this.state.calSelectedDate}
              style={{
                backgroundColor: "#fff",
                // backgroundColor: "black",
              }}
              display={"spinner"}
              textColor="black"
              // mode={mode}
              onChange
            />
            <View>
              <TouchableOpacity
                activeOpacity={0.5}
                style={styles.datePickerOkContainer}
                onPress
              >
                <Text style={styles.datePickerOkLabel}>Done</Text>
              </TouchableOpacity>
            </View>
          </Modal>
        )}

        {/* Calender Android */}

        {Platform.OS == "android" && this.state.showDateModal && (
          <DateTimePicker
            testID="datePicker"
            // timeZoneOffsetInMinutes={0}
            // minuteInterval={interval}
            minimumDate={this.state.minimumDate}
            value={this.state.calSelectedDate}
            style={{
              backgroundColor: "#fff",
            }}
            //mode={mode}
            onChange
          />
        )}

        {/* Time picker iOS - start time */}

        {Platform.OS == "ios" && (
          <Modal
            isVisible={this.state.showStartTimeModal}
            onBackdropPress
            style={{
              paddingTop: 45,
              margin: 0,
              justifyContent: "flex-end",
            }}
          >
            <DateTimePicker
              testID="datePicker"
              mode={"time"}
              // timeZoneOffsetInMinutes={0}
              // minuteInterval={interval}
              minimumDate={this.state.minimumDate}
              value={this.state.calSelectedStartTime}
              textColor="black"
              style={{
                backgroundColor: "#fff",
              }}
              //mode={mode}
              display={"spinner"}
              onChange
            />

            <View>
              <TouchableOpacity
                activeOpacity={0.5}
                style={styles.datePickerOkContainer}
                onPress
              >
                <Text style={styles.datePickerOkLabel}>Done</Text>
              </TouchableOpacity>
            </View>
          </Modal>
        )}

        {/* Timepicker android - start Time */}

        {Platform.OS == "android" && this.state.showStartTimeModal && (
          <DateTimePicker
            testID="datePicker"
            mode={"time"}
            // timeZoneOffsetInMinutes={0}
            // minuteInterval={interval}
            value
            minimumDate
            style={{
              backgroundColor: "#fff",
            }}
            // mode={mode}
            onChange
          />
        )}

        {/* Timepicker - ios End Time */}

        {Platform.OS == "ios" && (
          <Modal
            isVisible={this.state.showEndTimeModal}
            onBackdropPress
            style={{
              paddingTop: 45,
              margin: 0,
              justifyContent: "flex-end",
            }}
          >
            <DateTimePicker
              testID="datePicker"
              mode={"time"}
              // timeZoneOffsetInMinutes={0}
              // minuteInterval={interval}
              minimumDate
              value
              textColor="black"
              style={{
                backgroundColor: "#fff",
              }}
              display={"spinner"}
              // mode={mode}
              onChange
            />
            <View>
              <TouchableOpacity
                activeOpacity={0.5}
                style={styles.datePickerOkContainer}
                onPress
              >
                <Text style={styles.datePickerOkLabel}>Done</Text>
              </TouchableOpacity>
            </View>
          </Modal>
        )}

        {/* Timepicker android - End Time */}

        {Platform.OS == "android" && this.state.showEndTimeModal && (
          <DateTimePicker
            testID="datePicker"
            mode={"time"}
            // timeZoneOffsetInMinutes={0}
            // minuteInterval={interval}
            minimumDate
            value
            style={{
              backgroundColor: "#fff",
            }}
            // mode={mode}
            onChange
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
            viewRef
            blurType="light"
            blurAmount={10}
            reducedTransparencyFallbackColor="white"
          >
            <Loader />
          </BlurView>
        )}

        {this.state.showToaster && (
          <Toastpopup
            backPress
            toastMessage
            type
            container={{ marginBottom: hp("12%") }}
          />
        )}
      </SafeAreaView>
    );
  }
}

const mapStateToProps = (state) => {


 
};

const styles = StyleSheet.create({
  root: {
    justifyContent: "center",
    borderRadius: 50,
    backgroundColor: "#e0e0e0",
    paddingHorizontal: 10,
    paddingVertical: 4,
    height: 28,
    marginBottom: 4,
    marginRight: 4,
  },
  container: {
    flexDirection: "row",
    overflow: "hidden",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  text: {
    color: "rgba(0, 0, 0, 0.87)",
  },
  iconWrapper: {
    borderRadius: 50,
    backgroundColor: "#a6a6a6",
    height: 16,
    width: 16,
    overflow: "hidden",
    marginLeft: 4,
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    textAlign: "center",
    color: "#e0e0e0",
  },
  iconIOS: {
    fontSize: 14,
  },
  iconAndroid: {
    fontSize: 13,
    lineHeight: 15,
  },
  datePickerOkLabel: {
    paddingLeft: 4,
    paddingRight: 4,
    paddingTop: 6,
    paddingBottom: 6,
    fontFamily: Fonts.montserratBold,
  },
  datePickerOkContainer: {
    width: "100%",
    alignItems: "center",
    backgroundColor: Colors.white,
  },
});

export default connect(mapStateToProps)(AddNewDR);

const drStyles = StyleSheet.create({
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
    width: wp("78%"),
    fontSize: wp("5.6%"),
    textAlign: "center",
    fontFamily: Fonts.montserratSemiBold,
  },
  memberContainer: {
    width: wp("90%"),
    height: hp("10%"),
    alignSelf: "center",
    marginTop: hp("1%"),
    justifyContent: "center",
  },
  idTitle: {
    color: Colors.placeholder,
    fontSize: wp("4%"),
    fontFamily: Fonts.montserratMedium,
  },
  idText: {
    width: wp("90%"),
    height: hp("5%"),
    backgroundColor: "#EFEFEF",
    marginTop: wp("1%"),
    padding: hp("1%"),
    paddingLeft: 15,
    color: Colors.themeColor,
    fontFamily: Fonts.montserratMedium,
    fontSize: wp("4%"),
  },
  escortContainer: {
    width: "90%",
    alignSelf: "center",
    marginTop: hp("4%"),
    justifyContent: "space-between",
    flexDirection: "row",
  },
  escortText: {
    color: Colors.placeholder,
    fontSize: wp("4%"),
    fontFamily: Fonts.montserratRegular,
  },
  bottomContainer: {
    width: wp("90%"),
    flexDirection: "row",
    justifyContent: "center",
    alignSelf: "center",
    marginBottom: hp("4%"),
    marginTop: hp("8%"),
  },
  cancel: {
    width: wp("35%"),
    height: hp("7%"),
    backgroundColor: Colors.shadowColor,
    marginRight: wp("3%"),
    borderRadius: hp("3.5%"),
    justifyContent: "center",
    alignItems: "center",
  },
  submit: {
    width: wp("35%"),
    height: hp("7%"),
    backgroundColor: Colors.themeOpacity,
    marginLeft: wp("3%"),
    borderRadius: hp("3.5%"),
    justifyContent: "center",
    alignItems: "center",
  },
  cancelText: {
    color: "#757575",
    fontFamily: Fonts.montserratSemiBold,
    fontSize: wp("4%"),
  },
  submitText: {
    color: Colors.themeColor,
    fontFamily: Fonts.montserratSemiBold,
    fontSize: wp("4%"),
  },
  root: {
    justifyContent: "center",
    borderRadius: 50,
    backgroundColor: "#e0e0e0",
    paddingHorizontal: 10,
    paddingVertical: 4,
    height: 28,
    marginBottom: 4,
    marginRight: 4,
  },
});
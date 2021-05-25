import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
  TouchableWithoutFeedback,
  SafeAreaView,
} from "react-native";
import { connect } from "react-redux";
import { AppView, AppLoader, OverviewCard } from "../../components";
import AssignedListItem from "./AssignedListItem";
import UpcomingListItem from "./UpcomingListItem";
import { Images, Strings } from "../../common";
import Modal from "react-native-modal";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { ScrollView } from "react-native-gesture-handler";

const dashboardOverview = [
  {
    id: "1",
    title: "Total Projects",
  },
  {
    id: "2",
    title: "Total Deliveries",
  },
  {
    id: "3",
    title: "Total Members",
  },
  {
    id: "4",
    title: "Total Companies",
  },
];

class tab1 extends Component {
  renderHeader() {
    return (
      <View style={styles.headerContainer}>
        <Text style={styles.title}>{Strings.dashboard.dashboard}</Text>
        <View style={styles.headerRowContainer}>
          <TouchableWithoutFeedback onPress={}>
            <Image
              source={
               // userDetails.profilePic
                //  ? { uri: userDetails.profilePic }
                //  : Images.placeholder
              }
              style={styles.profileAvatarStyle}
            />
          </TouchableWithoutFeedback>
        </View>
      </View>
    );
  }

  renderFlatListItem = ( ) => (
    <OverviewCard
      onPress={}
      item={}
      key={}
    />
  );

  upcomingListHeader = () => {
    return (
      <View style={{ width: wp("90%"), flexDirection: "row" }}>
        <Text
          style={[styles.upcomingText, { marginLeft: wp("3%") }]}
          numberOfLines={1}
        >
          {Strings.dashboard.upcoming_deliveries}
        </Text>

        {//this.state.upcomingViewAll && (
          <TouchableOpacity
            style={{ alignItems: "flex-end" }}
            onPress={}
          >
            <Text style={styles.viewallText} numberOfLines={1}>
              {Strings.dashboard.viewall}
            </Text>
          </TouchableOpacity>
        }
      </View>
    );
  };

  renderUpcomingFlatListItem = () => {
      return (
        <UpcomingListItem
          onPress={}
          item={}
        />
      );
  };

  deliveryListHeader = () => {
    return (
      <View>
        <View style={{ width: wp("90%"), flexDirection: "row" }}>
          <Text
            style={[styles.upcomingText, { marginLeft: wp("3%") }]}
            numberOfLines={1}
          >
            {Strings.dashboard.Deliveries_Assigned_to_me}
          </Text>

          { //this.state.assignedmeViewAll && (
            <TouchableOpacity
              style={{ alignItems: "flex-end" }}
              onPress={}
            >
              <Text style={styles.viewallText} numberOfLines={1}>
                {Strings.dashboard.viewall}
              </Text>
            </TouchableOpacity>
          }
        </View>

        { // this.state.showAssignedmeNoData == false && (
          <View style={styles.headerRow}>
            <Text
              style={[
                styles.deliveryText,
                { marginLeft: wp("1%"), width: wp("15%") },
              ]}
              numberOfLines={1}
            >
              {Strings.placeholders.id}
            </Text>

            <Text
              style={[styles.deliveryText, { width: wp("55%") }]}
              numberOfLines={1}
            >
              {Strings.placeholders.description}
            </Text>

            <Text
              style={[styles.deliveryText, { width: wp("15%") }]}
              numberOfLines={1}
            >
              {Strings.addDR.status}
            </Text>
          </View>
        }
      </View>
    );
  };

  renderDeliveryFlatListItem = () => {
      return (
        <AssignedListItem
          item={item}
          onPress={}
        />
      );
  };

  renderSeparator = () => (
    <View
      style={{
        backgroundColor: "#A8B2B9",
        height: 0.5,
      }}
    />
  );

  renderEmptyList = (text) => {
    return (
      <View style={styles.emptyview}>
        <Text style={styles.textEmpty}>{text}</Text>
      </View>
    );
  };

  render() {
    return (
      <SafeAreaView>
        <ScrollView>
          <View style={styles.parentContainer}>
            {this.renderHeader()}

            {/* Overview lists => Total Deliveries, Total Members , Total Companies */}

            { //this.state.dashboardOverview.length > 0 && (
              <View>
                <View style={styles.mainview}>
                  <FlatList
                    horizontal
                    data={}
                    renderItem={this.renderFlatListItem}
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={}
                    onEndReachedThreshold={0}
                    onMomentumScrollBegin={}
                  />
                </View>

                {/* Upcoming Deliveries list */}

                <View
                  style={[
                    styles.upcomingdeliveryContainer,
                    { flexDirection: "column" },
                  ]}
                >
                  <FlatList
                    ListHeaderComponent={this.upcomingListHeader}
                    data={ }
                    renderItem={this.renderUpcomingFlatListItem}
                    ItemSeparatorComponent={this.itemSeparator}
                    keyExtractor={ }
                    onEndReachedThreshold={0}
                    scrollEnabled={false}
                    showsVerticalScrollIndicator={false}
                    style={{ marginBottom: hp("2%") }}
                    ListEmptyComponent={ this.renderEmptyList("No Upcoming Delivery List found")}
                  />
                </View>

                {/* Delivery Assigned to me list */}

                <View
                  style={[
                    styles.upcomingdeliveryContainer,
                    { height: hp("30%") },
                  ]}
                >
                  <FlatList
                    data={ }
                    ListHeaderComponent={this.deliveryListHeader}
                    renderItem={this.renderDeliveryFlatListItem}
                    ItemSeparatorComponent={this.itemSeparator}
                    keyExtractor={ }
                    onEndReachedThreshold={0}
                    scrollEnabled={false}
                    showsVerticalScrollIndicator={false}
                    ItemSeparatorComponent={this.renderSeparator}
                    ListEmptyComponent={ this.renderEmptyList("No Assigned to me List found")}
                  />
                </View>
              </View>
            }

            {//this.state.showLoader && (
              <Modal
                isVisible={true}
                backdropOpacity={0}
                style={styles.modalstyle}
              >
                <AppLoader viewRef={} />
              </Modal>
            }
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = (state) => {
  const {} = state;
  return {};
};

export default connect(mapStateToProps, {})(tab1);

const styles = StyleSheet.create({
  mainview: {
    height: hp("20%"),
    width: wp("92%"),
    marginLeft: 10,
    marginTop: 2,
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
    // width: wp("10%"),
    // height: wp('10%'),
    // borderRadius: wp('5%'),
    marginRight: wp("6%"),
    marginBottom: hp("2%"),
  },

  upcomingdeliveryContainer: {
    width: wp("92%"),
    // height: hp('15%'),
    marginVertical: 10,
    backgroundColor: Colors.white,
    borderColor: Colors.shadowColor,
    borderWidth: 0.3,
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 1,
    elevation: 3,
    shadowColor: "rgba(0,0,0,0.14)",
    alignSelf: "center",
    borderRadius: wp("3%"),
    margin: wp("1%"),
  },
  upcomingText: {
    color: "#2E3039",
    fontSize: wp("3.5%"),
    fontFamily: Fonts.montserratMedium,
    marginTop: hp("2%"),
    width: wp("70%"),
  },

  viewallText: {
    fontSize: wp("3.5%"),
    fontFamily: Fonts.montserratMedium,
    marginTop: hp("2%"),
    width: wp("30%"),
    alignItems: "flex-end",
    color: "#F35E28",
  },
  deliveryText: {
    color: "#2E3039",
    fontSize: wp("3%"),
    fontFamily: Fonts.montserratBold,
    marginTop: hp("1%"),
  },
  emptyview: {
    justifyContent: "center",
    alignSelf: "center",
    height: hp("20%"),
  },
  textEmpty: {
    fontSize: wp("4%"),
    fontFamily: Fonts.montserratRegular,
    textAlign: "center",
  },
  headerRow: {
    flexDirection: "row",
    backgroundColor: "#f5f5f5",
    marginTop: hp("1%"),
    justifyContent: "center",
    height: hp("4%"),
  },
  modalstyle: {
    paddingTop: 45,
    paddingBottom: 30,
    margin: 0,
    backgroundColor: "#0000",
  },
  profileAvatarStyle: {
    width: hp("5%"),
    height: hp("5%"),
    borderRadius: hp("2.5%"),
    marginBottom: hp("1%"),
    marginRight: hp("2%"),
  },
});

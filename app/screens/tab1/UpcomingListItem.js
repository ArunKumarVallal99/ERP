import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import moment from "moment";

export default function UpcomingListItem(props) {
  const { onPress, item } = props;

  return (
    <View style={styles.container}>
      {item.day && (
        <Text style={[styles.dayText, { marginLeft: 10 }]} numberOfLines={1}>
          {moment(item.day).format("ddd MMM DD")}
        </Text>
      )}
      <TouchableOpacity onPress={onPress}>
        <View style={styles.parentView}>
          <View style={styles.subview1}>
            <Text style={styles.startText}>
              {moment(item.start).format("HH:mm")}
            </Text>
            <Text style={styles.endText}>
              {moment(item.end).format("HH:mm")}
            </Text>
          </View>
          <View style={[styles.subview2, { backgroundColor: item.color }]}>
            <Text style={styles.titleText} numberOfLines={1}>
              {item.title}
            </Text>
            <Text style={styles.responsible} numberOfLines={1}>
              {"Responsible Sub-Contractor "}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flexDirection: "column" },
  dayText: {
    color: "#292529",
    fontSize: wp("3%"),
    fontFamily: Fonts.montserratRegular,
    width: wp("65%"),
    marginTop: hp("1%"),
  },
  parentView: { flexDirection: "row", marginLeft: wp("3%") },
  subview1: {
    flexDirection: "column",
    marginRight: wp("4%"),
    width: wp("9%"),
  },
  subview2: {
    flexDirection: "column",
    width: wp("72%"),
    //backgroundColor: item.color,
    borderRadius: 5,
    marginTop: hp("1%"),
  },
  startText: {
    fontSize: wp("3%"),
    fontFamily: "Montserrat-regular",
    color: "#BEBEBE",
    marginBottom: hp("2.5%"),
    marginTop: hp("1%"),
  },
  endText: {
    fontSize: wp("3%"),
    fontFamily: "Montserrat-regular",
    color: "#BEBEBE",
  },
  titleText: {
    marginLeft: 20,
    marginTop: hp("0.5%"),
    color: "#25265E",
    fontSize: wp("4%"),
    fontFamily: "Montserrat-semibold",
  },
  responsible: {
    marginLeft: 20,
    marginTop: hp("0.5%"),
    marginBottom: hp("0.5%"),
    color: "#25265E",
    fontSize: wp("3.5%"),
    fontFamily: Fonts.montserratRegular,
  },
});

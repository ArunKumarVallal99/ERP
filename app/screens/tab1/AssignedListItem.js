import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Fonts } from "../../common";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

let eventcolorobj = {
  Approved: "#B2F3BC",
  Pending: "#FFD8C9",
  Declined: "#FFB8B8",
  Expired: "#BEBEBE",
  Delivered: "#78c8f0",
};
let colorobj = {
  Approved: "#00D623",
  Pending: "#FF7D4E",
  Declined: "#FF1414",
  Expired: "#BEBEBE",
  Delivered: "#0078d4",
};

export default function AssignedListItem(props) {
  const { item } = props;
  //console.log('AssignedListItem--->',item)
  return (
    <View>
      <TouchableOpacity onPress>
        <View style={styles.parentContainer}>
          <Text style={styles.idText}>{item.DeliveryId}</Text>
          <Text style={styles.descText} numberOfLines={2}>
            {item.description}
          </Text>
          <Text style={[styles.statusText, { color: colorobj[item.status] }]}>
            {item.status}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  parentContainer: {
    flexDirection: "row",
    marginLeft: wp("2%"),
    height: hp("7%"),
  },
  idText: {
    fontSize: wp("3%"),
    fontFamily: Fonts.montserratRegular,
    color: "#5B5B5B",
    alignSelf: "center",
    justifyContent: "center",
    width: wp("15%"),
    marginLeft: wp("1%"),
    marginBottom: hp("1%"),
  },
  descText: {
    marginLeft: wp("0.5%"),
    marginRight:wp("0.5%"),
    marginBottom: hp("1%"),
    paddingRight:wp("1%"),
    color: "#5B5B5B",
    fontSize: wp("3%"),
    fontFamily: Fonts.montserratRegular,
    width: wp("53%"),
    alignSelf: "center",
    justifyContent: "center",
  },
  statusText: {
    marginLeft: wp("0.5%"),
    marginBottom: hp("1%"),
    //color: colorobj[item.status],
    fontSize: wp("3%"),
    fontFamily: Fonts.montserratRegular,
    alignSelf: "center",
    justifyContent: "center",
    width: wp("15%"),
    marginRight: wp("1%"),
  },
});

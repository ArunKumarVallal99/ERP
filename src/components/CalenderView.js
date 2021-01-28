import {View,StyleSheet} from 'react-native';
import React, { Component } from "react";
import {Calendar} from 'react-native-calendars';

class CalenderView extends Component {

    constructor(props){
        super(props);

    }
    render(){
        return(
           <View style={styles.container}>
                <Calendar
                style={styles.calendarDetails}
                current={new Date().getDate}
                hideExtraDays={true}
                onDayPress={(day) => {console.log('selected day', day);}}
                maxDate={'2025-05-30'}
                minDate={new Date().getDate}
                showWeekNumbers={true}
                theme={{
                    backgroundColor: '#ffffff',
                    calendarBackground: '#ffffff',
                    textSectionTitleColor: '#b6c1cd',
                    textSectionTitleDisabledColor: '#d9e1e8',
                    selectedDayBackgroundColor: '#00adf5',
                    selectedDayTextColor: '#ffffff',
                    todayTextColor: '#00adf5',
                    dayTextColor: '#2d4150',
                    textDisabledColor: '#d9e1e8',
                    dotColor: '#00adf5',
                    selectedDotColor: '#ffffff',
                    textDayFontWeight: '300',
                    textMonthFontWeight: 'bold',
                    textDayHeaderFontWeight: '300',
                    textDayFontSize: 14,
                    textMonthFontSize: 14,
                    textDayHeaderFontSize: 14,
                }}
                enableSwipeMonths={true}/>
            </View>
    )
    }
}
const styles=StyleSheet.create({
    container:{
        justifyContent:'center',
        alignItems:'center',
        // elevation:4,
        // height:150,
        // marginTop:250,
        // marginLeft:20,
        // marginRight:20,
        // backgroundColor:'white',
        // flex: .8,
        // borderRadius:10,
        // shadowColor: "#000",
        // shadowOffset: {
        //     width: 0,
        //     height: 2
        // },
        // shadowOpacity: 0.25,
        // shadowRadius: 3.84,
        // padding:10,
    },
    calendarDetails:{
        borderWidth: 1,
        borderColor: '#00000029',
        //height: 200,
    },
});
export default CalenderView;
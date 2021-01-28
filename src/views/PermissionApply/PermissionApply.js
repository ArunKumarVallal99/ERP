import {View, Text,TouchableOpacity, StyleSheet,Picker, TextInput, Modal, ScrollView, } from 'react-native';
import React, { Component } from "react";
import Icon  from 'react-native-vector-icons/Feather';
import {Calendar} from 'react-native-calendars';
import CalenderView from '../../components/CalenderView';
import fonts from '../../res/fonts';
// import styles from '../Change password/Styles';
// import styles from '../Change password/Styles';

class PermissionApply extends Component {
    constructor(props){
      super(props);
      const current_date=new Date();
      const current_day= new Date().getDate();
      const current_month= new Date().getMonth();
      const current_year = new Date().getFullYear();
      this.state={
        isDateEnabled:false,
        dateApplied:[{dateString: current_date, day: current_day, month:current_month+1, timestamp: 1331683200000, year: current_year}],
        timeValue:'',
        totalHours:'',
        descriptionValue:'',
    };
    }

    validation=()=>{
        if(this.state.timeValue=='default'||this.state.timeValue=='')
            alert('select Time')
        else if(this.state.totalHours!='01:00:00'){
            alert('Not mentioned')
        }
        else if (this.state.descriptionValue==''){
            alert('Enter the Descrpition')
        }
        else{
            alert('Successful Login')
        }
    };
    render(){
        return(
            <ScrollView>
            <View style={styles.container}>
            <Text style={styles.toptext}>Apply leave</Text>
            <View style={styles.topView}>
            <Text style={styles.availableLeave}>Available leave</Text>
            <View style={styles.insideContainer}>
            <Text style={styles.leaveType}>Casual leave : 12</Text>
            <Text style={styles.sickLeave}>Sick leave : 14</Text>
            </View>
            </View>
                   <View style={styles.inputContainer}>
                    <Text style={styles.dateText}> Date </Text>
                    <View style={styles.dateView}> 
                        <TextInput style={styles.dateInput} placeholder='20/12/2020' value={this.state.dateApplied.dateString}/>
                        <Icon name='calendar' style={styles.CalendarIcon}
                        size={30} color='#00000029' 
                        onPress={()=>this.setState({isDateEnabled:true})}/>
                        <Modal style={styles.modalDate}
                        visible={this.state.isDateEnabled}
                        transparent={true}>            
                        <View style={styles.modalDate}>
                        <CalenderView date={this.state.isDateEnabled}/>
                            {/* <Calendar
                            style={styles.calendarDetails}
                            current={new Date().getDate}
                            hideExtraDays={true}
                            onDayPress={(day) => {console.log('selected day', day);this.setState({isDateEnabled:false,dateApplied:day});}}
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
                            enableSwipeMonths={true}/> */}
                        </View>
                        </Modal>
                    </View>

                    <View style={styles.timeView}>
                        <Text style={styles.timeText}>Leave type</Text>
                        <TextInput style={styles.inputtext}
                        keyboardType='visible-password'
                        placeholder='Permission Leave'
                        textContentType='password'
                        secureTextEntry={true} 
                        />
                        <Text style={styles.pickertext}>Start Time</Text>
                        <Picker style={styles.pickers}
                        selectedValue={this.state.timeValue}
                        onValueChange={(itemValue, itemIndex) => {this.setState({timeValue:itemValue,totalHours:'01:00:00'})}}>
                        <Picker.Item label='Select Time' value='default'/>
                        <Picker.Item label="00.00" value="00.00" />
                        <Picker.Item label="00.30" value="00.30"/>
                        <Picker.Item label="01.00" value="01.00" />
                        <Picker.Item label="01.30" value="01.30"/>
                        <Picker.Item label="02.00" value="02.00" />
                        <Picker.Item label="02.30" value="02.30"/>
                        <Picker.Item label="03.00" value="03.00" />
                        <Picker.Item label="03.30" value="03.30"/>
                        <Picker.Item label="04.00" value="04.00" />
                        <Picker.Item label="04.30" value="04.30"/>
                        <Picker.Item label="05.00" value="05.00" />
                        <Picker.Item label="05.30" value="05.30"/>
                        <Picker.Item label="06.00" value="06.00" />
                        <Picker.Item label="06.30" value="06.30"/>
                        <Picker.Item label="07.00" value="07.00" />
                        <Picker.Item label="07.30" value="07.30"/>
                        <Picker.Item label="08.00" value="08.00" />
                        <Picker.Item label="08.30" value="08.30"/>
                        <Picker.Item label="09.00" value="09.00" />
                        <Picker.Item label="09.30" value="09.30"/>
                        <Picker.Item label="10.00" value="10.00" />
                        <Picker.Item label="10.30" value="10.30"/>
                        <Picker.Item label="11.00" value="11.00" />
                        <Picker.Item label="11.30" value="11.30"/>
                        <Picker.Item label="12.00" value="12.00" />
                        <Picker.Item label="12.30" value="12.30"/>
                        <Picker.Item label="13.00" value="13.00" />
                        <Picker.Item label="13.30" value="13.30"/>
                        <Picker.Item label="14.00" value="14.00" />
                        <Picker.Item label="14.30" value="14.30"/>
                        <Picker.Item label="15.00" value="15.00" />
                        <Picker.Item label="15.30" value="15.30"/>
                        <Picker.Item label="16.00" value="16.00" />
                        <Picker.Item label="16.30" value="16.30"/>
                        <Picker.Item label="17.00" value="17.00" />
                        <Picker.Item label="17.30" value="17.30"/>
                        <Picker.Item label="18.00" value="18.00" />
                        <Picker.Item label="18.30" value="18.30"/>
                        <Picker.Item label="19.00" value="19.00" />
                        <Picker.Item label="19.30" value="19.30"/>
                        <Picker.Item label="20.00" value="20.00" />
                        <Picker.Item label="20.30" value="20.30"/>
                        <Picker.Item label="21.00" value="21.00" />
                        <Picker.Item label="21.30" value="21.30"/>
                        <Picker.Item label="22.00" value="22.00" />
                        <Picker.Item label="22.30" value="22.30"/>
                        <Picker.Item label="23.00" value="23.00" />
                        <Picker.Item label="23.30" value="23.30"/>
                        </Picker>
                    </View>       
                    
                    <View style={styles.hoursView}>
                        <Text style={styles.hoursText}>End time</Text>
                        <TextInput style={styles.hoursInput} value={this.state.totalHours} onChangeText={(text)=>this.setState({totalHours:text})}/>
                    </View>
                        
                    <View style={styles.descriptionView}>
                        <Text style={styles.descriptionText}>Description</Text>
                        <TextInput style={styles.descriptionInput} value={this.state.descriptionValue} multiline={true} onChangeText={(text)=>this.setState({descriptionValue:text})} />
                    </View>

                    <TouchableOpacity style={styles.submitContainer} onPress={this.validation}>
                    <Text style={styles.submitText}>Submit</Text>
                    </TouchableOpacity>
                    


                    </View>
            </View>
            </ScrollView>

        )
    }
}

const styles = StyleSheet.create({
    container:{
        padding:1,
        // paddingLeft:135
        // marginLeft:135
        // justifyContent:'center',
        // alignItems:'center',
        // alignContent:'center',
        // flex:1,
    },
    // insideContainer:{
    //     // elevation:5,
    //     borderRadius:10,
    //     backgroundColor:'white',
    //     width:350,
    //     padding:20,
    // },
    dateText:{
        fontSize:18,
        marginBottom:12,
        fontFamily:fonts.name
    },
    dateView:{
        flexDirection:'row',
        marginBottom:16,
    },
    dateInput:{
        borderEndWidth:2,
        borderColor:'#00000029',
        height:38,
        width:290,
        borderRadius:10,
        borderWidth:2,
        backgroundColor:'#F2F3F5',
        paddingLeft:20
    },
    CalendarIcon:{
        marginLeft:10,
        //marginTop:10,
    },
    modalDate:{
        justifyContent:'center',
        alignItems:'center',
        elevation:4,
        height:150,
        marginTop:250,
        marginLeft:20,
        marginRight:20,
        backgroundColor:'white',
        flex: .8,
        borderRadius:10,
        // shadowColor: "#000",
        // shadowOffset: {
        //     width: 0,
        //     height: 2
        // },
        // shadowOpacity: 0.25,
        // shadowRadius: 3.84,
        padding:10,
    },
    calendarDetails:{
        borderWidth: 1,
        borderColor: '#00000029',
        //height: 200,
    },
    timeText:{
        fontSize:18,
        marginBottom:10,
        paddingRight:90,
        marginRight:90,
        fontFamily:fonts.name
    },
    hoursView:{
        marginBottom:12,
    },
    hoursText:{
        fontSize:16,
        marginBottom:10,
        fontFamily:fonts.name
    },
    hoursInput:{
        borderEndWidth:2,
        borderColor:'#00000029',
        height:38,
        width:290,
        borderRadius:10,
        borderWidth:2,
        backgroundColor:'#F2F3F5'
    },
    descriptionView:{
        marginBottom:10,
    },
    descriptionText:{
        fontSize:18,
        marginBottom:10,
    },
    descriptionInput:{
        borderEndWidth:2,
        borderColor:'blue',
        height:60,
        width:250,
        borderRadius:10,
        borderWidth:2,
    },
    submitContainer:{
        justifyContent:'center',
        elevation:5,
        backgroundColor:'pink',
        height:30,
        alignItems:'center',
        width:100,
        marginLeft:100,
        borderRadius:10,
      },
    submitText:{
        fontSize:18,
    },
    toptext:{
        marginTop:40,
        marginBottom:16,
        fontSize:16,
        fontFamily:fonts.name,
        paddingLeft:147

    },
    topView:{
        // flexDirection:'row',
        marginBottom:16,
        backgroundColor:'#F6FAFF'
    },
    insideContainer:{
        flexDirection:'row'

    },
    availableLeave:{
        marginTop:18,
        color:'#17BF63',
        fontSize:16,
        fontFamily:fonts.text,
        marginBottom:16,
        paddingLeft:50

    },
    leaveType:{
        // marginTop:51,
        fontSize:16,
        fontFamily:fonts.loginplaceholder,
        marginBottom:20,
        // paddingRight:30
        marginLeft:25,
        // padding:20
    },
    sickLeave:{
        fontSize:16,
        fontFamily:fonts.loginplaceholder,
        marginBottom:20,
        // marginTop:51,
        paddingLeft:70
    },
    inputContainer:{
        padding:20
    },
    inputtext:{
        height:42,
        width:290,
        // borderColor:'grey',
        // borderBottomWidth:1,
        backgroundColor:'#F2F3F5',
        fontSize:17,
        borderRadius:10,
        paddingBottom:13,
        marginBottom:13,
        paddingLeft:16,
        borderColor:'#00000029',
        borderWidth:2
    },
    pickertext:{
        fontSize:16,
        marginBottom:13,
        fontFamily:fonts.name
    },
    pickers:{
        height:50,
        width:303,
        backgroundColor:'#D3D3D3',
        fontSize:17,
        borderRadius:10,
        paddingBottom:13,
        marginBottom:13,
        paddingLeft:16,
    }
});
export default PermissionApply;
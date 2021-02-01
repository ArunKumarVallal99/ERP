import {View, Text,TouchableOpacity,Picker, TextInput, Modal, ScrollView, KeyboardAvoidingView} from 'react-native';
import React, { Component } from "react";
import Icon  from 'react-native-vector-icons/Feather';
import {Calendar} from 'react-native-calendars';
import CalenderView from '../../components/CalenderView';
import styles from './styles';
class LeaveApply extends Component {
  constructor(props){
    super(props);
    const current_date=new Date();
    const current_day= new Date().getDate();
    const current_month= new Date().getMonth();
    const current_year = new Date().getFullYear();
    // var datees = moment()
    //   .utcOffset('+05:30')
    //   .format('YYYY-MM-DD');
    this.state={
      casualLeave:12,
      sickLeave:12,
      leaveType:'Select Leave Type',
      isDurationFromEnabled:false,
      date:[{dateString: current_date, day: current_day, month:current_month+1, timestamp: 1331683200000, year: current_year}],
      isDurationToEnabled:false,
      dateTo:[{dateString: "2012-03-14", day: 14, month: 3, timestamp: 1331683200000, year: 2012}],
      isHalfDayEnabled:false,
      isMorningEnabled:false,
      isAfternoonEnabled:false,
      reasonValue:'',
    };
    
  }  


  morningEnable=()=>{
    if(this.state.isMorningEnabled)
      this.setState({isAfternoonEnabled:true,isMorningEnabled:false})
    else
      this.setState({isMorningEnabled:true,isAfternoonEnabled:false})
  };
  afternoonEnable=()=>{
    if(this.state.isAfternoonEnabled)
      this.setState({isMorningEnabled:true,isAfternoonEnabled:false})
    else
      this.setState({isAfternoonEnabled:true,isMorningEnabled:false})

  };
  validate=()=>{
    // console.log(this.state.leaveType)
    // console.log(this.state.dateTo)
    // console.log(this.state.reasonValue)
    if(this.state.leaveType== 'default' || this.state.leaveType=='Select Leave Type')
      alert('Please select the Leave Type')
    if(this.state.isHalfDayEnabled){
      if(!this.state.isMorningEnabled && !this.state.isAfternoonEnabled)
        alert("Select the Half Day")
    }
    if(this.state.reasonValue=='')
      alert("Fill the Reason Value")
    if(this.state.leaveType=='sick')
        this.setState({sickLeave:this.state.sickLeave-1})
    else if(this.state.leaveType=='casual')
        this.setState({casualLeave:this.state.casualLeave-1}) 
    else
        alert('succesfull login')
      
  }
  render(){
    return(
      <ScrollView
       style={styles.container}>
        <View style={styles.insideContainer}>
        
          <View style={styles.totalDayContainer} >
           
            <Text style={styles.availableLeave}>Available Leave</Text>
            <View style={styles.top}>
              <Text style={styles.totalDayText}>Casual Leave: {this.state.casualLeave}</Text>
              <Text style={styles.totalDayTextSick}>Sick Leave: {this.state.sickLeave}</Text>
            </View>
          </View>

          <View style={styles.pickerView}>
            <Text style={styles.pickerText}>Leave Type</Text>
            <Picker style={styles.pickers}
            selectedValue={this.state.leaveType}
             onValueChange={(itemValue, itemIndex) => {this.setState({leaveType:itemValue});console.log(this.state.leaveType)}}>
            <Picker.Item label='Select Leave Type' value='default'/>
            <Picker.Item label="Sick Leave" value="sick" />
            <Picker.Item label="Casual Leave" value="casual"/>
            </Picker>
          </View>

          <Text style={styles.durationText}> Duration From </Text>
          <View style={styles.dateView}> 
            <TextInput style={styles.durationFromInput} placeholder='20/12/2020' value={this.state.date.dateString}/>
            <Icon name='calendar' style={styles.CalendarIcon}
            size={30} color='#278BFF' 
            onPress={()=>this.setState({isDurationFromEnabled:true})}/>
           
            <Modal style={styles.modalDurationForm}
            visible={this.state.isDurationFromEnabled}
            transparent={true}   >            
              <View style={styles.modalDurationForm}>
              <Calendar
              style={styles.calendarDetails}
              current={new Date().getDate}
              hideExtraDays={true}
              onDayPress={(day) => {console.log('selected day', day.dateString);this.setState({isDurationFromEnabled:false,date:day})}}
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
            </Modal>
          </View>

          <Text style={styles.durationText}> Duration To </Text>
          <View style={styles.dateView}> 
            <TextInput style={styles.durationFromInput} placeholder='20/12/2020' value={this.state.dateTo.dateString}/>
            <Icon name='calendar' style={styles.CalendarIcon}
            size={30} color='#278BFF' 
            onPress={()=>this.setState({isDurationToEnabled:true})}/>
           
            <Modal style={styles.modalDurationForm}
            visible={this.state.isDurationToEnabled}
            transparent={true}   >            
              <View style={styles.modalDurationForm}>
                <CalenderView/>
              {/* <Calendar
              style={styles.calendarDetails}
              current={new Date().getDate}
              hideExtraDays={true}
              onDayPress={(day) => {console.log('selected day', day);this.setState({isDurationToEnabled:false,dateTo:day});}}
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
          
          <View style={styles.halfDayView}>
          {/* <Icon name={this.state.isHalfDayEnabled ? 'check-circle' :  'circle'} size={24} color={ this.state.isHalfDayEnabled ? 'blue' :  'black'} style={styles.halfDayIcon} onPress={()=>this.setState({isHalfDayEnabled:!this.state.isHalfDayEnabled})}/> */}
          
          <TouchableOpacity style={[styles.fullDayTouch, (this.state.isHalfDayEnabled?{backgroundColor:'white'}:{backgroundColor:'#278BFF'})]} onPress={()=>this.setState({isHalfDayEnabled:false})}>
          <Text style={styles.fullDayText}>Full Day</Text>
          </TouchableOpacity>

          <TouchableOpacity  style={[styles.halfDayTouch,(this.state.isHalfDayEnabled?{backgroundColor:'#278BFF'}:{backgroundColor:'white'})]} onPress={()=>this.setState({isHalfDayEnabled:true})}>
          <Text style={styles.halfDayText}>Half Day</Text>
          </TouchableOpacity>
          
          </View>
          
          {this.state.isHalfDayEnabled &&<View style={styles.morningView}>

          <Icon name={this.state.isMorningEnabled ? 'check-circle' :  'circle'} size={24} color={ this.state.isMorningEnabled ? '#278BFF' :  'grey'} style={styles.morningIcon} onPress={this.morningEnable}/>
          <Text style={styles.morningText}>Morning</Text>

          <Icon name={this.state.isAfternoonEnabled ? 'check-circle' :  'circle'} size={24} color={ this.state.isAfternoonEnabled ? '#278BFF' :  'grey'} style={styles.eveningIcon} onPress={this.afternoonEnable}/>
          <Text style={styles.eveningText}>Evening</Text>
          
          </View>}
          
          <KeyboardAvoidingView
          behavior={Platform.OS === "android" ? "" : "height"}
          style={styles.keyboard}>
            <View style={styles.reasonView}>
                <Text style={styles.reasonText}>Reason </Text>
                <TextInput style={styles.reasonTextInput} multiline={true} value={this.state.reasonValue}
                onChangeText={(text)=>this.setState({reasonValue:text})}/>
            </View>
          </KeyboardAvoidingView>
          <TouchableOpacity style={styles.submitContainer} onPress={this.validate}>
            <Text style={styles.submitText}>Submit</Text>
          </TouchableOpacity>

        </View> 
      </ScrollView>
      
      
    );
  }
}

// const styles= StyleSheet.create({
//   container:{
//    padding:20,
//    justifyContent:'center',
//    alignItems:'center',
//    alignContent:'center',
//    flex:1,
//   },
//   insideContainer:{
//     elevation:5,
//     borderRadius:10,
//     backgroundColor:'white',
//     width:350,
//     padding:20,
//   },
//   totalDayContainer:{
//     flexDirection:'row',
//     alignItems:'center',
//     justifyContent:'center',
//     elevation:4,
//     backgroundColor:'white',
//     borderRadius:5,
//     marginBottom:10,
//     borderWidth:.5,
//   },
//   totalDayText:{
//     marginRight:20,
//     fontSize:18,
//     fontWeight:'bold',
//   },
//   pickerView:{
//     flexDirection:'row',
//     marginBottom:10,
//   },
//   pickerText:{
//     marginRight:20,
//     fontSize:18,
//     marginTop:10,
//   },
//   pickers:{
//     height: 50, 
//     width: 200,
//     borderWidth:1,
//     borderColor:'red',
//   },
//   durationText:{
//     fontSize:18,
//     marginBottom:10,
//   },
//   durationFromInput:{
//     borderEndWidth:2,
//     borderColor:'grey',
//     height:40,
//     width:250,
//     borderRadius:10,
//     borderWidth:2,
//   },
//   CalendarIcon:{
//     marginLeft:10,
//     //marginTop:10,
//   },
//   modalDurationForm:{
//     justifyContent:'center',
//     alignItems:'center',
//     elevation:4,
//     height:150,
//     marginTop:250,
//     marginLeft:20,
//     marginRight:20,
//     backgroundColor:'white',
//     flex: .8,
//     borderRadius:10,
//     shadowColor: "#000",
//     shadowOffset: {
//         width: 0,
//         height: 2
//     },
//     shadowOpacity: 0.25,
//     shadowRadius: 3.84,
//     padding:10,
//   },
//   calendarDetails:{
//     borderWidth: 1,
//     borderColor: 'gray',
//     //height: 200,
//   },
//   halfDayView:{
//     flexDirection:'row',
//     marginBottom:10,
//   },
//   halfDayText:{
//     fontSize:18,
//     marginLeft:10,
//     marginRight:20,
//   },
//   halfDayIcon:{
    
//   },
//   morningView:{
//     flexDirection:'row',
//     marginBottom:10,
//   },
//   reasonView:{
//     marginBottom:10,
//   },
//   reasonText:{
//     fontSize:18,
//   },
//   reasonTextInput:{
//     borderWidth:2,
//     borderColor:'blue',
//     borderRadius:10,
//     width:300,
//   },
//   submitContainer:{
//     justifyContent:'center',
//     elevation:5,
//     backgroundColor:'pink',
//     height:30,
//     alignItems:'center',
//     width:100,
//     marginLeft:100,
//     borderRadius:10,
//   },
//   submitText:{
//     fontSize:18,    
//   },
// });
export default LeaveApply;
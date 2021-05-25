import React, { Component } from 'react';
import { View, StyleSheet, SafeAreaView, BackHandler } from 'react-native';
import {changeTab, showSideMenu, cameBack} from '../../actions/postAction';
import {connect} from 'react-redux';
import Colors from '../../common/color';
import Strings from '../../common/string';
import MemebersList from '../members/membersList';
import CompanyList from '../companies/companyList';
import GateList from '../gates/gateList';
import Equipment from '../equipment/equipList'
import DFOW from '../dfow/Dfow';
import DR from '../dr/drList';

class Tab3 extends Component {
  constructor(props) {
    super(props);
  }


  render() {
    return (
    <SafeAreaView style={styles.safeArea}>
  
      <View style={styles.subContainer}>

          {this.props.currentPage == Strings.menu.members && 
                    <MemebersList navigation={this.props.navigation}/>
          }

          {this.props.currentPage == Strings.menu.gates && 
          <GateList 
          />
          }

          {this.props.currentPage == Strings.menu.company && 
          <CompanyList 
          />
          }

          {this.props.currentPage == Strings.menu.equip &&
          <Equipment
           />
          }

          {this.props.currentPage == Strings.menu.df &&
          <DFOW
           />
          }
          {this.props.currentPage == Strings.menu.dr &&
          <DR
             refreshData
           />
          }
      </View>
      </SafeAreaView>
    )
}
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: Colors.white
      },
      subContainer: {
          flex: 1,
          backgroundColor: Colors.white
      }
})

const mapStateToProps = (state) => {

};

export default connect(mapStateToProps)(Tab3);
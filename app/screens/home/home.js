import React, { Component } from 'react';
import { View, Text } from 'react-native';
import TabNavigator from '../../navigation/TabNavigation'
import { changeTab, showSideMenu, clickAdd, onTapSearch, onTapDetail, goToVoid, setPage, updateList } from '../../actions/postAction';
import { connect } from 'react-redux';
import Strings from '../../common/string';
import { NavigationEvents } from 'react-navigation'
var memberId, parentCompanyId, email;


class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  //RENDER
  render() {
    return (
      <View style={{ width: '100%', height: '100%' }}>
        <NavigationEvents onDidFocus
        />
        <TabNavigator />
      </View>
    )
  }
}

const mapStateToProps = (state) => {
 
};

export default connect(mapStateToProps)(Home);
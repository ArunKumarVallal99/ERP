import React, {Component} from 'react';
import {Provider} from 'react-redux';
import configStore from './redux/config/StoreConfig';
import InitialRoute from './navigation/InitialRoute';

class App extends Component {
  render() {
    return (
      <Provider store={configStore}>
        <InitialRoute />
      </Provider>
    );
  }
}

export default App;

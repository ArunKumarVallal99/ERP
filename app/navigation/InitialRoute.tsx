import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import unRegisteredNavigation from './UnRegisteredNavigation';

const InitialRoute = createSwitchNavigator({
  UnRegistered: unRegisteredNavigation,
});

const App = createAppContainer(InitialRoute);

export default App;

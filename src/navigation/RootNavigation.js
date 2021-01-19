import 'react-native-gesture-handler';
import {createSwitchNavigator, createAppContainer} from 'react-navigation';
import {RegisteredRoot} from './RegisteredRoot';
import {UnRegisteredRoot} from './UnRegisteredRoot';

const RootNavigator = createSwitchNavigator(
  {
    UnRegisteredRoot,
    RegisteredRoot,
  },
  {
    initialRouteName: 'UnRegisteredRoot',
  },
);

export default createAppContainer(RootNavigator);

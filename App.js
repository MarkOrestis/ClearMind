import React from 'react';
// import {AppRegistry} from 'react-native';
import { createAppContainer } from 'react-navigation'; // Version can be specified in package.json
import { RootStack } from './app/config/router'

const AppContainer = createAppContainer(RootStack);

class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}

export default App;

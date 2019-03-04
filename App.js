import React from 'react';
// import {AppRegistry} from 'react-native';
import { createAppContainer } from 'react-navigation'; // Version can be specified in package.json
import { RootStack } from './app/config/router';
// import {name as appName} from './app.json';

const AppContainer = createAppContainer(RootStack);

class App extends React.Component {
  render() {
    // <RootStack ref={nav => { this.navigator = nav; }}/>
    return <AppContainer />;
  }
}

export default App;
// AppRegistry.registerComponent(appName, () => App);
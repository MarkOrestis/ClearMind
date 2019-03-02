import React from 'react';
import { Button, View, Text } from 'react-native';
import { createAppContainer } from 'react-navigation'; // Version can be specified in package.json
import {RootStack} from './app/config/router'

const AppContainer = createAppContainer(RootStack);

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}
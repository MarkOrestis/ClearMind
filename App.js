import React from 'react';
import { Button, View, Text } from 'react-native';
import { createAppContainer, createStackNavigator } from 'react-navigation'; // Version can be specified in package.json

import WeatherScreen from './app/screens/WeatherScreen';
import NotificationsScreen from './app/screens/NotificationsScreen';

const RootStack = createStackNavigator(
  {
    Weather: {
      screen: WeatherScreen,
    },
    Notifications: {
      screen: NotificationsScreen,
    },
  },
  {
    initialRouteName: 'Weather',
  }
);

const AppContainer = createAppContainer(RootStack);

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}
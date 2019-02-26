import React from 'react';
import { Button, View, Text } from 'react-native';
import { createAppContainer } from 'react-navigation'; // Version can be specified in package.json
import {RootStack} from './app/config/router'

// import WeatherScreen from './app/screens/WeatherScreen';
// import NotificationsScreen from './app/screens/NotificationsScreen';
// import Ailments from '.app/screens/Ailments';

// const RootStack = createStackNavigator(
//   {
//     Weather: {
//       screen: WeatherScreen,
//     },
//     Notifications: {
//       screen: NotificationsScreen,
//     },
//     Ailments: {
//       screen: Ailments,
//     }
//   },
//   {
//     initialRouteName: 'Ailments',
//   }
// );

const AppContainer = createAppContainer(RootStack);

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}
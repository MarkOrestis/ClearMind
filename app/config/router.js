import React from 'react';
import { createAppContainer, createStackNavigator } from 'react-navigation'; // Version can be specified in package.json

import WeatherScreen from '../screens/WeatherScreen';
import NotificationsScreen from '../screens/NotificationsScreen';
import Ailments from '../screens/AilmentsScreen'

export const RootStack = createStackNavigator(
  {
    Ailments: {
        screen: Ailments,
    },
    Weather: {
      screen: WeatherScreen,
    },
    Notifications: {
      screen: NotificationsScreen,
    }
  },
  {
    initialRouteName: 'Ailments',
  }
);

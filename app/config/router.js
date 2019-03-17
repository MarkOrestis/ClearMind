
import React from 'react';
import { createStackNavigator, createBottomTabNavigator, createAppContainer } from 'react-navigation';
import { Icon } from 'react-native-vector-icons/MaterialCommunityIcons';

import WeatherScreen from '../screens/WeatherScreen';
import NotificationsScreen from '../screens/NotificationsScreen';
import Ailments from '../screens/AilmentsScreen';
import EditSensitivities from '../screens/EditSensitivities';
import LoginScreen from '../screens/Login';


export const RootStack = createStackNavigator(
  {
    LoginScreen: {
        screen: LoginScreen,
    },
    EditSensitivities: {
        screen: EditSensitivities,
    },
    Weather: {
      screen: WeatherScreen,
    },
    Notifications: {
      screen: NotificationsScreen,
    }
  },
  {
    initialRouteName: 'LoginScreen',
  }
);

// I (Mary) tried to add a bottomtabnavigator but kept getting errors

// const WeatherStack = createStackNavigator({
//   Notifications: { screen: NotificationsScreen },
//   Ailments: {screen: Ailments},
// });

// const NotificationsStack = createStackNavigator({
//   Weather: { screen: WeatherScreen },
//   Ailments: {screen: Ailments},
// });

// export const AppTabNavigator = createBottomTabNavigator(
//   {
//     Weatherr: { screen: WeatherStack },
//     Settings: { screen: NotificationsStack },
//   },
//   {
//     // defaultNavigationOptions: ({ navigation }) => ({
//     //   tabBarIcon: ({ focused, tintColor }) => {
//     //     const { routeName } = navigation.state;
//     //     let iconName;
//     //     if (routeName === 'Weather') {
//     //       iconName = `weather-cloudy`;
//     //     } else if (routeName === 'Notifications') {
//     //       iconName = `settings`;
//     //     }

//     //     // You can return any component that you like here! We usually use an
//     //     // icon component from react-native-vector-icons
//     //     return <Icon name={iconName} size={25} color={tintColor} />;
//     //   },
//     // }),
//     // tabBarOptions: {
//     //   activeTintColor: 'tomato',
//     //   inactiveTintColor: 'gray',
//     // },
//   }
// );

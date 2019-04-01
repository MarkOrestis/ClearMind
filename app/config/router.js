
import React from 'react';
import { createStackNavigator, createBottomTabNavigator, createAppContainer } from 'react-navigation';
import { Icon } from 'react-native-vector-icons/MaterialCommunityIcons';

import WeatherScreen from '../screens/WeatherScreen';
import SettingsScreen from '../screens/SettingsScreen';
import NotificationsScreen from '../screens/NotificationScreen';
import EditSensitivities from '../screens/EditSensitivities';
import LoginScreen from '../screens/Login';
import Signup from '../screens/Signup';


export const RootStack = createStackNavigator(
  {
    LoginScreen: {
        screen: LoginScreen,
    },
    SignupScreen: {
      screen: Signup,
    },
    SensitivitiesScreen: {
        screen: EditSensitivities,
    },
    WeatherScreen: {
      screen: WeatherScreen,
    },
    SettingsScreen: {
      screen: SettingsScreen,
    },
    NotificationsScreen: {
      screen: NotificationsScreen,
    }
  },
  {
    initialRouteName: 'LoginScreen',
  }
);
//sample code that shows logic for using token to persist
// constructor() {
//     super();
//     this.state = { hasToken: false, isLoaded: false };
//   }

//   componentDidMount() {
//     AsyncStorage.getItem('id_token').then((token) => {
//       this.setState({ hasToken: token !== null, isLoaded: true })
//     });
//   }

//   render() {
//     if (!this.state.isLoaded) {
//       return (
//         <ActivityIndicator />  //simple loading widget
//       )
//     } else {
//       return(
//         <Router>
//           <Scene key='root'>
//             <Scene
//               component={Authentication}
//               initial={!this.state.hasToken}  //sends user to this when no token i think
//               (...)
//             />
//             <Scene
//               component={HomePage}
//               initial={this.state.hasToken}  //sends user to this when token i think
//               (...)
//             />
//             </Scene>
//         </Router>
//       )
//     }
//   }
// I (Mary) tried to add a bottomtabnavigator but kept getting errors

// const WeatherStack = createStackNavigator({
//   Settings: { screen: SettingsScreen },
//   Ailments: {screen: Ailments},
// });

// const SettingsStack = createStackNavigator({
//   Weather: { screen: WeatherScreen },
//   Ailments: {screen: Ailments},
// });

// export const AppTabNavigator = createBottomTabNavigator(
//   {
//     Weatherr: { screen: WeatherStack },
//     Settings: { screen: SettingsStack },
//   },
//   {
//     // defaultNavigationOptions: ({ navigation }) => ({
//     //   tabBarIcon: ({ focused, tintColor }) => {
//     //     const { routeName } = navigation.state;
//     //     let iconName;
//     //     if (routeName === 'Weather') {
//     //       iconName = `weather-cloudy`;
//     //     } else if (routeName === 'Settings') {
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

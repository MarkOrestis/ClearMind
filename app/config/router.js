
import { createStackNavigator } from 'react-navigation'; // Version can be specified in package.json

import WeatherScreen from '../screens/WeatherScreen';
import NotificationsScreen from '../screens/NotificationsScreen';
import Ailments from '../screens/AilmentsScreen';
import EditSensitivities from '../screens/EditSensitivities';


export const RootStack = createStackNavigator(
  {
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
    initialRouteName: 'EditSensitivities',
  }
);

import React from "react";
import { View, Text, Button } from "react-native";
import { createStackNavigator, createBottomTabNavigator, createAppContainer } from 'react-navigation';
import { Icon } from 'react-native-vector-icons/MaterialCommunityIcons';
import WeatherScreen from '../screens/WeatherScreen';
import AilmentsScreen from '../screens/AilmentsScreen';
import SettingsScreen from '../screens/SettingsScreen';

// const WeatherStack = createStackNavigator({
//     Settings: { screen: SettingsScreen },
//   });
  
//   const SettingsStack = createStackNavigator({
//     Weather: { screen: WeatherScreen },
//   });
  
  const BottomTab = createAppContainer(createBottomTabNavigator(
    // {
    //   Weather: { screen: WeatherStack },
    //   Settings: { screen: SettingsStack },
    // },
    // {
    //   defaultNavigationOptions: ({ navigation }) => ({
    //     tabBarIcon: ({ focused, tintColor }) => {
    //       const { routeName } = navigation.state;
    //       let iconName;
    //       if (routeName === 'Weather') {
    //         iconName = `weather-cloudy`;
    //       } else if (routeName === 'Settings') {
    //         iconName = `settings`;
    //       }
  
    //       // You can return any component that you like here! We usually use an
    //       // icon component from react-native-vector-icons
    //       return <Icon name={iconName} size={25} color={tintColor} />;
    //     },
    //   }),
    //   tabBarOptions: {
    //     activeTintColor: 'tomato',
    //     inactiveTintColor: 'gray',
    //   },
    // }
    {
        Second: () => <View><Text>hello Second</Text></View>,
        Third: () => <View><Text>hello Third</Text></View>,
      }
  ));

  export default BottomTab;
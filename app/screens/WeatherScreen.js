import React, { Component } from "react";
import { Button, View, Text, StyleSheet, Image } from 'react-native';
import { Card, Divider } from 'react-native-elements';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import CurrentCard from '../components/CurrentCard';
import FiveDayForecast from "../components/FiveDayForecast";
import { BorderlessButton } from "react-native-gesture-handler";
import Forecast from '../models/Forecast';
import {styles} from '../config/styles/styles'

export default class WeatherScreen extends Component {

    static navigationOptions = ({navigation, screenProps}) => ({
      title: 'Weather Conditions',
      headerTransparent: true,
      headerTitleStyle: styles.headerTitleStyles,
      headerRight: <Icon name="settings" size={28} style={{paddingRight: 20}} onPress={() => {navigation.navigate('Settings');}} />,

    });

    render() {
      
      const myForecast = new Forecast("MON", "weather-cloudy", "72°", "72°", "40°", 30, 87, 558, 25);

      return (
        <View style={{paddingTop: 80}}>
          <CurrentCard/>
          <View style={styles.weatherViewStyle}>
            <Text style={styles.weatherDetails}>Select a day to see details.</Text>
          </View>
          <FiveDayForecast></FiveDayForecast>
          <View style={{flexDirection:'row', alignItems: 'center', justifyContent: 'center'}}>
              <Icon name='settings' size={24} onPress={() => this.props.navigation.navigate('Settings')}></Icon>
              <Button 
                title="Notification Settings"
                onPress={() => this.props.navigation.navigate('Settings')}
              /> 
            </View>
        </View>
      );
    }

}

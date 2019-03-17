import React, { Component } from "react";
import { Button, View, Text, StyleSheet, Image } from 'react-native';
import { Card, Divider } from 'react-native-elements';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import CurrentCard from '../components/CurrentCard';
import FiveDayForecast from "../components/FiveDayForecast";
import { BorderlessButton } from "react-native-gesture-handler";
import Forecast from '../models/Forecast';

export default class WeatherScreen extends Component {

    static navigationOptions = {
      title: 'Weather Conditions',
    };

    render() {
      
      const myForecast = new Forecast("MON", "weather-cloudy", "72°", "72°", "40°", 30, 87, 558, 25);

      const day1 = new Forecast("MON", "weather-cloudy", "0", "72°", "40°", 30, 87, 558, 25);
      const day2 = new Forecast("TUES", "weather-cloudy", "0", "68°", "45°", 9, 56, 450, 25);
      const day3 = new Forecast("WED", "weather-sunny", "0", "50°", "42°", 25, 56, 450, 25);
      const day4 = new Forecast("THURS", "weather-cloudy", "0", "64°", "48°", 25, 56, 450, 25);
      const day5 = new Forecast("FRI", "weather-rainy", "0", "55°", "46°", 25, 56, 450, 25);
      const fiveDay = [day1, day2, day3, day4, day5];

      return (
        <View>
          <CurrentCard location='Atlanta, GA' forecast={myForecast}></CurrentCard> 
          <View style={styles.viewStyle}>
            <Text style={styles.details}>Select a day to see details.</Text>
          </View>
          <FiveDayForecast fiveDay={fiveDay}></FiveDayForecast>
          <View style={{flexDirection:'row', alignItems: 'center', justifyContent: 'center'}}>
              <Icon name='settings' size={24} onPress={() => this.props.navigation.navigate('Notifications')}></Icon>
              <Button 
                title="Notification Settings"
                onPress={() => this.props.navigation.navigate('Notifications')}
              /> 
            </View>
        </View>
      );
    }

}

const styles = StyleSheet.create({
  details: {
      fontSize: 18,
      fontWeight: 'bold',
  },
  viewStyle: {
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 25,
      marginBottom: 0,
  },
});
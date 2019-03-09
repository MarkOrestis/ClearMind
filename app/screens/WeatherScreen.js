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

      return (
        <View>
          <CurrentCard></CurrentCard> 
          <View style={styles.viewStyle}>
            <Text style={styles.details}>Select a day to see details.</Text>
          </View>
          <FiveDayForecast></FiveDayForecast>
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
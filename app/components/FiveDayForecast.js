import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Card, Divider } from 'react-native-elements';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Forecast from '../models/Forecast';

const day1 = new Forecast("MON", "weather-cloudy", "0", "72°", "40°", 30, 87, 558, 25);
const day2 = new Forecast("TUES", "weather-cloudy", "0", "68°", "45°", 9, 56, 450, 25);
const day3 = new Forecast("WED", "weather-sunny", "0", "50°", "42°", 25, 56, 450, 25);
const day4 = new Forecast("THURS", "weather-cloudy", "0", "64°", "48°", 25, 56, 450, 25);
const day5 = new Forecast("FRI", "weather-rainy", "0", "55°", "46°", 25, 56, 450, 25);
const fiveDay = [day1, day2, day3, day4, day5];

export default class FiveDayForecast extends Component {

    _onPressButton(myAlert) {
        Alert.alert(myAlert);
      }

    fiveDayView = fiveDay.map((fiveDayInfo, i) => {
      return <TouchableOpacity key={i} onPress={() => this._onPressButton(fiveDayInfo.toString())}>
      <View style={styles.column}>
        <Text style={styles.notes}>{fiveDayInfo.day}</Text>
        <Icon name={fiveDayInfo.type} size={40} color='white'></Icon>
        <Text style={styles.notes}>{fiveDayInfo.highTemp}</Text>
        <Text style={styles.lowTemp}>{fiveDayInfo.lowTemp}</Text>
        <Icon name={fiveDayInfo.displayIcon(true)} size={40} color={fiveDayInfo.displayIcon(false)}></Icon>
        </View>
      </TouchableOpacity>
    });  

    render() {

      return (
        <Card containerStyle={styles.card}>
          <View style={styles.viewStyle}>
            {this.fiveDayView}
            
          </View>
        </Card>
      );
    }

}

const styles = StyleSheet.create({
  card:{
	backgroundColor:'rgba(56, 172, 236, 1)',
	borderWidth:0,
    borderRadius:20,
    justifyContent: 'center'
  },
  notes: {
	fontSize: 18,
	color:'#fff',
  },
  lowTemp: {
    fontSize: 12,
	color:'#fff',
  },
  viewStyle: {
      flexDirection: 'row',
      justifyContent: 'space-evenly'
  },
  column: {
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center'
  }
});
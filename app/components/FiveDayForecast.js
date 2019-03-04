import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Card, Divider } from 'react-native-elements';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default class FiveDayForecast extends Component {

    _onPressButton(day) {
        Alert.alert('You tapped the day ' + day)
      }

    render() {

      return (
        <Card containerStyle={styles.card}>
          <View style={styles.viewStyle}>
            <TouchableOpacity onPress={() => this._onPressButton('Monday')}>
            <View style={styles.column}>
              <Text style={styles.notes}>MON</Text>
              <Icon name='weather-cloudy' size={40} color='white'></Icon>
              <Text style={styles.notes}>{'72°'}</Text>
              <Text style={styles.lowTemp}>{'40°'}</Text>
              <Icon name='emoticon-happy-outline' size={40} color='black'></Icon>
              </View>
            </TouchableOpacity>
            
            <TouchableOpacity onPress={() => this._onPressButton('Tuesday')}>
            <View style={styles.column}>
              <Text style={styles.notes}>TUES</Text>
              <Icon name='weather-cloudy' size={40} color='white'></Icon>
              <Text style={styles.notes}>{'68°'}</Text>
              <Text style={styles.lowTemp}>{'45°'}</Text>
              <Icon name='alert' size={40} color='red'></Icon>
            </View>  
            </TouchableOpacity>
            
            <TouchableOpacity onPress={() => this._onPressButton('Wednesday')}>
            <View style={styles.column}>
              <Text style={styles.notes}>WED</Text>
              <Icon name='weather-sunny' size={40} color='white'></Icon>
              <Text style={styles.notes}>{'50°'}</Text>
              <Text style={styles.lowTemp}>{'42°'}</Text>
              <Icon name='emoticon-happy-outline' size={40} color='black'></Icon>
            </View>  
            </TouchableOpacity>
            
            <TouchableOpacity onPress={() => this._onPressButton('Thursday')}>
            <View style={styles.column}>
              <Text style={styles.notes}>THURS</Text>
              <Icon name='weather-rainy' size={40} color='white'></Icon>
              <Text style={styles.notes}>{'64°'}</Text>
              <Text style={styles.lowTemp}>{'48°'}</Text>
              <Icon name='emoticon-happy-outline' size={40} color='black'></Icon>
            </View>  
            </TouchableOpacity>
            
            <TouchableOpacity onPress={() => this._onPressButton('Friday')}>
            <View style={styles.column}>
              <Text style={styles.notes}>FRI</Text>
              <Icon name='weather-cloudy' size={40} color='white'></Icon>
              <Text style={styles.notes}>{'55°'}</Text>
              <Text style={styles.lowTemp}>{'46°'}</Text>
              <Icon name='emoticon-happy-outline' size={40} color='black'></Icon>
            </View>  
            </TouchableOpacity>
            
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
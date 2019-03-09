import React, { Component } from "react";
import { Button, View, Text, StyleSheet, Image } from 'react-native';
import { Card, Divider } from 'react-native-elements';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import CurrentCard from '../components/CurrentCard';
import FiveDayForecast from "../components/FiveDayForecast";
import { BorderlessButton } from "react-native-gesture-handler";
import Forecast from '../models/Forecast';

export default class Login extends Component {

    static navigationOptions = {
      title: '',
    };

    render() {
      
      //const myForecast = new Forecast("MON", "weather-cloudy", "72°", "72°", "40°", 30, 87, 558, 25);

      return (
        <View>
          <View >
            <Text>Login Screen</Text>
            <Button 
                title="Sensitivities"
                onPress={() => this.props.navigation.navigate('EditSensitivities')}
              /> 
          </View>
        </View>
      );
    }

}
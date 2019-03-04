import React, { Component } from "react";
import { Button, View, Text, StyleSheet, Image } from 'react-native';
import { Card, Divider } from 'react-native-elements';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import CurrentCard from '../components/CurrentCard';
import FiveDayForecast from "../components/FiveDayForecast";

export default class WeatherScreen extends Component {

    static navigationOptions = {
      title: 'Weather Conditions',
    };

    render() {
      return (
        <View>
          <CurrentCard></CurrentCard> 
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
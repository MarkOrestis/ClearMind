import React, { Component } from "react";
import { Button, View, Text, StyleSheet, Image, ActivityIndicator, FlatList } from 'react-native';
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

    constructor(props) {
      super(props);

      this.state = {
        loadingCurr: true,
        loadingFiveDay: true,
        currentWeather: [],
        fiveDayWeather: []
      };
    
    }

    componentDidMount() {
      this.fetchCurrentConditions();
      this.fetchFiveDay();
    }

    fetchCurrentConditions() {
      return fetch('https://clearmind-backend.herokuapp.com/api/currentConditions')
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          loadingCurr: false,
          currentWeather: responseJson,
        });

      })
      .catch((error) =>{
        console.error(error);
      });
    }

    fetchFiveDay() {
      return fetch('https://clearmind-backend.herokuapp.com/api/fiveDayForecast')
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          loadingFiveDay: false,
          fiveDayWeather: responseJson.DailyForecasts,
        });

      })
      .catch((error) =>{
        console.error(error);
      });
    }
 

    render() {
      
      //Current conditions from AccuWeather
      const myText = this.state.currentWeather.map((item) =>
          {return item.WeatherText}
      );
      const myTemp = this.state.currentWeather.map((item) =>
          {return item.Temperature.Imperial.Value}
      );
      const myPressure = this.state.currentWeather.map((item) =>
         {return item.Pressure.Imperial.Value}
      );
      const myHumidity = this.state.currentWeather.map((item) =>
         {return item.RelativeHumidity}
      );

      //Five day forecast info
      const dates = this.state.fiveDayWeather.map((item) =>
        {return item.Date}
      );
      const weatherTypes = this.state.fiveDayWeather.map((item) =>
        {return item.Day.IconPhrase}
      );
      const highs = this.state.fiveDayWeather.map((item) =>
        {return item.Temperature.Maximum.Value}
      );
      const lows = this.state.fiveDayWeather.map((item) =>
        {return item.Temperature.Minimum.Value}
      );
      const grassCounts = this.state.fiveDayWeather.map((item) =>
        {return item.AirAndPollen[1].Value}
      );
      const moldCounts = this.state.fiveDayWeather.map((item) =>
        {return item.AirAndPollen[2].Value}
      );
      const ragweedCounts = this.state.fiveDayWeather.map((item) =>
        {return item.AirAndPollen[3].Value}
      );
      const treeCounts = this.state.fiveDayWeather.map((item) =>
        {return item.AirAndPollen[4].Value}
      );

      const today = new Forecast(dates[0], myText, myTemp, highs[0], lows[0], myPressure, myHumidity, moldCounts[0], ragweedCounts[0], grassCounts[0], treeCounts[0]);

      const day2 = new Forecast(dates[1], weatherTypes[1], "0", highs[1], lows[1], 9, 56, moldCounts[1], ragweedCounts[1], grassCounts[1], treeCounts[1]);
      const day3 = new Forecast(dates[2], weatherTypes[2], "0", highs[2], lows[2], 25, 56, moldCounts[2], ragweedCounts[2], grassCounts[2], treeCounts[2]);
      const day4 = new Forecast(dates[3], weatherTypes[3], "0", highs[3], lows[3], 25, 56, moldCounts[3], ragweedCounts[3], grassCounts[3], treeCounts[3]);
      const day5 = new Forecast(dates[4], weatherTypes[4], "0", highs[4], lows[4], 25, 56, moldCounts[4], ragweedCounts[4], grassCounts[4], treeCounts[4]);
      const fiveDay = [today, day2, day3, day4, day5];

      //Display scroll wheel while fetching data 
      if (this.state.loadingCurr || this.state.loadingFiveDay) {
        return(
          <View>
            <ActivityIndicator></ActivityIndicator>
          </View>
        )
      }

      return (
        <View style={{paddingTop: 80}}>
          <CurrentCard location='Atlanta, GA' forecast={today}></CurrentCard> 
          <View style={styles.weatherViewStyle}>
            <Text style={styles.weatherDetails}>Select a day to see details.</Text>

          </View>
          <FiveDayForecast fiveDay={fiveDay}></FiveDayForecast>
          {/* <View style={{flexDirection:'row', alignItems: 'center', justifyContent: 'center'}}>
              <Icon name='settings' size={24} onPress={() => this.props.navigation.navigate('Settings')}></Icon>
              <Button 
                title="Notification Settings"
                onPress={() => this.props.navigation.navigate('Settings')}
              /> 
            </View>   */}
        </View>
        

      );
     }

}

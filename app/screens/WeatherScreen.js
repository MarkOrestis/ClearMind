import React, { Component } from "react";
import {
  Button,
  View,
  Text,
  StyleSheet,
  Image,
  Platform,
  ActivityIndicator,
  FlatList
} from "react-native";
import { Card, Divider } from "react-native-elements";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import CurrentCard from "../components/CurrentCard";
import FiveDayForecast from "../components/FiveDayForecast";
import { BorderlessButton } from "react-native-gesture-handler";
import Forecast from "../models/Forecast";
import PredictionModel from '../models/PredictionModel';
import { styles } from "../config/styles/styles";

export default class WeatherScreen extends Component {
  static navigationOptions = ({ navigation, screenProps }) => ({
    title: "Weather Conditions",
    headerTransparent: true,
    headerTitleStyle: {
      color: "#000000",
      alignSelf: "center",
      textAlign: "center",
      flexGrow: 1
    },
    headerRight: (
      <Icon
        name="settings"
        size={28}
        style={{ paddingRight: 20 }}
        onPress={() => {
          navigation.navigate("SettingsScreen");
        }}
      />
    ),
    headerLeft: (
      <Icon
        name="settings"
        size={28}
        style={{display: 'none'}}
        onPress={() => {
          navigation.navigate("SettingsScreen");
        }}
      />
    ),
  });

  constructor(props) {
    super(props);

    this.state = {
      loadingCurr: true,
      loadingFiveDay: true,
      currentWeather: [],
      fiveDayWeather: [],
      user = {}
    };
  }

  componentWillMount() {
    this.state.user = new User();
    Database.loadSensitivities().then(result => {
        console.log(result[0]);
        this.setState({
          user: result[0],
          width: Dimensions.get('window').width - 92
        });
      });
    }

  componentDidMount() {
    this.fetchCurrentConditions();
    this.fetchFiveDay();
  }

  fetchCurrentConditions() {
    return fetch(
      "https://clearmind-backend.herokuapp.com/api/currentConditions"
    )
      .then(response => response.json())
      .then(responseJson => {
        this.setState({
          loadingCurr: false,
          currentWeather: responseJson
        });
      })
      .catch(error => {
        console.error(error);
      });
  }

  fetchFiveDay() {
    return fetch("https://clearmind-backend.herokuapp.com/api/fiveDayForecast")
      .then(response => response.json())
      .then(responseJson => {
        this.setState({
          loadingFiveDay: false,
          fiveDayWeather: responseJson.DailyForecasts
        });
      })
      .catch(error => {
        console.error(error);
      });
  }

  render() {
    //Current conditions from AccuWeather
    const myText = this.state.currentWeather.map(item => {
      return item.WeatherText;
    });
    const myTemp = this.state.currentWeather.map(item => {
      return item.Temperature.Imperial.Value;
    });
    const myPressure = this.state.currentWeather.map(item => {
      return item.Pressure.Imperial.Value;
    });
    const myHumidity = this.state.currentWeather.map(item => {
      return item.RelativeHumidity;
    });

    //Five day forecast info
    const dates = this.state.fiveDayWeather.map(item => {
      return item.Date;
    });
    const weatherTypes = this.state.fiveDayWeather.map(item => {
      return item.Day.IconPhrase;
    });
    const highs = this.state.fiveDayWeather.map(item => {
      return item.Temperature.Maximum.Value;
    });
    const lows = this.state.fiveDayWeather.map(item => {
      return item.Temperature.Minimum.Value;
    });
    const airQualities = this.state.fiveDayWeather.map(item => {
      return item.AirAndPollen[0].Value;
    });
    const grassCounts = this.state.fiveDayWeather.map(item => {
      return item.AirAndPollen[1].Value;
    });
    const moldCounts = this.state.fiveDayWeather.map(item => {
      return item.AirAndPollen[2].Value;
    });
    const ragweedCounts = this.state.fiveDayWeather.map(item => {
      return item.AirAndPollen[3].Value;
    });
    const treeCounts = this.state.fiveDayWeather.map(item => {
      return item.AirAndPollen[4].Value;
    });
    const uvIndices = this.state.fiveDayWeather.map(item => {
      return item.AirAndPollen[5].Value;
    });

    const today = new Forecast(
      dates[0],
      myText,
      myTemp,
      highs[0],
      lows[0],
      myPressure,
      myHumidity,
      moldCounts[0],
      ragweedCounts[0],
      grassCounts[0],
      treeCounts[0],
      airQualities[0],
      uvIndices[0]
    );

    const day2 = new Forecast(
      dates[1],
      weatherTypes[1],
      "0",
      highs[1],
      lows[1],
      25,
      56,
      moldCounts[1],
      ragweedCounts[1],
      grassCounts[1],
      treeCounts[1],
      airQualities[1],
      uvIndices[1]
    );
    const day3 = new Forecast(
      dates[2],
      weatherTypes[2],
      "0",
      highs[2],
      lows[2],
      25,
      56,
      moldCounts[2],
      ragweedCounts[2],
      grassCounts[2],
      treeCounts[2],
      airQualities[2],
      uvIndices[2]
    );
    const day4 = new Forecast(
      dates[3],
      weatherTypes[3],
      "0",
      highs[3],
      lows[3],
      25,
      56,
      moldCounts[3],
      ragweedCounts[3],
      grassCounts[3],
      treeCounts[3],
      airQualities[3],
      uvIndices[3]
    );
    const day5 = new Forecast(
      dates[4],
      weatherTypes[4],
      "0",
      highs[4],
      lows[4],
      25,
      56,
      moldCounts[4],
      ragweedCounts[4],
      grassCounts[4],
      treeCounts[4],
      airQualities[4],
      uvIndices[4]
    );
    const fiveDay = [today, day2, day3, day4, day5];

    const pred1 = new PredictionModel(user, today, day2);
    const pred2 = new PredictionModel(user, day2, day3);
    const pred3 = new PredictionModel(user, day3, day4);
    const pred4 = new PredictionModel(user, day4, day5);


    //Display scroll wheel while fetching data
    if (this.state.loadingCurr || this.state.loadingFiveDay) {
      return (
        <View>
          <ActivityIndicator />
        </View>
      );
    }

    return (
      <View style={Platform.select({ ios: { paddingTop: 80 }, android: {paddingTop: 50} })}>
        <CurrentCard location="Atlanta, GA" forecast={today} />
        <View style={styles.weatherViewStyle}>
          <Text style={styles.weatherDetails}>
            Select a day to see details.
          </Text>
        </View>
        <FiveDayForecast fiveDay={fiveDay} />
      </View>
    );
  }
}

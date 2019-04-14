import React, { Component } from "react";
import {
  Button,
  View,
  Text,
  StyleSheet,
  Image,
  Platform,
  ActivityIndicator,
  FlatList, 
  Dimensions,
  TouchableOpacity,
  Alert
} from "react-native";
import { Card, Divider } from "react-native-elements";
import FAIcon from 'react-native-vector-icons/FontAwesome';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import CurrentCard from "../components/CurrentCard";
import FiveDayForecast from "../components/FiveDayForecast";
import { BorderlessButton } from "react-native-gesture-handler";
import Forecast from "../models/Forecast";
import PredictionModel from '../models/PredictionModel';
import { styles } from "../config/styles/styles";
import User from "../models/User";
import {Database} from "../models/Database";

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
      loadingPressure: true,
      currentWeather: [],
      fiveDayWeather: [],
      pressureFiveDayWeather: [],
      user: {},
      onRefresh: false,
      currDay: {},
      selected: false,
      currPrediction: [],
      feedback: [],
      feedbackExists: false,
      index: 0
    };

    this.myText = "";

  }

  componentWillMount() {
      this.getUser();
      this.hasLeftFeedback();
  }

  componentDidUpdate() {
    console.log(this.state.onRefresh);
  }

  componentWillReceiveProps(nextProps) {
      this.getUser();
      this.setState({ onRefresh: true });
      this.forceUpdate();
  }

  getUser() {
    this.state.user = new User();
    Database.loadSensitivities().then(result => {
        this.setState({
          user: result[0],
          width: Dimensions.get('window').width - 92
        });
      });
  }  

  hasLeftFeedback() {
    Database.dailyFeedbackExist()
    .then(() => {
      this.state.feedbackExists = true;
    })
    .catch(() => {
      this.state.feedbackExists = false;
    });
  }

  renderFooter() {
    if (this.state.feedbackExists) {

    } else {
      
    }
  }

  componentDidMount() {
    this.fetchCurrentConditions();
    this.fetchFiveDay();
    this.fetchHumidityAndPressure();
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

  fetchHumidityAndPressure() {
    return fetch("https://clearmind-backend.herokuapp.com/api/pressureFiveDayForecast")
      .then(response => response.json())
      .then(responseJson => {
        this.setState({
          loadingPressure: false,
          pressureFiveDayWeather: responseJson
        });
      })
      .catch(error => {
        console.error(error);
      });
  }

  _onPressButton(ind, selectedPrediction, myAlert, selectedDay) {
    console.log(ind);
    let myAlertStr = "";
    for (i = 0; i< myAlert.length; i++) {
      myAlertStr += myAlert[i] + " ";
    }
    if (myAlertStr.length < 7) {
      myAlertStr = "No significant changes in weather conditions! Have a great day!";
    }
    Alert.alert(myAlertStr);
    this.setState({
        currDay: selectedDay,
        selected: true,
        currPrediction: selectedPrediction,
        index: ind
    });
    this.forceUpdate();
  } 

  // isFeedbackVisible() {

  // }

  render() {
    //Current conditions from AccuWeather
    const myTemp = this.state.currentWeather.map(item => {
      return item.Temperature.Imperial.Value;
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

    //Humidity and pressure values from OpenWeatherMap
    const pressures = this.state.pressureFiveDayWeather.map(item => {
      return item.main.pressure;
    });
    const humidities = this.state.pressureFiveDayWeather.map(item => {
      return item.main.humidity;
    });

    const today = new Forecast(
      dates[0],
      weatherTypes[0],
      myTemp,
      highs[0],
      lows[0],
      pressures[0],
      humidities[0],
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
      myTemp,
      highs[1],
      lows[1],
      pressures[8],
      humidities[8],
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
      myTemp,
      highs[2],
      lows[2],
      pressures[16],
      humidities[16],
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
      myTemp,
      highs[3],
      lows[3],
      pressures[24],
      humidities[24],
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
      myTemp,
      highs[4],
      lows[4],
      pressures[32],
      humidities[32],
      moldCounts[4],
      ragweedCounts[4],
      grassCounts[4],
      treeCounts[4],
      airQualities[4],
      uvIndices[4]
    );
    const fiveDay = [today, day2, day3, day4, day5];

    //Predictions for each pair of adjacent days
    const pred1 = PredictionModel.forecast(this.state.user, today, today);
    const pred2 = PredictionModel.forecast(this.state.user, today, day2);
    const pred3 = PredictionModel.forecast(this.state.user, day2, day3);
    const pred4 = PredictionModel.forecast(this.state.user, day3, day4);
    const pred5 = PredictionModel.forecast(this.state.user, day4, day5);
    const predictions = [pred1, pred2, pred3, pred4, pred5];

    Database.storeSensitivitiesPrediction(predictions);

    //Change the display to the selected day if one has been selected
    let displayDay = today;
    if (this.state.selected) {
      displayDay = this.state.currDay;
    }

    let displayPrediction = predictions[this.state.index];
    

    //Display scroll wheel while fetching data
    if (this.state.loadingCurr || this.state.loadingFiveDay || this.state.loadingPressure) {
      return (
        <View>
          <ActivityIndicator
             animating={true}
             color="#000000"
             style={{height: 80, paddingTop: 250, opacity: 1}}
             size="large"/>  
        </View>
        
      );
    }

    return (
      <View style={Platform.select({ ios: { paddingTop: 80 }, android: {paddingTop: 50} })}>
        <CurrentCard location="Atlanta, GA" forecast={today} nextForecast={displayDay} pressurePrediction={displayPrediction[0]} lightPrediction={displayPrediction[1]} grassPrediction={displayPrediction[2]} moldPrediction={displayPrediction[3]} ragweedPrediction={displayPrediction[4]} treePrediction={displayPrediction[5]}/>
        <Card containerStyle={styles.card}>
          <View style={styles.viewStyle}>
            {fiveDay.map((fiveDayInfo, i) => {
              return <TouchableOpacity key={i} onPress={() => this._onPressButton(i, predictions[i], fiveDayInfo.predictionToString(predictions[i]), new Forecast(dates[i], fiveDayInfo.type, fiveDayInfo.currTemp, fiveDayInfo.highTemp, fiveDayInfo.lowTemp, fiveDayInfo.pressure, fiveDayInfo.humidity, fiveDayInfo.mold, fiveDayInfo.ragweed, fiveDayInfo.grass, fiveDayInfo.tree, fiveDayInfo.aq, fiveDayInfo.uv))}>
                <View style={styles.column}>
                  <Text style={styles.notes}>{fiveDayInfo.day}</Text>
                  <Icon name={fiveDayInfo.type} size={40} color='white'></Icon>
                  <Text style={styles.notes}>{fiveDayInfo.highTemp + '°'}</Text>
                  <Text style={styles.lowTemp}>{fiveDayInfo.lowTemp + '°'}</Text>
                  <Icon name={fiveDayInfo.predictionDisplayIcon(predictions[i])} size={40} color='black'></Icon>
                </View>
              </TouchableOpacity>
            })}
          </View>
        </Card>

        <View>
        {/* <View style={{display: 'none'}}></View> */}
            <Text style={styles.userFeedbackText} >How are you feeling today?</Text>
            <View style={styles.feedbackView}>
              <FAIcon name='thumbs-o-up' style={styles.feedbackEmoji} size={50} color='green' onPress={() => {this.state.feedback = ["good"]; Database.storeDailyFeedback(this.state.feedback)}}/>

              <FAIcon name='thumbs-o-down' style={styles.feedbackEmoji} size={50} color='red' onPress={() => {this.state.feedback = ["headache", "migraine"]; Database.storeDailyFeedback(this.state.feedback)}}/>
            </View>

        </View> 

      </View>
    );
  }
}

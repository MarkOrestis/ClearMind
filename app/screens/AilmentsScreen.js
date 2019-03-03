import React, { Component } from "react";
import { styles } from "../config/styles/styles";
import Heroku_AUTH_TOKEN from "../config/herokuAPIKey";
import axios from 'axios';

import { View, Text } from "react-native";

var axiosInstance = axios.create({
    baseURL: 'https://clearmind-backend.herokuapp.com/',
    timeout: 1000,
    // headers: {'Authorization': Heroku_AUTH_TOKEN}
  });

export default class AilmentsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
        lat: '',
        lon: '',
    }; 
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      position => {
        lat = position.coords.latitude;
        lon = position.coords.longitude;

        this.sendCurrentLocation(position.coords.latitude, position.coords.longitude);
      },
      error => {
        this.setState({
          error: "Error getting current coordinates"
        });
      }
    );
  }

  sendCurrentLocation(lat, lon) {
    axiosInstance({
        method: 'post',
        url: '/testUser/currentLocation',
        data: {
          latitude: lat,
          longitude: lon
        }
      })
      .then(error => console.log(error));
  }

  // TODO: Create ailments and get state going
  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>First, select your ailments</Text>
        <Text>
          Then you can go to{" "}
          <Text
            onPress={() => this.props.navigation.navigate("Weather")}
            style={styles.linkText}
          >
            Weather
          </Text>
        </Text>
      </View>
    );
  }
}

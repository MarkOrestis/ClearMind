import React, { Component } from "react";
import { Alert, ActivityIndicator, Platform, Text, View } from "react-native";
import SwitchSelector from '../components/SwitchSelector/SwitchSelector'

import { AsyncStorage } from 'react-native';
import firebase from 'react-native-firebase';
import {Notification, NotificationOpen} from 'react-native-firebase';

import { Container, Item, Button, Icon } from "native-base";
import { Database } from "../models/Database";
import { styles } from "../config/styles/styles";
import Dimensions from 'Dimensions';
import User from "../models/User";

const sensitivitiesScales = [
  { label: "No Effect", value: "0", activeColor: "#228B44" },
  { label: "Minor", value: "1", activeColor: "#4682B4" },
  { label: "Moderate", value: "2", activeColor: "#FFA500" },
  { label: "Intense", value: "3", activeColor: "#FF0000" }
];

const pollenScales = [
  { label: "No Effect", value: "0", activeColor: "#228B44" },
  { label: "Affects Me", value: "1", activeColor: "#FF0000" }
];

export default class EditSensitivities extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {},
      pollen: false,
      lat: "",
      lon: "",
      loading: true,
      width: ""
    };
  }

  static navigationOptions = () => ({
    title: "Edit Sensitivities",
    headerTransparent: true,
    headerTitleStyle: {
      color: "#000000",
      fontWeight: '200',
      alignSelf: "center",
      textAlign: "center",
      flexGrow: 1
    },
    headerLeft: null
  });

  componentWillMount() {
    this.state.user = new User();
    Database.loadSensitivities().then(result => {
        console.log(result[0]);
        this.setState({
          user: result[0],
          width: Dimensions.get('window').width - 92
        });
        console.log(this.state.width);
        if (this.state.user.pollen > 0) {
            this.state.pollen = true;
        } else {
            this.state.user.grass = 0;
            this.state.user.tree = 0;
            this.state.user.mold = 0;
            this.state.user.weed = 0;
        }
        this.setState({
            loading: false
          });
      });
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      position => {
        lat = position.coords.latitude;
        lon = position.coords.longitude;

        this.sendCurrentLocation(
          position.coords.latitude,
          position.coords.longitude
        );
        console.log("lat: " + lat);
        console.log("lon: " + lon);
      },
      error => {
        this.setState({
          error: "Error getting current coordinates"
        });
      }
    );
  }

  sendCurrentLocation(lat, lon) {
    fetch(`https://clearmind-backend.herokuapp.com/api/users`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: "jonny bravo",
        password: "eatme",
        lat: lat,
        lon: lon
      })
    }).catch(function(error) {
      console.log(
        "There has been a problem with your fetch operation: " + error.message
      );
      throw error;
    });
  }

  pollenRating(value) {
    if (value != 0) {
      this.setState({ pollen: true });
    } else {
      this.setState({ pollen: false });
    }
  }

  render() {
      if (this.state.loading) {
          return (
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center',}}><ActivityIndicator color='#4682b4' size="large" /></View>
          )
      } else {
        return (
            <Container
              style={Platform.select({ ios: { paddingTop: 20 }, android: {} })}
            >
              <Item style={{ paddingBottom: 10, paddingTop: 75 }}>
                <Text style={{ fontWeight: "bold", fontSize: 16, paddingRight: 10 }}>
                  {" "}
                  Pressure
                </Text>
                <SwitchSelector
                  value={this.state.user.pressure}
                  initial={this.state.user.pressure}
                  onPress={value => {
                    this.setState({ user: { ...this.state.user, pressure: value } });
                  }}
                  textColor={"#000000"}
                  selectedColor={"#FFFFFF"}
                  height={26}
                  width={this.state.width}
                  options={sensitivitiesScales}
                />
              </Item>
      
              <Item style={{ padding: 10 }}>
                <Text style={{ fontWeight: "bold", fontSize: 16, paddingRight: 34 }}>
                  {" "}
                  Light
                </Text>
                <SwitchSelector
                  value={this.state.user.light}
                  initial={this.state.user.light}
                  onPress={value => {
                    this.setState({ user: { ...this.state.user, light: value } });
                  }}
                  textColor={"#000000"}
                  selectedColor={"#FFFFFF"}
                  height={30}
                  width={this.state.width}
                  options={sensitivitiesScales}
                />
              </Item>
      
              <Item style={{ padding: 10 }}>
                <Text style={{ fontWeight: "bold", fontSize: 16, paddingRight: 28 }}>
                  {" "}
                  Pollen
                </Text>
                <SwitchSelector
                  value={this.state.user.pollen}
                  initial={this.state.user.pollen}
                  onPress={value => {
                    this.setState({ user: { ...this.state.user, pollen: value } });
                    this.pollenRating(value);
                  }}
                  textColor={"#000000"}
                  selectedColor={"#FFFFFF"}
                  height={30}
                  width={this.state.width}
                  options={pollenScales}
                />
              </Item>
      
              <Item style={this.state.pollen ? { padding: 10 } : { display: "none" }}>
                <Text style={{ fontWeight: "bold", fontSize: 16, paddingRight: 31 }}>
                  {" "}
                  Grass
                </Text>
                <SwitchSelector
                  value={this.state.user.grass}
                  initial={this.state.user.grass}
                  onPress={value => {
                    this.setState({ user: { ...this.state.user, grass: value } });
                  }}
                  textColor={"#000000"}
                  selectedColor={"#FFFFFF"}
                  height={30}
                  width={this.state.width}
                  options={sensitivitiesScales}
                />
              </Item>
      
              <Item style={this.state.pollen ? { padding: 10 } : { display: "none" }}>
                <Text style={{ fontWeight: "bold", fontSize: 16, paddingRight: 40 }}>
                  {" "}
                  Tree
                </Text>
                <SwitchSelector
                  value={this.state.user.tree}
                  initial={this.state.user.tree}
                  onPress={value => {
                    this.setState({ user: { ...this.state.user, tree: value } });
                  }}
                  textColor={"#000000"}
                  selectedColor={"#FFFFFF"}
                  height={30}
                  width={this.state.width}
                  options={sensitivitiesScales}
                />
              </Item>
      
              <Item style={this.state.pollen ? { padding: 10 } : { display: "none" }}>
                <Text style={{ fontWeight: "bold", fontSize: 16, paddingRight: 36 }}>
                  {" "}
                  Mold
                </Text>
                <SwitchSelector
                  value={this.state.user.mold}
                  initial={this.state.user.mold}
                  onPress={value => {
                    this.setState({ user: { ...this.state.user, mold: value } });
                  }}
                  textColor={"#000000"}
                  selectedColor={"#FFFFFF"}
                  height={30}
                  width={this.state.width}
                  options={sensitivitiesScales}
                />
              </Item>
      
              <Item style={this.state.pollen ? { padding: 10 } : { display: "none" }}>
                <Text style={{ fontWeight: "bold", fontSize: 16, paddingRight: 32 }}>
                  {" "}
                  Weed
                </Text>
                <SwitchSelector
                  value={this.state.user.weed}
                  initial={this.state.user.weed}
                  onPress={value => {
                    this.setState({ user: { ...this.state.user, weed: value } });
                  }}
                  textColor={"#000000"}
                  selectedColor={"#FFFFFF"}
                  height={30}
                  width={this.state.width}
                  options={sensitivitiesScales}
                />
              </Item>
      
              <Button
                block
                bordered
                small
                style={{
                  marginTop: 10,
                  marginLeft: 150,
                  marginRight: 150,
                  backgroundColor: "transparent",
                  borderColor: "#000000"
                }}
                onPress={() => this.submitSensitivities()}
              >
                <Text
                  style={{
                    color: "#000000",
                    fontSize: 16,
                    backgroundColor: "transparent"
                  }}
                >
                  {" "}
                  Save{" "}
                </Text>
              </Button>
            </Container>
          );
      }
  }

  submitSensitivities() {
    // saveMessagingDeviceToken();
    Database.storeSensitivities(new User(this.state.user))
      .then(() => {
        Alert.alert("Successfully Saved");
        this.props.navigation.navigate("WeatherScreen", {onRefresh: true});
      })
      .catch(err => {
        Alert.alert("Error Saving Application", JSON.stringify(err));
      });
  }
}

import React, { Component } from "react";
import { Platform, Text } from "react-native";
import SwitchSelector from "react-native-switch-selector";

import { Container, Item, Button, Icon } from "native-base";
import { styles } from "../config/styles/styles";
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
      lon: ""
    };
    this.state.user = new User();
    Database.loadApplication().then(result => {
      this.setState({
        user: result[0]
      });
    });
  }

  static navigationOptions = () => ({
    title: "Sensitivities",
    headerTransparent: true,
    headerTitleStyle: {
      color: "#000000",
      alignSelf: "center",
      textAlign: "center",
      flexGrow: 1
    },
    headerLeft: null
  });

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
      // this.setState({user: {...this.state.user, grass: 0}})
      // this.setState({user: {...this.state.user, tree: 0}})
      // this.setState({user: {...this.state.user, mold: 0}})
      // this.setState({user: {...this.state.user, weed: 0}})
      console.log("user's grass: " + this.state.user.grass);
      console.log("user's tree: " + this.state.user.tree);
      console.log("user's mold: " + this.state.user.mold);
      console.log("user's weed: " + this.state.user.weed);
    }
  }

  render() {
    return (
      <Container
        style={Platform.select({ ios: { paddingTop: 20 }, android: {} })}
      >
        <Item style={{ paddingBottom: 4, paddingTop: 75 }}>
          <Text style={{ fontWeight: "bold", fontSize: 16, paddingRight: 10 }}>
            {" "}
            Pressure
          </Text>
          <SwitchSelector
            initial={0}
            onPress={value => {
              this.state.user.pressure;
            }}
            textColor={"#000000"}
            selectedColor={"#FFFFFF"}
            height={26}
            width={275}
            options={sensitivitiesScales}
          />
        </Item>

        <Item style={{ padding: 4 }}>
          <Text style={{ fontWeight: "bold", fontSize: 16, paddingRight: 36 }}>
            {" "}
            Light
          </Text>
          <SwitchSelector
            initial={0}
            onPress={value => {
              this.state.user.light;
            }}
            textColor={"#000000"}
            selectedColor={"#FFFFFF"}
            height={30}
            width={275}
            options={sensitivitiesScales}
          />
        </Item>

        <Item style={{ padding: 4 }}>
          <Text style={{ fontWeight: "bold", fontSize: 16, paddingRight: 28 }}>
            {" "}
            Pollen
          </Text>
          <SwitchSelector
            initial={this.state.user.pollen}
            onPress={value => {
              console.log("value is: " + value);
              this.setState({ user: { ...this.state.user, pollen: value } });
              this.pollenRating(value);
            }}
            textColor={"#000000"}
            selectedColor={"#FFFFFF"}
            height={30}
            width={275}
            options={pollenScales}
          />
        </Item>

        <Item style={this.state.pollen ? { padding: 4 } : { display: "none" }}>
          <Text style={{ fontWeight: "bold", fontSize: 16, paddingRight: 31 }}>
            {" "}
            Grass
          </Text>
          <SwitchSelector
            initial={this.state.user.grass}
            onPress={value => {
              console.log("value is: " + value);
              this.setState({ user: { ...this.state.user, grass: value } });
            }}
            textColor={"#000000"}
            selectedColor={"#FFFFFF"}
            height={30}
            width={275}
            options={sensitivitiesScales}
          />
        </Item>

        <Item style={this.state.pollen ? { padding: 4 } : { display: "none" }}>
          <Text style={{ fontWeight: "bold", fontSize: 16, paddingRight: 40 }}>
            {" "}
            Tree
          </Text>
          <SwitchSelector
            initial={this.state.user.tree}
            onPress={value => {
              console.log("value is: " + value);
              this.setState({ user: { ...this.state.user, tree: value } });
            }}
            textColor={"#000000"}
            selectedColor={"#FFFFFF"}
            height={30}
            width={275}
            options={sensitivitiesScales}
          />
        </Item>

        <Item style={this.state.pollen ? { padding: 4 } : { display: "none" }}>
          <Text style={{ fontWeight: "bold", fontSize: 16, paddingRight: 36 }}>
            {" "}
            Mold
          </Text>
          <SwitchSelector
            initial={this.state.user.mold}
            onPress={value => {
              console.log("value is: " + value);
              this.setState({ user: { ...this.state.user, mold: value } });
            }}
            textColor={"#000000"}
            selectedColor={"#FFFFFF"}
            height={30}
            width={275}
            options={sensitivitiesScales}
          />
        </Item>

        <Item style={this.state.pollen ? { padding: 4 } : { display: "none" }}>
          <Text style={{ fontWeight: "bold", fontSize: 16, paddingRight: 32 }}>
            {" "}
            Weed
          </Text>
          <SwitchSelector
            initial={this.state.user.weed}
            onPress={value => {
              console.log("value is: " + value);
              this.setState({ user: { ...this.state.user, weed: value } });
            }}
            textColor={"#000000"}
            selectedColor={"#FFFFFF"}
            height={30}
            width={275}
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
          onPress={() => this.props.navigation.navigate("WeatherScreen")}
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

  submitApplication() {
    Database.StoreSensitivities(new User(this.state.user))
      .then(() => {
        Alert.alert(strings.successfullySaved);
        this.props.navigation.navigate('WeatherScreen');
      })
      .catch(err => {
        Alert.alert("Error Saving Application", err);
      });
  }
}

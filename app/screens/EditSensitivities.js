import React, { Component } from "react";
import { Text } from "react-native";

import SwitchSelector from "react-native-switch-selector";

const sensitivitiesScales = [
    { label: "No Effect", value: "x", activeColor: '#228B44'},
    { label: "Minor", value: "n", activeColor: '#4682B4'},
    { label: "Moderate", value: "n", activeColor: '#FFA500'},
    { label: "Intense", value: "g", activeColor: '#FF0000'}
];

const pollenScales = [
    { label: "No Effect", value: "x", activeColor: '#228B44'},
    { label: "Affects Me", value: "g", activeColor: '#FF0000'}
];

headerTitleStyles = {color: '#000000',
                    alignSelf: 'center',
                    textAlign: 'center',
                    flexGrow: 1};


import {
    Container,
    Item,
    Button,
} from 'native-base'

import User from "../models/User";

export default class EditSensitivities extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user: {},
            page: 1,
            pollen: false,
            lat: '',
            lon: '',
        };
        this.pollenRating = this.pollenRating.bind(this);
        this.ratingCompleted = this.ratingCompleted.bind(this)
        this.state.user = new User();
    }

    componentDidMount() {
        navigator.geolocation.getCurrentPosition(
          position => {
            lat = position.coords.latitude;
            lon = position.coords.longitude;
    
            this.sendCurrentLocation(position.coords.latitude, position.coords.longitude);
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
        fetch(
            `https://clearmind-backend.herokuapp.com/api/users`, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: 'jonny bravo',
                    password: 'eatme',
                    lat: lat,
                    lon: lon
                })
            }
          )
          .catch(function(error) {
            console.log('There has been a problem with your fetch operation: ' + error.message);
            throw error;
          });
    }


    pollenRating(value) {
        if (value != 0) {
            this.setState({pollen: true});
        } else {
            this.setState({pollen: false})
        }
    }

    ratingCompleted(rating) {
        this.setState({user: { ...this.state.user, pressure: rating}});
    }

    static navigationOptions = () => ({
        title: "Sensitivities",
        headerTransparent: true,
        headerTitleStyle: headerTitleStyles
    });


    render() {
        return (
            <Container style={{paddingTop:20}}>
                <Item style={{paddingBottom:4, paddingTop: 75}}>
                    <Text style={{fontWeight:'bold', fontSize: 16, paddingRight: 10}}> Pressure</Text>
                    <SwitchSelector
                        initial={0}
                        onPress={() => {
                            value => this.setState({ gender: value })
                        }}
                        textColor={'#000000'}
                        selectedColor={'#FFFFFF'}
                        height={26}
                        width={275}
                        options={sensitivitiesScales}
                        />
                </Item>

                <Item style={{padding:4}}>
                    <Text style={{fontWeight:'bold', fontSize: 16, paddingRight: 36}}> Light</Text>
                    <SwitchSelector
                        initial={0}
                        onPress={() => {
                            value => this.setState({ gender: value })
                        }}
                        textColor={'#000000'}
                        selectedColor={'#FFFFFF'}
                        height={30}
                        width={275}
                        options={sensitivitiesScales}
                        />
                </Item>

                <Item style={{padding: 4}}>
                    <Text style={{fontWeight:'bold', fontSize: 16, paddingRight: 28 }}> Pollen</Text>
                    <SwitchSelector
                        initial={0}
                        onPress={value => this.setState({ pollen: value })}
                        textColor={'#000000'}
                        selectedColor={'#FFFFFF'}
                        height={30}
                        width={275}
                        options={pollenScales}
                        />
                </Item>

                <Item style={this.state.pollen ? {padding: 4} : { display: "none" }}>
                    <Text style={{fontWeight:'bold', fontSize: 16, paddingRight: 31 }}> Grass</Text>
                    <SwitchSelector
                        initial={0}
                        onPress={value => this.setState({ gender: value })}
                        textColor={'#000000'}
                        selectedColor={'#FFFFFF'}
                        height={30}
                        width={275}
                        options={sensitivitiesScales}
                        />
                </Item>

                <Item style={this.state.pollen ? {padding: 4} : { display: "none" }}>
                    <Text style={{fontWeight:'bold', fontSize: 16, paddingRight: 40 }}> Tree</Text>
                    <SwitchSelector
                        initial={0}
                        onPress={value => this.setState({ gender: value })}
                        textColor={'#000000'}
                        selectedColor={'#FFFFFF'}
                        height={30}
                        width={275}
                        options={sensitivitiesScales}
                        />
                </Item>

                <Item style={this.state.pollen ? {padding: 4} : { display: "none" }}>
                    <Text style={{fontWeight:'bold', fontSize: 16, paddingRight: 36 }}> Mold</Text>
                    <SwitchSelector
                        initial={0}
                        onPress={value => this.setState({ gender: value })}
                        textColor={'#000000'}
                        selectedColor={'#FFFFFF'}
                        height={30}
                        width={275}
                        options={sensitivitiesScales}
                        />
                </Item>

                <Item style={this.state.pollen ? {padding: 4} : { display: "none" }}>
                    <Text style={{fontWeight:'bold', fontSize: 16, paddingRight: 32 }}> Weed</Text>
                    <SwitchSelector
                        initial={0}
                        onPress={value => this.setState({ gender: value })}
                        textColor={'#000000'}
                        selectedColor={'#FFFFFF'}
                        height={30}
                        width={275}
                        options={sensitivitiesScales}
                        />
                </Item>

                <Button block bordered small style={{marginTop: 10, marginLeft: 150, marginRight: 150,backgroundColor: 'transparent', borderColor: '#000000'}} onPress={() => this.props.navigation.navigate("Weather")}>
                    <Text style={{color: '#000000', fontSize:16, backgroundColor: 'transparent'}}> Save </Text>
                </Button>
            </Container>
        )

    }
}
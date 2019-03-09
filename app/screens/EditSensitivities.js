import React, { Component } from "react";
import {
    ImageBackground,
    View,
    Text,
    ScrollView,
} from "react-native";

// import {Item} from "native-base";
import SwitchSelector from "react-native-switch-selector";
import axios from 'axios';
import Heroku_AUTH_TOKEN from "../config/herokuAPIKey";

const sensitivitiesScales = [
    { label: "No Effect", value: "x", activeColor: '#228B44'},
    { label: "Minor", value: "n", activeColor: '#4682B4'},
    { label: "Moderate", value: "n", activeColor: '#FFA500'},
    { label: "Intense", value: "g", activeColor: '#FF0000'}
];

headerTitleStyles = {color: '#000000',
                    alignSelf: 'center',
                    textAlign: 'center',
                    flexGrow: 1};


import {
    Container,
    Body,
    Left,
    Right,
    Label,
    Form,
    Item,
    Footer,
    Content,
    Button,
    Icon,
    Picker,
    Textarea,
    CheckBox
} from 'native-base'

import User from "../models/User";

var axiosInstance = axios.create({
    baseURL: 'https://clearmind-backend.herokuapp.com',
    timeout: 1000,
    headers: {'Authorization': Heroku_AUTH_TOKEN}
});

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
    
            // this.sendCurrentLocation(position.coords.latitude, position.coords.longitude);
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
            method: 'get',
            url: '/api/locationKey',
            data: {
                latitude: lat,
                longitude: lon
            }
        }).then(error => console.log(error));
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
        return(
            <Container>  
                <ImageBackground source={this.state.page == 1 ? require('../res/images/Grass_Sunshine.jpg') : require('../res/images/blankWhite.jpg')} style={{height: '100%'}}>
                    <Content>
                        <ScrollView style={{padding: 10}}>
                            {this.renderPage(this.state.page)}
                        </ScrollView>
                    </Content>
                    {this.renderFooter(this.state.page)}
                </ImageBackground>
            </Container>
        );
    }

    renderPage(number) {
        if (number == 1) {
            return (
                <View style={{flex: 1, flexDirection:"column", justifyContent: "space-between", alignItems: "center"}}>
                    <Text style={{fontSize: 45, fontWeight: "bold", textAlign: "center", margin:20, paddingTop: 60}}>{"ClearMind"}</Text>
                    <Text style={{fontSize: 21, color:'#FFFFFF',textAlign: "center", margin:20, paddingTop: 40}}>{"Please help us by first entering your allergen and weather sensitivities"}</Text>
                    {/* <Text style={{fontSize: 20, textAlign: "center", marginLeft: 20}}>{"This way, we can better predict days that might hold you back"}</Text> */}
                    {/* <Text style={{fontSize: 20, textAlign: "center", margin:10, marginLeft:30}}>{"5 Stars: Heavily Effected"}</Text> */}
                </View>
            );
        } else if (number == 2) {
            return (
                <Container>
                    <Item style={{paddingBottom:4, paddingTop: 75}}>
                        <Text style={{fontWeight:'bold', fontSize: 16, paddingRight: 10}}> Pressure</Text>
                        <SwitchSelector
                            initial={0}
                            onPress={() => {
                                value => this.setState({ gender: value })
                                // this.pollenRating()
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
                            options={sensitivitiesScales}
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
                </Container>
            )
                
        } 
    }

    renderFooter(number) {
        if (number == 1) {
            return (
                <Footer style={{backgroundColor: 'transparent'}}>
                    <Left />
                    <Body />
                    <Right>
                        <Button transparent onPress={ () => {this.setState({page: this.state.page + 1})}}>
                            <Text style={{marginRight: 10, fontWeight:'bold', fontSize: 16, color: '#FFFFFF'}}>next</Text>
                        </Button>
                    </Right>
                </Footer>
            );
        } else {
            return (
                <Footer style={{backgroundColor: '#FFFFFF'}}>
                    <Left>
                        <Button transparent onPress={ () => {this.setState({page: this.state.page - 1})}}>
                            <Text style={{marginLeft: 10, fontWeight:'bold', fontSize: 16}}>previous</Text>
                        </Button>
                    </Left>
                    <Body />
                    <Right>
                    <Button transparent onPress={ () => this.props.navigation.navigate('Weather')}>
                            <Text style={{marginRight: 10, fontWeight:'bold', fontSize: 16}}>next</Text>
                        </Button>
                    </Right>
                </Footer>
            );
        }
    }

    // renderButton(checked, signature) {
    //     if (checked && signature != "") {
    //         return (
    //             <Button full style={{borderWidth: 2, borderColor: 'lightgrey', borderRadius:15, marginTop:5}}>
    //                 <Text>"hello"</Text>
    //             </Button>
    //         )
    //     } else {
    //         return (
    //             <Button full disabled style={{borderWidth: 2, borderColor: 'lightgrey', borderRadius:15, marginTop:5}}>
    //                 <Text>"submit"</Text>
    //             </Button>
    //         )
    //     }
    // }

    // submitSensitivities() {
    //     // Database.createSensitivities(new User(this.state.user), new Sensitivities(this.state.sensitivities)).then(() => {
    //     //     Alert.alert("successfully saved");
    //     //     this.props.navigation.goBack()
    //     // }).catch((e) => {
    //     //     Alert.alert("Error Saving Sensitivities", e);
    //     // })
    // }
}
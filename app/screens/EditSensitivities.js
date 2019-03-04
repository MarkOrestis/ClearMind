import React, { Component } from "react";
import {
    View,
    Text,
    ScrollView,
    Alert,
    FlatList
} from "react-native";
import axios from 'axios';
import Heroku_AUTH_TOKEN from "../config/herokuAPIKey";
import { Rating, SwipeRatings } from 'react-native-ratings';


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

    static navigationOptions = () => ({
        headerStyle: {
            backgroundColor: '#ffffff',
            shadowRadius: 0,
            borderBottomWidth: 0,
        },
        headerTintColor: '#FFFFFF',
        headerTitleStyle: {
            color: '#FFFFFF',
        },
        title: "header"
    });

    pollenRating(rating) {
        if (rating > 0) {
            this.setState({pollen: true});
        }
    }

    ratingCompleted(rating) {
        this.setState({user: { ...this.state.user, pressure: rating}});
    }

    renderHeader() {
        // return(
        //     <Header>
        //         <Left>
        //             <Button transparent onPress={ () => {this.props.navigation.goBack()}} >
        //                 <Text>Close</Text>
        //             </Button>
        //         </Left>
        //         <Body>
        //         <Text>Sensitivities</Text>
        //         </Body>
        //         <Right>
        //         </Right>
        //     </Header>
        // );
    }

    render() {
        return(
            <Container>
                {/* {this.renderHeader()} */}
                <Content>
                    <ScrollView style={{padding: 10}}>
                        {this.renderPage(this.state.page)}
                    </ScrollView>
                </Content>
                {this.renderFooter(this.state.page)}
            </Container>
        );
    }

    renderPage(number) {
        if (number == 1) {
            return (
                <View style={{flex: 1, flexDirection:"column", justifyContent: "space-between", alignItems: "center"}}>
                    <Text style={{fontSize: 20, fontWeight: "bold", textAlign: "center", margin:20}}>{"Welcome"}</Text>
                    <Text style={{fontSize: 20, textAlign: "center", margin:20}}>{"Please enter your allergens and weather sensitivities"}</Text>
                    <Text style={{fontSize: 20, textAlign: "left", marginTop:40, marginLeft: 20}}>{"0 Stars: no Effect"}</Text>
                    <Text style={{fontSize: 20, textAlign: "left", margin:10, marginLeft:30}}>{"5 Stars: Heavily Effected"}</Text>
                </View>
            );
        } else if (number == 2) {
            return (
                <Form>
                    <Item fixedLabel>
                        <Label>Pressure differences</Label>
                        <Rating
                            type='star'
                            // ratingImage={exclamationPoint}
                            startingValue={0}
                            // ratingColor={"#3498db"}
                            ratingBackgroundColor='#3498db'
                            ratingCount={5}
                            imageSize={40}
                            onFinishRating={this.ratingCompleted}
                            showRating={false}
                            style={{ paddingVertical: 10 }}
                            />
    
                        {/* <Input placeholder='First name' style={{ textAlign: 'center' }} value='' onChangeText={(value) => {this.setState({user: { ...this.state.user, firstName: value}})}}/> */}
                    </Item>

                    <Item fixedLabel >
                        <Label>Pollen</Label>
                        <Rating
                            type='star'
                            // ratingImage={exclamationPoint}
                            startingValue={0}
                            // ratingColor={"#3498db"}
                            // ratingBackgroundColor='#3498db'
                            ratingCount={5}
                            imageSize={40}
                            onFinishRating={this.pollenRating}
                            showRating={false}
                            style={{ paddingVertical: 10 }}
                            />
                    </Item>

                    <Item fixedLabel >
                        <Label>Grass</Label>
                        <Rating
                            type='star'
                            // ratingImage={exclamationPoint}
                            startingValue={0}
                            // ratingColor={"#3498db"}
                            ratingBackgroundColor='#3498db'
                            ratingCount={5}
                            imageSize={40}
                            onFinishRating={this.ratingCompleted}
                            showRating={false}
                            style={{ paddingVertical: 10 }}
                            />
                    </Item>

                    <Item fixedLabel >
                        <Label>Tree</Label>
                        <Rating
                            type='star'
                            // ratingImage={exclamationPoint}
                            startingValue={0}
                            // ratingColor={"#3498db"}
                            ratingBackgroundColor='#3498db'
                            ratingCount={5}
                            imageSize={40}
                            onFinishRating={this.ratingCompleted}
                            showRating={false}
                            style={{ paddingVertical: 10 }}
                            />
                    </Item>

                    <Item fixedLabel >
                        <Label>Mold</Label>
                        <Rating
                            type='star'
                            // ratingImage={exclamationPoint}
                            startingValue={0}
                            // ratingColor={"#3498db"}
                            ratingBackgroundColor='#3498db'
                            ratingCount={5}
                            imageSize={40}
                            onFinishRating={this.ratingCompleted}
                            showRating={false}
                            style={{ paddingVertical: 10 }}
                            />
                    </Item>

                    <Item fixedLabel>
                        <Label>Weed</Label>
                        <Rating
                            type='star'
                            // ratingImage={exclamationPoint}
                            startingValue={0}
                            // ratingColor={"#3498db"}
                            ratingBackgroundColor='#3498db'
                            ratingCount={5}
                            imageSize={40}
                            onFinishRating={this.ratingCompleted}
                            showRating={false}
                            style={{ paddingVertical: 10 }}
                            />
                    </Item>
                </Form>
            ) 
        } 
    }

    renderFooter(number) {
        if (number == 1) {
            return (
                <Footer>
                    <Left />
                    <Body />
                    <Right>
                        <Button transparent onPress={ () => {this.setState({page: this.state.page + 1})}}>
                            <Text style={{marginRight: 10}}>next</Text>
                        </Button>
                    </Right>
                </Footer>
            );
        }
        //  else if (number == 2 && this.state.pollen) {
        //     return (
        //         <Footer>
        //             <Left>
        //                 <Button transparent onPress={ () => {this.setState({page: this.state.page - 1})}}>
        //                     <Text style={{marginLeft: 10}}>previous</Text>
        //                 </Button>
        //             </Left>
        //             <Body />
        //             <Right>
        //                 <Button transparent onPress={ () => {this.setState({page: this.state.page + 1})}}>
        //                     <Text style={{marginRight: 10}}>next</Text>
        //                 </Button>
        //             </Right>
        //         </Footer>
        //     );
        // } 
        else 
            return (
                <Footer>
                    <Left>
                        <Button transparent onPress={ () => {this.setState({page: this.state.page - 1})}}>
                            <Text style={{marginLeft: 10}}>previous</Text>
                        </Button>
                    </Left>
                    <Body />
                    <Right>
                    <Button transparent onPress={ () => this.props.navigation.navigate('Weather')}>
                            <Text style={{marginRight: 10}}>next</Text>
                        </Button>
                    </Right>
                </Footer>
            );
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
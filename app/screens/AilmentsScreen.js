import React, { Component } from "react";
import {
    Button,
    View,
    Text,
} from "react-native";

export default class AilmentsScreen extends Component {
    constructor(props) {
        super(props);
    }

    renderHeader() {
        return(
            <Header>
                <Body>
                    <Text>My Ailments</Text>
                </Body>
            </Header>
        );
    }

    render() {
        return (
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>First, select your ailments</Text>
            <Text style={{fontSize: 14}}>Then you can go to <Text 
                onPress={() => this.props.navigation.navigate('Weather')}
                style={{fontSize: 16, fontWeight: 'bold', color: 'blue'}}>
                Weather</Text>
            </Text>
          </View>
        );
    }
}
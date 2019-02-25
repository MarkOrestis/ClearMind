import React, { Component } from "react";
import {
    View,
    Text,
} from "react-native";
import {
    Container,
    Header,
    Body,
    Left,
    Right,
    Icon,
    Button
} from 'native-base'

export default class Ailments extends Component {
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
    }
}
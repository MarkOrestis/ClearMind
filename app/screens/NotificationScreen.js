import React, { Component } from "react";
import { View, Text } from 'react-native';
import { Button } from 'native-base';

export default class SettingsScreen extends Component {

  render() {
    const { navigate } = this.props.navigation;
    return(
      <View>
        <Text>
            This is the notification Screen
        </Text>
      </View>
    );
  }
}
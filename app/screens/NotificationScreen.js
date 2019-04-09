import React, { Component } from "react";
import { View, Text } from 'react-native';
import { Button } from 'native-base';
import { styles } from "../config/styles/styles";


export default class SettingsScreen extends Component {

  render() {
    const notificationStr = "By default, ClearMind will send you push notifications for potential hazard days based on your sensitivity levels.\n\nYou can disable push notifications from your phone's settings.";
    const { navigate } = this.props.navigation;
    return(
      <View style={styles.weatherViewStyle}>
        <Text style={styles.weatherDetails}>
            {notificationStr}
        </Text>
      </View>
    );
  }
}
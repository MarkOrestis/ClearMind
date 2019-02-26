import React, { Component } from "react";
import { Button, View, Text } from 'react-native';

export default class WeatherScreen extends Component {
    render() {
        return (
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Weather Screen</Text>
            <Button
              title="Go to Notifications"
              onPress={() => this.props.navigation.navigate('Notifications')}
            />
          </View>
        );
      }
}
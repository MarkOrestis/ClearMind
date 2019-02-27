import React, { Component } from "react";
import { Button, View, Text, StyleSheet } from 'react-native';
import { Divider } from 'react-native-elements';

export default class WeatherScreen extends Component {

    static navigationOptions = {
      title: 'Weather Conditions',
      headerStyle: {
        backgroundColor: '#add8e6',
      }
    };

    render() {
        return (
          <View style={styles.weatherContainer}>
          <View style={styles.headerContainer}>
            <Text style={styles.tempText}>Temperature˚</Text>
            <Text style={styles.tempText}>Pressure hPa</Text>
            <Text style={styles.tempText}>Humidity%</Text>
            <Text style={styles.tempText}>Pollen Count</Text>
          </View>
          <Divider style={{ backgroundColor: '#dfe6e9', marginVertical:20}} />
          <View style={styles.bodyContainer}>
            <Button
              title="Go to Notifications"
              onPress={() => this.props.navigation.navigate('Notifications')}
            />
          </View>
          </View>
        );
      }
}

const styles = StyleSheet.create({
  weatherContainer: {
    flex: 1,
    backgroundColor: '#add8e6'
  },
  headerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  tempText: {
    fontSize: 24,
    color: '#fff'
  },
  bodyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 40
  },
  title: {
    fontSize: 48,
    color: '#fff'
  },
  subtitle: {
    fontSize: 24,
    color: '#fff'
  },
  divider: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
  },
});
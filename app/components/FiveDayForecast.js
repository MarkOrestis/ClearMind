import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Card, Divider } from 'react-native-elements';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Forecast from '../models/Forecast';


export default class FiveDayForecast extends Component {

  constructor(props) {
    super(props);

    this.state = {
        fiveDay: [],
    };
    
  }

  componentDidMount() {
    this.setState({
        fiveDay: this.props.fiveDay
    });
  };

    _onPressButton(myAlert) {
        Alert.alert(myAlert);
      } 

    render() {

      return (
        <Card containerStyle={styles.card}>
          <View style={styles.viewStyle}>
            {this.state.fiveDay.map((fiveDayInfo, i) => {
              return <TouchableOpacity key={i} onPress={() => this._onPressButton(fiveDayInfo.toString())}>
                <View style={styles.column}>
                  <Text style={styles.notes}>{fiveDayInfo.day}</Text>
                  <Icon name={fiveDayInfo.type} size={40} color='white'></Icon>
                  <Text style={styles.notes}>{fiveDayInfo.highTemp}</Text>
                  <Text style={styles.lowTemp}>{fiveDayInfo.lowTemp}</Text>
                  <Icon name={fiveDayInfo.displayIcon(true)} size={40} color={fiveDayInfo.displayIcon(false)}></Icon>
                </View>
              </TouchableOpacity>
            })}
          </View>
        </Card>
      );
    }

}

const styles = StyleSheet.create({
  card:{
	backgroundColor:'rgba(56, 172, 236, 1)',
	borderWidth:0,
    borderRadius:20,
    justifyContent: 'center'
  },
  notes: {
	fontSize: 18,
	color:'#fff',
  },
  lowTemp: {
    fontSize: 12,
	color:'#fff',
  },
  viewStyle: {
      flexDirection: 'row',
      justifyContent: 'space-evenly'
  },
  column: {
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center'
  }
});
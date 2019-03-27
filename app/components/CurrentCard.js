import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Card, Divider } from 'react-native-elements';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Forecast from '../models/Forecast';

export default class CurrentCard extends Component {

    constructor(props) {
      super(props);

      this.state = {
          location: '',
          forecast: {},
      };
      
    }

    componentDidMount() {
      this.setState({
          location: this.props.location,
          forecast: this.props.forecast
      });
    };

    _onPressButton(myAlert) {
      Alert.alert(myAlert);
    }

    render() {
      
      //Icons for the chance of rain, pressure, pollen, and humidity respectively
      //If they warrant an alert
      var icons = [];
      for (i = 0; i<4; i++) {
          icons[i] = <Text>{''}</Text>
      }

      const alert = <TouchableOpacity onPress={() => this._onPressButton(this.state.forecast.toString())}>
          <Icon name='alert' size={20} color='red'></Icon>
        </TouchableOpacity>;
      // if (this.state.forecast.alertFor == 'pollen') {
      //   icons[2] = alert;
      // } else if (this.state.forecast.alertFor == 'pressure') {
      //   icons[1] = alert;
      // }
      if (this.state.forecast.tree >= 50) {
        icons[2] = alert;
      } else if (this.state.forecast.pressure < 10) {
        icons[1] = alert;
      }

      return (
        <Card containerStyle={styles.card}>
          <View style={{justifyContent: 'space-between', alignItems: 'center', marginBottom: 20, marginTop: 20}}>
            <View style={{flexDirection:'row'}}>
              <FontAwesome name='location-arrow' size={24} color='white'></FontAwesome>
              <Text style={styles.location}>{this.state.location}</Text>
            </View>
            <View style={{flexDirection:'row', marginVertical: 20, width:110, justifyContent: 'space-between'}}>
              <Text style={styles.temperature}>{this.state.forecast.currTemp + '°'}</Text>
              <Icon name={this.state.forecast.type} size={50} color='white'></Icon>
            </View>
          </View>
  
          <Divider style={{ backgroundColor: '#dfe6e9', marginTop:6, marginBottom:2}} />
          
          <View style={{flexDirection:'row', justifyContent:'space-between'}}>
            <Text style={styles.notesHeaders}>HUMIDITY</Text>
            <Text style={styles.notesHeaders}>PRESSURE</Text>
          </View>

          <View style={{flexDirection:'row', justifyContent:'space-between'}}>
            <View style={{flexDirection:'row'}}>
              <Text style={styles.notes}>{this.state.forecast.humidity + '%'}</Text>
              {icons[0]}
            </View>
            <View style={{flexDirection:'row'}}>
              {icons[1]}
              <Text style={styles.notes}>{this.state.forecast.pressure + ' hPa'}</Text>
            </View>
          </View>

          <Divider style={{ backgroundColor: '#dfe6e9', marginTop:6, marginBottom:2}} />
          
          <View style={{flexDirection:'row', justifyContent:'space-between'}}>
            <Text style={styles.notesHeaders}>AIR QUALITY</Text>
            <Text style={styles.notesHeaders}>UV INDEX</Text>
          </View>

          <View style={{flexDirection:'row', justifyContent:'space-between'}}>
            <View style={{flexDirection:'row'}}>
              <Text style={styles.notes}>{this.state.forecast.aq}</Text>
              {icons[3]}
            </View>
            <View style={{flexDirection:'row'}}>
              {icons[3]}
              <Text style={styles.notes}>{this.state.forecast.uv}</Text>
            </View>
            
          </View>

          <Divider style={{ backgroundColor: '#dfe6e9', marginTop:6, marginBottom:2}} />
          
          <View style={{flexDirection:'row', justifyContent:'space-between'}}>
            <Text style={styles.notesHeaders}>GRASS POLLEN</Text>
            <Text style={styles.notesHeaders}>TREE POLLEN</Text>
          </View>

          <View style={{flexDirection:'row', justifyContent:'space-between'}}>
            <View style={{flexDirection:'row'}}>
              <Text style={styles.notes}>{this.state.forecast.grass}</Text>
              {icons[3]}
            </View>
            <View style={{flexDirection:'row'}}>
              {icons[2]}
              <Text style={styles.notes}>{this.state.forecast.tree}</Text>
            </View>
            
          </View>

          <Divider style={{ backgroundColor: '#dfe6e9', marginTop:6, marginBottom:2}} />
          
          <View style={{flexDirection:'row', justifyContent:'space-between'}}>
            <Text style={styles.notesHeaders}>MOLD</Text>
            <Text style={styles.notesHeaders}>RAGWEED</Text>
          </View>

          <View style={{flexDirection:'row', justifyContent:'space-between'}}>
            <View style={{flexDirection:'row'}}>
              <Text style={styles.notes}>{this.state.forecast.mold}</Text>
              {icons[3]}
            </View>
            <View style={{flexDirection:'row'}}>
              {icons[3]}
              <Text style={styles.notes}>{this.state.forecast.ragweed}</Text>
            </View>
            
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
	location:{
		fontSize:24,
		color:'#fff'
  },
  temperature:{
    fontSize:40,
		color:'#fff'
  },
	notes: {
		fontSize: 18,
		color:'#fff',
  },
  notesHeaders: {
    fontSize: 10,
		color:'#fff',
  }
});
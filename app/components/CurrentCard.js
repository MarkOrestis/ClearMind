import React, { Component } from "react";
import { View, Text, StyleSheet } from 'react-native';
import { Card, Divider } from 'react-native-elements';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default class CurrentCard extends Component {

    render() {
      //TO: change hard-coded numbers to values from the API
      var location = 'Atlanta, GA';
      var temperature = '72';
      var chanceOfRain = '60';
      var pressure = '30';
      var humidity = '83';
      var pollen = '538';

  
      return (
        <Card containerStyle={styles.card}>
          <View style={{justifyContent: 'space-between', alignItems: 'center', marginBottom: 20, marginTop: 20}}>
            <View style={{flexDirection:'row'}}>
              <FontAwesome name='location-arrow' size={24} color='white'></FontAwesome>
              <Text style={styles.location}>{location}</Text>
            </View>
            <View style={{flexDirection:'row', marginVertical: 20, width:110, justifyContent: 'space-between'}}>
              <Text style={styles.temperature}>{temperature + '°'}</Text>
              <Icon name='weather-cloudy' size={50} color='white'></Icon>
            </View>
          </View>
  
          <Divider style={{ backgroundColor: '#dfe6e9', marginTop:6, marginBottom:2}} />
          
          <View style={{flexDirection:'row', justifyContent:'space-between'}}>
            <Text style={styles.notesHeaders}>CHANCE OF RAIN</Text>
            <Text style={styles.notesHeaders}>PRESSURE</Text>
          </View>

          <View style={{flexDirection:'row', justifyContent:'space-between'}}>
            <Text style={styles.notes}>{chanceOfRain + '%'}</Text>
            <Text style={styles.notes}>{pressure + ' inHg'}</Text>
          </View>

          <Divider style={{ backgroundColor: '#dfe6e9', marginTop:6, marginBottom:2}} />
          
          <View style={{flexDirection:'row', justifyContent:'space-between'}}>
            <Text style={styles.notesHeaders}>POLLEN COUNT</Text>
            <Text style={styles.notesHeaders}>HUMIDITY</Text>
          </View>

          <View style={{flexDirection:'row', justifyContent:'space-between'}}>
            <Text style={styles.notes}>{pollen}</Text>
            <View style={{flexDirection:'row'}}>
              <Icon name='alert' size={20} color='red'></Icon>
              <Text style={styles.notes}>{humidity + '%'}</Text>
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
    textTransform:'capitalize',
  },
  notesHeaders: {
    fontSize: 10,
		color:'#fff',
  }
});
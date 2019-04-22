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
          nextForecast: {},
          pressurePrediction: 0,
          lightPrediction: 0,
          grassPrediction: 0,
          moldPrediction: 0,
          ragweedPrediction: 0,
          treePrediction: 0
      };
      
    }

    componentDidMount() {
      this.setState({
          location: this.props.location,
          forecast: this.props.forecast,
          nextForecast: this.props.nextForecast,
          pressurePrediction: this.props.pressurePrediction,
          lightPrediction: this.props.lightPrediction,
          grassPrediction: this.props.grassPrediction,
          moldPrediction: this.props.moldPrediction,
          ragweedPrediction: this.props.ragweedPrediction,
          treePrediction: this.props.treePrediction
      });

    };

    componentWillReceiveProps(nextProps) {
      
      this.setState({
        nextForecast: nextProps.nextForecast,
        pressurePrediction: nextProps.pressurePrediction,
        lightPrediction: nextProps.lightPrediction,
        grassPrediction: nextProps.grassPrediction,
        moldPrediction: nextProps.moldPrediction,
        ragweedPrediction: nextProps.ragweedPrediction,
        treePrediction: nextProps.treePrediction
      });
      this.forceUpdate();
  }

    _onPressButton(myAlert) {
      Alert.alert(myAlert);
    }

    render() {
      console.log(this.state.nextForecast)
      
      //Icons for the pressure, light, pollen if they warrant an alert based on the prediction model
      var predictions = [this.state.pressurePrediction, this.state.lightPrediction, this.state.grassPrediction, this.state.moldPrediction, this.state.ragweedPrediction, this.state.treePrediction];

      var icons = predictions.map((item, i) => {
          var predictionStr = "";
          var finalStr = "";
          if (i == 0 || i == 1) {
            predictionStr = "hazard day for migraines!";
          } else {
            predictionStr = "hazard day for allergies!";
          }
          if (item == 3) {
            finalStr = "Severe " + predictionStr;
            return <TouchableOpacity onPress={() => this._onPressButton(finalStr)}>
            <Icon name='alert' size={20} color='black'></Icon>
          </TouchableOpacity>;
          }
          if (item == 2) {
            finalStr = "Moderate " + predictionStr;
            return <TouchableOpacity onPress={() => this._onPressButton(finalStr)}>
            <Icon name='emoticon-neutral-outline' size={20} color='black'></Icon>
          </TouchableOpacity>;
          }
      });

      return (
        <Card containerStyle={styles.card}>
          <View style={{justifyContent: 'space-between', alignItems: 'center', marginBottom: 20, marginTop: 20}}>
            <View style={{flexDirection:'row'}}>
              <FontAwesome name='location-arrow' size={24} color='white'></FontAwesome>
              <Text style={styles.location}>{this.state.location}</Text>
            </View>
            <View>
              <Text style={styles.notesHeaders}>TODAY</Text>
            </View>
            <View style={{flexDirection:'row', marginVertical: 20, width:110, justifyContent: 'space-between'}}>
              <Text style={styles.temperature}>{this.state.forecast.currTemp + '°'}</Text>
              <Icon name={this.state.forecast.type} size={50} color='white'></Icon>
            </View>
          </View>

          <View style={{justifyContent: 'space-between', alignItems: 'center'}}>
            <Text style={styles.notesHeaders}>SELECTED DAY CONDITIONS - {this.state.nextForecast.day}</Text>
          </View>
  
          <Divider style={{ backgroundColor: '#dfe6e9', marginTop:6, marginBottom:2}} />
          
          <View style={{flexDirection:'row', justifyContent:'space-between'}}>
            <Text style={styles.notesHeaders}>HUMIDITY</Text>
            <Text style={styles.notesHeaders}>AIR QUALITY</Text>
          </View>

          <View style={{flexDirection:'row', justifyContent:'space-between'}}>
            <View style={{flexDirection:'row'}}>
              <Text style={styles.notes}>{this.state.nextForecast.humidity + '%'}</Text>
            </View>
            <View style={{flexDirection:'row'}}>
              <Text style={styles.notes}>{this.state.nextForecast.aq}</Text>
            </View>
          </View>

          <Divider style={{ backgroundColor: '#dfe6e9', marginTop:6, marginBottom:2}} />

          <View style={{flexDirection:'row', justifyContent:'space-between'}}>
            <Text style={styles.notesHeaders}>PRESSURE</Text>
            <Text style={styles.notesHeaders}>UV INDEX</Text>
          </View>

          <View style={{flexDirection:'row', justifyContent:'space-between'}}>
            <View style={{flexDirection:'row'}}>
              <Text style={styles.notes}>{this.state.nextForecast.pressure + ' hPa'}</Text>
              {icons[0]}
            </View>
            <View style={{flexDirection:'row'}}>
              {icons[1]}
              <Text style={styles.notes}>{this.state.nextForecast.uv}</Text>
            </View>
            
          </View>

          <Divider style={{ backgroundColor: '#dfe6e9', marginTop:6, marginBottom:2}} />
          
          <View style={{flexDirection:'row', justifyContent:'space-between'}}>
            <Text style={styles.notesHeaders}>GRASS POLLEN</Text>
            <Text style={styles.notesHeaders}>TREE POLLEN</Text>
          </View>

          <View style={{flexDirection:'row', justifyContent:'space-between'}}>
            <View style={{flexDirection:'row'}}>
              <Text style={styles.notes}>{this.state.nextForecast.grassC}</Text>
              {icons[2]}
            </View>
            <View style={{flexDirection:'row'}}>
              {icons[5]}
              <Text style={styles.notes}>{this.state.nextForecast.treeC}</Text>
            </View>
            
          </View>

          <Divider style={{ backgroundColor: '#dfe6e9', marginTop:6, marginBottom:2}} />
          
          <View style={{flexDirection:'row', justifyContent:'space-between'}}>
            <Text style={styles.notesHeaders}>MOLD</Text>
            <Text style={styles.notesHeaders}>RAGWEED</Text>
          </View>

          <View style={{flexDirection:'row', justifyContent:'space-between'}}>
            <View style={{flexDirection:'row'}}>
              <Text style={styles.notes}>{this.state.nextForecast.moldC}</Text>
              {icons[3]}
            </View>
            <View style={{flexDirection:'row'}}>
              {icons[4]}
              <Text style={styles.notes}>{this.state.nextForecast.ragweedC}</Text>
            </View>
            
          </View>
          <Divider style={{ backgroundColor: '#dfe6e9', marginTop:6, marginBottom:2}} />
          
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
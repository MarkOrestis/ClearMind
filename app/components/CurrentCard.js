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
          pressurePrediction: 0,
          lightPrediction: 0,
          grassPrediction: 0,
          moldPrediction: 0,
          ragweedPrediction: 0,
          treePrediction: 0
      };
      var predictions = [];
      
    }

    componentDidMount() {
      this.setState({
          location: this.props.location,
          forecast: this.props.forecast,
          pressurePrediction: this.props.pressurePrediction,
          lightPrediction: this.props.lightPrediction,
          grassPrediction: this.props.grassPrediction,
          moldPrediction: this.props.moldPrediction,
          ragweedPrediction: this.props.ragweedPrediction,
          treePrediction: this.props.treePrediction
      });
      //this.predictions = [this.state.pressurePrediction, this.state.lightPrediction, this.state.grassPrediction, this.state.moldPrediction, this.state.ragweedPrediction, this.state.treePrediction];

    };

    componentWillReceiveProps(nextProps) {
      
      this.setState({
        forecast: nextProps.forecast
        //predictions
      });
      this.forceUpdate();
      console.log(nextProps);
  }

    _onPressButton(myAlert) {
      Alert.alert(myAlert);
    }
    //var predictions = [this.state.pressurePrediction, this.state.lightPrediction, this.state.grassPrediction, this.state.moldPrediction, this.state.ragweedPrediction, this.state.treePrediction];


    render() {
      
      //Icons for the pressure, light, pollen iff they warrant an alert
      //Not sure why predictions aren't working
      var predictions = [this.state.pressurePrediction, this.state.lightPrediction, this.state.grassPrediction, this.state.moldPrediction, this.state.ragweedPrediction, this.state.treePrediction];

      //var predictions = [1, 3, 1, 1, 3, 0];
      var predictionArr = this.state.forecast.toString();

      var icons = predictions.map((item, i) => {
          if (item == 3) {
            return <TouchableOpacity onPress={() => this._onPressButton(predictionArr)}>
            <Icon name='alert' size={20} color='black'></Icon>
          </TouchableOpacity>;
          }
      });
      console.log(predictions);

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
              <Text style={styles.temperature}>{"81" + '°'}</Text>
              <Icon name={"weather-sunny"} size={50} color='white'></Icon>
            </View>
          </View>

          <View style={{justifyContent: 'space-between', alignItems: 'center'}}>
            <Text style={styles.notesHeaders}>SELECTED DAY</Text>
          </View>
  
          <Divider style={{ backgroundColor: '#dfe6e9', marginTop:6, marginBottom:2}} />
          
          <View style={{flexDirection:'row', justifyContent:'space-between'}}>
            <Text style={styles.notesHeaders}>HUMIDITY</Text>
            <Text style={styles.notesHeaders}>PRESSURE</Text>
          </View>

          <View style={{flexDirection:'row', justifyContent:'space-between'}}>
            <View style={{flexDirection:'row'}}>
              <Text style={styles.notes}>{this.state.forecast.humidity + '%'}</Text>
            </View>
            <View style={{flexDirection:'row'}}>
              {icons[0]}
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
            </View>
            <View style={{flexDirection:'row'}}>
              {icons[1]}
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
              {icons[2]}
            </View>
            <View style={{flexDirection:'row'}}>
              {icons[5]}
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
              {icons[4]}
            </View>
            <View style={{flexDirection:'row'}}>
              {icons[5]}
              <Text style={styles.notes}>{this.state.forecast.ragweed}</Text>
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
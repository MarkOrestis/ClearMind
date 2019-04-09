import React, { Component } from "react";
import { View, Text } from 'react-native';
import { Button } from 'native-base';

export default class SettingsScreen extends Component {

  render() {
    const { navigate } = this.props.navigation;
    return(
      <View>
        <Button block style={{marginTop:10, backgroundColor: 'transparent'}} onPress={() => navigate("SensitivitiesScreen")}>
            <Text style={{color: '#000000', fontSize:20, backgroundColor: 'transparent'}}> Edit Sensitivities </Text>
        </Button>
        <Button block style={{marginTop:10, backgroundColor: 'transparent'}} onPress={() => this.props.navigation.navigate("NotificationsScreen")}>
          <Text style={{color: '#000000', fontSize:20, backgroundColor: 'transparent'}}> Edit Notifications </Text>
      </Button>
      </View>
    );
  }
}
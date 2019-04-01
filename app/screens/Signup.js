import React, { Component } from "react";
import {
  Button,
  Container,
  Content,
  InputGroup,
  Input,
  Icon,
  Text,
  View
} from 'native-base'
import { Alert, ImageBackground } from 'react-native';

import { styles } from '../config/styles/styles'
import { colorStyles, colorPalette } from '../config/styles/colorStyles'
import { Authenticator } from '../models/Authenticator'

export default class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    }
  }

  static navigationOptions = () => ({
    headerTransparent: true,
    headerTitleStyle: {color: '#000000',
    alignSelf: 'center',
    textAlign: 'center',
    flexGrow: 1}
  });

  updateName(name) {
    this.setState({name});
  }

  updateEmail(email) {
    this.setState({email});
  }

  updatePassword(password) {
    this.setState({password});
  }

  updateConfirmPassword(confirmPassword) {
    this.setState({confirmPassword});
  }

  register() {
    const { email, password, confirmPassword, name } = this.state;
    if (password != confirmPassword) {
      Alert.alert("Passwords must match");
    } else {
      this.state.disableAutoLogin = true;
      Authenticator.register(email, password)
        .then(() => {
          Authenticator.updateDisplayName(name).then(() => {
            this.props.navigation.navigate("SensitivitiesScreen");
          }).catch(() => {
            Alert.alert("Error updating account details.");
          })
        })
        .catch((error) => {
          Alert.alert("Error creating account, please try again");
        });
    }


  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <Container>
        <ImageBackground source={require('../res/images/Grass_Sunshine.jpg')} style={{height: '100%'}}>
          <Content contentContainerStyle={{flex:1, flexDirection: "column", justifyContent: "space-between", alignItems:"center",paddingLeft: 10,paddingRight: 10,}}>
            <View style={{alignSelf: "stretch", top: 250}}>
            <InputGroup>
              <Icon name="person" style={colorStyles.primaryText} />
              <Input
                placeholder="Name"
                placeholderTextColor={colorPalette.primaryText}
                autoCapitalize="words"
                autoCorrect={false}
                style={colorStyles.primaryText}
                onChangeText={(email) => {this.updateName(email);}}
              />
            </InputGroup>
            <InputGroup>
              <Icon name="mail" style={colorStyles.primaryText} />
              <Input
                placeholder="email"
                placeholderTextColor={colorPalette.primaryText}
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="email-address"
                style={colorStyles.primaryText}
                onChangeText={(email) => {this.updateEmail(email);}}
              />
            </InputGroup>
            <InputGroup>
              <Icon name='lock' style={colorStyles.primaryText}/>
              <Input
                placeholder="password"
                placeholderTextColor={colorPalette.primaryText}
                secureTextEntry={true}
                autoCapitalize="none"
                style={colorStyles.primaryText}
                autoCorrect={false}
                onChangeText={(pass) => {this.updatePassword(pass)}}
              />
            </InputGroup>
            <InputGroup>
              <Icon name='lock' style={colorStyles.primaryText}/>
              <Input
                placeholder='Confirm Password'
                placeholderTextColor={colorPalette.primaryText}
                secureTextEntry={true}
                autoCapitalize="none"
                style={colorStyles.primaryText}
                autoCorrect={false}
                onChangeText={(pass) => {this.updateConfirmPassword(pass)}}
              />
            </InputGroup>


            <Button block style={{marginTop:10, backgroundColor: '#fffaf0'}} onPress={() => {this.register()}}>
                <Text style={{color: '#000000'}}> Sign up</Text>
              </Button>


            </View>
          </Content>
        </ImageBackground>
      </Container>
    );
  }
}

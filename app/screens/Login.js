import React, { Component } from "react";
import {TouchableOpacity} from "react-native"
import {
  Button,
  Container,
  Content,
  InputGroup,
  Input,
  Icon,
  Text,
  View,
} from 'native-base'
import { Alert, ImageBackground } from 'react-native';
import { Authenticator } from '../models/Authenticator'
import { styles } from '../config/styles/styles'
import { colorStyles, colorPalette } from '../config/styles/colorStyles'

export default class Login extends Component {

    static navigationOptions = {
      title: '',
    };

    constructor(props) {
      super(props);
      this.state = {
        email: '',
        password: '',
      }
      
      // For when we have user persistence
      // Authenticator.userIsLoggedIn((result) => {
      //     if (result) {
      //         this.props.navigation.navigate("WeatherScreen");
      //     }
      // });
     }

     headerTitleStyles = {color: '#000000',
                          alignSelf: 'center',
                          textAlign: 'center',
                          flexGrow: 1};

     static navigationOptions = () => ({
        headerTransparent: true,
        headerTitleStyle: headerTitleStyles
      });
  
  
    updateEmail(email) {
      this.setState({email});
    }
  
    updatePassword(password) {
      this.setState({password});
    }
  
    login() {
      const { email, password } = this.state;
      this.state.disableAutoLogin = true;
      Authenticator.login(email, password)
        .then(() => {
          this.props.navigation.navigate("EditSensitivities");
        })
        .catch(() => {
          Alert.alert("Invalid Password");
        });
  
    }

    render() {
      return (
        <Container>  
          <ImageBackground source={require('../res/images/Grass_Sunshine.jpg')} style={{height: '100%'}}>
            <Content contentContainerStyle={styles.contentContainerStyle}>
              <View style={{alignSelf: "stretch", top: 60}}>
              <Text style={styles.loginTitle}>{"ClearMind"}</Text>

              <InputGroup>
                <Icon name="person" style={colorStyles.primaryText} />
                <Input
                  placeholder='username'
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

              <Button block style={{marginTop:10, backgroundColor: '#fffaf0'}} onPress={() => {this.login()}}>
                <Text style={{color: '#000000'}}> Sign In</Text>
              </Button>

              {/* <Button block style={{marginTop:10}} onPress={() => {this.props.navigation.navigate("EditSensitivities")}}>
                <Text> Sign In</Text>
              </Button> */}

              <Text style={[colorStyles.primaryText, {textAlign:"center", marginTop:20}]}>
                  Don't have an account? <Text style={{color:"#000000"}}>Sign Up</Text>
              </Text>
              <Text style={{textAlign:"center", color:"#000000"}}>
                  Forgot Password?
              </Text>
              
            </View>
          </Content>
        </ImageBackground>
      </Container>
      );
    }

}
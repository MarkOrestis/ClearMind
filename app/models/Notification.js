import React, { Component } from "react";
import { Alert, Platform, Text } from "react-native";
import SwitchSelector from "react-native-switch-selector";

import { AsyncStorage } from 'react-native';
import firebase from 'react-native-firebase';
import type {Notification, NotificationOpen} from 'react-native-firebase';

import { Container, Item, Button, Icon } from "native-base";
import { Database } from "../models/Database";
import { styles } from "../config/styles/styles";

export default class Notification extends Component {

async componentDidMount() {
    this.checkPermission(); //notifications
    this.createNotificationListeners();

   //  this.notificationDisplayedListener = firebase.notifications().onNotificationDisplayed((notification: Notification) => {
   //      // Process your notification as required
   //      // ANDROID: Remote notifications do not contain the channel ID. You will have to specify this manually if you'd like to re-display the notification.
   //  });
   //  this.notificationListener = firebase.notifications().onNotification((notification: Notification) => {
   //      // Process your notification as required
   //  });

   //  this.notificationOpenedListener = firebase.notifications().onNotificationOpened((notificationOpen: NotificationOpen) => {
   //      // Get the action triggered by the notification being opened
   //      const action = notificationOpen.action;
   //      // Get information about the notification that was opened
   //      const notification: Notification = notificationOpen.notification;
   //  });

   // firebase.notifications().getInitialNotification()
   //    .then((notificationOpen: NotificationOpen) => {
   //      if (notificationOpen) {
   //        // App was opened by a notification
   //        // Get the action triggered by the notification being opened
   //        const action = notificationOpen.action;
   //        // Get information about the notification that was opened
   //        const notification: Notification = notificationOpen.notification;  
   //      }
   //  });
}
	//1
async checkPermission() {
  const enabled = await firebase.messaging().hasPermission();
  if (enabled) {
      this.getToken();
  } else {
      this.requestPermission();
  }
}

  //3
async getToken() {
  let fcmToken = await AsyncStorage.getItem('fcmToken');
  if (!fcmToken) {
      fcmToken = await firebase.messaging().getToken();
      if (fcmToken) {
          // user has a device token
          await AsyncStorage.setItem('fcmToken', fcmToken);
      }
  }
}

  //2
async requestPermission() {
  try {
      await firebase.messaging().requestPermission();
      // User has authorised
      this.getToken();
  } catch (error) {
      // User has rejected permissions
      console.log('permission rejected');
  }
}
//Remove listeners allocated in createNotificationListeners()
componentWillUnmount() {
  this.notificationListener();
  this.notificationOpenedListener();
}

async createNotificationListeners() {
  /*
  * Triggered when a particular notification has been received in foreground
  * */
  this.notificationListener = firebase.notifications().onNotification((notification) => {
      const { title, body } = notification;
      this.showAlert(title, body);
  });

  /*
  * If your app is in background, you can listen for when a notification is clicked / tapped / opened as follows:
  * */
  this.notificationOpenedListener = firebase.notifications().onNotificationOpened((notificationOpen) => {
      const { title, body } = notificationOpen.notification;
      this.showAlert(title, body);
  });

  /*
  * If your app is closed, you can check if it was opened by a notification being clicked / tapped / opened as follows:
  * */
  const notificationOpen = await firebase.notifications().getInitialNotification();
  if (notificationOpen) {
      const { title, body } = notificationOpen.notification;
      this.showAlert(title, body);
  }
  /*
  * Triggered for data only payload in foreground
  * */
  this.messageListener = firebase.messaging().onMessage((message) => {
    //process data message
    console.log(JSON.stringify(message));
  });
}

showAlert(title, body) {
  Alert.alert(
    title, body,
    [
        { text: 'OK', onPress: () => console.log('OK Pressed') },
    ],
    { cancelable: false },
  );
}


render() {
	return (
      <View style={{flex: 1}}>
        <Text>Notifications!</Text>
      </View>
    );
  }
}
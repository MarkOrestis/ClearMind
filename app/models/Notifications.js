import React, { Component } from "react";
import { Alert, Platform, Text } from "react-native";
import SwitchSelector from "react-native-switch-selector";

import { AsyncStorage } from 'react-native';
import firebase from 'react-native-firebase';
import type {Notification, NotificationOpen} from 'react-native-firebase';
import Database from './Database'

import { Container, Item, Button, Icon } from "native-base";
import { Database } from "../models/Database";
import { styles } from "../config/styles/styles";

export default class Notifications extends Component {
    async componentDidMount() {
        const enabled = await firebase.messaging().hasPermission();
        if (enabled) {
            // user has permissions

            firebase.messaging().getToken()
              .then(fcmToken => {
                if (fcmToken) {
                  // user has a device token
                } else {
                  // user doesn't have a device token yet
                } 
              });

             this.onTokenRefreshListener = firebase.messaging().onTokenRefresh(fcmToken => {
                // Process your token as required
                Database.storeToken(fcmToken);
                });
             
        } else {
            // user doesn't have permission
            try {
                await firebase.messaging().requestPermission();
                // User has authorised
            } catch (error) {
                // User has rejected permissions
                alert('No permission for notification');
            }
        }

        // exports.sendMessageNotification = functions.database.ref('conversations/{conversationID}/messages/{messageID}').onWrite(event => {
        //   if (event.data.previous.exists()) {
        //     return;
        //   }

        // firebase.database().ref('messages').child(event.params.messageID).once('value').then(function(snap) {
        //     var messageData = snap.val();

        // var topic = 'notifications_' + messageData.receiverKey;
        //     var payload = {
        //       notification: {
        //         title: "You got a new Message",
        //         body: messageData.content,
        //       }
        //     };
            
        //     admin.messaging().sendToTopic(topic, payload)
        //         .then(function(response) {
        //           console.log("Successfully sent message:", response);
        //         })
        //         .catch(function(error) {
        //           console.log("Error sending message:", error);
        //         });
        //   });
        // });

        // FCM.subscribeToTopic('notifications_' + userKey);

        // this.notificationListener = FCM.on(FCMEvent.Notification, async (notif) => {
        //   if (!notif.local_notification) {
        //     FCM.presentLocalNotification({
        //       id: "UNIQ_ID_STRING",
        //       title: notif.aps.alert.title,
        //       body: notif.aps.alert.body,
        //       sound: "default",
        //       priority: "high",
        //       click_action: "ACTION",
        //       icon: "ic_launcher",
        //       show_in_foreground: true,
        //     });
        //   }
        // });

        const notificationOpen: NotificationOpen = await firebase.notifications().getInitialNotification();
        if (notificationOpen) {
            // App was opened by a notification
            // Get the action triggered by the notification being opened
            const action = notificationOpen.action;
            // Get information about the notification that was opened
            const notification: Notification = notificationOpen.notification;
            if (notification.body!==undefined) {
                alert(notification.body);
            } else {
                var seen = [];
                alert(JSON.stringify(notification.data, function(key, val) {
                    if (val != null && typeof val == "object") {
                        if (seen.indexOf(val) >= 0) {
                            return;
                        }
                        seen.push(val);
                    }
                    return val;
                }));
            }
            firebase.notifications().removeDeliveredNotification(notification.notificationId);
        }

        const channel = new firebase.notifications.Android.Channel('test-channel', 'Test Channel', firebase.notifications.Android.Importance.Max)
            .setDescription('My apps test channel');

        // Create the channel
        firebase.notifications().android.createChannel(channel);


        this.notificationDisplayedListener = firebase.notifications().onNotificationDisplayed((notification: Notification) => {
            // Process your notification as required
            // ANDROID: Remote notifications do not contain the channel ID. You will have to specify this manually if you'd like to re-display the notification.
        });
        this.notificationListener = firebase.notifications().onNotification((notification: Notification) => {
            // Process your notification as required
            console.log('get Message');
            console.log(notification);
            notification
                .android.setChannelId('test-channel')
                .android.setSmallIcon('ic_launcher');
            firebase.notifications()
                .displayNotification(notification);
            // if (Platform.OS === 'android') {
            //
            //     const localNotification = new firebase.notifications.Notification({
            //         sound: 'default',
            //         show_in_foreground: true,
            //         show_in_background: true
            //     })
            //         .setNotificationId(notification.notificationId)
            //         .setTitle(notification.title)
            //         .setSubtitle(notification.subtitle)
            //         .setBody(notification.body)
            //         .setData(notification.data)
            //         .android.setChannelId('test-channel') // e.g. the id you chose above
            //         .android.setSmallIcon('ic_launcher') // create this icon in Android Studio
            //         .android.setColor('#000000') // you can set a color here
            //         .android.setPriority(firebase.notifications.Android.Priority.High);
            //
            //     firebase.notifications()
            //         .displayNotification(localNotification)
            //         .catch(err => console.error(err));
            //
            // } else if (Platform.OS === 'ios') {
            //
            //     const localNotification = new firebase.notifications.Notification()
            //         .setNotificationId(notification.notificationId)
            //         .setTitle(notification.title)
            //         .setSubtitle(notification.subtitle)
            //         .setBody(notification.body)
            //         .setData(notification.data)
            //         .ios.setBadge(notification.ios.badge);
            //
            //     firebase.notifications()
            //         .displayNotification(localNotification)
            //         .catch(err => console.error(err));
            //
            // }
        });
        this.notificationOpenedListener = firebase.notifications().onNotificationOpened((notificationOpen: NotificationOpen) => {
            // Get the action triggered by the notification being opened
            const action = notificationOpen.action;
            // Get information about the notification that was opened
            const notification: Notification = notificationOpen.notification;
            // const notification = new firebase.notifications.Notification({
            //     sound: 'default',
            //     show_in_foreground: true,
            //     show_in_background: true
            // })
            //     .setNotificationId(notificationOpen.notification.notificationId)
            //     .setTitle(notificationOpen.notification.title)
            //     .setSubtitle(notificationOpen.notification.subtitle)
            //     .setBody(notificationOpen.notification.body)
            //     .setData(notificationOpen.notification.data)
            //     .android.setChannelId('test-channel') // e.g. the id you chose above
            //     .android.setSmallIcon('ic_launcher') // create this icon in Android Studio
            //     .android.setColor('#000000') // you can set a color here
            //     .android.setPriority(firebase.notifications.Android.Priority.High);
            if (notification.body!==undefined) {
                alert(notification.body);
                // var seen = [];
                // alert(JSON.stringify(notification.data, function(key, val) {
                //     if (val != null && typeof val == "object") {
                //         if (seen.indexOf(val) >= 0) {
                //             return;
                //         }
                //         seen.push(val);
                //     }
                //     return val;
                // }));
            } else {
                var seen = [];
                alert(JSON.stringify(notification.data, function(key, val) {
                    if (val != null && typeof val == "object") {
                        if (seen.indexOf(val) >= 0) {
                            return;
                        }
                        seen.push(val);
                    }
                    return val;
                }));
            }
            firebase.notifications().removeDeliveredNotification(notification.notificationId);
        });
    }

    componentWillUnmount() {
        this.notificationDisplayedListener();
        this.notificationListener();
        this.notificationOpenedListener();
        this.onTokenRefreshListener();
    }

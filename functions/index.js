// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
/**
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
'use strict';

const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();


/**
 * Triggers when a user gets a new follower and sends a notification.
 *
 * Followers add a flag to `/followers/{followedUid}/{followerUid}`.
 * Users save their device notification tokens to `/users/{followedUid}/notificationTokens/{notificationToken}`.
 */
exports.sendFollowerNotification = functions.database.ref('/users/prediction')
    .onWrite(async (change, context) => {
      const prediction = context.params.prediction;
      const userUid = context.params.userUid;
      // If un-follow we exit the function.
      if (!change.after.val()) {
        return console.log('User ', prediction, 'has no update', userUid);
      }
      console.log('We have a new update:', prediction, 'for user:', userUid);

      // Get the list of device notification tokens.
      const getDeviceTokensPromise = admin.database()
          .ref(`/users/${userUid}/notificationTokens`).once('value');

      // Get the user
      const getUserPromise = admin.auth().getUser(userUid);

      // The snapshot to the user's tokens.
      let tokensSnapshot;

      // The array containing all the user's tokens.
      let tokens;

      const results = await Promise.all([getDeviceTokensPromise, getUserPromise]);
      tokensSnapshot = results[0];
      const follower = results[1];

      // Check if there are any device tokens.
      if (!tokensSnapshot.hasChildren()) {
        return console.log('There are no notification tokens to send to.');
      }
      console.log('There are', tokensSnapshot.numChildren(), 'tokens to send notifications to.');
      console.log('Fetched follower profile', follower);

      // Notification details.
      const payload = {
        notification: {
          title: 'You have a new prediction!',
          body: `${follower.displayName} is now following you.`,
          icon: follower.photoURL
        }
      };

      // Listing all tokens as an array.
      tokens = Object.keys(tokensSnapshot.val());
      // Send notifications to all tokens.
      const response = await admin.messaging().sendToDevice(tokens, payload);
      // For each message check if there was an error.
      const tokensToRemove = [];
      response.results.forEach((result, index) => {
        const error = result.error;
        if (error) {
          console.error('Failure sending notification to', tokens[index], error);
          // Cleanup the tokens who are not registered anymore.
          if (error.code === 'messaging/invalid-registration-token' ||
              error.code === 'messaging/registration-token-not-registered') {
            tokensToRemove.push(tokensSnapshot.ref.child(tokens[index]).remove());
          }
        }
      });
      return Promise.all(tokensToRemove);
    });




//     // Sends a notifications to all users when a new message is posted.
// exports.sendNotifications = functions.firestore.document('messages/{messageId}').onCreate(
//   async (snapshot) => {
//     // Notification details.
//     const text = snapshot.data().text;
//     const payload = {
//       notification: {
//         title: `${snapshot.data().name} posted ${text ? 'a message' : 'an image'}`,
//         body: text ? (text.length <= 100 ? text : text.substring(0, 97) + '...') : '',
//         icon: snapshot.data().profilePicUrl || '/images/profile_placeholder.png',
//         click_action: `https://${process.env.GCLOUD_PROJECT}.firebaseapp.com`,
//       }
//     };

//     // Get the list of device tokens.
//     const allTokens = await admin.firestore().collection('fcmTokens').get();
//     const tokens = [];
//     allTokens.forEach((tokenDoc) => {
//       tokens.push(tokenDoc.id);
//     });

//     if (tokens.length > 0) {
//       // Send notifications to all tokens.
//       const response = await admin.messaging().sendToDevice(tokens, payload);
//       await cleanupTokens(response, tokens);
//       console.log('Notifications have been sent and tokens cleaned up.');
//     }
//   });

// // Cleans up the tokens that are no longer valid.
// function cleanupTokens(response, tokens) {
//   // For each notification we check if there was an error.
//   const tokensDelete = [];
//   response.results.forEach((result, index) => {
//     const error = result.error;
//     if (error) {
//       console.error('Failure sending notification to', tokens[index], error);
//       // Cleanup the tokens who are not registered anymore.
//       if (error.code === 'messaging/invalid-registration-token' ||
//           error.code === 'messaging/registration-token-not-registered') {
//         const deleteTask = admin.firestore().collection('messages').doc(tokens[index]).delete();
//         tokensDelete.push(deleteTask);
//       }
//     }
//   });
//   return Promise.all(tokensDelete); 
// }
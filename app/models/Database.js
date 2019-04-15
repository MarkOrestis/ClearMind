import firebase from 'react-native-firebase';


import User from './User'

var d = new Date();
d = String(d.getDate()) + "-" + String(d.getMonth()) + "-" + String(d.getFullYear());

export class Database {

    
    static getUserId() {
        return firebase.auth().currentUser.uid;
    }

    static getUserName() {
        return firebase.auth().currentUser.displayName;
    }

    static getEmail() {
      return firebase.auth().currentUser.email;
    }

    static getPhoto() {
        return firebase.auth().currentUser.photoURL;
    }
    
    static storeSensitivities(user) {
        return new Promise((resolve, reject) => {
            var userId = Database.getUserId();
            const database = firebase.database();
            const userRef = database.ref("users/" + userId);
            userRef.set(user);
            resolve();
        });
    }

    static storeSensitivitiesPrediction(prediction) {
        return new Promise((resolve, reject) => {
            var userId = Database.getUserId();
            const database = firebase.database();
            const predictionRef = database.ref("users/" + userId + "/prediction");
            predictionRef.set(prediction);
            resolve();
        });
    }

    static storeDailyFeedback(feedback) {
        return new Promise((resolve, reject) => {
            var userId = Database.getUserId();
            var database = firebase.database();
            var feedbackRef = database.ref("users/" + userId + "/feedback/" + d);
            feedbackRef.set(feedback);
            resolve();
        });
    }

    static dailyFeedbackExist() {
        console.log("in daily feedback");
        return new Promise((resolve, reject) => {
            console.log("in feedback promise");
            var userId = Database.getUserId();
            var ref = firebase.database().ref("users/" + userId);
            ref.once('value')
                .then(function(userSnapshot) {
                    if (userSnapshot.child("feedback/" + d).exists()) {
                        console.log("feedback exists for " + d);
                        resolve();
                    } else {
                        console.log("feedback does not exist for: " + d);
                        reject();
                    }
                });
        });
    }

    static loadSensitivities() {
        return new Promise((resolve, reject) => {
            var userId = Database.getUserId();
            const database = firebase.database();
            const userRef = database.ref("users/" + userId);
            userRef.once("value").then((userSnapshot) => {
                if (userSnapshot.exists()) {
                    var user = new User(userSnapshot.val());
                    resolve([user]);
                }
                else {
                    resolve([new User()]);
                }
            })
        })
    }
}

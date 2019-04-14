import firebase from 'react-native-firebase';


import User from './User'

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

    static storeToken(token) {
        return new Promise((resolve,reject)) => {
            var userId = Database.getUserId();
            const database = firebase.database();
            const userRef = database.ref("deviceTokens/" + userId);
            userRef.set(token);
            resolve();
        }
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

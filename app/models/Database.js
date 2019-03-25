import firebase from 'react-native-firebase';


import User from './User';

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
    
}

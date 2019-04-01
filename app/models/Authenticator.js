//import {AsyncStorage, (...) } from 'react-native'
import firebase from 'react-native-firebase';
import { GoogleSignin } from 'react-native-google-signin';



export class Authenticator {

  static login(email, password) {
      return new Promise(function(resolve, reject) {
         firebase.auth().signInWithEmailAndPassword(email, password)
         .then(() => {
            resolve();
         })
         .catch(() => {
            reject();
         })
      });

  }

  static logout() {
      return new Promise(function(resolve, reject) {
          firebase.auth().signOut().then(() => {
              resolve();
          })
          .catch((error) => {
              reject(error);
          })
      })
  }


  static userIsLoggedIn(result) {
      firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          result(true);
        } else {
          result(false);
        }
      });
  }

  static forgotPassword(email) {
      return new Promise(function(resolve, reject) {
          firebase.auth().sendPasswordResetEmail(email).then(() => {
              resolve();
          })
          .catch((error) => {
            console.log(error);
              reject(error);
          });
      })
  }

  static register(email, password, result) {
      return new Promise(function(resolve, reject) {
          firebase.auth().createUserWithEmailAndPassword(email, password)
              .then(() => {
                  resolve();
              })
              .catch((error) => {
                  console.log(error);
                  reject();
              });
      });

  }

  static loginWithGoogle() {
    return new Promise((resolve, reject) => {
      GoogleSignin.configure();
        GoogleSignin.signIn()
        .then((data) => {
            const credential = firebase.auth.GoogleAuthProvider.credential(data.idToken, data.accessToken);
            firebase.auth().signInWithCredential(credential)
              .then(() => {
                resolve();
              })
              .catch((error) => {
                console.log(error);
                reject();
              });
          }
        )
        .catch((error) => {
          console.log(error);
          reject();
        });
    //   .catch((error) => {
    //     reject();
    //   })
    });
  }

  static updateDisplayName(name) {
    return new Promise((resolve, reject) => {
      var user = firebase.auth().currentUser;

      user
        .updateProfile({
          displayName: name
        })
        .then(function() {
          resolve();
        })
        .catch(function(error) {
          reject(error);
        });
    });
  }
  
}



// export class Authenticator {

//   // async saveItem(item, selectedValue) {
//   //   try {
//   //     await AsyncStorage.setItem(item, selectedValue);
//   //   } catch (error) {
//   //     console.error('AsyncStorage error: ' + error.message);
//   //   }
//   // }

//   static login(email, password) {
//     return new Promise(function(resolve, reject) {
//       fetch(
//         `https://clearmind-backend.herokuapp.com/api/user/${email}&${password}`
//       )
//         .then(res => res.json())
//         .then(res => {
//           if (res.message == "i dont exist") {
//             reject();
//           } else {
//             resolve();
//           }
//         })
//         .catch(error => {
//           console.log(error);
//           reject();
//         });
//     });
//   }

//   static userIsLoggedIn(result) {
//     firebase.auth().onAuthStateChanged(function(user) {
//         if (user) {
//             result(true);
//         } else {
//             result(false);
//         }
//     });
// }

// userSignup() {
//   if (!this.state.username || !this.state.password) return;
//   fetch('http://192.168.XXX.XXX:3001/users', { //dont know the proper fetch here
//     method: 'POST',
//     headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
//     body: JSON.stringify({
//       username: this.state.username,
//       password: this.state.password,
//     })
//   })
//   .then((response) => response.json())
//   .then((responseData) => {
//     this.saveItem('id_token', responseData.id_token),
//     Alert.alert( 'Signup Success!);
//     //redirect here i think
//   })
//   .done();
// }

// userLogin() {
//   if (!this.state.username || !this.state.password) return;
//   fetch(https://clearmind-backend.herokuapp.com/api/user/${email}&${password}, {
//     method: 'POST',
//     headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
//     body: JSON.stringify({
//       username: this.state.username,
//       password: this.state.password,
//     })
//   })
//   .then((response) => response.json())
//   .then((responseData) => {
//     this.saveItem('id_token', responseData.id_token),
//     Alert.alert('Login Success!');
//     ,//redirect here i think
//   })
//   .done();
// }

//separate source for example persistent login tried to use
// const json = JSON.stringify(data)
//       fetch('http://localhost:3000/users/login', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           Accept: 'application/json'
//         },
//         body: json
//       })
//       .then((response) => response.json())
//       .then((res) => {
//         if (res.error) {
//           alert(res.error)
//         } else {
//           AsyncStorage.setItem('jwt', res.token)
//           alert(`Success! You may now access protected content.`)
//           // Redirect to home screen
//           this.props.navigator.pop()
//         }
//       })
//       .catch(() => {
//         alert('There was an error logging in.');
//       })
//       .done()
//     } else {
//       // Form validation error
//       alert('Please fix the errors listed and try again.')
//     }

//dont know exactly where to put this right now

// async userLogout() {
//     try {
//       await AsyncStorage.removeItem('id_token');
//       Alert.alert('Logout Success!');
//      //transition on this line maybe?
//     } catch (error) {
//       console.log('AsyncStorage error: ' + error.message);
//     }
//   }
// }

import firebase from 'firebase';
import 'firebase/database';
import 'firebase/storage';

const DB_CONFIG = {
    apiKey: "AIzaSyDLK2s8gFeBoKT1qYYFshTlWTRDMXtE1mU",
    authDomain: "minutetech-app.firebaseapp.com",
    databaseURL: "https://minutetech-app.firebaseio.com",
    projectId: "minutetech-app",
    storageBucket: "minutetech-app.appspot.com",
    messagingSenderId: "725768971108"
  };

const fire = firebase.initializeApp(DB_CONFIG);

const storage = firebase.storage()

export {
  storage, fire as default
}
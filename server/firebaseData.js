
import { } from 'firebase/database';

const firebaseConfig = {
  apiKey: "APIKEYREDACTED",
  authDomain: "twish-2dd01.firebaseapp.com",
  databaseURL: "https://twish-2dd01-default-rtdb.firebaseio.com",
  projectId: "twish-2dd01",
  storageBucket: "twish-2dd01.appspot.com",
  messagingSenderId: "APIKEYREDACTED",
  appId: "1:APIKEYREDACTED:web:APIKEYREDACTED",
  measurementId: "G-APIKEYREDACTED"
};

var firebase = require('firebase');
let database = firebase.database()

//database.ref('/users/APIKEYREDACTED').once('value')
//.then(function(snapshot) {
//    console.log( snapshot.val() )
//})
const usersCollectionRef = db.collection('users');
console.log(usersCollectionRef);

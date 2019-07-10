import React from 'react'
import firebase from 'firebase';
var config = {
    apiKey: "AIzaSyDV_fDUiMUtWTYoTQcvPEGEGq3ehaHfhnM",
    authDomain: "taskboard-7435d.firebaseapp.com",
    databaseURL: "https://taskboard-7435d.firebaseio.com",
    projectId: "taskboard-7435d",
    storageBucket: "taskboard-7435d.appspot.com",
    messagingSenderId: "158753143174"
  };
  var fire = firebase.initializeApp(config);
export const provider = new firebase.auth.GoogleAuthProvider();
export const auth = firebase.auth();
export const Context = React.createContext(null);

  export default fire;
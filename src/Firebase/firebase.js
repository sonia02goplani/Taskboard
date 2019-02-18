import firebase from 'firebase'
var config = { /* COPY THE ACTUAL CONFIG FROM FIREBASE CONSOLE */
  apiKey: "AIzaSyDV_fDUiMUtWTYoTQcvPEGEGq3ehaHfhnM",
  authDomain: "your-domain-name.firebaseapp.com",
  databaseURL: "https://taskboard-7435d.firebaseio.com/",
  storageBucket: "your-domain-name.appspot.com",
  messagingSenderId: "123123123123"
};
var fire = firebase.initializeApp(config);
export default fire;
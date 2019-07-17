import firebase from 'firebase';
let firebaseConfig = {
    apiKey: "AIzaSyD567_EPR1Sw1TUMggQUdjxLhHmHDz9uJ4",
    authDomain: "kampongjio.firebaseapp.com",
    databaseURL: "https://kampongjio.firebaseio.com",
    projectId: "kampongjio",
    storageBucket: "kampongjio.appspot.com",
    messagingSenderId: "337932734584",
    appId: "1:337932734584:web:142f11cae6f5938d"
};
let app = firebase.initializeApp(firebaseConfig);
export const db = app.database();
export const auth = app.auth();
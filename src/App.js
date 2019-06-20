import React, { Component } from 'react';
import Router from './screens/Router';
import firebase from 'firebase';

class App extends Component {
    componentDidMount() {
        let firebaseConfig = {
            apiKey: "AIzaSyD567_EPR1Sw1TUMggQUdjxLhHmHDz9uJ4",
            authDomain: "kampongjio.firebaseapp.com",
            databaseURL: "https://kampongjio.firebaseio.com",
            projectId: "kampongjio",
            storageBucket: "kampongjio.appspot.com",
            messagingSenderId: "337932734584",
            appId: "1:337932734584:web:142f11cae6f5938d"
        };
        firebase.initializeApp(firebaseConfig);
    }

    render() {
        return (
            <Router />
        );
    }
};

export default App;
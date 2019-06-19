import React from 'react';
import { Scene, Router } from 'react-native-router-flux';
import MainPage from './MainPage';
import JioInformation from './JioInformation';

const RouterComponent = () => {
    return (
        <Router>
            <Scene key="root">
                <Scene 
                    key="mainPage"
                    component={MainPage}
                    title="Kampong Jio"
                    initial
                />
                <Scene
                    key="jioInformation"
                    component={JioInformation}
                    title="Jio Information"
                />
            </Scene>
        </Router>
    );
};

export default RouterComponent;
import React from 'react';
import { Scene, Router, Actions } from 'react-native';
import MainPage from './MainPage';
import JioInformation from './JioInformation';

const RouterComponent = () => {
    return (
        <Router>
            <Scene 
                key="mainPage"
                component={MainPage}
                title="Kampong Jio"
                initial
            />
            <Scene
                key="jioInformation"
                component={JioInformation}
                title="Makisan"
            />
        </Router>
    );
};

export default RouterComponent;
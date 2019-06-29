import React from 'react';
import { Scene, Router } from 'react-native-router-flux';
import MainPage from './MainPage';
import JioInformation from './JioInformation';
import JioJoinerOrder from './JioJoinerOrder';
import CoordinatorCreateJio from './CoordinatorCreateJio';

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
                <Scene
                    key="jioJoinerOrder"
                    component={JioJoinerOrder}
                    title="Join Jio"
                />
                <Scene
                    key="coordinatorCreateJio"
                    component={CoordinatorCreateJio}
                    title="Create New Jio"
                />
            </Scene>
        </Router>
    );
};

export default RouterComponent;
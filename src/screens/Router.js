import React from 'react';
import { Scene, Router } from 'react-native-router-flux';
import Front from './Front';
import MainPage from './MainPage';
import JioInformation from './JioInformation';
import JioJoinerOrder from './JioJoinerOrder';
import CoordinatorCreateJio from './CoordinatorCreateJio';
import Coordinator from './Coordinator';
import Dashboard from './Dashboard';

const RouterComponent = () => {
    return (
        <Router>
            <Scene key="root">
                <Scene 
                    key="front"
                    component={Front}
                    hideNavBar={true}
                    initial
                />
                <Scene 
                    key="mainPage"
                    component={MainPage}
                    title="Kampong Jio"
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
                <Scene
                    key="dashboard"
                    component={Dashboard}
                    title="Your Jios"
                />
                <Scene
                    key="coordinator"
                    component={Coordinator}
                />
            </Scene>
        </Router>
    );
};

export default RouterComponent;
import React from 'react';
import { Scene, Router } from 'react-native-router-flux';
import LoginForm from './LoginForm';
import SignUp from './SignUp';
import Front from './Front';
import Profile from './Profile';
import MainPage from './MainPage';
import JioInformation from './JioInformation';
import JioJoinerOrder from './JioJoinerOrder';
import CoordinatorCreateJio from './CoordinatorCreateJio';
import Coordinator from './Coordinator';
import Dashboard from './Dashboard';
import CoordinatorEditJio from './CoordinatorEditJio';

const RouterComponent = () => {
    return (
        <Router>
            <Scene key="root">
                <Scene
                    key="loginForm"
                    component={LoginForm}
                    hideNavBar={true}
                    initial
                />
                <Scene
                    key="signUp"
                    component={SignUp}
                    hideNavBar={true}
                    
                />
                <Scene 
                    key="front"
                    component={Front}
                    hideNavBar={true}
                />
                <Scene
                    key="profile"
                    component={Profile}
                    title="Profile"
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
                    title="Coordinator"
                />
                <Scene
                    key="coordinatorEditJio"
                    component={CoordinatorEditJio}
                    title="Edit Your Jio"
                />
            </Scene>
        </Router>
    );
};

export default RouterComponent;
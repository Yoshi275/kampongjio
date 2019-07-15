import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Button, NavBar } from '../components/common';
import FullJioDetails from '../components/JioInformation/FullJioDetails';

class JioInformation extends Component {
    render() {
        return(
            <View style={styles.containerStyle}>
                <FullJioDetails order={this.props.order}/>
                <View>
                    <Button onPress={() => { Actions.jioJoinerOrder({ 
                        order : this.props.order, 
                        foodOrderId: this.props.foodOrderId}) 
                        }}>
                        + JOIN JIO
                    </Button>
                    <NavBar />
                </View>
            </View>
        );
    }
}

const styles = {
    containerStyle: {
        flex: 1,
        backgroundColor: '#2D9B83',
        justifyContent: 'space-between'
    },
};

export default JioInformation;
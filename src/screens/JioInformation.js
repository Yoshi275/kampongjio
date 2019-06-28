import React, { Component } from 'react';
import { View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Button } from '../components/common';
import FullJioDetails from '../components/JioInformation/FullJioDetails';

class JioInformation extends Component {
    render() {
        return(
            <View style={styles.containerStyle}>
                <FullJioDetails order={this.props.order}/>
                <Button onPress={() => { Actions.jioJoinerOrder({ order : this.props.order }) }}>
                    + JOIN JIO
                </Button>
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
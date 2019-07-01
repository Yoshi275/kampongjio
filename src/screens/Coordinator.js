import React, { Component } from 'react';
import { Text, View, Image } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Button, NavBar } from '../components/common';
import { Open } from '../resources/icons';
import CoordinatorFullJio from '../components/Coordinator/CoordinatorFullJio';

class Coordinator extends Component {
    render() {
        const store = this.props.order.store;
        const status = Open;

        const { 
            containerStyle,
            storeStyle,
        } = styles;

        return(
            <View style={containerStyle}>
                <View>
                    <Text style={storeStyle}>{store}</Text>
                    <CoordinatorFullJio order={this.props.order}/>
                </View>
                <View>
                    <Button onPress={ () => Actions.mainPage() }>CLOSE ORDER</Button>
                    {/* TODO: Change status of order by pressing button */}
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
        flexDirection: 'column',
        justifyContent: 'space-between'
    },
    storeStyle: {
        textAlign: 'center',
        textTransform: 'uppercase',
        fontSize: 32,
        color: '#FFFFFF',
        borderWidth: 2,
        borderRadius: 10,
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 50,
        marginRight: 50,
        borderColor: '#FF7058',
        backgroundColor: '#F3A462',
    },
}

export default Coordinator;
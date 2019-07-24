import React, { Component } from 'react';
import { Text, View, Image, ScrollView } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Button, NavBar } from '../components/common';
import { Edit } from '../resources/icons';
import { db } from '../config';
import CoordinatorFullJio from '../components/Coordinator/CoordinatorFullJio';

class Coordinator extends Component {
    state = { jioStatus : this.props.order.jioStatus };

    componentDidUpdate() {
        this.handleSubmit()
    }

    handleSubmit() {
        let postData = {
            jioStatus: this.state.jioStatus,
        }

        const jioOrderId = this.props.jioOrderId;
        let dbLocation = '/allOrders/' + jioOrderId + '/';

        db
            .ref(dbLocation)
            .update(postData)
            .then((success) => {
                console.log('Success Message: ', success) // success callback
            })
            .catch((error) => {
                console.log('Error Message: ', error) // error callback
            })
    }

    renderButton() {
        console.log(this.state.jioStatus);
        if( this.state.jioStatus === '1jioOpen' ) {
            return (
                <Button onPress={ () => this.setState({ jioStatus : '2jioClosed'}) }>JIO CLOSED</Button>
            );
        } else if( this.state.jioStatus === '2jioClosed' ) {
            return (
                <Button onPress={ () => this.setState({ jioStatus : '3jioArrived'}) }>FOOD ARRIVED</Button>
            );
        } else {        
            return(
                <Button onPress={ () => {Actions.mainPage(); this.setState({ jioStatus : '4jioCompleted'});} }>JIO COMPLETED</Button>
            );
        }
    }
    
    render() {
        const store = this.props.order.store;

        const { 
            containerStyle,
            storeStyle,
            editStyle,
            headerStyle,
            textStyle
        } = styles;

        return(
            <View style={containerStyle}>
                <ScrollView>
                    <Text style={storeStyle}>{store}</Text>
                    <CoordinatorFullJio 
                        order={this.props.order}
                        jioOrderId={this.props.jioOrderId}
                        jioStatus={this.state.jioStatus}
                    />
                </ScrollView>
                <View>
                    {this.renderButton()}
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
        marginLeft: 40,
        marginRight: 40,
        // paddingLeft: 50,
        // paddingRight: 50,
        borderColor: '#FF7058',
        backgroundColor: '#F3A462',
        flex: 7,
    },
    editStyle: {
        height: 24,
        width: 24, 
        flex: 1
    },
    headerStyle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end'
    }
}

export default Coordinator;
import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { BigInput, Button } from '../components/common';
import { db } from '../config';

class JioJoinerOrder extends Component {
    state = { foodChoices: '', price: '', specialRequests: ''};

    handleSubmit() {
        let postData = {
            foodChoices: this.state.foodChoices,
            joinerName: 'Cheryl',
            orderNo: 4,
            price: '8.80',
            specialRequests: this.state.specialRequests,
        }

        db
            .ref('/allOrders')
            .push(postData)
    }

    render() {
        const { containerStyle, storeStyle } = styles;
        const store = 'Makisan';

        return(
            <View style={containerStyle}>
                <View>
                    <Text>{this.props.order.coordinatorName}</Text>
                    <Text style={storeStyle}>{store}</Text>
                    <BigInput 
                        placeholder="What do I want to order?"
                        label="YOUR ORDER"
                        value={this.state.foodChoices}
                        onChangeText={foodChoices => this.setState({ foodChoices })}
                    /> 
                    <BigInput 
                        placeholder="How much does everything cost?"
                        label="PRICE"
                        value={this.state.price}
                        onChangeText={order => this.setState({ price })}
                        // TODO: typing into this element results in crashing. can we fix this?
                    /> 
                    <BigInput 
                        placeholder="Any special requests?"
                        label="SPECIAL REQUESTS"
                        value={this.state.specialRequests}
                        onChangeText={specialRequests => this.setState({ specialRequests })}
                    /> 
                </View>
                <Button onPress={() => this.handleSubmit()}>SUBMIT ORDER</Button>
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

    }
};

export default JioJoinerOrder;
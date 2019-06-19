import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { BigInput, Button } from '../components/common';

class JioJoinerOrder extends Component {
    state = { order: '', price: ''};

    render() {
        const { containerStyle, restaurantStyle } = styles;
        const restaurant = 'Makisan';

        return(
            <View style={containerStyle}>
                <View>
                    <Text style={restaurantStyle}>{restaurant}</Text>
                    <BigInput 
                        placeholder="What do I want to order?"
                        label="YOUR ORDER"
                        value={this.state.order}
                        onChangeText={order => this.setState({ order })}
                    /> 
                    <BigInput 
                        placeholder="How much does everything cost?"
                        label="PRICE"
                        value={this.state.price}
                        onChangeText={order => this.setState({ price })}
                    /> 
                </View>
                <Button>SUBMIT ORDER</Button>
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
    restaurantStyle: {
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
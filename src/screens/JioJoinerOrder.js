import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { BigInput, Button } from '../components/common';

class JioJoinerOrder extends Component {
    state = { foodChoices: '', price: '', specialRequests: ''};

    render() {
        const { containerStyle, storeStyle } = styles;
        const store = 'Makisan';

        return(
            <View style={containerStyle}>
                <View>
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
                    /> 
                    <BigInput 
                        placeholder="Any special requests?"
                        label="SPECIAL REQUESTS"
                        value={this.state.specialRequests}
                        onChangeText={specialRequests => this.setState({ specialRequests })}
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
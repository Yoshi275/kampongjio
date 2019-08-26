import React, { Component } from 'react';
import { View, Text, Image, Linking, TouchableOpacity } from 'react-native';
import HeaderSection from './HeaderSection';
import { Food } from '../../resources/icons';
import { jioStatusText } from '../../data/jioStatus';

class FullJioDetails extends Component {
    render() {
        const { 
            imageStyle,
            imageContainerStyle,
            textStyle,
            titleStyle,
            containerStyle
         } = styles;

        return(
            <View>
                <HeaderSection>
                    <View style={imageContainerStyle}>
                        <Image 
                            source={ this.props.isPhotoDefault ? Food : { uri: this.props.photoURL } }
                            style={imageStyle}
                        /> 
                    </View>

                    <View style={containerStyle}>
                        <Text style={titleStyle}>{this.props.order.store}</Text> 
                        <Text style={textStyle}>Coordinator : {this.props.order.coordinatorName}</Text>
                        <Text style={textStyle}>{this.props.order.phoneNumber}</Text>
                    </View>
                </HeaderSection>
                <Text style={textStyle}>Status : {jioStatusText(this.props.order.jioStatus)}</Text>
                <Text style={textStyle}>Location : {this.props.order.jioLocation}</Text>             
                <View style={{flexDirection: 'row'}}>
                    <Text style={textStyle}>Menu : </Text>
                    <TouchableOpacity style={{flex: 1, flexDirection: 'column'}} onPress={()=> 
                        Linking
                            .openURL( this.props.order.jioMenuURL )
                            .catch((err) => console.error("Error: " + err))}>
                        <Text style={[textStyle, {fontWeight: '800', textDecorationLine:'underline'}]}>
                            {this.props.order.jioMenuURL}
                        </Text>
                    </TouchableOpacity>
                </View>
                
                <Text style={textStyle}>Delivery App : {this.props.order.deliveryApp}</Text>
                <Text style={textStyle}>Delivery Cost (Total) : {this.props.order.deliveryCost}</Text>
                <Text style={textStyle}>Minimum Order : ${this.props.order.minOrder}</Text> 
                <Text style={textStyle}>Discount: {this.props.order.discount}%</Text>
            </View> 
        );
    }
}

const styles = {
    containerStyle: {
        // width: 0,
        flexGrow: 1,
        flex: 1, 
        justifyContent: 'space-around'
    },
    imageStyle: {
        height: 120,
        width: 120
    },
    titleStyle: {
        fontSize: 30,
        color: '#FFFFFF',
        fontWeight: 'bold',
        marginLeft:5,
        marginRight: 5
    },
    textStyle: {
        fontSize: 18,
        color: '#FFFFFF',
        marginLeft: 5,
        marginRight: 5,
        // marginTop: 3,
        marginBottom: 3,
    },
    imageContainerStyle: {
        // flex: 1
        justifyContent: 'center',
        alignItems: 'center',
        margin: 3,
        borderColor: '#FF7058',
        borderWidth: 2,
        borderRadius: 2,
        padding: 3,
        shadowColor: '#FF0000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.9,
        shadowRadius: 2
    },
};

export default FullJioDetails;
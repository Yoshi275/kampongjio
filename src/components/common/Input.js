import React from 'react';
import { Text, View, TextInput } from 'react-native';

const Input = ({ label, value, onChangeText, placeholder }) => {
    const { inputStyle, labelStyle, containerStyle, inputContainerStyle } = styles;

    return (
        <View style={containerStyle}>
            <Text style={labelStyle}>{label}</Text>
            <View style={inputContainerStyle}>
                <TextInput 
                placeholder={placeholder}
                style={inputStyle}
                value={value}
                onChangeText={onChangeText}
                />
            </View>
        </View>
    );
};

const styles = {
    //flex value is like proportion of space it is given, like input is 2/3 of space
    inputStyle: {
        //color: '#00000',
        paddingRight: 5,
        paddingLeft: 5,
        fontSize: 16,
        //lineHeight: 23,
    },
    inputContainerStyle: {
        // marginBottom is not included because the cards have their own margins, take note
        flex: 4,
        borderWidth : 1,
        borderRadius: 2,
        borderColor: '#000000',
        backgroundColor: '#FFFFFF',
        marginTop: 5,
        marginRight: 10,
        elevation: 5
    },
    labelStyle: {
        fontSize: 18,
        marginLeft: 10,
        marginRight: 10,
        flex: 1,
        fontWeight: '400',
        color: '#FFFFFF'
    },
    containerStyle: {
        //height: 20,
        //conventionally, you need the parent to have flex: 1, but it ruined the layout in main page
        //flex: 1,
        flexDirection: 'row',
        alignItems: 'center'
    }
};

export { Input };
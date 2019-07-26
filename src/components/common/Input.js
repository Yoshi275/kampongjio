import React from 'react';
import { Text, View, TextInput } from 'react-native';

const Input = ({ label, value, onChangeText, placeholder, secureTextEntry, keyboardType }) => {
    const { 
        inputStyle, 
        labelStyle, 
        containerStyle, 
        inputContainerStyle 
    } = styles;

    return (
        <View style={containerStyle}>
            <Text style={labelStyle}>{label}</Text>
            <View style={inputContainerStyle}>
                <TextInput 
                placeholder={placeholder}
                style={inputStyle}
                value={value}
                onChangeText={onChangeText}
                secureTextEntry={secureTextEntry}
                keyboardType={keyboardType}
                />
            </View>
        </View>
    );
};

const styles = {
    inputStyle: {
        paddingRight: 5,
        paddingLeft: 5,
        fontSize: 14,
    },
    inputContainerStyle: {
        // marginBottom is not included because the cards have their own margins, take note
        flex: 3,
        borderWidth : 1,
        borderRadius: 2,
        borderColor: '#000000',
        backgroundColor: '#FFFFFF',
        marginTop: 3,
        marginRight: 10,
        marginBottom: 3,
        // elevation: 5
    },
    labelStyle: {
        flex: 1,
        fontSize: 16,
        marginLeft: 10,
        marginRight: 5,
        fontWeight: '400',
        color: '#FFFFFF',
    },
    containerStyle: {
        flexDirection: 'row',
        alignItems: 'center'
    }
};

export { Input };
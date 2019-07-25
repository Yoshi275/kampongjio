import React from 'react';
import { Text, View, TextInput } from 'react-native';

const BigInput = ({ label, value, onChangeText, placeholder, textContentType, keyboardType }) => {
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
                textContentType={textContentType}
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
        fontSize: 16,
        position: 'absolute',
        //lineHeight: 23,
    },
    inputContainerStyle: {
        //flex: 4,
        height: 80,
        width: '80%',
        borderWidth : 1,
        borderRadius: 2,
        borderColor: '#000000',
        backgroundColor: '#FFFFFF',
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 20,
        marginRight: 20,
        elevation: 5,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    labelStyle: {
        //flex: 1,
        fontSize: 24,
        marginLeft: 10,
        marginRight: 10,
        fontWeight: 'bold',
        color: '#FFFFFF'
    },
    containerStyle: {
        alignItems: 'center'
    }
};

export { BigInput };
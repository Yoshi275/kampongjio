import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Logo } from '../resources/images';

const Front = () => {
    return(
        <View style={ styles.containerStyle }>
            <TouchableOpacity onPress={ () => Actions.loginForm() }>
                <Image 
                    source={ Logo }
                    style={ styles.imageStyle }
                />
                <Text style={ styles.textStyle }>KampongJio</Text>
            </TouchableOpacity>
        </View>

    );
};

const styles = {
    containerStyle: {
        backgroundColor: '#2D9B83',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    imageStyle: {
        height: 200,
        width: 200
    },
    textStyle: {
        textAlign: 'center',
        paddingTop: 10,
        fontSize: 30,
        color: '#FFFFFF',
        fontWeight: 'bold'
    }
};

export default Front;
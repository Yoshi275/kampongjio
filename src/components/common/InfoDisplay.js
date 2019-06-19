// As of now, not used
import React from 'react';
import { Text, View } from 'react-native';

const InfoDisplay = ({ text, children }) => {
    return(
        <View style={styles.containerStyle}>
            <Text style={styles.textStyle}>{text}</Text>
            <View style={styles.viewStyle}>
                {children}
            </View>
        </View>
    );
};

const styles = {
    containerStyle: {
        flexDirection: 'row'
    },
    textStyle: {
        //flex: 1,
        marginTop: 3,
        marginBottom: 3,
        marginLeft: 5,
        marginRight: 5,
        color: '#FFFFFF',
        fontSize: 18,
        // alignItems: 'center',
        // justifyContent: 'center'
    }, 
    viewStyle: {
        //flex: 3,
        paddingRight: 5
    }

};

export { InfoDisplay };
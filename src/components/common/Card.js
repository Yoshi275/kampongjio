import React from 'react';
import { View } from 'react-native';

//Revisit 41 about props and children, make Card reusable
const Card = (props) => {
    return (
        <View style={styles.containerStyle}>
            {props.children}
        </View>
    );
};

const styles = {
    containerStyle: {
        // borderWidth: 1,
        borderRadius: 2,
        // borderColor: '#2F4353',
        borderColor: '#000000',
        elevation: 5,
        margin : 5
    }
};

export { Card };
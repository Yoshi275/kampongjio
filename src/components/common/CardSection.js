// CardSection is a section in the card, where its children will be arranged horizontally next to each other
// so certain cards have only one CardSection

import React from 'react';
import { View } from 'react-native';

const CardSection = (props) => {
    return (
        <View style={[styles.containerStyle, props.style]}>
            {props.children}
        </View>
    );
};

const styles = {
    containerStyle: {
        padding: 5,
        backgroundColor: '#F3A462',
        // alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        flex: 1,
        position: 'relative'
    }
};

export { CardSection };
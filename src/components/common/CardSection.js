// CardSection is a section in the card, where its children will be arranged horizontally next to each other
// so certain cards have only one CardSection

import React from 'react';
import { View } from 'react-native';

const CardSection = (props) => {
    return (
        <View style={styles.containerStyle}>
            {props.children}
        </View>
    );
};

const styles = {
    containerStyle: {
        //borderBottomWidth: 1,
        padding: 5,
        backgroundColor: '#F3A462',
        justifyContent: 'flex-start',
        flexDirection: 'row',
        flex: 1,
        borderColor: '#2F4353',
        position: 'relative'
    }
};

export { CardSection };
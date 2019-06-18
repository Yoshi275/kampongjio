import React from 'react';
import { View } from 'react-native';

const HeaderSection = (props) => {
    return (
        <View style={styles.containerStyle}>
            {props.children}
        </View>
    );
};

const styles = {
    containerStyle: {
        //borderBottomWidth: 1,
        //flex: 1
        padding: 5,
        justifyContent: 'flex-start',
        flexDirection: 'row',
        position: 'relative'
    }
};

export default HeaderSection;
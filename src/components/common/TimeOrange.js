import React from 'react';
import { View, Image} from 'react-native';
import { Hourglass } from '../../resources/icons';

const TimeOrange = ({ children }) => {
    return(
        <View style={styles.timeContainerStyle}>
            <Image style={styles.timeImageStyle} source={Hourglass} />

            {children}
        </View>
    );
};

const styles = {
    timeContainerStyle: {
        paddingTop: 10,
        paddingBottom: 10,
        // marginLeft: 15,
        // marginRight: 15,
        backgroundColor: '#F3A462',
        flexDirection: 'row'
    },
    timeImageStyle: {
        //flex: 1,
        position: 'relative',
        marginTop: 5, 
        marginBottom: 5,
        marginLeft: 5,
        height: 90,
        width: 90
    }, 
};

export { TimeOrange };
import React from 'react';
import { Image, View, Text } from 'react-native';
import { Home, Announcement, Dashboard, Profile } from '../../resources/icons';

const NavBar = () => {
    return(
        <View style={styles.containerStyle}>
            <Image style={styles.imageStyle} source={Home}/>
            <Image style={styles.imageStyle} source={Announcement}/>
            <Image style={styles.imageStyle} source={Dashboard}/>
            <Image style={styles.imageStyle} source={Profile}/>
        </View>
    );
};

const styles = {
    containerStyle : {
        backgroundColor: '#8CDCAC',
        // flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingTop: 10,
        paddingBottom: 10,
        marginTop: 5
    },
    imageStyle : {
        height: 40,
        width: 40,
        // tintColor: '#FF7058'
    }
}

export { NavBar };
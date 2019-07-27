import React, { Component } from 'react';
import { Image, View, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Home, Announcement, Dashboard, ProfileIcon } from '../../resources/icons';

class NavBar extends Component {
    render() {
        return(
            <View style={styles.containerStyle}>
                <TouchableOpacity onPress={ () => Actions.mainPage() }>
                    <Image style={styles.imageStyle} source={Home}/>
                </TouchableOpacity>
                <TouchableOpacity onPress={ () => console.log('Building announcements page')}>
                    <Image style={styles.imageStyle} source={Announcement}/>
                </TouchableOpacity>
                <TouchableOpacity onPress={ () => Actions.dashboard() }>
                    <Image style={styles.imageStyle} source={Dashboard}/>
                </TouchableOpacity>
                <TouchableOpacity onPress={ () => Actions.profile() }>
                    <Image style={styles.imageStyle} source={ProfileIcon}/>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = {
    containerStyle : {
        backgroundColor: '#8CDCAC',
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingTop: 10,
        paddingBottom: 10,
        // marginTop: 5
    },
    imageStyle : {
        height: 30,
        width: 30,
    }
}

export { NavBar };
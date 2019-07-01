import React from 'react';
import { Image, View, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Home, Announcement, Dashboard, Profile } from '../../resources/icons';

const NavBar = () => {
    return(
        <View style={styles.containerStyle}>
            <TouchableOpacity onPress={ () => Actions.mainPage() }>
                <Image style={styles.imageStyle} source={Home}/>
            </TouchableOpacity>
            <TouchableOpacity onPress={ () => console.log("Loading announcement page")}>
                <Image style={styles.imageStyle} source={Announcement}/>
            </TouchableOpacity>
            <TouchableOpacity onPress={ () => Actions.dashboard() }>
                <Image style={styles.imageStyle} source={Dashboard}/>
            </TouchableOpacity>
            <TouchableOpacity>
                <Image style={styles.imageStyle} source={Profile}/>
            </TouchableOpacity>
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
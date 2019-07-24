import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Logo } from '../resources/images';
import ImagePicker from 'react-native-image-picker'

class PickImage extends Component {
    state = {
        avatarSource: null
    }

    pickImage() {
        // More info on all the options is below in the API Reference... just some common use cases shown here
        const options = {
            title: 'Select Avatar',
            customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
        };

        /**
         * The first arg is the options object for customization (it can also be null or omitted for default options),
         * The second arg is the callback which sends object: response (more info in the API Reference)
         */
        ImagePicker.showImagePicker(options, (response) => {
            console.log('Response = ', response);
        
            if (response.didCancel) {
            console.log('User cancelled image picker');
            } else if (response.error) {
            console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
            console.log('User tapped custom button: ', response.customButton);
            } else {
            const source = { uri: response.uri };
        
            // You can also display the image using data:
            // const source = { uri: 'data:image/jpeg;base64,' + response.data };
        
            this.setState({
                avatarSource: source,
            }, () => {
                console.log('IMAGE LOADED UP!!!')
            });
            }
        });
    }

    render() {
        return(
            <View style={ styles.containerStyle }>
                <TouchableOpacity onPress={ () => this.pickImage() }>
                    <Image
                        source={this.state.avatarSource}
                        style={styles.profileStyle}
                    />
                    <Image 
                        source={ Logo }
                        style={ styles.imageStyle }
                    />
                    <Text style={ styles.textStyle }>KampongJio</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

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
    profileStyle: {
        height: 120,
        width: 120,
        borderRadius: 60
    },
    textStyle: {
        textAlign: 'center',
        paddingTop: 10,
        fontSize: 30,
        color: '#FFFFFF',
        fontWeight: 'bold'
    }
};

export default PickImage;
import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

//Make reusable components, because each button components can refer or go to different places
//so u can call that parent prop instead, like who calls me, we do what prop they want
const Button = ({ onPress, children }) => {
  const { buttonStyle, textStyle } = styles;

  return (
    <TouchableOpacity onPress={onPress} style={buttonStyle}>
      <Text style={textStyle}>
        {children}
      </Text>
    </TouchableOpacity>
  );
};

const styles = {
  textStyle: {
    alignSelf: 'center',
    color: '#007aff',
    fontSize: 16,
    fontWeight: '600',
    paddingTop: 10,
    paddingBottom: 10
  },
  buttonStyle: {
    //flex 1 is to make sure it will fill up the space as much as it possibly can
    //alignSelf is only for an element to stretch to limits of container
    //whereas alignItems is for the children in the container
    flex: 1,
    alignSelf: 'stretch',
    backgroundColor: '#fff',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#007aff',
    marginLeft: 5,
    marginRight: 5
  }
};

// Because we are now using index.js to export all common components, change
// export default Button; to export { Button: Button } because key and value is identical,
// shorten to 
export { Button };
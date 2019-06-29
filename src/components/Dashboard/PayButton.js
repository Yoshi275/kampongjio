import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

//Make reusable components, because each button components can refer or go to different places
//so u can call that parent prop instead, like who calls me, we do what prop they want
const PayButton = ({ onPress, children }) => {
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
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  buttonStyle: {
    //flex 1 is to make sure it will fill up the space as much as it possibly can
    //alignSelf is only for an element to stretch to limits of container
    //whereas alignItems is for the children in the container
    //ideally, I should set width for the button so it is smaller, but the alignment does not work
    //so i cheated by toggling with the margin numbers instead
    //flex: 1,

    backgroundColor: '#FF7058',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#FF0000',
    marginTop: 5,
  }
};

// Because we are now using index.js to export all common components, change
// export default Button; to export { Button: Button } because key and value is identical,
// shorten to 
export default PayButton;
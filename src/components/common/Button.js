import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

const Button = ({ onPress, children, extraStyle }) => {
  const { buttonStyle, textStyle } = styles;

  return (
    <TouchableOpacity onPress={onPress} style={[buttonStyle, extraStyle]}>
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
    paddingTop: 10,
    paddingBottom: 10
  },
  buttonStyle: {
    //flex: 1,
    justifyContent: 'center',
    flexDirection: 'row',
    backgroundColor: '#FF7058',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#FF0000',
    marginTop: 5,
    marginBottom: 5,
    marginLeft: 100,
    marginRight: 100
  }
};

export { Button };
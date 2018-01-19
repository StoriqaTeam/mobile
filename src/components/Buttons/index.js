// @flow
import React from 'react';
import {
  TouchableOpacity,
  View,
  Text,
} from 'react-native';
import styles from './styles';

type ButtonProps = {
  text: string,
  primary?: boolean,
  secondary?: boolean,
  onPress: () => void,
}


const Button = ({
  text,
  primary,
  secondary,
  onPress,
}: ButtonProps) => (
  <TouchableOpacity onPress={onPress}>
    <View style={[styles.button, primary && styles.primaryBG, secondary && styles.secondaryBG]}>
      <Text
        style={[
          styles.buttonText,
          primary && styles.primaryColor,
          secondary && styles.secondaryColor,
        ]}
      >
        {text}
      </Text>
    </View>
  </TouchableOpacity>
);
// Button.defau

export default Button;

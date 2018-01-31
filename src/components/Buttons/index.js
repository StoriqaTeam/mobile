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
  type: 'primary' | 'secondary',
  onPress: () => void,
}


const Button = ({
  text,
  type = 'primary',
  onPress,
}: ButtonProps) => (
  <TouchableOpacity onPress={onPress}>
    <View
      style={[
        styles.button,
        type === 'primary' && styles.primaryBG,
        type === 'secondary' && styles.secondaryBG,
      ]}
    >
      <Text
        style={[
          styles.buttonText,
          type === 'primary' && styles.primaryColor,
          type === 'secondary' && styles.secondaryColor,
        ]}
      >
        {text}
      </Text>
    </View>
  </TouchableOpacity>
);

export default Button;

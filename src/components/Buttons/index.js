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
  primary: boolean,
  secondary?: boolean,
}

function handleOnPressButton() {
  console.log('button pressed');
}

export default ({ text, primary, secondary }: ButtonProps) => (
  <TouchableOpacity onPress={handleOnPressButton}>
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

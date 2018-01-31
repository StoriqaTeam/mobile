// @flow
import React from 'react';
import type { Node } from 'react';
import {
  TouchableOpacity,
  View,
  Text,
} from 'react-native';
import styles from './styles';

type ButtonProps = {
  title: string,
  type: 'primary' | 'secondary',
  leftIcon?: Node,
  rightIcon?: Node,
  onPress: () => void,
}


export default ({
  title,
  type = 'primary',
  leftIcon,
  rightIcon,
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
      {!!leftIcon && leftIcon}
      <Text
        style={[
          styles.buttonText,
          type === 'primary' && styles.primaryColor,
          type === 'secondary' && styles.secondaryColor,
        ]}
      >
        {title}
      </Text>
      {rightIcon && rightIcon}
    </View>
  </TouchableOpacity>
);


export const HeaderButton = ({
  title,
  type = 'primary',
  leftIcon,
  rightIcon,
  onPress,
}: ButtonProps) => (
  <TouchableOpacity onPress={onPress}>
    <View
      style={[
        styles.headerButton,
        type === 'primary' && styles.primaryBG,
        type === 'secondary' && styles.secondaryBG,
      ]}
    >
      {!!leftIcon && leftIcon}
      <Text
        style={[
          styles.buttonText,
          type === 'primary' && styles.primaryColor,
          type === 'secondary' && styles.secondaryColor,
        ]}
      >
        {title}
      </Text>
      {!!rightIcon && rightIcon}
    </View>
  </TouchableOpacity>
);

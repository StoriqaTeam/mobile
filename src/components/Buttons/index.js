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
  type?: 'primary' | 'secondary' | 'default',
  leftIcon?: Node,
  rightIcon?: Node,
  onPress: () => void,
  style?: { [ key: string ]: any },
}


export default ({
  title,
  type = 'default',
  leftIcon,
  rightIcon,
  onPress,
  style,
}: ButtonProps) => (
  <TouchableOpacity onPress={onPress}>
    <View
      style={[
        styles.button,
        type === 'default' && styles.defaultBG,
        type === 'primary' && styles.primaryBG,
        type === 'secondary' && styles.secondaryBG,
        style && style,
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

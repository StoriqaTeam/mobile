// @flow
import React from 'react';
import type { Node } from 'react';
import {
  TouchableOpacity,
  View,
  Text,
} from 'react-native';
import styles from './styles';


type ActionType = () => Promise<any> | void;

type ButtonProps = {
  title: string,
  type?: 'primary' | 'secondary' | 'default',
  leftIcon?: Node,
  rightIcon?: Node,
  onPress: ActionType,
  style?: { [ key: string ]: any },
  disabled?: boolean,
}


export default ({
  title,
  type = 'default',
  leftIcon,
  rightIcon,
  onPress,
  style,
  disabled = false,
}: ButtonProps) => (
  <TouchableOpacity onPress={disabled ? () => {} : onPress}>
    <View
      style={[
        styles.button,
        type === 'default' && styles.defaultBG,
        type === 'primary' && styles.primaryBG,
        type === 'secondary' && styles.secondaryBG,
        disabled && styles.disabled,
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
  style,
  disabled = false,
}: ButtonProps) => (
  <TouchableOpacity onPress={disabled ? () => {} : onPress}>
    <View
      style={[
        styles.headerButton,
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
      {!!rightIcon && rightIcon}
    </View>
  </TouchableOpacity>
);

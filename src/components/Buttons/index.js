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
  primary?: boolean,
  secondary?: boolean,
  leftButton?: Node,
  rightButton?: Node,
  onPress: () => void,
}


export default ({
  title,
  primary,
  secondary,
  leftButton,
  rightButton,
  onPress,
}: ButtonProps) => (
  <TouchableOpacity onPress={onPress}>
    <View style={[styles.button, primary && styles.primaryBG, secondary && styles.secondaryBG]}>
      {leftButton && leftButton}
      <Text
        style={[
          styles.buttonText,
          primary && styles.primaryColor,
          secondary && styles.secondaryColor,
        ]}
      >
        {title}
      </Text>
      {rightButton && rightButton}
    </View>
  </TouchableOpacity>
);


export const HeaderButton = ({
  title,
  primary,
  secondary,
  leftButton,
  rightButton,
  onPress,
}: ButtonProps) => (
  <TouchableOpacity onPress={onPress}>
    <View
      style={[
        styles.headerButton,
        primary && styles.primaryBG,
        secondary && styles.secondaryBG,
      ]}
    >
      {leftButton && leftButton}
      <Text
        style={[
          styles.buttonText,
          primary && styles.primaryColor,
          secondary && styles.secondaryColor,
        ]}
      >
        {title}
      </Text>
      {rightButton && rightButton}
    </View>
  </TouchableOpacity>
);

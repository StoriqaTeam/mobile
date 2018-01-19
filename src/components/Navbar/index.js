// @flow
import type { Element } from 'react';
import React from 'react';
import {
  View,
} from 'react-native';
import styles from './styles';


export type NavbarType = {
  component?: Element<any>,
  title?: Element<any>,
  leftButton?: Element<any>,
  rightButton?: Element<any>,
}


const Navbar = ({
  component,
  title,
  leftButton,
  rightButton,
}: NavbarType) => {
  if (component) return component;
  return (
    <View style={styles.navbarContainer}>
      <View style={styles.leftButtonContainer}>
        {leftButton && leftButton}
      </View>
      <View style={styles.titleContainer}>
        {title && title}
      </View>
      <View style={styles.rightButtonContainer}>
        {rightButton && rightButton}
      </View>
    </View>
  );
};

export default Navbar;

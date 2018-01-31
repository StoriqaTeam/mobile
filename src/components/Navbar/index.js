// @flow
import type { Element } from 'react';
import React from 'react';
import {
  View,
  Text,
} from 'react-native';
import styles from './styles';


export type NavbarType = {
  component?: Element<any>,
  title?: Element<any> | string,
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
  const titleEl = () => {
    if (typeof title === 'string') return <Text>{title}</Text>;
    return title;
  };
  return (
    <View style={styles.navbarContainer}>
      <View style={styles.leftButtonContainer}>
        {!!leftButton && leftButton}
      </View>
      <View style={styles.titleContainer}>
        {titleEl}
      </View>
      <View style={styles.rightButtonContainer}>
        {!!rightButton && rightButton}
      </View>
    </View>
  );
};

export default Navbar;

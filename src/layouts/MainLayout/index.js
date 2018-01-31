// @flow
import type { Node, Element } from 'react';
import React from 'react';
import {
  View,
} from 'react-native';
import styles from './styles';
import Navbar from '../../components/Navbar';
import type { NavbarType } from '../../components/Navbar';


type LayoutType = {
  navbar: ?NavbarType,
  children: Element<any>,
}


export default ({ navbar, children }: LayoutType): Node => (
  <View style={styles.wrapper}>
    {navbar && <Navbar {...navbar} />}
    {children}
  </View>
);

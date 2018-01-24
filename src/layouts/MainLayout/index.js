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
  isHiddenNavBar?: boolean,
  style?: { [key: string]: any },
  navbar?: NavbarType,
  children: Element<any>,
}


export default ({
  children,
  navbar,
  isHiddenNavBar,
  style = {},
}: LayoutType): Node => (
  <View style={[styles.wrapper, isHiddenNavBar && styles.statusBarIndent, style && style]}>
    {navbar && <Navbar {...navbar} />}
    {children}
  </View>
);

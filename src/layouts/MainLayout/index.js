// @flow
import type { Node, Element } from 'react';
import React from 'react';
import {
  View,
} from 'react-native';
import styles from './styles';
import Image from '../../components/Image';
import Navbar from '../../components/Navbar';
import type { NavbarType } from '../../components/Navbar';


type LayoutPropsType = {
  isHiddenNavBar?: boolean,
  backgroundURL?: string,
  style?: { [key: string]: any },
  navbar?: NavbarType,
  children: Element<any>,
}

export default ({
  isHiddenNavBar,
  backgroundURL,
  style = {},
  navbar,
  children,
}: LayoutPropsType): Node => (
  <View style={[styles.wrapper, isHiddenNavBar && styles.statusBarIndent, style && style]}>
    {!!backgroundURL && <Image
      name={backgroundURL}
      style={{ position: 'absolute', top: 0, right: 0, bottom: 0, left: 0, width: '100%', height: '100%' }}
    />}
    {navbar && <Navbar {...navbar} />}
    {children}
  </View>
);

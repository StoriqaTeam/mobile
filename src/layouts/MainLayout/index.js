// @flow
import type { Node, Element } from 'react';
import React from 'react';
import {
  View,
  AsyncStorage,
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import styles from './styles';
import Navbar from '../../components/Navbar';
import type { NavbarType } from '../../components/Navbar';


type LayoutPropsType = {
  isHiddenNavBar?: boolean,
  style?: { [key: string]: any },
  navbar?: NavbarType,
  children: Element<any>,
}

type LayoutStateType = {
  isLogin: boolean,
}

// export default ({
//   children,
//   navbar,
//   isHiddenNavBar,
//   style = {},
// }: LayoutType): Node => (
//   <View style={[styles.wrapper, isHiddenNavBar && styles.statusBarIndent, style && style]}>
//     {navbar && <Navbar {...navbar} />}
//     {children}
//   </View>
// );


export default class MainLayout extends React.Component<LayoutPropsType, LayoutStateType> {
  constructor(props) {
    super(props);
    this.state = {
      isLogin: false,
    }
  }

  componentWillMount() {
    console.log('*** Layout ')
    AsyncStorage.getItem('@Storiqa:token').then((token) => {
      console.log('*** Layout token: ', token);
      if (!token) {
        // Actions.login();
      }
    });
  }

  render() {
    const { isHiddenNavBar, navbar, children, style } = this.props;
    return (
      <View style={[styles.wrapper, isHiddenNavBar && styles.statusBarIndent, style && style]}>
        {navbar && <Navbar {...navbar} />}
        {children}
      </View>
    );
  }
}

// @flow
import type { Element } from 'react';
import React from 'react';
import {
  ScrollView,
  View,
  Animated,
} from 'react-native';
import styles from './styles';
import Image from '../../components/Image';
import Navbar from '../../components/Navbar';
import type { NavbarType } from '../../components/Navbar';


const HEADER_MAX_HEIGHT = 100;
const HEADER_MIN_HEIGHT = 80;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;


type LayoutPropsType = {
  backgroundURL?: string,
  style?: { [key: string]: any },
  navbar: NavbarType,
  children: Element<any>,
}

type LayoutStateType = {
  scrollY: any,
}

export default class MainLayout extends React.Component<LayoutPropsType, LayoutStateType> {
  constructor(props: LayoutPropsType) {
    super(props);
    this.state = {
      scrollY: new Animated.Value(0),
    };
  }

  renderContent = () => {
    const { children, navbar } = this.props;
    const { scrollY } = this.state;
    const height = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE],
      outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
      extrapolate: 'clamp',
    });
    const fontSize = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE],
      outputRange: [30, 20],
      extrapolate: 'clamp',
    });
    return [
      <ScrollView
        key="scrollLayout"
        style={styles.fill}
        scrollEventThrottle={16}
        onScroll={Animated.event([
          { nativeEvent: { contentOffset: { y: scrollY } } },
        ])}
      >
        <View style={{ marginTop: HEADER_MAX_HEIGHT }}>
          {children}
        </View>
      </ScrollView>,
      <Animated.View
        key="animatedLayout"
        style={[styles.header, { height }]}
      >
        <View style={styles.bar}>
          <Navbar
            {...navbar}
            title={
              <Animated.Text
                style={{ fontSize }}
              >{navbar.title}
              </Animated.Text>
            }
          />
        </View>
      </Animated.View>,
    ];
  }

  render() {
    const { backgroundURL, style } = this.props;
    return (
      <View style={[styles.wrapper, style && style]}>
        {!!backgroundURL && <Image
          name={backgroundURL}
          style={styles.bg}
        />}
        {this.renderContent()}
      </View>
    );
  }
}

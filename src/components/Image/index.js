import React from 'react';
import { Image } from 'react-native';

export const LOGIN_BG = 'login_bg';
export const LOGIN_BG_X = 'login_bg_x';
export const REGISTER_BG_X = 'register_bg_x';

const paths = { 
  login_bg: require('../../img/login_bg.png'),
  login_bg_x: require('../../img/login_bg_x.png'),
  register_bg_x: require('../../img/register_bg_x.png'),
};


export default ({ style, name }) => {
  return (
    <Image source={paths[name]} style={style} />
  );
}

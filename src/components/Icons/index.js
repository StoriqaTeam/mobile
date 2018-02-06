// @flow

import React from 'react';
import { createIconSetFromFontello } from 'react-native-vector-icons';
// import Svg, { Image } from 'react-native-svg';
import SvgUri from 'react-native-svg-uri';
import fontelloConfig from '../../fonts/config.json';

export const GOOGLE_SVG = 'google_svg';
export const FACEBOOK_SVG = 'facebook_svg';

const svgPaths = {
  google_svg: require('../../svg/google-icon.svg'),
  facebook_svg: require('../../svg/facebook-icon.svg'),
};

type SVGIconPropType = {
  name: string,
  width?: string,
  height?: string,
}

const SVGIcon = ({ name, width = '20', height = '20' }: SVGIconPropType) => (
  <SvgUri
    width={width}
    height={height}
    source={svgPaths[name]}
  />
);


const StoriqaIcon = createIconSetFromFontello(fontelloConfig);

export {
  StoriqaIcon,
  SVGIcon,
};


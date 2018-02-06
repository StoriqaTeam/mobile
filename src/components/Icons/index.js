import React from 'react';
import { createIconSetFromFontello } from 'react-native-vector-icons';
// import Svg, { Image } from 'react-native-svg';
import SvgUri from 'react-native-svg-uri';
import fontelloConfig from '../../fonts/config.json';

export const GOOGLE_SVG = 'google_svg';
export const FACEBOOK_SVG = 'facebook_svg';

const svgPaths = {
  google_svg: require('../../svg/google-icon.svg'),
  facebook: require('../../svg/facebook-icon.svg'),
};


const SVGIcon = ({ name, width, height }) => {
  return (
    <SvgUri
      width="200"
      height="200"
      source={svgPaths[name]}
    />
  );
};


const StoriqaIcon = createIconSetFromFontello(fontelloConfig);

export {
  StoriqaIcon,
  SVGIcon,
};


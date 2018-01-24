import { StyleSheet } from 'react-native';

const gray = '#DDDDDD';
const black = 'black';
const white = 'white';
const primary = 'blue';
const secondary = 'black';

export default StyleSheet.create({
  button: {
    backgroundColor: gray,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  primaryBG: {
    backgroundColor: primary,
  },
  secondaryBG: {
    backgroundColor: secondary,
  },
  primaryColor: {
    color: white,
  },
  secondaryColor: {
    color: white,
  },
  buttonText: {
    color: black,
  },
});

import { StyleSheet } from 'react-native';

const gray = '#DDDDDD';
const black = 'black';
const white = 'white';
const primary = 'blue';
const secondary = 'black';

export default StyleSheet.create({
  button: {
    height: 50,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: gray,
    paddingHorizontal: 10,
    shadowColor: '#333',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 16,
  },
  headerButton: {
    height: 37,
    marginHorizontal: 5,
    paddingHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  defaultBG: {
    backgroundColor: white,
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
    marginHorizontal: 8,
  },
});

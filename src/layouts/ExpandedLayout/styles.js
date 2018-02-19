import {
  StyleSheet,
} from 'react-native';


const HEADER_MAX_HEIGHT = 200;


export default StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    // backgroundColor: '#ffffff',
  },
  statusBarIndent: {
    marginTop: 20,
  },
  bg: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },
  // animated navbar
  fill: {
    flex: 1,
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: '#ffffff',
    overflow: 'hidden',
  },
  bar: {
    marginTop: 36,
    // height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    backgroundColor: 'transparent',
    color: 'white',
    fontSize: 18,
  },
});

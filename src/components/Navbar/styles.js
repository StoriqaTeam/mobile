import {
  StyleSheet,
} from 'react-native';


export default StyleSheet.create({
  navbarContainer: {
    flexDirection: 'row',
    height: 43.5,
    width: '100%',
    padding: 5,
    backgroundColor: '#ffffff',
    borderBottomWidth: 0.5,
    borderColor: '#dedede',
  },
  titleContainer: {
    flex: 2.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  leftButtonContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  rightButtonContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
});

import { StyleSheet } from 'react-native';
import { fonts } from '../../theme';


export default StyleSheet.create({
  storeWrapper: {
    backgroundColor: '#ffffff',
    marginBottom: 15,
    padding: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 4,
    shadowColor: '#333',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 16,
  },
  storeContentWrapper: {
    marginBottom: 8,
  },
  storeTitle: {
    fontFamily: fonts.primary,
    fontSize: 18,
  },
  storeShortDescription: {
    fontFamily: fonts.secondary,
  },
});

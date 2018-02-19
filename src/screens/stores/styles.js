import { StyleSheet } from 'react-native';


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
    fontSize: 18,
  },
});

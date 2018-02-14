import { StyleSheet } from 'react-native';


export default StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  contentWrapper: {
    flex: 1,
  },
  bottomContent: {
    backgroundColor: 'red',
  },
  formContainer: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    padding: 20,
  },
  textInput: {
    flex: 1,
    height: 50,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#333',
    padding: 10,
    textAlign: 'center',
    marginBottom: 5,
  },
  textInputWrapper: {
    flexDirection: 'column',
  },
  validationStatusWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

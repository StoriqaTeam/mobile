import { StyleSheet } from 'react-native';


export default StyleSheet.create({
  wrapper: {
    flex: 1,
    paddingTop: 20,
  },
  contentWrapper: {
    flex: 1,
  },
  content: {
    flex: 1,
    alignItems: 'center',
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
    // width: '90%',
    flex: 0.8,
    height: 50,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#333',
    padding: 10,
    textAlign: 'center',
    marginBottom: 5,
  },
  textInputWrapper: {
    // flex: 1,
    flexDirection: 'row',
  },
  // textInputStatus: {
  //   flex: 0.2,
  // },
  validationStatusWrapper: {
    flex: 0.2,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

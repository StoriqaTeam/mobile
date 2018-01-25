import { StyleSheet } from 'react-native';


export default StyleSheet.create({
  wrapper: {
    flex: 1,
    paddingTop: 20,
    // flexDirection: 'column',
  },
  contentWrapper: {
    flex: 1,
    // backgroundColor: '#333',
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
    // alignItems: 'center',
    padding: 20,
  },
  textInput: {
    width: '100%',
    height: 50,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#333',
    padding: 10,
    textAlign: 'center',
    marginBottom: 5,
  },
});


import { StyleSheet } from 'react-native';


export default StyleSheet.create({
  wrapper: {
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 30,
  },
  headerWrapper: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    marginBottom: 20,
    marginTop: 50,
  },
  subTitle: {
    fontSize: 16,
    color: '#333',
  },
  formWrapper: {
    flex: 1.5,
    width: '100%',
    justifyContent: 'center',
  },
  footerWrapper: {
    flex: 0.5,
  },
  formFields: {
    borderRadius: 4,
    shadowColor: '#333',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 16,
    marginTop: 10,
    marginBottom: 50,
  },
  textInput: {
    width: '100%',
    height: 50,
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    fontSize: 18,
    marginBottom: 5,
  },
});


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
    shadowOpacity: 0.2,
    shadowRadius: 16,
    marginTop: 10,
    marginBottom: 50,
  },
  textInput: {
    width: '100%',
    height: 50,
    paddingVertical: 10,
    paddingHorizontal: 20,
    fontSize: 18,
  },
  signinButton: {
    shadowColor: '#333',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    borderRadius: 4,
  },
  providersWrapper: {
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  centerTextWrapper: {
    alignItems: 'center',
    marginTop: 16,
  },
  separator: {
    width: '100%',
    height: 1,
    backgroundColor: '#333',
    opacity: 0.1,
  },
});


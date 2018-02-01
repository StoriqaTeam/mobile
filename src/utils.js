import { AsyncStorage } from 'react-native';

function setTokenToStorage(token) {
  try {
    AsyncStorage.setItem('@Storiqa:token', token);
  } catch (error) {
    console.log('- utils setTokenToStorage error: ', error);
  }
}

export default {
  setTokenToStorage,
};

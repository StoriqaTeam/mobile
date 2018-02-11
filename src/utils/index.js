// @flow
import { AsyncStorage } from 'react-native';

function setTokenToStorage(token) {
  try {
    AsyncStorage.setItem('@Storiqa:token', token);
  } catch (error) {
    console.log('- utils setTokenToStorage error: ', error);
  }
}

function removeTokenFromStorage() {
  try {
    AsyncStorage.removeItem('@Storiqa:token');
  } catch (error) {
    console.log('- utils removeTokenFromStorage error: ', error);
  }
}

// validations
function emailValidation(str: string): boolean {
  return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(str);
}

function nameValidation(str: string): boolean {
  return /^[\p{L}'][ \p{L}'-]*[\p{L}]$/u.test(str);
}

function phoneValidation(str: string): boolean {
  // return /^((\+[1-9]?[1-9])+\s+\(+(([0-9]){3})+\)+\s+([0-9]{3})+\s+([0-9]{2})+\s+([0-9]){2})$/.test(str);
  return /^([0-9]{11})$/.test(str);
}

export {
  setTokenToStorage,
  removeTokenFromStorage,
  emailValidation,
  nameValidation,
  phoneValidation,
}

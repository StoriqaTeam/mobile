// @flow
import { AsyncStorage } from 'react-native';
import R from 'ramda';


export function setTokenToStorage(token: string) {
  try {
    AsyncStorage.setItem('@Storiqa:token', token);
  } catch (error) {
    console.log('- utils setTokenToStorage error: ', error);
  }
}

export function removeTokenFromStorage() {
  try {
    AsyncStorage.removeItem('@Storiqa:token');
  } catch (error) {
    console.log('- utils removeTokenFromStorage error: ', error);
  }
}

// VALIDATION
// Predicates
export const isLengthEqual = (len: number) => (b: string) => R.length(b) === len;
export const isNumber = (value: any) => /^\d+$/.test(value);
export const isNotEmpty = (val: any) => {
  return !!val ? val.length > 0 : false;
};

// Messages
export const lengthMsg = (field: string, len: number) => `${field} length of ${len} is required`;
export const emptyMsg = (field: string) => `${field} can not be empty`;
export const numberOnlyMsg = (field: string) => `${field} should be a number`;

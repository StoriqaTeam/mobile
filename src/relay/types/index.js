import { MALE, FEMALE, UNDEFINED } from '../../constants';


export type UserType = {
  id: string,
  email: ?string,
  phone: ?string,
  isActive: boolean,
  firstName: ?string,
  lastName: ?string,
  middleName: ?string,
  gender: ?MALE | ?FEMALE | ?UNDEFINED,
  birthdate: ?string,
}


export type StoreType = {
  id: string,
  rowId: string,
  email: ?string,
  phone: ?string,
  isActive: boolean,
  firstName: ?string,
  lastName: ?string,
  middleName: ?string,
  gender: ?MALE | ?FEMALE | ?UNDEFINED,
  birthdate: ?string,
}
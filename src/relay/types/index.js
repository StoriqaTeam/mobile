import { MALE, FEMALE, UNDEFINED } from '../../constants';


export type UserType = {
  id: string,
  email: string,
  phone: ?string,
  firstName: ?string,
  lastName: ?string,
  middleName: ?string,
  gender: ?MALE | ?FEMALE | ?UNDEFINED,
  birthdate: ?string,
}

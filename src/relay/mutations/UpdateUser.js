import { graphql, commitMutation } from 'react-relay';
import type { Environment } from 'relay-runtime';
import { MALE, FEMALE, UNDEFINED } from '../../constants';


type MutationType = {
  variables: {
    id: string,
    email: string,
    phone: ?string,
    firstName: ?string,
    lastName: ?string,
    middleName: ?string,
    gender: ?MALE | ?FEMALE | ?UNDEFINED,
    birthdate: ?string,
    // input: {
    //   id: string,
    //   email: string,
    //   phone: ?string,
    //   firstName: ?string,
    //   lastName: ?string,
    //   middleName: ?string,
    //   gender: ?MALE | ?FEMALE | ?UNDEFINED,
    //   birthdate: ?string,
    // },
  },
  environment: Environment,
  onCompleted: ?(response: ?Object, errors: ?Array<Error>) => void,
  onError: ?(error: Error) => void,
}

const mutation = graphql`
  mutation UpdateUser_version_Mutation(
    $id: ID!,
    $email: String!,
    $phone: String,
    $firstName: String,
    $lastName: String,
    $middleName: String,
    $gender: Gender,
    $birthdate: String
  ) {
    updateUser(
      id: $id,
      email: $email,
      phone: $phone,
      firstName: $firstName,
      lastName: $lastName,
      middleName: $middleName,
      gender: $gender,
      birthdate: $birthdate
    ) {
      id
      email
      phone
      firstName
      lastName
      middleName
      gender
      birthdate
    }
  }
`;

export default ({
  environment,
  variables,
  onCompleted,
  onError,
}: MutationType) => commitMutation(environment, {
  mutation,
  variables,
  onCompleted,
  onError,
});

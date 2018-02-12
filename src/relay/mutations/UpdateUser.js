import { graphql, commitMutation } from 'react-relay';
import type { Environment } from 'relay-runtime';
import { UserType } from '../types';


type MutationType = {
  variables: {
    input: UserType & {
      clientMutationId: string,
    },
  },
  environment: Environment,
  onCompleted: ?(response: ?Object, errors: ?Array<Error>) => void,
  onError: ?(error: Error) => void,
}

// const mutation = graphql`
//   mutation UpdateUser_version_Mutation(
//     $id: ID!,
//     $email: String!,
//     $phone: String,
//     $firstName: String,
//     $lastName: String,
//     $middleName: String,
//     $gender: Gender,
//     $birthdate: String
//   ) {
//     updateUser(
//       id: $id,
//       email: $email,
//       phone: $phone,
//       firstName: $firstName,
//       lastName: $lastName,
//       middleName: $middleName,
//       gender: $gender,
//       birthdate: $birthdate
//     ) {
//       id
//       email
//       phone
//       firstName
//       lastName
//       middleName
//       gender
//       birthdate
//     }
//   }
// `;
const mutation = graphql`
  mutation UpdateUser_version_Mutation($input: UpdateUserInput!) {
    updateUser(input: $input) {
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

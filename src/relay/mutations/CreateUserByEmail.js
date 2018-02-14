import { graphql, commitMutation } from 'react-relay';
import type { Environment } from 'relay-runtime';


type MutationType = {
  variables: {
    input: {
      clientMutationId: string,
      email: string,
      password: string,
    }
  },
  environment: Environment,
  onCompleted: ?(response: ?Object, errors: ?Array<Error>) => void,
  onError: ?(error: Error) => void,
}

const mutation = graphql`
  mutation CreateUserByEmail_version_Mutation(
    $inputCreateUser: CreateUserInput!,
    $inputJWTEmail: CreateJWTEmailInput!
  ) {
    createUser(input: $inputCreateUser) {
      id
    }
    getJWTByEmail(input: $inputJWTEmail) {
      token
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

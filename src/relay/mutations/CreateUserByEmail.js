import { graphql, commitMutation } from 'react-relay';
import type { Environment } from 'relay-runtime';


type MutationType = {
  variables: {
    email: string,
    password: string,
  },
  environment: Environment,
  onCompleted: ?(response: ?Object, errors: ?Array<Error>) => void,
  onError: ?(error: Error) => void,
}

const mutation = graphql`
  mutation CreateUserByEmail_version_Mutation($email: String!, $password: String!) {
    createUser(email: $email, password: $password) {
      id
    }
    getJWTByEmail(email: $email, password: $password) {
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

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
  mutation GetJWTByEmail_version_Mutation($email: String!, $password: String!) {
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
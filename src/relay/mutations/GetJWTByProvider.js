import { graphql, commitMutation } from 'react-relay';
import type { Environment } from 'relay-runtime';


type MutationType = {
  variables: {
    provider: 'FACEBOOK' | 'GOOGLE',
    token: string,
  },
  environment: Environment,
  onCompleted: ?(response: ?Object, errors: ?Array<Error>) => void,
  onError: ?(error: Error) => void,
}

const mutation = graphql`
  mutation GetJWTByProvider_version_Mutation($provider: Provider!, $token: String!) {
    getJWTByProvider(provider: $provider, token: $token) {
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

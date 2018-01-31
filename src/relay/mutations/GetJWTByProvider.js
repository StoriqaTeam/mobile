import { graphql, commitMutation } from 'react-relay';
import type { Environment } from 'relay-runtime';


type MutationType = {
  provider: 'FACEBOOK' | 'GOOGLE',
  token: string,
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
  provider,
  token,
  onCompleted,
  onError,
}: MutationType) => commitMutation(environment, {
  mutation,
  variables: {
    provider,
    token,
  },
  onCompleted,
  onError,
});

import { Environment, Network, RecordSource, Store } from 'relay-runtime';
import { AsyncStorage } from 'react-native';

function fetchQuery(operation, variables) {
  return AsyncStorage.getItem('@Storiqa:token').then((token) => {
    const fetchVar = fetch('http://localhost:8000/graphql', { // eslint-disable-line
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      credentials: 'include',
      body: JSON.stringify({
        query: operation.text, // GraphQL text from input
        variables,
      }),
    }).then(response => response.json());
    return fetchVar;
  });
}

export default new Environment({
  network: Network.create(fetchQuery),
  store: new Store(new RecordSource()),
});

import { Environment, Network, RecordSource, Store } from 'relay-runtime';
import { AsyncStorage, Platform } from 'react-native';

const host = Platform.OS === 'ios' ? 'http://localhost:8000' : 'http://1307d2b9.ngrok.io';
const url = `${host}/graphql`;


function fetchQuery(operation, variables) {
  return AsyncStorage.getItem('@Storiqa:token').then((token) => {
    console.log('*** fetchQuery token: ', token);
    console.log('*** fetchQuery variables: ', variables);
    const fetchVar = fetch(url, { // eslint-disable-line
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
    fetchVar.then(result => console.log('*** fetchQuery result: ', result));
    return fetchVar;
  });
}

export default new Environment({
  network: Network.create(fetchQuery),
  store: new Store(new RecordSource()),
});

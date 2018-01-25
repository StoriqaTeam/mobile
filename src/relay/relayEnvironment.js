import { Environment, Network, RecordSource, Store } from 'relay-runtime';
import { AsyncStorage } from 'react-native';

function fetchQuery(operation, variables) {
  return AsyncStorage.getItem('@Storiqa:token').then((token) => {
    console.log('*** fetch token: ', token);
    const fetchVar = fetch('http://localhost:8000/graphql', { // eslint-disable-line
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${token}`,
        // Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2VtYWlsIjoiY29yZW9ma2luZ0B0ZXN0LnJ1In0.3ZzFZjFWbHg3FW6PWjb3K44MiwEtFfWYDmOTixsmEVE`,
      },
      credentials: 'include',
      body: JSON.stringify({
        query: operation.text, // GraphQL text from input
        variables,
      }),
    }).then(response => response.json());
    return fetchVar;
  });

  // return fetch('http://localhost:8000/graphql', { // eslint-disable-line
  //   method: 'POST',
  //   headers: {
  //     'content-type': 'application/json',
  //     Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2VtYWlsIjoidGVzdDNAdGVzdC5ydSJ9.HNH0WLmnlJOVUzx0Eqt47aUOCtE55D8hwdN1gU0Waao`,
  //   },
  //   credentials: 'include',
  //   body: JSON.stringify({
  //     query: operation.text, // GraphQL text from input
  //     variables,
  //   }),
  // }).then(response => response.json());

  // console.log('***** fetchVar: ', fetchVar);
}

export default new Environment({
  network: Network.create(fetchQuery),
  store: new Store(new RecordSource()),
});

// @flow
import React from 'react';
import { Text } from 'react-native';
import { QueryRenderer, graphql } from 'react-relay';
import { Actions } from 'react-native-router-flux';
import R from 'ramda';
import { StoriqaIcon } from '../../components/Icons';
import relayEnvironment from '../../relay/relayEnvironment';
import { UserType } from '../../relay/types';
import Stores from './Stores';


type PropsType = {
  props: {
    me?: UserType,
  },
}

const query = graphql`
  query StoresContainer_version_Query {
    me {
      stores {
        edges {
          node {
            id
            name
            isActive
            currencyId
            shortDescription
            longDescription
            slug
            cover
            logo
            phone
            email
            address
          }
        }
      }
    }
  }
`;

const StoresContainer = () => (
  <QueryRenderer
    environment={relayEnvironment}
    query={query}
    render={(data: PropsType) => {
      const edges = R.pathOr(null, ['props', 'me', 'stores', 'edges'], data);
      if (!edges) return null;
      const stores = edges.map(obj => obj.node);
      return <Stores stores={stores} />;
    }}
  />
);

StoresContainer.navigationOptions = () => ({
  headerRight: <StoriqaIcon
    name="person"
    size={20}
    color="#505050"
    onPress={Actions.profile}
    style={{ marginRight: 8 }}
  />,
});

export default StoresContainer;

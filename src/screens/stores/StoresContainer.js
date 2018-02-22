// @flow
import React from 'react';
import { QueryRenderer, graphql } from 'react-relay';
import { Actions } from 'react-native-router-flux';
import R from 'ramda';
import { StoriqaIcon } from '../../components/Icons';
import relayEnvironment from '../../relay/relayEnvironment';
import { UserType } from '../../relay/types';
import StoresScreen from './StoresScreen';


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
      if (!edges) return <StoresScreen stores={null} />;
      const stores = edges.map(obj => obj.node);
      return <StoresScreen stores={stores} />;
    }}
  />
);

export default StoresContainer;

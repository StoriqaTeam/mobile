// @flow
import React from 'react';
import { QueryRenderer, graphql } from 'react-relay';
import { Actions } from 'react-native-router-flux';
import { StoriqaIcon } from '../../components/Icons';
import relayEnvironment from '../../relay/relayEnvironment';
import { UserType } from '../../relay/types';
import Stores from './Stores';

const stores = [
  {
    id: '1',
    rowId: 1,
    name: 'store 1',
    slug: 'store-1',
    isActive: false,
    currencyId: 1,
    shortDescription: 'Store 1 short description',
    longDescription: 'Store 1 long description',
    cover: 'https://vignette.wikia.nocookie.net/animal-jam-clans-1/images/0/0e/Lion_leap.png',
    logo: '',
    phone: '+78889990099',
    email: 'test@test.ru',
    address: 'Lenina street 1',
    facebookUrl: '',
  },
  {
    id: '2',
    rowId: 2,
    name: 'store 2',
    slug: 'store-2',
    isActive: true,
    currencyId: 1,
    shortDescription: 'Store 2 short description',
    longDescription: 'Store 2 long description',
    cover: 'https://vignette.wikia.nocookie.net/animal-jam-clans-1/images/0/0e/Lion_leap.png',
    logo: '',
    phone: '+78889990099',
    email: 'test@test.ru',
    address: 'Lenina street 1',
    facebookUrl: '',
  },
  {
    id: '3',
    rowId: 3,
    name: 'store 3',
    slug: 'store-3',
    isActive: true,
    currencyId: 1,
    shortDescription: 'Store 3 short description',
    longDescription: 'Store 3 long description',
    cover: 'https://vignette.wikia.nocookie.net/animal-jam-clans-1/images/0/0e/Lion_leap.png',
    logo: '',
    phone: '+78889990099',
    email: 'test@test.ru',
    address: 'Lenina street 1',
    facebookUrl: '',
  },
  {
    id: '4',
    rowId: 4,
    name: 'store 4',
    slug: 'store-4',
    isActive: true,
    currencyId: 1,
    shortDescription: 'Store 4 short description',
    longDescription: 'Store 4 long description',
    cover: 'https://vignette.wikia.nocookie.net/animal-jam-clans-1/images/0/0e/Lion_leap.png',
    logo: '',
    phone: '+78889990099',
    email: 'test@test.ru',
    address: 'Lenina street 1',
    facebookUrl: '',
  },
];

type PropsType = {
  props: {
    me?: UserType,
  },
}

const query = graphql`
  query StoresContainer_version_Query {
    me {
      id
    }
  }
`;

const StoresContainer = () => (
  <QueryRenderer
    environment={relayEnvironment}
    query={query}
    render={(data: PropsType) => {
      console.log('*** StoresContainer data: ', data);
      if (data.props && data.props.me) return <Stores stores={stores} />;
      return null;
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

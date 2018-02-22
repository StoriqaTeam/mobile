// @flow
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { QueryRenderer, graphql } from 'react-relay';
import R from 'ramda';
import appStore from '@appStore'; // eslint-disable-line
import relayEnvironment from '../../relay/relayEnvironment';
import { UserType } from '../../relay/types';
import Profile from './Profile';


type PropsType = {
  props: {
    me?: UserType,
  },
}

const query = graphql`
  query ProfileContainer_version_Query {
    me {
      id
      email
      phone
      isActive
      firstName
      middleName
      lastName
      gender
      birthdate
    }
  }
`;

const ProfileContainer = () => (
  <QueryRenderer
    environment={relayEnvironment}
    query={query}
    render={(data: PropsType) => {
      const me = R.pathOr(null, ['props', 'me'], data);
      if (me) return <Profile user={me} />;
      return (
        <View>
          <Text>No user data</Text>
        </View>
      );
    }}
  />
);

ProfileContainer.navigationOptions = () => ({
  headerRight: (
    <TouchableOpacity onPress={appStore.logout}>
      <Text>Logout</Text>
    </TouchableOpacity>
  ),
});

export default ProfileContainer;

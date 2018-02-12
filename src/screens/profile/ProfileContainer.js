// @flow
import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { QueryRenderer, graphql } from 'react-relay';
import { Actions } from 'react-native-router-flux';
import relayEnvironment from '../../relay/relayEnvironment';
import { UserType } from '../../relay/types';
import Profile from './Profile';
import { removeTokenFromStorage } from '../../utils';


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
      if (data.props && data.props.me) return <Profile user={data.props.me} />;
      return null;
    }}
  />
);

ProfileContainer.navigationOptions = () => ({
  headerRight: (
    <TouchableOpacity onPress={logout}>
      <Text>Logout</Text>
    </TouchableOpacity>
  ),
});

function logout() {
  removeTokenFromStorage();
  Actions.root();
}

export default ProfileContainer;

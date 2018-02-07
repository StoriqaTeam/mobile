// @flow
import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { QueryRenderer, graphql } from 'react-relay';
import { Actions } from 'react-native-router-flux';
import relayEnvironment from '../../relay/relayEnvironment';
import { UserType } from '../../relay/types';
import Profile from './Profile';
import { removeTokenFromStorage } from '../../utils';


type ProfilePropsType = {
  me?: UserType,
}

const ProfileContainer = () => (
  <QueryRenderer
    environment={relayEnvironment}
    query={graphql`
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
    `}
    render={({ props }: ProfilePropsType) => {
      if (props) return <Profile user={props.me} />;
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

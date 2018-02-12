// @flow
import React from 'react';
import { QueryRenderer, graphql } from 'react-relay';
import relayEnvironment from '../../relay/relayEnvironment';
import { UserType } from '../../relay/types';
import Profile from './Profile';


type ProfilePropsType = {
  viewer?: {
    currentUser?: UserType,
  }
}

const ProfileContainer = () => (
  <QueryRenderer
    environment={relayEnvironment}
    query={graphql`
      query Profile_version_Query {
        viewer {
          currentUser {
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
      }
    `}
    render={({ props }: ProfilePropsType) => {
      if (props && props.viewer) return <Profile user={props.viewer.currentUser} />;
      return null;
    }}
  />
);

export default ProfileContainer;

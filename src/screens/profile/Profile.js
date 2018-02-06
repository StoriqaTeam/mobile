// @flow

import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { QueryRenderer, graphql } from 'react-relay';
import { Actions } from 'react-native-router-flux';
import relayEnvironment from '../../relay/relayEnvironment';
import styles from './styles';
import Button from '../../components/Buttons';
import MainLayout from '../../layouts/MainLayout';
import utils from '../../utils';
import ProfileForm from './ProfileForm';


const Profile = () => (
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
    render={({ props }) => (
      <MainLayout
        style={{
          backgroundColor: '#fff',
        }}
      >
        <View style={styles.wrapper}>
          <View style={styles.contentWrapper}>
            <View style={styles.content}>
              <Text style={{ fontSize: 25 }}>Profile</Text>
              <View style={styles.formContainer}>
                {(props && props.viewer) && <ProfileForm data={props.viewer.currentUser} />}
              </View>
            </View>
            <View style={styles.bottomContent}>
              <Button onPress={Actions.pop} title="Cancel" />
            </View>
          </View>
        </View>
      </MainLayout>
    )}
  />
);

Profile.navigationOptions = () => ({
  headerRight: (
    <TouchableOpacity onPress={logout}>
      <Text>Logout</Text>
    </TouchableOpacity>
  ),
});

function logout() {
  utils.removeTokenFromStorage();
  Actions.root();
}


export default Profile;

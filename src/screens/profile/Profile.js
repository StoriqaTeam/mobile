// @flow
import React from 'react';
import { ScrollView, View, Text } from 'react-native';
import R from 'ramda';
import appStore from '@appStore'; // eslint-disable-line
import styles from './styles';
import MainLayout from '../../layouts/MainLayout';
import ProfileForm from './ProfileForm';
import { UserType } from '../../relay/types';


const handleSaveForm = (user) => {
  const userEmailExcluded = R.dissoc('email', user);
  const input = {
    clientMutationId: '',
    ...userEmailExcluded,
  };
  appStore.updateUser({ input });
};


const Profile = ({ user }: UserType) => (
  <MainLayout
    style={{
      backgroundColor: '#fff',
    }}
  >
    <View style={styles.wrapper}>
      <View style={styles.contentWrapper}>
        <ScrollView contentContainerStyle={styles.content}>
          <Text style={{ fontSize: 25 }}>Profile</Text>
          <View style={styles.formContainer}>
            <ProfileForm user={user} saveFormHandler={handleSaveForm} />
          </View>
        </ScrollView>
      </View>
    </View>
  </MainLayout>
);

export default Profile;

// @flow
import React from 'react';
import { ScrollView, View, Text } from 'react-native';
import { Actions } from 'react-native-router-flux';
import styles from './styles';
import Button from '../../components/Buttons';
import MainLayout from '../../layouts/MainLayout';
import ProfileForm from './ProfileForm';
import { UserType } from '../../relay/types';


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
            <ProfileForm user={user} />
          </View>
        </ScrollView>
      </View>
    </View>
  </MainLayout>
);

export default Profile;

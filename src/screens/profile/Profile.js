// @flow
import React from 'react';
import { ScrollView, View, Text } from 'react-native';
import styles from './styles';
import MainLayout from '../../layouts/MainLayout';
import ProfileForm from './ProfileForm';
import { UserType } from '../../relay/types';
import Button from '../../components/Buttons';


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
        <View style={styles.bottomContent}>
          <Button onPress={console.log} title="Save button" />
        </View>
      </View>
    </View>
  </MainLayout>
);

export default Profile;

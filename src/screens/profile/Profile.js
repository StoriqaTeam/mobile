// @flow
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';
import styles from './styles';
import Button from '../../components/Buttons';
import MainLayout from '../../layouts/MainLayout';
import { removeTokenFromStorage } from '../../utils';
import ProfileForm from './ProfileForm';
import { UserType } from './ProfileContainer';


const Profile = ({ user }: UserType) => {
  if (user) {
    return (
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
                <ProfileForm user={user} />
              </View>
            </View>
            <View style={styles.bottomContent}>
              <Button onPress={Actions.pop} title="Cancel" />
            </View>
          </View>
        </View>
      </MainLayout>
    );
  }
  return null;
};

Profile.navigationOptions = () => ({
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


export default Profile;

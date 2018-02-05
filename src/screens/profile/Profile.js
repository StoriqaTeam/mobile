// @flow

import React from 'react';
import { View, Text } from 'react-native';
import { QueryRenderer, graphql } from 'react-relay';
import { Actions } from 'react-native-router-flux';
// import { pathOr } from 'ramda';
import relayEnvironment from '../../relay/relayEnvironment';
import styles from './styles';
import Button from '../../components/Buttons';
import MainLayout from '../../layouts/MainLayout';
// import { UpdateUserMutation } from '../../relay/mutations';
// import utils from '../../utils';
import ProfileForm from './ProfileForm';


type StateType = {
  refresh: boolean,
}

export default class ProfileScreen extends React.Component<{}, StateType> {
  constructor() {
    super();
    this.state = {
      refresh: false,
    };
  }

  componentWillReceiveProps(newProps) {
    console.log('*** Profile componentWillReceiveProps newProps: ', newProps);
  }

  // handleSaveField = (name) => {
  //   this.setState({
  //     editingFieldName: '',
  //   });
  //   // MutateUserFieldByName(name);
  // }

  // handleEditField = (editingFieldName) => {
  //   this.setState({
  //     editingFieldName,
  //   });
  // }

  // handleChangeFieldByName = (value) => {
  //   this.setState({
  //     editingFieldValue: value,
  //   });
  // }

  render() {
    // const { editingFieldName } = this.state;
    console.log('*** Profile render()');
    return (
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
          {console.log('**** Profile props: ', props)}
            <View style={styles.wrapper}>
              <View style={styles.contentWrapper}>
                <View style={styles.content}>
                  <Text style={{ fontSize: 25 }}>Profile</Text>
                  <View style={styles.formContainer}>

                    {(props && props.viewer) &&
                      <ProfileForm data={props.viewer.currentUser} />
                    }


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
  }
}

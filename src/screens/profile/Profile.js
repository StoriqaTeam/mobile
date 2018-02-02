// @flow

import React from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { QueryRenderer, graphql } from 'react-relay';
import { Actions } from 'react-native-router-flux';
// import { pathOr } from 'ramda';
import relayEnvironment from '../../relay/relayEnvironment';
import styles from './styles';
import Button from '../../components/Buttons';
import MainLayout from '../../layouts/MainLayout';
import { MutateUserFieldByName } from '../../relay/mutations';
// import utils from '../../utils';

const EMAIL_FIELD = 'email';
const PHONE_FIELD = 'phone';

type StateType = {
  editingFieldName: string,
  editingFieldValue: string,
}

export default class ProfileScreen extends React.Component<{}, StateType> {
  constructor() {
    super();
    this.state = {
      editingFieldName: '',
      editingFieldValue: '',
    };
  }

  handleSaveField = (name) => {
    this.setState({
      editingFieldName: '',
    });
    MutateUserFieldByName(name);
  }

  handleEditField = (editingFieldName) => {
    this.setState({
      editingFieldName,
    });
  }

  handleChangeFieldByName = (value) => {
    this.setState({
      editingFieldValue: value,
    });
  }

  render() {
    const { editingFieldName } = this.state;
    console.log('editing field: ', editingFieldName);
    return (
      <QueryRenderer
        environment={relayEnvironment}
        query={graphql`
          query Profile_version_Query {
            viewer {
              currentUser {
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
          {console.log('props: ', props)}
            <View style={styles.wrapper}>
              <View style={styles.contentWrapper}>
                <View style={styles.content}>
                  <Text style={{ fontSize: 25 }}>Profile</Text>
                  <View style={styles.formContainer}>

                    <View>
                      <TouchableOpacity
                        onPress={() => this.handleEditField(EMAIL_FIELD)}
                      >
                        <Text>Edit</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => this.handleSaveField(EMAIL_FIELD)}
                      >
                        <Text>Save</Text>
                      </TouchableOpacity>
                      {editingFieldName === EMAIL_FIELD ?
                        <TextInput
                          onChangeText={text => this.handleChangeFieldByName(text)}
                          placeholder="email"
                          style={styles.textInput}
                        />
                        :
                        <View
                          style={{
                            height: 50,
                            justifyContent: 'center',
                          }}
                        >
                          <Text style={{ fontSize: 16 }}>{props && props.viewer.currentUser.email}</Text>
                        </View>
                      }
                    </View>

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

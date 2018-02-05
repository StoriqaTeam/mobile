// @flow

import React from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { QueryRenderer, graphql } from 'react-relay';
// import { Actions } from 'react-native-router-flux';
// import { pathOr } from 'ramda';
import relayEnvironment from '../../relay/relayEnvironment';
import styles from './styles';
import Button from '../../components/Buttons';
// import MainLayout from '../../layouts/MainLayout';
import { UpdateUserMutation } from '../../relay/mutations';
// import utils from '../../utils';
import { MALE, FEMALE, UNDEFINED } from '../../constants';

type FormPropsType = {
  data: ?{
    id: string,
    email: string,
    phone: ?string,
    firstName: ?string,
    lastName: ?string,
    middleName: ?string,
    gender: ?MALE | ?FEMALE | ?UNDEFINED,
    birthdate: ?string,
  }
}

type FormStateType = {
  data: ?{
    id: string,
    email: string,
    phone: ?string,
    firstName: ?string,
    lastName: ?string,
    middleName: ?string,
    gender: ?MALE | ?FEMALE | ?UNDEFINED,
    birthdate: ?string,
  }
}


export default class ProfileForm extends React.Component<FormPropsType, FormStateType> {
  constructor(props) {
    super(props);
    this.state = {
      data: props.data,
    }
  }

  handleChangeTextField = (fieldName: string, value: ?string) => {
    console.log('**** handleChangeTextField fieldName, value: ', fieldName, value);
    this.setState({
      data: {
        ...this.state.data,
        [fieldName]: value,
      },
    });
  }

  handleSaveForm = () => {
    const { data } = this.state;
    if (data) {
      // const {
      //   id, email, phone, firstName, lastName, middleName, gender, birthdate,
      // } = data;
      // UpdateUserMutation(id, email, phone, firstName, lastName, middleName, gender, birthdate);
      // UpdateUserMutation(Object.keys(data).map(key => data[key]));
      UpdateUserMutation({
        variables: {
          ...data,
        },
        environment: relayEnvironment,
        onCompleted: (response: ?Object) => {
          console.log('*** Update user on complete: ', response);
          // const userToken = pathOr(null, ['getJWTByEmail', 'token'], response);
          // utils.setTokenToStorage(userToken);
          // Actions.root();
        },
        onError: (error: Error) => {
          console.log('*** getting user token error: ', error);
        },
      });
    }
  }

  render() {
    if (!this.props || !this.props.data) return null;
    // const { data } = this.props;
    const { data } = this.state;
    console.log('**** ProfileForm state: ', data);
    return (
      <View>

        <View>
          <Text>{data.email}</Text>
        </View>

        <View>
          <TextInput
            onChangeText={text => this.handleChangeTextField('phone', text)}
            placeholder="phone"
            style={styles.textInput}
          />
        </View>

        <View>
          <TextInput
            onChangeText={text => this.handleChangeTextField('firstName', text)}
            placeholder="firstName"
            style={styles.textInput}
          />
        </View>

        <View>
          <TextInput
            onChangeText={text => this.handleChangeTextField('lastName', text)}
            placeholder="lastName"
            style={styles.textInput}
          />
        </View>

        <View>
          <TextInput
            onChangeText={text => this.handleChangeTextField('middleName', text)}
            placeholder="middleName"
            style={styles.textInput}
          />
        </View>

        {/* <View>
          <TextInput
            onChangeText={text => this.handleChangeTextField('gender', text)}
            placeholder="middleName"
            style={styles.textInput}
          />
        </View> */}
        <Button onPress={this.handleSaveForm} title="save form" />

      </View>
    );
  }
}
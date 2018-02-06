// @flow

import React from 'react';
import { View, Text, TextInput } from 'react-native';
import relayEnvironment from '../../relay/relayEnvironment';
import styles from './styles';
import Button from '../../components/Buttons';
import { UpdateUserMutation } from '../../relay/mutations';
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
    };
  }

  handleChangeTextField = (fieldName: string, value: ?string) => {
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
      UpdateUserMutation({
        variables: {
          ...data,
        },
        environment: relayEnvironment,
      });
    }
  }

  render() {
    if (!this.props || !this.props.data) return null;
    console.log('*** Profile is load');
    const { data } = this.state;
    return (
      <View>

        <View>
          <Text>{data.email}</Text>
        </View>

        <View>
          <TextInput
            onChangeText={text => this.handleChangeTextField('phone', text)}
            keyboardType="phone-pad"
            returnKeyType="done"
            value={data.phone}
            placeholder="Phone"
            style={styles.textInput}
          />
        </View>

        <View>
          <TextInput
            onChangeText={text => this.handleChangeTextField('firstName', text)}
            value={data.firstName}
            placeholder="First Name"
            style={styles.textInput}
          />
        </View>

        <View>
          <TextInput
            onChangeText={text => this.handleChangeTextField('lastName', text)}
            value={data.lastName}
            placeholder="Last name"
            style={styles.textInput}
          />
        </View>

        <View>
          <TextInput
            onChangeText={text => this.handleChangeTextField('middleName', text)}
            value={data.middleName}
            placeholder="Middle name"
            style={styles.textInput}
          />
        </View>

        <Button onPress={this.handleSaveForm} title="save form" />

      </View>
    );
  }
}
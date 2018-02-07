// @flow

import React from 'react';
import { View, Text, TextInput } from 'react-native';
import TextInputMask from 'react-native-text-input-mask';
import R from 'ramda';
import relayEnvironment from '../../relay/relayEnvironment';
import styles from './styles';
import Button from '../../components/Buttons';
import { UpdateUserMutation } from '../../relay/mutations';
import { phoneValidation } from '../../utils';
import ValidatedField from '../../components/Fields';
import { UserType } from '../../relay/types';


type FormPropsType = {
  user?: UserType,
}

type FormStateType = {
  user?: UserType,
  validation: {
    phone: ?boolean,
  },
}


export default class ProfileForm extends React.Component<FormPropsType, FormStateType> {
  constructor(props) {
    super(props);
    this.state = {
      user: props.user,
    };
  }

  handleChangeTextField = (fieldName: string, value: ?string, validation?: (str: string) => boolean) => {
    this.setState({
      user: {
        ...this.state.user,
        [fieldName]: value,
      },
      validation: {
        ...this.state.validation,
        [fieldName]: validation ? validation(value) : true,
      },
    });
  }

  handleSaveForm = () => {
    console.log('*** handleSaveForm');
    const { user } = this.state;
    const userEmailExcluded = R.dissoc('email', user);
    if (user) {
      UpdateUserMutation({
        variables: {
          input: {
            clientMutationId: '',
            ...userEmailExcluded,
          },
        },
        environment: relayEnvironment,
      });
    }
  }

  handleCheckValidation = () => {
    const { validation } = this.state;
    // проверяем validation объект на false значения ключей
    if (validation) {
      return Object.keys(validation)
        .filter(key => !validation[key])
        .length === 0;
    }
    return false;
  }

  handleCheckChanges = () => R.equals(this.state.user, this.props.user);

  render() {
    if (!this.props || !this.props.user) return null;
    const { user, validation } = this.state;
    console.log('*** validation: ', validation);
    return (
      <View>

        <View>
          <Text>{user.email}</Text>
        </View>

        <ValidatedField
          component={
            <TextInputMask
              onChangeText={(formated, extracted) => this.handleChangeTextField('phone', extracted, phoneValidation)}
              mask={"+[0] ([000]) [000] [00] [00]"}
              keyboardType="phone-pad"
              returnKeyType="done"
              value={user.phone}
              placeholder="Phone"
              style={styles.textInput}
            />
          }
          errorMessage="Fail"
          okMessage="Ok"
          disabled={!validation || !('phone' in validation)}
          isValid={validation && validation.phone}
        />

        <View style={styles.textInputWrapper}>
          <TextInput
            onChangeText={text => this.handleChangeTextField('firstName', text)}
            value={user.firstName}
            placeholder="First Name"
            style={styles.textInput}
          />
        </View>

        <View style={styles.textInputWrapper}>
          <TextInput
            onChangeText={text => this.handleChangeTextField('lastName', text)}
            value={user.lastName}
            placeholder="Last name"
            style={styles.textInput}
          />
        </View>

        <View style={styles.textInputWrapper}>
          <TextInput
            onChangeText={text => this.handleChangeTextField('middleName', text)}
            value={user.middleName}
            placeholder="Middle name"
            style={styles.textInput}
          />
        </View>

        <Button
          onPress={this.handleSaveForm}
          disabled={this.handleCheckChanges() || !this.handleCheckValidation()}
          title="save form"
        />

      </View>
    );
  }
}

// @flow

import React from 'react';
import { View, Text, TextInput, DatePickerIOS, Picker } from 'react-native';
import TextInputMask from 'react-native-text-input-mask';
import R from 'ramda';
import relayEnvironment from '../../relay/relayEnvironment';
import styles from './styles';
import Button from '../../components/Buttons';
import DatePicker from '../../components/DatePicker';
import { UpdateUserMutation } from '../../relay/mutations';
import { phoneValidation } from '../../utils';
import ValidatedField from '../../components/Fields';
import { UserType } from '../../relay/types';
import { MALE, FEMALE, UNDEFINED } from '../../constants';


const genderList = [MALE, FEMALE, UNDEFINED];

type FormPropsType = {
  user: UserType,
}

type FormStateType = {
  user: UserType,
  validation: {
    phone: boolean,
  },
}


export default class ProfileForm extends React.Component<FormPropsType, FormStateType> {
  constructor(props: FormPropsType) {
    super(props);
    this.state = {
      user: props.user,
      validation: {
        phone: false,
      },
    };
  }

  handleChangeTextField = (fieldName: string, value: string, validation?: (str: string) => boolean) => {
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
    const { user } = this.state;
    const userEmailExcluded = R.dissoc('email', user);
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

  handleChangeGender = (itemValue, itemIndex) => {
    this.setState({
      user: {
        ...this.state.user,
        gender: itemValue,
      },
    });
  }

  handleChangeDate = (value) => {
    this.setState({
      user: {
        ...this.state.user,
        birthdate: value.toISOString(),
      },
    });
  }

  render() {
    const { user, validation } = this.state;
    const isFormChanged = !R.equals(user, this.props.user);
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
          isChanged={user.phone !== this.props.user.phone}
          isValid={!!validation && !!validation.phone}
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
        <View style={{}}>
          <Text>Gender</Text>
          <Picker
            selectedValue={user.gender}
            onValueChange={this.handleChangeGender}
          >
            {genderList.map((g, index) => <Picker.Item key={g} label={g} value={g} />)}
          </Picker>
        </View>
        <View style={{}}>
          <Text>Birth date</Text>
          <DatePicker
            date={user.birthdate}
            onChange={this.handleChangeDate}
          />
        </View>
        <Button
          onPress={this.handleSaveForm}
          disabled={!isFormChanged || !this.handleCheckValidation()}
          title="save form"
        />
      </View>
    );
  }
}

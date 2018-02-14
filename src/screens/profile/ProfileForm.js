// @flow

import React from 'react';
import { Switch, View, Text, TextInput, Picker } from 'react-native';
import TextInputMask from 'react-native-text-input-mask';
import R from 'ramda';
import spected from 'spected';
import styles from './styles';
import Button from '../../components/Buttons';
import DatePicker from '../../components/DatePicker';
import { UserType } from '../../relay/types';
import { MALE, FEMALE, UNDEFINED } from '../../constants';
import { isLengthEqual, isNumber, isNotEmpty, lengthMsg, emptyMsg, numberOnlyMsg } from '../../utils';


const genderList = [MALE, FEMALE, UNDEFINED];

// validation Rules
const validationRules = {
  phone: [
    [isLengthEqual(11), lengthMsg('Phone', 11)],
    [isNumber, numberOnlyMsg('Phone')],
    [isNotEmpty, emptyMsg('Phone')],
  ],
  firstName: [
    [isNotEmpty, emptyMsg('First Name')],
  ],
  lastName: [
    [isNotEmpty, emptyMsg('Last Name')],
  ],
  middleName: [
    [isNotEmpty, emptyMsg('Middle Name')],
  ],
};

type FormPropsType = {
  user: UserType,
  saveFormHandler: (user: UserType) => void,
}

type FormStateType = {
  user: UserType,
  validation: any,
}


export default class ProfileForm extends React.Component<FormPropsType, FormStateType> {
  constructor(props: FormPropsType) {
    super(props);
    this.state = {
      user: props.user,
      validation: {},
    };
  }

  // проверяем validation объект на наличие полей с ошибками
  isFormValid = () => {
    const { validation } = this.state;
    const pred = value => !!value.length;
    const errorFields = R.filter(pred, validation);
    const result = R.isEmpty(errorFields);
    // console.log('*** isFormValid');
    return result;
  }

  // проверяем изменились ли данные в форме
  isFormChanged = () => !R.equals(this.state.user, this.props.user);

  // Check volidation for all user object
  handleValidateForm = (data: UserType) => {
    const validation = spected(validationRules, data);
    this.setState({
      validation,
    });
  }

  // Common method for update data
  handleChangeField = (fieldName: string, value: any) => {
    const user = {
      ...this.state.user,
      [fieldName]: value,
    };
    this.setState({ user });
    this.handleValidateForm(user);
  }

  renderError = (fieldName: string) => {
    const { validation } = this.state;
    if (!validation[fieldName] || typeof validation[fieldName] === 'boolean') return null;
    return validation[fieldName]
      .map((err, index) => <View key={`err-${fieldName}-${index}`}><Text style={{ color: 'red' }}>{err}</Text></View>);
  }

  render() {
    const { user } = this.state;
    const { saveFormHandler } = this.props;
    return (
      <View>
        <View>
          <Text>{user.email}</Text>
        </View>
        <View style={styles.textInputWrapper}>
          <Switch
            onValueChange={value => this.handleChangeField('isActive', value)}
            value={user.isActive}
          />
        </View>
        <View style={styles.textInputWrapper}>
          <TextInputMask
            onChangeText={(_, extracted) => this.handleChangeField('phone', extracted)}
            mask={"+[0] ([000]) [000] [00] [00]"}
            keyboardType="phone-pad"
            returnKeyType="done"
            value={user.phone}
            placeholder="Phone"
            style={styles.textInput}
          />
          {this.renderError('phone')}
        </View>
        <View style={styles.textInputWrapper}>
          <TextInput
            onChangeText={text => this.handleChangeField('firstName', text)}
            value={user.firstName}
            placeholder="First Name"
            style={styles.textInput}
          />
          {this.renderError('firstName')}
        </View>
        <View style={styles.textInputWrapper}>
          <TextInput
            onChangeText={text => this.handleChangeField('lastName', text)}
            value={user.lastName}
            placeholder="Last name"
            style={styles.textInput}
          />
          {this.renderError('lastName')}
        </View>
        <View style={styles.textInputWrapper}>
          <TextInput
            onChangeText={text => this.handleChangeField('middleName', text)}
            value={user.middleName}
            placeholder="Middle name"
            style={styles.textInput}
          />
          {this.renderError('middleName')}
        </View>
        <View style={{}}>
          <Text>Gender</Text>
          <Picker
            selectedValue={user.gender}
            onValueChange={value => this.handleChangeField('gender', value)}
          >
            {genderList.map((g, index) => <Picker.Item key={g} label={g} value={g} />)}
          </Picker>
          {this.renderError('gender')}
        </View>
        <View style={{}}>
          <Text>Birth date</Text>
          <DatePicker
            date={user.birthdate}
            onChange={date => this.handleChangeField('birthdate', date.toISOString())}
          />
          {this.renderError('birthdate')}
        </View>
        <Button
          onPress={() => saveFormHandler(user)}
          disabled={!this.isFormChanged() || !this.isFormValid()}
          title="save form"
        />
      </View>
    );
  }
}

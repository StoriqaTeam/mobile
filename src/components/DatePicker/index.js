// @flow

import React from 'react';
import { DatePickerAndroid, DatePickerIOS, Platform } from 'react-native';
import Button from '../Buttons';

const maxDate = new Date();
maxDate.setFullYear(maxDate.getFullYear() - 18);

type PropType = {
  date: string,
  onChange: (val: Date) => void,
}

const DPIos = ({ date, onChange }: PropType) => {
  const dateObj = new Date(date);
  return (
    <DatePickerIOS
      mode="date"
      date={dateObj}
      onDateChange={onChange}
      maximumDate={maxDate}
    />
  );
};

const DPAndroid = ({ date, onChange }: PropType) => {
  const handleOnChange = async () => {
    try {
      const {
        action,
        year,
        month,
        day,
      } = await DatePickerAndroid.open({
        date: new Date(date),
      });
      if (action !== DatePickerAndroid.dismissedAction) {
        const newDate = new Date(year, month, day + 1);
        if (newDate > maxDate) {
          console.log('only for 18 years old'); // TODO: сообщение о невозможности установить возраст менее 18 лет
        } else {
          onChange(newDate);
        }
      }
    } catch (err) {
      console.warn('Cannot open date picker', err.code, err.message);
    }
  };
  return (
    <Button title="Android Date Picker" onPress={handleOnChange} />
  );
};

export default Platform.OS === 'ios' ? DPIos : DPAndroid;

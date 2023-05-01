import React, {useState} from 'react';
import styles from './styles';
import {Pressable, Text, View} from 'react-native';
import DateTimePicker from 'react-native-modal-datetime-picker';
import moment from 'moment';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {darkColors} from '../../theme/colors';
import {scale} from '../../theme/responsive';

const DateTimePickerModal = ({value, onChange, name}) => {
  const [state, setState] = useState({
    datePickerStatus: false,
  });
  const showFromDateTimePicker = () => {
    setState(prev => ({...prev, datePickerStatus: true}));
  };

  const hideFormDateTimePicker = () => {
    setState(prev => ({...prev, datePickerStatus: false}));
  };

  const confirmFromDate = date => {
    hideFormDateTimePicker();
  };
  return (
    <View style={styles.main}>
      <Text style={styles.label}>{name}</Text>

      <Pressable onPress={() => showFromDateTimePicker()} style={styles.box}>
        <Text style={styles.date}>{moment(value).format('LL')}</Text>
        <View style={styles.iconView}>
          <MaterialIcons
            name="arrow-drop-down"
            size={scale(30)}
            color={darkColors.darkGreen}
          />
        </View>
        <DateTimePicker
          mode="date"
          isVisible={state.datePickerStatus}
          date={new Date(value)}
          maximumDate={new Date()}
          onConfirm={date => {
            confirmFromDate(date);
            onChange(date);
          }}
          onCancel={() => hideFormDateTimePicker()}
        />
      </Pressable>
    </View>
  );
};

export default DateTimePickerModal;

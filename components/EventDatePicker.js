import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,LogBox
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {
  Avatar,
  Button,
  Card,
  Title,
  Paragraph,
  IconButton,
} from 'react-native-paper';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {getFocusedRouteNameFromRoute} from '@react-navigation/core';
LogBox.ignoreAllLogs();//Ignore all log notifications

export default function EventDatePicker({
  dateValue,
  handleDateValue,
  textStyle,
  defaultValue,
  isStartDate = true,
}) {
  const [showDatetimePickerModal, setShowDatetimePickerModal] = useState(false);
  const [isTimeSelected, setIsTimeSelecteed] = useState(false);
  const [iconColor, setIconColor] = useState(GRAY);
  const showDatePicker = () => {
    setShowDatetimePickerModal(true);
  };

  const hideDatePicker = () => {
    setShowDatetimePickerModal(false);
  };

  const handleConfirm = resultDate => {
    const eventDate = {date: getDate(resultDate), time: getTime(resultDate)};
    handleDateValue(eventDate);
    setIsTimeSelecteed(true);
    setIconColor(ORANGE);
    hideDatePicker();
  };

  const getTime = date => {
    const timeOptions = {hour: 'numeric', minute: '2-digit'};
    // const zone = date
    //   .toLocaleTimeString('en-us', {timeZoneName: 'short'})
    //   .split(' ')[2];
    // console.log(zone);
    return `${date.toLocaleTimeString([], timeOptions)} ${
      date.toLocaleTimeString('en-us', {timeZoneName: 'short'}).split(' ')[2]
    }`;
  };

  const getDate = date => {
    const dateOptions = {};
    return date.toDateString([], dateOptions);
  };

  return (
    <>
      <DateTimePickerModal
        isVisible={showDatetimePickerModal}
        mode="datetime"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
      <TouchableOpacity
        style={{width: '100%'}}
        onPress={() => {
          showDatePicker();
        }}>
        <View style={styles.cardStyle}>
          <View
            style={{
              justifyContent: 'flex-start',
              borderWidth: 1,
              borderLeftColor: 'white',
              borderTopColor: 'white',
              borderBottomColor: 'white',
              borderRightColor: 'lightgray',
            }}>
            <Avatar.Icon
              size={40}
              icon="calendar"
              color={ICON_COLOR}
              style={{marginLeft: 2, backgroundColor: 'white'}}
            />
          </View>
          <View style={{width: '35%'}}>
            {isTimeSelected ? (
              <>
                <Text style={styles.dateStyle}>{dateValue.date}</Text>
                <Text style={styles.dateStyle}>{dateValue.time}</Text>
              </>
            ) : (
              <Text style={styles.defaultTextStyle}>
                {isStartDate ? 'Select Start Date' : 'Select End Date'}
              </Text>
            )}
          </View>
        </View>
      </TouchableOpacity>
    </>
  );
}

// const GREEN = '#19a86a';
// const BLUE = '#002f4c';
const GREEN = '#5dca73';
const BLUE = '#3366ff';
const ORANGE = '#e29e21';
const WHITE = '#f9f9f9';
const GRAY = '#d7d7d7';
const ICON_COLOR = GREEN;
const styles = StyleSheet.create({
  dateStyle: {
    fontWeight: '500',
    fontSize: 12,
    color: BLUE,
    marginLeft: 5,
    alignSelf: 'stretch',
    width: 130,
  },
  defaultTextStyle: {
    fontWeight: '500',
    fontSize: 13,
    color: BLUE,
    marginLeft: 5,
    width: 130,
  },
  cardStyle: {
    borderWidth: 2,
    backgroundColor: '#ffff',
    margin: 4,
    height: 50,
    shadowColor: '#5cb85c',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 8,
    borderWidth: 0,
    alignItems: 'center',
    flexDirection: 'row',
  },
});

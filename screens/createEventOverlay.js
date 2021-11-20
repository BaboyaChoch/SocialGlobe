import React, {useState, useRef} from 'react';
import {StyleSheet, View, Text, TextInput} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import {IconButton} from 'react-native-paper';
import {Fumi} from 'react-native-textinput-effects';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default function createEventOverlay({navigation}) {
  const [title, setTitle] = useState('');
  const [startDate, setStartDate] = useState(new Date(1));
  const [endDate, setEndDate] = useState(new Date(1));
  const [capacity, setCapacity] = useState(0);
  const [open, setOpen] = useState(false);
  const [eventVisibility, setEventVisibility] = useState('public');
  const [visibilityOptions, setVisibilityOptions] = useState([
    {label: 'Public', value: 'public'},
    {label: 'Private', value: 'private'},
  ]);

  const getEventDetails = () => {
    return {
      event_title: title,
      event_start_datetime: startDate,
      event_end_datetime: endDate,
      event_visiblity: eventVisibility,
      event_capacity: capacity,
    };
  };

  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: WHITE,
      }}>
      <Text style={{color: TEXT_COLOR, fontSize: 20, marginBottom: 30}}>
        Create Event
      </Text>
      <View style={styles.rowStyle}>
        <Fumi
          value={title}
          onChangeText={text => {
            setTitle(text);
          }}
          label={'Title'}
          style={{flex: 1, margin: 15}}
          iconClass={MaterialCommunityIcons}
          iconName={'tag-text-outline'}
          iconColor={ICON_COLOR}
          iconSize={20}
          iconWidth={40}
          inputPadding={16}
          style={styles.inputContainer}
        />
      </View>
      <View style={styles.rowStyle}>
        <DropDownPicker
          key={1}
          style={styles.dropdown}
          open={open}
          value={eventVisibility}
          items={visibilityOptions}
          setOpen={setOpen}
          setValue={setEventVisibility}
          setItems={setVisibilityOptions}
        />
      </View>
      <View style={styles.rowStyle}>
        <IconButton
          icon="arrow-right"
          size={ICON_SIZE}
          color={ORANGE}
          onPress={() => {
            navigation.navigate('EventDescriptionAndImageSelect', {
              eventDetails: getEventDetails(),
            });
          }}></IconButton>
      </View>
    </View>
  );
}

const GREEN = '#19a86a';
const BLUE = '#002f4c';
const ORANGE = '#e29e21';
const WHITE = '#f9f9f9';
const ICON_SIZE = 32;
const ICON_COLOR = '#e29e21';
const BORDER_COLOR = '#000000';
const TEXT_COLOR = 'black';

const styles = StyleSheet.create({
  rowStyle: {flexDirection: 'row', marginTop: 10},
  inputStyle: {
    height: 50,
    flex: 1,
    borderColor: BORDER_COLOR,
    borderWidth: 1,
    borderRadius: 10,
    marginRight: 10,
    marginLeft: 10,
  },
  textStyle: {
    marginLeft: 10,
    color: TEXT_COLOR,
    fontSize: 15,
    height: 50,
    //borderColor: '#5bff33',
    //borderWidth: 2,
    //borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 5,
    paddingRight: 5,
  },
  buttonStyle: {
    borderRadius: 20,
    backgroundColor: '#5bff33',
  },
  pickerStyle: {
    width: '70%',
  },
  inputContainer: {
    height: 50,
    shadowColor: '#5cb85c',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 8,
    margin: 15,
    marginBottom: 5,
    flex: 1,
  },
  dropdown: {
    shadowColor: '#5cb85c',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 8,
    margin: 15,
    marginBottom: 5,
    marginTop: 0,
    width: 100,
    height: 35,
    borderRadius: 0,
    borderColor: 'black',
    borderWidth: 0.1,
  },
});

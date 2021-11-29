import React, {useState, useRef, useEffect} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import {IconButton} from 'react-native-paper';
import {Fumi} from 'react-native-textinput-effects';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Slider} from '@miblanchard/react-native-slider';
import EventDatePicker from '../components/EventDatePicker';

export default function createEventOverlay({navigation}) {
  const [title, setTitle] = useState(null);
  const [link, setLink] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [capacity, setCapacity] = useState(0);
  const [openEventVisibilitySelect, setOpenEventVisibilitySelect] =
    useState(false);
  const [eventVisibility, setEventVisibility] = useState('public');
  const [visibilityOptions, setVisibilityOptions] = useState([
    {label: 'Public', value: 'public'},
    {label: 'Private', value: 'private'},
  ]);

  const getEventDetails = () => {
    return {
      event_title: title == null ? 'N/A' : title,
      event_link: link == null ? 'N/A' : link,
      event_start_datetime: startDate == null ? 'N/A' : startDate,
      event_end_datetime: endDate == null ? 'N/A' : endDate,
      event_visibility: eventVisibility,
      event_capacity:
        capacity[0] == undefined
          ? 'capacity limits not specified'
          : capacity[0],
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
      <Text
        style={{
          color: BLUE,
          fontSize: 20,
          marginBottom: 30,
          fontWeight: '500',
        }}>
        Enter Event Details Below
      </Text>
      <View style={styles.rowStyle}>
        <Fumi
          value={title}
          onChangeText={text => {
            setTitle(text);
          }}
          label={'Title'}
          style={{flex: 1, marginBottom: 5, marginTop: 0}}
          iconClass={MaterialCommunityIcons}
          iconName={'tag-text-outline'}
          iconColor={ICON_COLOR}
          iconSize={20}
          iconWidth={40}
          inputPadding={16}
          style={styles.inputContainer}
          labelStyle={styles.textStyle}
          inputStyle={styles.textInputStyle}
        />
      </View>
      <View style={styles.rowStyle}>
        <Fumi
          value={link}
          inputStyle={styles.textInputStyle}
          onChangeText={text => {
            setLink(text);
          }}
          label={'Link'}
          style={{flex: 1, margin: 15, marginBottom: 5, marginTop: 0}}
          iconClass={MaterialCommunityIcons}
          iconName={'link'}
          iconColor={ICON_COLOR}
          iconSize={20}
          iconWidth={40}
          inputPadding={16}
          style={styles.inputContainer}
          labelStyle={styles.textStyle}
        />
      </View>
      <View
        style={{
          flexDirection: 'row',
          marginTop: 0,
          marginLeft: 35,
          marginRight: 25,
          marginBottom: 15,
        }}>
        <EventDatePicker dateValue={startDate} handleDateValue={setStartDate} />
        <View style={{width: 10}}></View>
        <EventDatePicker dateValue={endDate} handleDateValue={setEndDate} />
      </View>
      <View style={{flexDirection: 'row'}}></View>
      <View style={styles.rowStyle}>
        <View>
          <Slider
            trackStyle={{width: 330, backgroundColor: BLUE}}
            value={capacity}
            onValueChange={value => setCapacity(value)}
            minimumValue={0}
            maximumValue={5000}
            animationType="spring"
            trackMarks={[500, 1500, 2500, 3500, 4500]}
            step={2}
            animateTransitions={true}
            thumbTintColor={BLUE}
            thumbStyle={{width: 15, height: 15}}
            trackClickable={true}
            renderTrackMarkComponent={() => (
              <IconButton icon="circle" size={12} color={GREEN}></IconButton>
            )}
          />
          <Text
            style={{
              fontSize: 18,
              color: BLUE,
              textAlign: 'center',
              fontWeight: '500',
            }}>
            Event Expected Capacity: {capacity}
          </Text>
        </View>
      </View>
      <View style={styles.rowStyle}>
        <DropDownPicker
          key={1}
          style={styles.dropdown}
          open={openEventVisibilitySelect}
          value={eventVisibility}
          items={visibilityOptions}
          setOpen={setOpenEventVisibilitySelect}
          setValue={setEventVisibility}
          setItems={setVisibilityOptions}
          textStyle={styles.textStyle}
          containerStyle={{borderWidth: 0}}
          labelStyle={{marginTop: 5}}
          placeholder="Select Event Visibility"
          defaultValue="Public"
        />
      </View>
      <View style={styles.rowStyle}></View>
      <View style={styles.rowStyle}>
        <IconButton
          icon="arrow-right"
          size={ICON_SIZE}
          color={BLUE}
          onPress={() => {
            navigation.navigate('EventAddressSelection', {
              eventDetails: getEventDetails(),
            });
          }}></IconButton>
      </View>
    </View>
  );
}

// const GREEN = '#19a86a';
// const BLUE = '#002f4c';

const GREEN = '#5dca73';
const BLUE = '#3366ff';
const ORANGE = '#e29e21';
const WHITE = '#f9f9f9';
const ICON_SIZE = 32;
const ICON_COLOR = GREEN;
const BORDER_COLOR = '#000000';
const TEXT_COLOR = 'black';

const styles = StyleSheet.create({
  rowStyle: {
    flexDirection: 'row',
    marginTop: 0,
    marginLeft: 35,
    marginRight: 25,
    marginBottom: 15,
  },
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
    fontWeight: '500',
    fontSize: 17,
    color: BLUE,
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
    flex: 1,
  },
  dropdown: {
    shadowColor: '#5cb85c',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 8,
    width: 110,
    height: 35,
    borderRadius: 0,
    borderColor: 'black',
    borderWidth: 0.1,
  },
  datesContainer: {
    flexDirection: 'row',
    marginTop: 0,
    marginLeft: 35,
    marginRight: 25,
    marginBottom: 15,
    justifyContent: 'space-between',
  },
  textInputStyle: {color: BLUE, fontSize: 14, fontWeight: '300'},
});

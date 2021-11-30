import React, {useEffect, useState} from 'react';
import {SliderBox} from 'react-native-image-slider-box';
import {View, StyleSheet, Modal, Alert} from 'react-native';
import {
  Avatar,
  Card,
  Paragraph,
  Divider,
  IconButton,
  Colors,
  Snackbar,
} from 'react-native-paper';
import {ScrollView} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/core';
// import ReportEvent from '../components/ReportEvent';
import {useIsFocused} from '@react-navigation/core';
import {firebase} from '@react-native-firebase/auth';
import {addToUserBookmarks} from '../api/bookmarksApi';
import getEventPhoto from '../api/imagesApi';
import agenda from '../screens/agenda';

import {Calendar, CalendarList, Agenda, LocaleConfig } from 'react-native-calendars';

export default function calendar({route, navigation}) {

    const GREEN = '#19a86a';
const BLUE = '#002f4c';
const ORANGE = '#e29e21';
const WHITE = '#f9f9f9';

const TITLE_COLOR = BLUE;
const SUBTITLE_COLOR = Colors.grey700;
const ICON_SIZE = 27;
const BACKGROUND_COLOR = WHITE;

const styles = StyleSheet.create({
  image_box: {},
  title: {},
  address: {},
  date: {},
  location: {},
  button: {
    margin: 5,
    backgroundColor: 'lightgray',
  },
  container: {
    flex: 1,
    height: 200,
  },
  text: {
    fontSize: 15,
    height: 50,
  },
  title: {color: TITLE_COLOR, fontSize: 15},
  subititle: {color: SUBTITLE_COLOR, fontSize: 10},
  card: {
    flexDirection: 'row',
    flex: 1,
    backgroundColor: BACKGROUND_COLOR,
  },
});

const fair = {key: 'fair', color: 'purple', selectedDotColor: 'blue'};
const fundraiser = {key: 'fundraiser', color: 'green', selectedDotColor: 'blue'};
const privateEvent = {key: 'privateEvent', color: 'red', selectedDotColor: 'blue'};
const seminar = {key: 'seminar', color: 'pink', selectedDotColor: 'blue'};
const sport = {key: 'sport', color: '#e29e21', selectedDotColor: 'blue'};

LocaleConfig.locales['en'] = {
    monthNames: ['January','February','March','April','May','June','July','August','September','October','November','December'],
    monthNamesShort: ['Jan.','Feb.','Mar.','Apr.','May','June','July.','Aug.','Sept.','Oct.','Nov.','Dec.'],
    dayNames: ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'],
    dayNamesShort: ['Sun.','Mon.','Tues.','Wed.','Thurs.','Fri.','Sat.'],
    today: 'Aujourd\'hui'
  };

LocaleConfig.defaultLocale = 'en';

return (
        <>
<View
        style={{
          flexDirection: 'column',
          backgroundColor: BACKGROUND_COLOR,
          flex: 1,
        }}>
        <Divider />
        <Divider />
        <Divider />
        <View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              height: 60,
            }}>
            <IconButton
              icon="arrow-left"
              color='#3366ff'
              size={40}
              onPress={() => {
                navigation.navigate('Map');
              }}
              style={{
                position: 'relative',
                right: 100,
              }}
            />
            <Paragraph
            style={{
              fontSize: 20,
              position: 'relative',
              top: 25,
              right: 100
            }}
            >Return to Map</Paragraph>
          </View>
        </View>
        <Divider />
        <Divider />
        <Divider />
        <CalendarList
        onDayPress={() => { navigation.navigate('Agenda')}}
        markingType={'multi-dot'}
        markedDates={{
            '2021-11-01': {dots: [fair, seminar], marked: true,},
            '2021-11-03': {dots: [fundraiser], marked: true,},
            '2021-11-04': {dots: [privateEvent], marked: true,},
            '2021-11-05': {dots: [privateEvent], marked: true,},
            '2021-11-05': {dots: [privateEvent], marked: true,},
            '2021-11-08': {dots: [fair, fundraiser, seminar], marked: true, selectedColor: 'blue'},
            '2021-11-09': {dots: [fundraiser], marked: true},
            '2021-11-10': {dots: [fair, privateEvent], marked: true, dotColor: 'red', activeOpacity: 0},
            '2021-11-11': {dots: [privateEvent, seminar], marked: true, dotColor: 'red'},
            '2021-11-14': {dots: [fundraiser], marked: true},
            '2021-11-18': {dots: [fundraiser], marked: true},
            '2021-11-19': {dots: [fair], marked: true},
            '2021-11-21': {dots: [fundraiser], marked: true},
            '2021-11-22': {dots: [fundraiser, fair], marked: true},
            '2021-11-23': {dots: [privateEvent], marked: true},
            '2021-11-26': {dots: [fundraiser], marked: true},
            '2021-11-28': {dots: [seminar], marked: true},
            '2021-11-29': {dots: [fundraiser], marked: true},
            '2021-11-30': {dots: [fundraiser, fair, privateEvent], marked: true},
            '2021-12-01': {dots: [fair, seminar], marked: true,},
            '2021-12-03': {dots: [fundraiser], marked: true,},
            '2021-12-04': {dots: [privateEvent], marked: true,},
            '2021-12-05': {dots: [privateEvent], marked: true,},
            '2021-12-05': {dots: [privateEvent], marked: true,},
            '2021-12-08': {dots: [fair, fundraiser, privateEvent, seminar], marked: true, selectedColor: 'blue'},
            '2021-12-09': {dots: [fundraiser], marked: true},
            '2021-12-10': {dots: [fair, privateEvent], marked: true, dotColor: 'red', activeOpacity: 0},
            '2021-12-11': {dots: [privateEvent, seminar], marked: true, dotColor: 'red'},
            '2021-12-14': {dots: [fundraiser], marked: true},
            '2021-12-18': {dots: [fundraiser], marked: true},
            '2021-12-19': {dots: [fair], marked: true},
            '2021-12-21': {dots: [fundraiser], marked: true},
            '2021-12-22': {dots: [fundraiser], marked: true},
            '2021-12-23': {dots: [privateEvent], marked: true},
            '2021-12-26': {dots: [fundraiser], marked: true},
            '2021-12-28': {dots: [seminar], marked: true},
            '2021-12-29': {dots: [fundraiser], marked: true},
            '2021-12-30': {dots: [fundraiser], marked: true},
            '2022-01-01': {dots: [fair, seminar], marked: true,},
            '2022-01-03': {dots: [fundraiser], marked: true,},
            '2022-01-04': {dots: [privateEvent], marked: true,},
            '2022-01-05': {dots: [privateEvent], marked: true,},
            '2022-01-05': {dots: [privateEvent], marked: true,},
            '2022-01-08': {dots: [fair, fundraiser, privateEvent, seminar], marked: true, selectedColor: 'blue'},
            '2022-01-09': {dots: [fundraiser], marked: true},
            '2022-01-10': {dots: [fair, privateEvent], marked: true, dotColor: 'red', activeOpacity: 0},
            '2022-01-11': {dots: [privateEvent, seminar], marked: true, dotColor: 'red'},
            '2022-01-14': {dots: [fundraiser], marked: true},
            '2022-01-18': {dots: [fundraiser], marked: true},
            '2022-01-19': {dots: [fair], marked: true},
            '2022-01-21': {dots: [fundraiser], marked: true},
            '2022-01-22': {dots: [fundraiser], marked: true},
            '2022-01-23': {dots: [privateEvent], marked: true},
            '2022-01-26': {dots: [fundraiser], marked: true},
            '2022-01-28': {dots: [seminar], marked: true},
            '2022-01-29': {dots: [fundraiser], marked: true},
            '2022-01-30': {dots: [fundraiser], marked: true},
        }}
        />
        </View>
        </>
)
            }
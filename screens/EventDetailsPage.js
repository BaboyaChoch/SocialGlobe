import React, {useEffect, useState} from 'react';
import {SliderBox} from 'react-native-image-slider-box';
import {View, StyleSheet, Modal, Alert, Linking} from 'react-native';
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
import messages from '../screens/messages';

export default function EventDetailsPage({route, navigation}) {
  const user = firebase.auth().currentUser;
  const {eventDetails} = route.params;

  const [state, setState] = useState({});
  const [reportVisible, setReportVisible] = useState(false);
  const [images, setImages] = useState([]);
  const isFocused = useIsFocused();
  const [showBookmarkAddedSnackbar, setShowBookmarkAddedSnackbar] =
    useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('Hello!');
  const title_icon = props => <Avatar.Icon {...props} icon="folder" />;
  const location_icon = props => <Avatar.Icon {...props} icon="folder" />;
  const date_icon = props => <Avatar.Icon {...props} icon="folder" />;
  const desc_icon = props => <Avatar.Icon {...props} icon="folder" />;

  const onImageRecieved = image => {
    setImages([image]);
  };
  const handleDismissSnackbar = () => {
    setShowBookmarkAddedSnackbar(false);
  };

  const getDirectionsFromNativeMapsApp = () => {
    const latitude = eventDetails.event_coordinates.latitude;
    const longitude = eventDetails.event_coordinates.longitude;

    const url = Platform.select({
      ios:
        'maps:' +
        latitude +
        ',' +
        longitude +
        '?q=' +
        eventDetails.event_address.full_address,
      android:
        'geo:' +
        latitude +
        ',' +
        longitude +
        '?q=' +
        eventDetails.event_address.full_address,
    });

    Linking.openURL(url);
  };

  useEffect(() => {
    getEventPhoto(
      eventDetails.event_id,
      eventDetails.event_user_id,
      onImageRecieved,
    );
  }, [isFocused]);

  return (
    <>
      <Modal
        animationType="slide"
        transparent={true}
        visible={reportVisible}
        onRequestClose={() => {
          setReportVisible(!reportVisible);
        }}
        style={{justifyContent: 'center', position: 'absolute'}}>
        {/* <ReportEvent eventId={{}} eventReports={{}} /> */}
      </Modal>
      <View
        style={{
          flexDirection: 'column',
          backgroundColor: BACKGROUND_COLOR,
          flex: 1,
        }}>
        <View style={{flexDirection: 'row'}}>
          <SliderBox images={images} sliderBoxHeight={300} />
        </View>
        <Divider />
        <Divider />
        <Divider />
        <View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
            }}>
            <IconButton
              icon="arrow-left"
              color='#3366ff'
              size={40}
              onPress={() => {
                navigation.navigate('Map');
              }}
            />
            <IconButton
              icon="plus"
              color={GREEN}
              size={40}
              onPress={() => {
                navigation.navigate('Map', {eventToAdd: eventDetails});
              }}
            />
            <IconButton
              icon="navigation"
              color={ORANGE}
              size={40}
              onPress={() => {
                getDirectionsFromNativeMapsApp();
              }}
            />
            <IconButton
              icon="bookmark"
              color='#ff0eb5'
              size={40}
              onPress={() => {
                addToUserBookmarks(eventDetails.event_id);
                setSnackbarMessage('Bookmarked Event!');
                setShowBookmarkAddedSnackbar(true);
              }}
            />
            <IconButton
              icon="message-text"
              color={Colors.blue500}
              size={40}
              onPress={() => {
                navigation.navigate('Messages');
              }}
            />
          </View>
        </View>
        <Divider />
        <Divider />
        <Divider />
        <View
          style={{
            flexDirection: 'row',
          }}>
          <Card style={styles.card}>
            <Card.Title
              titleStyle={styles.title}
              subtitleStyle={styles.subititle}
              title={eventDetails.event_title}
              subtitle={eventDetails.event_creater}></Card.Title>
          </Card>
        </View>
        <Divider />
        <Divider />
        <Divider />
        <View
          style={{
            flexDirection: 'row',
          }}>
          <Card style={styles.card}>
            <Card.Title
              titleStyle={styles.title}
              subtitleStyle={styles.subititle}
              title={eventDetails.event_address.main_text}
              subtitle={eventDetails.event_address.secondary_text}></Card.Title>
          </Card>
        </View>
        <Divider />
        <Divider />
        <Divider />
        <View
          style={{
            flexDirection: 'row',
          }}>
          <Card style={styles.card}>
            <Card.Title
              titleStyle={styles.title}
              subtitleStyle={styles.subititle}
              title={eventDetails.event_start_datetime.date}
              subtitle={eventDetails.event_start_datetime.time}></Card.Title>
          </Card>
        </View>
        <Divider />
        <Divider />
        <Divider />
        <SafeAreaView style={styles.container}>
          <ScrollView style={{marginHorizontal: 2}}>
            <View
              style={{
                flexDirection: 'row',
              }}>
              <Card style={{backgroundColor: BACKGROUND_COLOR, height: 300}}>
                <Card.Content>
                  <Paragraph style={{color: SUBTITLE_COLOR}}>
                    {eventDetails.event_description}
                  </Paragraph>
                </Card.Content>
              </Card>
            </View>
          </ScrollView>
        </SafeAreaView>
      </View>
      <Snackbar
        visible={showBookmarkAddedSnackbar}
        onDismiss={handleDismissSnackbar}
        action={{
          label: 'Thanks!',
          onPress: () => {
            handleDismissSnackbar();
          },
        }}>
        {snackbarMessage}
      </Snackbar>
    </>
  );
}

// const GREEN = '#19a86a';
// const BLUE = '#002f4c';
const GREEN = '#5dca73';
const BLUE = '#3366ff';
const ORANGE = '#e29e21';
const WHITE = '#f9f9f9';

const TITLE_COLOR = BLUE;
const SUBTITLE_COLOR = Colors.black;
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
    flex: 1,
    backgroundColor: BACKGROUND_COLOR,
  },
});

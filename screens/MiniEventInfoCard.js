import React, {useState, useEffect} from 'react';
import {StyleSheet, View, SafeAreaView, Alert, Dimensions} from 'react-native';
import {
  Avatar,
  Card,
  Title,
  Paragraph,
  IconButton,
  Button,
  Colors,
  Snackbar,
} from 'react-native-paper';
import getEventPhoto from '../api/imagesApi';
import {useIsFocused, useNavigation} from '@react-navigation/core';
import {addToUserBookmarks} from '../api/bookmarksApi';
import AppColors from '../components/AppColors';

export default function MiniEventInfoCard({eventDetails, isBookmark = false}) {
  const navigation = useNavigation();
  const [eventImage, setEventImage] = useState({});
  const screenIsFocused = useIsFocused();
  const [snackbarMessage, setSnackbarMessage] = useState('Hello!');
  const [showBookmarkAddedSnackbar, setShowBookmarkAddedSnackbar] =
    useState(false);

  const onImageRecieved = image => {
    setEventImage({uri: image});
  };

  const handleDismissSnackbar = () => {
    setShowBookmarkAddedSnackbar(false);
  };

  useEffect(() => {
    getEventPhoto(
      eventDetails.event_id,
      eventDetails.event_user_id,
      onImageRecieved,
    );
  }, [screenIsFocused]);

  return (
    <>
      <Card style={styles.card}>
        <Card.Cover
          source={eventImage}
          style={{
            marginTop: 0,
            height: 110,
            width: CARD_WIDTH,
            aspectRatio: CARD_WIDTH / 110,
          }}
        />
        <Card.Title
          style={styles.header}
          title={eventDetails.event_title}
          subtitle={eventDetails.event_address.full_address}
          titleStyle={{color: AppColors.BLUE, fontSize: 15}}
          subtitleStyle={{paddingLeft: 2, fontSize: 13, color: Colors.black}}
        />
        <Card.Content style={styles.content}>
          <Paragraph style={styles.subDate}>
            {eventDetails.event_start_datetime.date +
              eventDetails.event_start_datetime.time}
          </Paragraph>
        </Card.Content>
      </Card>
    </>
  );
}

const GREEN = '#19a86a';
const BLUE = '#002f4c';
const ORANGE = '#e29e21';
const WHITE = '#f9f9f9';

const {width, height} = Dimensions.get('window');
const CARD_WIDTH = width * 0.8;

const TEXT_COLOR = ORANGE;
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 34,
    width: 400,
    flex: 1,
    width: '100%',
  },
  button: {
    width: 300,
    height: 40,
    borderWidth: 1,
    position: 'relative',
    color: TEXT_COLOR,
  },
  card: {
    margin: 10,
    width: CARD_WIDTH,
    height: 190,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    position: 'relative',
    bottom: 8,
    alignItems: 'flex-start',
  },
  header: {
    fontSize: 14,
    width: '100%',
    padding: 0,
    //left: 25,
    justifyContent: 'flex-start',
  },
  location: {
    bottom: 1,
    fontSize: 15,
    textAlign: 'center',
  },
  address: {
    marginTop: 0,
    fontSize: 18,
    textAlign: 'center',
  },
  subaddress: {
    bottom: 8,
    fontSize: 10,
    color: Colors.grey600,
    textAlign: 'center',
    paddingLeft: 4,
  },
  date: {
    top: 1,
    fontSize: 18,
    textAlign: 'center',
    color: Colors.red400,
  },
  subDate: {
    bottom: 8,
    fontSize: 13,
    color: Colors.green500,
    textAlign: 'center',
    paddingLeft: 2,
    paddingBottom: 0,
    marginBottom: 0,
  },
  category: {
    bottom: 3,
    fontSize: 20,
    textAlign: 'center',
  },
  pin: {
    position: 'relative',
    bottom: 133,
    left: 40,
  },
  visibility: {
    position: 'relative',
    bottom: 310,
    left: 198,
    backgroundColor: 'white',
    scaleX: 0.75,
    scaleY: 0.75,
  },
});

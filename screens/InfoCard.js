import React, {useState, useEffect} from 'react';
import {StyleSheet, View, SafeAreaView, Alert} from 'react-native';
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

export default function InfoCard({eventDetails, isBookmark = false}) {
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
      <SafeAreaView style={styles.container}>
        <View>
          <Card style={styles.card}>
            <Card.Cover source={eventImage} /*style={{marginTop: 0}}*/ />
            <Card.Title
              style={styles.header}
              title={eventDetails.event_title}
              subtitle={eventDetails.event_creater}
              titleStyle={{color: Colors.green500}}
              subtitleStyle={{paddingLeft: 4}}
            />
            <Card.Content style={styles.content}>
              <Paragraph style={styles.date}>
                {eventDetails.event_start_datetime.date}
              </Paragraph>
              <Card.Content style={{flexDirection: 'column'}}>
                <Paragraph style={styles.subDate}>
                  Start time:
                  {' ' + eventDetails.event_start_datetime.time}
                </Paragraph>
                <Paragraph style={styles.subDate}>
                  End time:
                  {' ' + eventDetails.event_end_datetime.time}
                </Paragraph>
              </Card.Content>
              <Paragraph style={styles.address}>
                {eventDetails.event_address.main_text}
              </Paragraph>
              <Paragraph style={styles.subaddress}>
                {eventDetails.event_address.secondary_text}
              </Paragraph>
              <Paragraph style={styles.category}>
                {eventDetails.event_type}
              </Paragraph>
              <Card.Content style={{flexDirection: 'row'}}>
                <IconButton icon="plus" size={40} color={Colors.black} />
                <IconButton
                  icon="information-outline"
                  size={40}
                  color={Colors.blue300}
                  onPress={() => {
                    navigation.navigate('EventDetailsPage', {
                      eventDetails: eventDetails,
                    });
                  }}
                />
                <IconButton
                  icon="navigation"
                  size={40}
                  color={GREEN}
                  onPress={() => {}}
                />
                {/* {isBookmark && (
                <IconButton
                  icon="navigation"
                  size={40}
                  color={GREEN}
                  visible={false}
                  onPress={() => {}}
                />
              )} */}
              </Card.Content>
              <Card.Content style={{height: 0}}>
                {isBookmark ? (
                  eventDetails.event_visibility === 'public' && isBookmark ? (
                    <IconButton
                      style={styles.visibility}
                      icon="lock-open-variant-outline" //lock-outline if private
                      size={40}
                    />
                  ) : (
                    <IconButton
                      style={styles.visibility}
                      icon="lock-outline" //lock-outline if private
                      size={40}
                    />
                  )
                ) : (
                  <IconButton
                    style={styles.visibility}
                    icon="bookmark" //if not bookmark, show boomkar instead
                    size={40}
                    color='#ff0eb5'
                    onPress={() => {
                      addToUserBookmarks(eventDetails.event_id);
                      Alert.alert(
                        'Boomarked Event!',
                        'Your Event has been bookmarked',
                      );
                      // setSnackbarMessage('Bookmarked Evented!');
                      // setShowBookmarkAddedSnackbar(true);
                    }}
                  />
                )}
              </Card.Content>
            </Card.Content>
          </Card>
        </View>
      </SafeAreaView>
      {/* <Snackbar
        visible={showBookmarkAddedSnackbar}
        onDismiss={handleDismissSnackbar}
        action={{
          label: 'Thanks!',
          onPress: () => {
            handleDismissSnackbar();
          },
        }}>
        {snackbarMessage}
      </Snackbar> */}
    </>
  );
}

const GREEN = '#19a86a';
const BLUE = '#002f4c';
const ORANGE = '#e29e21';
const WHITE = '#f9f9f9';

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
    backgroundColor: WHITE,
  },
  button: {
    width: 300,
    height: 40,
    borderWidth: 1,
    position: 'relative',
    color: TEXT_COLOR,
  },
  card: {
    backgroundColor: WHITE,
    elevation: 15,
    margin: 10,
    width: 300,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
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
    fontSize: 10,
    color: Colors.grey600,
    textAlign: 'center',
    paddingLeft: 4,
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

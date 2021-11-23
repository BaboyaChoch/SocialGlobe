import React, {useState, useEffect} from 'react';
import {StyleSheet, View, SafeAreaView} from 'react-native';
import {
  Avatar,
  Card,
  Title,
  Paragraph,
  IconButton,
  Button,
  Colors,
} from 'react-native-paper';
import getEventPhoto from '../api/imagesApi';
import {useIsFocused} from '@react-navigation/core';

export default function InfoCard(props) {
  const {eventDetails} = props;
  const [eventImage, setEventImage] = useState({});
  const screenIsFocused = useIsFocused();
  console.log('event details: ', eventDetails);

  const onImageRecieved = image => {
    setEventImage({uri: image});
  };

  useEffect(() => {
    getEventPhoto(eventDetails.event_id, onImageRecieved);
  }, [screenIsFocused]);

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Card style={styles.card}>
          <Card.Cover source={eventImage} style={{marginTop: 5}} />
          <Card.Title
            style={styles.header}
            title={eventDetails.event_title}
            subtitle={eventDetails.event_user_id}
            titleStyle={{color: Colors.green500}}
            subtitleStyle={{paddingLeft: 4}}
          />
          <Card.Content style={styles.content}>
            <Paragraph style={styles.date}>
              {eventDetails.event_start_datetime.date}
            </Paragraph>
            <Paragraph style={styles.subDate}>
              {'@ ' + eventDetails.event_start_datetime.time}
            </Paragraph>
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
              />
              <IconButton icon="navigation" size={40} color={GREEN} />
            </Card.Content>
            <Card.Content style={{height: 0}}>
              {eventDetails.event_visibility === 'public' ? (
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
              )}
            </Card.Content>
          </Card.Content>
        </Card>
      </View>
    </SafeAreaView>
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
    bottom: 290,
    left: 198,
    backgroundColor: 'white',
    scaleX: 0.75,
    scaleY: 0.75,
  },
});

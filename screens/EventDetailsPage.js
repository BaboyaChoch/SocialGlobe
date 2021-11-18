import React, {useEffect, useState} from 'react';
import {SliderBox} from 'react-native-image-slider-box';
import {View, Text, ActivityIndicator, StyleSheet, Modal} from 'react-native';
import {
  Avatar,
  Button,
  Card,
  Title,
  Paragraph,
  Divider,
  IconButton,
  Colors,
  Chip,
} from 'react-native-paper';
import {ScrollView} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/core';
// import ReportEvent from '../components/ReportEvent';
import {useIsFocused} from '@react-navigation/core';
import {firebase} from '@react-native-firebase/auth';

export default function EventDetailsPage({route, navigation}) {
  const user = firebase.auth().currentUser;
  const {eventDetails} = route.params;
  console.log('Details Page: ', eventDetails);
  const [state, setState] = useState({});
  const [reportVisible, setReportVisible] = useState(false);
  const [images, setImages] = useState([
    'https://source.unsplash.com/1024x768/?nature',
    'https://source.unsplash.com/1024x768/?water',
    'https://source.unsplash.com/1024x768/?girl',
    'https://source.unsplash.com/1024x768/?tree',
  ]);
  const isFocused = useIsFocused();
  {
    /* <ActivityIndicator size="large" color="#00ff00" /> */
  }
  const title_icon = props => <Avatar.Icon {...props} icon="folder" />;
  const location_icon = props => <Avatar.Icon {...props} icon="folder" />;
  const date_icon = props => <Avatar.Icon {...props} icon="folder" />;
  const desc_icon = props => <Avatar.Icon {...props} icon="folder" />;

  useEffect(() => {}, [isFocused]);
  useEffect(() => {}, []);

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
              color={BLUE}
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
                navigation.navigate('Map', {eventToAdd: details});
              }}
            />
            <IconButton
              icon="navigation"
              color={ORANGE}
              size={40}
              onPress={() => {
                console.log('reported');
              }}
            />
            <IconButton
              icon="alert-octagon"
              color={Colors.red500}
              size={40}
              onPress={() => {
                console.log('reported');
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
              title={eventDetails.title}
              subtitle="USER"></Card.Title>
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
              title={eventDetails.address.description}
              subtitle="CITY, STATE ZIPCODE"></Card.Title>
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
              title={new Date(eventDetails.date).toDateString()}
              subtitle={new Date(
                eventDetails.date,
              ).toLocaleTimeString()}></Card.Title>
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
                    {eventDetails.description}
                  </Paragraph>
                </Card.Content>
              </Card>
            </View>
          </ScrollView>
        </SafeAreaView>
      </View>
    </>
  );
}

const GREEN = '#19a86a';
const BLUE = '#002f4c';
const ORANGE = '#e29e21';
const WHITE = '#f9f9f9';

const TITLE_COLOR = BLUE;
const SUBTITLE_COLOR = ORANGE;
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

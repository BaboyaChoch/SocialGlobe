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

export default function EventDetailsPage({route, navigation}) {
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
  useEffect(() => {
    return () => {
      setState({});
    };
  }, []);
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
          backgroundColor: BACK_GROUND_COLOR,
          flex: 1,
        }}>
        <View style={{flexDirection: 'row'}}>
          <SliderBox images={images} sliderBoxHeight={300} />
        </View>
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
        <View
          style={{
            flexDirection: 'row',
          }}>
          <Card style={styles.card}>
            <Card.Title
              titleStyle={styles.title}
              subtitleStyle={styles.subititle}
              title="Lil Im Tired As Shit Concert"
              subtitle="Baboya"></Card.Title>
          </Card>
        </View>
        <Divider />
        <View
          style={{
            flexDirection: 'row',
          }}>
          <Card style={styles.card}>
            <Card.Title
              titleStyle={styles.title}
              subtitleStyle={styles.subititle}
              title="2105 SaveMe Drive"
              subtitle="70803 Baton Rouge, LA"></Card.Title>
          </Card>
        </View>
        <Divider />
        <View
          style={{
            flexDirection: 'row',
          }}>
          <Card style={styles.card}>
            <Card.Title
              titleStyle={styles.title}
              subtitleStyle={styles.subititle}
              title="Mon, Nov 20"
              subtitle="10:00am"></Card.Title>
          </Card>
        </View>
        <Divider />
        <SafeAreaView style={styles.container}>
          <ScrollView style={{marginHorizontal: 2}}>
            <View
              style={{
                flexDirection: 'row',
              }}>
              <Card style={{backgroundColor: CARD_COLOR, height: 300}}>
                <Card.Content>
                  <Paragraph style={{color: Colors.blue400}}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate velit
                    esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
                    occaecat cupidatat non proident, sunt in culpa qui officia
                    deserunt mollit anim id est laborum.
                  </Paragraph>
                </Card.Content>
              </Card>
            </View>
          </ScrollView>
        </SafeAreaView>
        <Divider />
      </View>
    </>
  );
}
const TITLE_COLOR = Colors.green400;
const SUBTITLE_COLOR = Colors.black;
const CARD_COLOR = 'white';
const GREEN = '#19a86a';
const BLUE = '#002f4c';
const ICON_SIZE = 27;
const ORANGE = '#e29e21';
const BACK_GROUND_COLOR = 'white';
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
    backgroundColor: CARD_COLOR,
  },
});

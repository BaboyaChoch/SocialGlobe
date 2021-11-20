import React, {useState} from 'react';
import {SliderBox} from 'react-native-image-slider-box';
import {
  StyleSheet,
  View,
  SafeAreaView,
  Image,
} from 'react-native';
import {
  Avatar,
  Card,
  Title,
  Paragraph,
  IconButton,
  Button,
  Colors,
} from 'react-native-paper';
import { Icon } from 'react-native-paper/lib/typescript/components/Avatar/Avatar';



export default function InfoCard() {

  const [images, setImages] = useState([
    'https://source.unsplash.com/1024x768/?nature',
    'https://source.unsplash.com/1024x768/?water',
    'https://source.unsplash.com/1024x768/?girl',
    'https://source.unsplash.com/1024x768/?tree',
  ]);
const getrows = {

}
  return InfoCard.map(rows) (
    <SafeAreaView style={styles.container}>
      
        <View>
        <Card style={styles.card}>
        <Image 
          source={{uri: "https://source.unsplash.com/1024x768/?nature"}}
          style={{
            width: 300,
            height: 200,
          }}
        />
            <Card.Title 
                style={styles.title}
                title={`${eventDetails.title}`}
            />
            <Card.Content style={styles.content}>
            <Paragraph 
                style={styles.address}>
                {`${eventDetails.address.description}`}
              </Paragraph>
              <Paragraph 
                style={styles.date}>
                {`${new Date(eventDetails.date).toDateString()}`}
              </Paragraph>
              <Paragraph 
                style={styles.time}>
                {`${new Date(
                eventDetails.date,
              ).toLocaleTimeString()}`}
              </Paragraph>
              <Paragraph 
                style={styles.description}>
                {`${eventDetails.description}`}
              </Paragraph>
                <Card.Content style={{flexDirection: 'row'}}>
                <IconButton
                icon="plus"
                color={GREEN}
                //add event to destinations
                onPress={() => {
                  navigation.navigate('Map', {eventToAdd: details});
                }}
                size={40}
              />
             <IconButton
                icon="information"
                color={Colors.cyan400}
                //more info, redirect to details page
                onPress={() => {
                  navigation.navigate('EventDetailsPage');
                }}
                size={40}
              />
              <IconButton
                icon="navigation"
                color={ORANGE}
                //get directions to event
                onPress={() => {
                  console.log('reported');
                }}
                size={40}
              />
                </Card.Content>
                <Card.Content  style={{height: 0}}>
                <IconButton style={styles.heart}
                icon="lock-open-outline" //lock-outline if private
                size={40}
                //color={GREEN} //Colors.red900 if private
              />
              </Card.Content>
            </Card.Content>
          </Card>
        </View>
    </SafeAreaView>
  );
}

const GREEN = '#19a86a';
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
  },
  title: {
    fontSize: 14,
    width: 230,
    padding: 0,
    margin: 0,
    position: 'relative',
    textAlign: 'left',
  },
  address: {
    bottom: 1,
    fontSize: 15,
    textAlign: 'left',
  },
  date: {
    top: 1,
    fontSize: 15,
    textAlign: 'left',
  },
  time: {
    bottom: 8,
    fontSize: 12,
    textAlign: 'left',
  },
  description: {
    bottom: 3,
    fontSize: 15,
    textAlign: 'left',
  },
  heart: {
    position: 'relative',
    bottom: 250,
    left: 200,
    backgroundColor: 'white',
    scaleX: .75,
    scaleY: .75,
    },
    privacyicon:{
      position: 'relative',
      left: 30,
    },
    privacy: {
      position: 'relative',
      top: 13,
      left: 25,
    }
});

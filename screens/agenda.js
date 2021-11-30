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

export default function agenda({route, navigation}) {

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
        <ScrollView>
        <View
          style={{
            flexDirection: 'row',
          }}>
          <Card style={styles.card}>
            <Card.Content style={{flexDirection:'column'}}>
             <Paragraph 
             style={{
                 fontSize: 20,
                 justifyContent: 'center',
             }}
             >Breakfast At Tiffanys</Paragraph>
             <Divider/><Divider/><Divider/>
            </Card.Content >    
             <Card.Content style={{
               flexDirection:'column'}}>
             <Paragraph>A cannot miss event with Audrey Hepburn herself!</Paragraph>
             <Divider/><Divider/>
             <Paragraph>Location: 123 Cary Grant ave</Paragraph>
             <Paragraph style={{
              color: Colors.grey600,
             }}>Start time: 7:00am     End Time: 8:00am</Paragraph>
             <Divider/><Divider/>
             <Card.Content style={{
               flexDirection:'row',
               position: 'relative',
                top: 20,
                left: 50,
               }}>
             <IconButton
              icon="navigation"
              color={ORANGE}
              size={40}
              onPress={() => {
                console.log('reported');
              }}
            />
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
              icon="alert-octagon"
              color={Colors.red500}
              size={40}
              onPress={() => {
                Alert.alert(
                  'Event Report',
                  'Thank you for reporting the event. Our staff will look into it',
                );
              }}
            />
              </Card.Content>
            </Card.Content>
          </Card>
        </View>
        <Divider />
        <Divider />
        <Divider />
        <Divider />
        <Divider />
        <Divider />
        <Divider />
        <View
          style={{
            flexDirection: 'row',
          }}>
          <Card style={styles.card}>
            <Card.Content style={{flexDirection:'column'}}>
             <Paragraph 
             style={{
                 fontSize: 20,
                 justifyContent: 'center',
             }}
             >Charades</Paragraph>
             <Divider/><Divider/><Divider/>
            </Card.Content >    
             <Card.Content style={{
               flexDirection:'column'}}>
             <Paragraph>Cary Grant will be in person to present how to fall in love with a damsel while working undercover</Paragraph>
             <Divider/><Divider/>
             <Paragraph>Location: 987 Audrey Hepburn Way</Paragraph>
             <Paragraph style={{
              color: Colors.grey600,
             }}>Start time: 10:30am     End Time: 11:00am</Paragraph>
             <Divider/><Divider/>
             <Card.Content style={{
               flexDirection:'row',
               position: 'relative',
                top: 20,
                left: 50,
               }}>
             <IconButton
              icon="navigation"
              color={ORANGE}
              size={40}
              onPress={() => {
                console.log('reported');
              }}
            />
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
              icon="alert-octagon"
              color={Colors.red500}
              size={40}
              onPress={() => {
                Alert.alert(
                  'Event Report',
                  'Thank you for reporting the event. Our staff will look into it',
                );
              }}
            />
              </Card.Content>
            </Card.Content>
          </Card>
        </View>
        <Divider />
        <Divider />
        <Divider />
        <Divider />
        <Divider />
        <Divider />
        <Divider />
        <View
          style={{
            flexDirection: 'row',
          }}>
          <Card style={styles.card}>
            <Card.Content style={{flexDirection:'column'}}>
             <Paragraph 
             style={{
                 fontSize: 20,
                 justifyContent: 'center',
             }}
             >Love In The Afternoon</Paragraph>
             <Divider/><Divider/><Divider/>
            </Card.Content >    
             <Card.Content style={{
               flexDirection:'column'}}>
             <Paragraph>Maurice Chevalier is hosting a talk about the ins and outs of working as a private investigator</Paragraph>
             <Divider/><Divider/>
             <Paragraph>1792 Eiffel Tower Court</Paragraph>
             <Paragraph style={{
              color: Colors.grey600,
             }}>Start time: 4:00am     End Time: 5:00am</Paragraph>
             <Divider/><Divider/>
             <Card.Content style={{
               flexDirection:'row',
               position: 'relative',
                top: 20,
                left: 50,
               }}>
             <IconButton
              icon="navigation"
              color={ORANGE}
              size={40}
              onPress={() => {
                console.log('reported');
              }}
            />
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
              icon="alert-octagon"
              color={Colors.red500}
              size={40}
              onPress={() => {
                Alert.alert(
                  'Event Report',
                  'Thank you for reporting the event. Our staff will look into it',
                );
              }}
            />
              </Card.Content>
            </Card.Content>
          </Card>
        </View>
        <Divider />
        <Divider />
        <Divider />
        <Divider />
        <Divider />
        <Divider />
        <Divider />
        <View
          style={{
            flexDirection: 'row',
          }}>
          <Card style={styles.card}>
            <Card.Content style={{flexDirection:'column'}}>
             <Paragraph 
             style={{
                 fontSize: 20,
                 justifyContent: 'center',
             }}
             >Wait Until Dark</Paragraph>
             <Divider/><Divider/><Divider/>
            </Card.Content >    
             <Card.Content style={{
               flexDirection:'column'}}>
             <Paragraph>A blowout party hosted by the man himself Efrem Zimbalist Jr. </Paragraph>
             <Divider/><Divider/>
             <Paragraph>Location: 4 St.Lukes Place</Paragraph>
             <Paragraph
             style={{
              color: Colors.grey600,
             }}>Start time: 9:00pm     End Time: 12:00am</Paragraph>
             <Divider/><Divider/>
             <Card.Content style={{
               flexDirection:'row',
               position: 'relative',
                top: 20,
                left: 50,
               }}>
             <IconButton
              icon="navigation"
              color={ORANGE}
              size={40}
              onPress={() => {
                console.log('reported');
              }}
            />
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
              icon="alert-octagon"
              color={Colors.red500}
              size={40}
              onPress={() => {
                Alert.alert(
                  'Event Report',
                  'Thank you for reporting the event. Our staff will look into it',
                );
              }}
            />
              </Card.Content>
            </Card.Content>
          </Card>
        </View>
        <Divider />
        <Divider />
        <Divider />
        <Divider />
        <Divider />
        <Divider />
        <Divider />
        <View style={{padding: 20}} />
        </ScrollView>
        </View>
</>
    )
}

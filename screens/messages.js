import React, {useEffect, useState} from 'react';
import {SliderBox} from 'react-native-image-slider-box';
import {View, StyleSheet, Modal, Alert, Text} from 'react-native';
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
import { Header } from 'react-native/Libraries/NewAppScreen';

export default function messages({route, navigation}) {

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
              color={BLUE}
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
                 fontSize: 12,
                 justifyContent: 'center',
             }}
             >Mark</Paragraph>
            </Card.Content >    
             <Card.Content style={{
               flexDirection:'column',
               backgroundColor: 'gray',
               width: 220,
               borderRadius: 30,
               marginLeft: 10,
               fontSize: 10,
               }}>
             <Paragraph 
             style={{
                 marginTop: 10,
                 marginLeft: 5,
             }}
             >How many people can I expect to see there?</Paragraph>
              </Card.Content>
          </Card>
        </View>
        <View
          style={{
            flexDirection: 'row',
          }}>
          <Card style={styles.card}>
            <Card.Content style={{flexDirection:'column'}}>
             <Paragraph 
             style={{
                 fontSize: 12,
                 justifyContent: 'center',
             }}
             >Ryan</Paragraph>
            </Card.Content >    
             <Card.Content style={{
               flexDirection:'column',
               backgroundColor: 'gray',
               width: 220,
               borderRadius: 30,
               marginLeft: 10,
               fontSize: 10,
               }}>
             <Paragraph 
             style={{
                 marginTop: 10,
                 marginLeft: 5,
             }}
             >I plan on getting there at the very least 15 minutes early</Paragraph>
              </Card.Content>
          </Card>
        </View>
        <View
          style={{
            flexDirection: 'row',
          }}>
          <Card style={styles.card}>
            <Card.Content style={{flexDirection:'column'}}>
             <Paragraph 
             style={{
                 fontSize: 12,
                 justifyContent: 'center',
             }}
             >Gerald</Paragraph>
            </Card.Content >    
             <Card.Content style={{
               flexDirection:'column',
               backgroundColor: 'gray',
               width: 220,
               borderRadius: 30,
               marginLeft: 10,
               fontSize: 10,
               }}>
             <Paragraph 
             style={{
                 marginTop: 10,
                 marginLeft: 5,
             }}
             >I can't wait!</Paragraph>
              </Card.Content>
          </Card>
        </View>
        <View
          style={{
            flexDirection: 'row',
          }}>
          <Card style={styles.card}>
            <Card.Content style={{
                flexDirection:'column',
                position: 'relative',
                left: 290,                
                }}>
             <Paragraph 
             style={{
                 fontSize: 12,
                 justifyContent: 'center',
             }}
             >Me (Baboya)</Paragraph>
            </Card.Content >    
             <Card.Content style={{
               flexDirection:'row',
               backgroundColor: '#ADD8E6',
               width: 220,
               borderRadius: 30,
               marginLeft: 10,
               fontSize: 10,
               position: 'relative',
                left: 150,            
               }}>
             <Paragraph 
             style={{
                 marginTop: 10,
                 marginLeft: 5,
             }}
             >I'll see all of you there</Paragraph>
              </Card.Content>
          </Card>
          
        </View>
        <View
          style={{
            flexDirection: 'row',
          }}>
          <Card style={styles.card}>
            <Card.Content style={{flexDirection:'column'}}>
             <Paragraph 
             style={{
                 fontSize: 12,
                 justifyContent: 'center',
             }}
             >Brice</Paragraph>
            </Card.Content >    
             <Card.Content style={{
               flexDirection:'column',
               backgroundColor: 'gray',
               width: 220,
               borderRadius: 30,
               marginLeft: 10,
               fontSize: 10,
               }}>
             <Paragraph 
             style={{
                 marginTop: 10,
                 marginLeft: 5,
             }}
             >Honestly I thought this event already happened...</Paragraph>   
              </Card.Content>
          </Card>  
        </View>
        <View
          style={{
            flexDirection: 'row',
          }}>
          <Card style={styles.card}>
            <Card.Content style={{flexDirection:'column'}}>
            </Card.Content >    
            <View
            style={{
                marginTop: 90,
            }}>
            <Divider/><Divider/><Divider/><Divider/><Divider/><Divider/>
            </View>
             <Card.Content style={{
               flexDirection:'column',
               backgroundColor: 'gray',
               width: 370,
               borderRadius: 10,
               marginTop: 5,
               marginLeft: 10,
               fontSize: 12,
               }}>
             <Paragraph 
             style={{
                 marginTop: 10,
                 marginLeft: 60,
                 fontSize: 18,
                 position: 'relative',
                 top: 3,
             }}
             >Type your next message</Paragraph>   
              </Card.Content>
          </Card>  
        </View>
        </ScrollView>
        <View>
        </View>
        </View>
</>
    )
}

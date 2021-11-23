import React from 'react';
import {
  StyleSheet,
  View,
  SafeAreaView,
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

export default function InfoCard() {

  return (
    <SafeAreaView style={styles.container}>
      
        <View>
        <Card style={styles.card}>
            <Card.Title 
                style={styles.header}
                title='Robotics Competition'
            />
            <Card.Content style={styles.content}>
            <Paragraph 
                style={styles.location}>
                {'Patrick F. Taylor Hall'}
              </Paragraph>
              <Paragraph 
                style={styles.address}>
                {'123 WherePFTIs Dr'}
              </Paragraph>
              <Paragraph 
                style={styles.subaddress}>
                {'Baton Rouge, LA 70803'}
              </Paragraph>
              <Paragraph 
                style={styles.category}>
                {'Robotics'}
              </Paragraph>
                <Card.Content style={{flexDirection: 'row'}}>
                <IconButton
                icon="map-marker"
                size={40}
              />
             <IconButton
                icon="map-search"
                size={40}
              />
              <IconButton
                icon="information-outline"
                size={40}
              />
                </Card.Content>
            </Card.Content>
          </Card>
          <Card style={styles.card}>
            <Card.Title 
                style={styles.header}
                title='Robotics Competition'
            />
            <Card.Content style={styles.content}>
            <Paragraph 
                style={styles.location}>
                {'Patrick F. Taylor Hall'}
              </Paragraph>
              <Paragraph 
                style={styles.address}>
                {'123 WherePFTIs Dr'}
              </Paragraph>
              <Paragraph 
                style={styles.subaddress}>
                {'Baton Rouge, LA 70803'}
              </Paragraph>
              <Paragraph 
                style={styles.category}>
                {'Robotics'}
              </Paragraph>
                <Card.Content style={{flexDirection: 'row'}}>
                <IconButton
                icon="map-marker"
                size={40}
              />
             <IconButton
                icon="map-search"
                size={40}
              />
              <IconButton
                icon="information-outline"
                size={40}
              />
                </Card.Content>
            </Card.Content>
          </Card>
          <Card style={styles.card}>
            <Card.Title 
                style={styles.header}
                title='Robotics Competition'
            />
            <Card.Content style={styles.content}>
            <Paragraph 
                style={styles.location}>
                {'Patrick F. Taylor Hall'}
              </Paragraph>
              <Paragraph 
                style={styles.address}>
                {'123 WherePFTIs Dr'}
              </Paragraph>
              <Paragraph 
                style={styles.subaddress}>
                {'Baton Rouge, LA 70803'}
              </Paragraph>
              <Paragraph 
                style={styles.category}>
                {'Robotics'}
              </Paragraph>
                <Card.Content style={{flexDirection: 'row'}}>
                <IconButton
                icon="map-marker"
                size={40}
              />
             <IconButton
                icon="map-search"
                size={40}
              />
              <IconButton
                icon="information-outline"
                size={40}
              />
                </Card.Content>
            </Card.Content>
          </Card>
          <Card style={styles.card}>
            <Card.Title 
                style={styles.header}
                title='Robotics Competition'
            />
            <Card.Content style={styles.content}>
            <Paragraph 
                style={styles.location}>
                {'Patrick F. Taylor Hall'}
              </Paragraph>
              <Paragraph 
                style={styles.address}>
                {'123 WherePFTIs Dr'}
              </Paragraph>
              <Paragraph 
                style={styles.subaddress}>
                {'Baton Rouge, LA 70803'}
              </Paragraph>
              <Paragraph 
                style={styles.category}>
                {'Robotics'}
              </Paragraph>
                <Card.Content style={{flexDirection: 'row'}}>
                <IconButton
                icon="map-marker"
                size={40}
              />
             <IconButton
                icon="map-search"
                size={40}
              />
              <IconButton
                icon="information-outline"
                size={40}
              />
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
  },
  header: {
    fontSize: 14,
    width: 230,
    padding: 0,
    left: 25,
  },
  location: {
    bottom: 1,
    fontSize: 15,
    textAlign: 'center',
  },
  address: {
    top: 1,
    fontSize: 18,
    textAlign: 'center',
  },
  subaddress: {
    bottom: 8,
    fontSize: 12,
    textAlign: 'center',
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
  }
});

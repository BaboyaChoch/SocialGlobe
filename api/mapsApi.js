import {firebase as fb_firestore} from '@react-native-firebase/firestore';
import {firebase as fb_authenticator} from '@react-native-firebase/auth';
const current_user = fb_authenticator.auth().currentUser;
const db = fb_firestore.firestore();

export function getAnEvent(eventId, eventRecieved) {
  if (current_user != null && current_user != undefined) {
    const docRef = db.collection('Events').doc(`${eventId}`);
    docRef
      .get()
      .then(doc => {
        if (doc.exists) {
          eventRecieved(doc.data());
        } else {
          // doc.data() will be undefined in this case
          console.log('No such document!');
        }
      })
      .catch(error => {
        console.log('Error getting document:', error);
      });
  }
}

export function addEvent(event, eventAdded) {
  event.eventId = firebase.firestore().collection('tmp').doc().id;
  firebase
    .firestore()
    .collection('Events')
    .doc(event.eventId)
    .add(event)
    .then(snapshot => snapshot.get())
    .then(eventData => eventAdded(eventData.data()))
    .catch(err => console.log(err));
}

export default function filerData() {
  /**
   * get all events
   * sort all events by coordinates
   * events that share the same location are grouped as so
   * coordinates with one event act as normal
   * coordinates with multiple events need to open a new page with a list of events at the location
   * return this new list
   */
}

function checkLocationAvailability() {
  /**
   * checks if there is an event in the same locaton
   * with the same time
   */
}

export async function getEvents(eventsRecieved) {
  let eventsList = [];
  let snapshot = await db.collection('Events').orderBy('eventId').get();

  snapshot.forEach(res => {
    eventsList.push(res.data());
  });
  //console.log('events:', eventsList);
  eventsRecieved(eventsList);
}

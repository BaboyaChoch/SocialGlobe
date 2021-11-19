import {firebase} from '@react-native-firebase/firestore';

export function addEvent(event, eventAdded) {
  event.eventId = firebase.firestore().collection('tmp').doc().id;
  firebase
    .firestore()
    .collection('Events')
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
  let snapshot = await firebase
    .firestore()
    .collection('Events')
    .orderBy('eventId')
    .get();

  snapshot.forEach(res => {
    eventsList.push(res.data());
  });
  //console.log('events:', eventsList);
  eventsRecieved(eventsList);
}

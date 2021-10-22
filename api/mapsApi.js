import {firebase} from '@react-native-firebase/firestore';

export function addEvent(event) {
  event.eventId = firebase.firestore().collection('tmp').doc().id;
  firebase
    .firestore()
    .collection('Events')
    .add(event)
    .then(snapshot => snapshot.get())
    .then(eventData => eventData.data())
    .catch(err => console.log(err));
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

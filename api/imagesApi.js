import storage from '@react-native-firebase/storage';
import {firebase as authenticator} from '@react-native-firebase/auth';
const current_user_id =
  authenticator.auth().currentUser == null
    ? null
    : authenticator.auth().currentUser.uid;

export default async function getEventPhoto(eventId, photRecieved) {
  try {
    const imageLocation = `images/${current_user_id}/${eventId}/event_photo1`;
    const url = await storage().ref(imageLocation).getDownloadURL();
    console.log(url);
    photRecieved(url);
  } catch (err) {
    console.log('Error while retrievin event photo: ', err);
  }
}

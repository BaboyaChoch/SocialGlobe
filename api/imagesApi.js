import storage from '@react-native-firebase/storage';
import {firebase as authenticator} from '@react-native-firebase/auth';

export default async function getEventPhoto(
  eventId,
  eventUserId,
  photRecieved,
) {
  try {
    const imageLocation = `images/${eventUserId}/${eventId}/event_photo1`;
    const url = await storage().ref(imageLocation).getDownloadURL();

    photRecieved(url);
  } catch (err) {
    console.log('Error while retrievin event photo: ', err);
  }
}

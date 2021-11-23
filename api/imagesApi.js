import storage from '@react-native-firebase/storage';
import {firebase as authenticator} from '@react-native-firebase/auth';
const current_user_id =
  authenticator.auth().currentUser == null
    ? null
    : authenticator.auth().currentUser.uid;

export default async function getEventPhoto(eventId) {
  const imageLocation = `images/${current_user_id}/${eventId}/eventPhoto1`;
  const url = await storage().ref(imageLocation).getDownloadURL();
  return url;
}

import {firebase as fb_firestore} from '@react-native-firebase/firestore';
import {firebase as fb_authenticator} from '@react-native-firebase/auth';
const current_user = fb_authenticator.auth().currentUser;

function addToBookmark(userBookmarks) {
  if (current_user != null && current_user != undefined) {
    fb_firestore
      .firestore()
      .collection('Bookmarks')
      .doc(current_user.uid)
      .set(userBookmarks)
      .then(username => console.log(username))
      .catch(err => console.log(err));
  }
}

export default function addToUserBookmarks(eventId) {
  console.log('first function:', eventId, current_user.uid);
  getUserBookmarks(addToBookmark, eventId);
}

export async function getUserBookmarks(bookmarksRecieved, eventId = null) {
  if (current_user != null && current_user != undefined) {
    let userBookmarksList = [];
    let snapshot = await fb_firestore
      .firestore()
      .collection('Bookmarks')
      .where(firebase.firestore.FieldPath.documentId(), '==', current_user.uid)
      .get();

    snapshot.forEach(res => {
      userBookmarksList.push(res.data());
    });

    if (eventId != null) {
      console.log('sec function:', [...userBookmarksList, eventId]);
      bookmarksRecieved([...userBookmarksList, eventId]);
    } else {
      bookmarksRecieved(userBookmarksList);
    }
  }
}

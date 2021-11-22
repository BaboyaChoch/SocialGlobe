import {firebase as fb_firestore} from '@react-native-firebase/firestore';
import {firebase as fb_authenticator} from '@react-native-firebase/auth';
import {getAnEvent} from './mapsApi';
const current_user = fb_authenticator.auth().currentUser;
const db = fb_firestore.firestore();
let bookmarkedEventsList = [];
let current_event = null;
const handleBookMarks = list => {
  addToBookmark([...list, current_event]);
};

export function getUserBookmarks(bookmarksRecived) {
  if (current_user != null && current_user != undefined) {
    const docRef = db.collection('Bookmarks').doc(`${current_user.uid}`);
    docRef
      .get()
      .then(doc => {
        if (doc.exists) {
          const results = doc.data().user_bookmarks;
          if (results == undefined || results == null) {
            bookmarksRecived([]);
          } else {
            bookmarksRecived(results);
          }
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

export async function getAllBookmarkEvents(bookmarks, eventsRecieved) {
  let eventsList = [];

  let snapshot = await db
    .collection('Events')
    .where(fb_firestore.firestore.FieldPath.documentId(), 'in', bookmarks)
    .get();

  snapshot.forEach(res => eventsList.push(res.data()));

  eventsRecieved(eventsList);
}

export function addToBookmark(bookmark) {
  if (current_user != null && current_user != undefined) {
    const docRef = db.collection('Bookmarks').doc(`${current_user.uid}`);
    docRef.update({
      user_bookmarks: bookmark,
    });
  }
}

export function addToUserBookmarks(eventId) {
  current_event = eventId;
  getUserBookmarks(handleBookMarks);
}

// export async function getUserBookmarks(bookmarksRecieved, eventId = null) {
//   if (current_user != null && current_user != undefined) {
//     let userBookmarksList = [];
//     let snapshot = await fb_firestore
//       .firestore()
//       .collection('Bookmarks')
//       .where(firebase.firestore.FieldPath.documentId(), '==', current_user.uid)
//       .get();

//     snapshot.forEach(res => {
//       userBookmarksList.push(res.data());
//     });

//     if (eventId != null) {
//       console.log('sec function:', [...userBookmarksList, eventId]);
//       bookmarksRecieved([...userBookmarksList, eventId]);
//     } else {
//       bookmarksRecieved(userBookmarksList);
//     }
//   }
// }
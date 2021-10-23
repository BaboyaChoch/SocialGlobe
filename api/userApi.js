import {firebase} from '@react-native-firebase/firestore';

export function addName(username) {
  firebase
    .firestore()
    .collection('Names')
    .add({
      name: username.name,
    })
    .then(username => console.log(username))
    .catch(err => console.log(err));
}

export async function getName(nameRecieved) {
  let namesList = [];
  let snapshot = await firebase
    .firestore()
    .collection('Names')
    .orderBy('name')
    .get();

  snapshot.forEach(res => {
    namesList.push(res.data());
  });

  nameRecieved(namesList);
}

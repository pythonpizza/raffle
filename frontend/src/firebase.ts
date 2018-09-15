import * as firebase from 'firebase';

firebase.initializeApp({
    apiKey: '',
    authDomain: '',
    databaseURL: '',
    projectId: '',
    storageBucket: '',
    messagingSenderId: '',
});

firebase.firestore().settings({
    timestampsInSnapshots: true,
});

export default firebase;

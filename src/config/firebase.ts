import firebase from 'firebase';

const firebaseConfig = {
  apiKey: 'AIzaSyAqupSLF6p-ZHefDZPzc2jG_PgvsC79yOU',
  authDomain: 'portfolio-projects-ca987.firebaseapp.com',
  projectId: 'portfolio-projects-ca987',
  storageBucket: 'portfolio-projects-ca987.appspot.com',
  messagingSenderId: '344189018954',
  appId: '1:344189018954:web:5411289059f33aece2d7b3',
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();
const projectStorage = firebase.storage();

export { auth, db, projectStorage };

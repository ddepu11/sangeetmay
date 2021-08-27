import firebase from 'firebase/app';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyAqupSLF6p-ZHefDZPzc2jG_PgvsC79yOU',
  authDomain: 'portfolio-projects-ca987.firebaseapp.com',
  projectId: 'portfolio-projects-ca987',
  storageBucket: 'portfolio-projects-ca987.appspot.com',
  messagingSenderId: '344189018954',
  appId: '1:344189018954:web:5411289059f33aece2d7b3',
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);

const auth = app.auth();

export { auth };

// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDloTGyOFWk3CU-c1jzH50TfqofwxxXSeI',
  authDomain: 'test-project-df01e.firebaseapp.com',
  projectId: 'test-project-df01e',
  storageBucket: 'test-project-df01e.appspot.com',
  messagingSenderId: '37139701115',
  appId: '1:37139701115:web:c3144bfe55ecac4aaff1de',
};

// Initialize Firebase
initializeApp(firebaseConfig);
export default getFirestore();

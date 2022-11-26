// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyD7XiwfdZCzK0JeXZRcnjYhdjFsLpjmAmo',
  authDomain: 'series-tracker-app.firebaseapp.com',
  projectId: 'series-tracker-app',
  storageBucket: 'series-tracker-app.appspot.com',
  messagingSenderId: '709823631497',
  appId: '1:709823631497:web:d1c7b3559bfdcb705d7658',
}

// Initialize Firebase
initializeApp(firebaseConfig)
export const db = getFirestore()

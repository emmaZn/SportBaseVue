import firebase from 'firebase'
import 'firebase/auth'
import 'firebase/storage'


const config = {
  apiKey: "AIzaSyCTk3EG6jR9oN8MgeaSkeGIiEoPoRSp144",
  authDomain: "sportbase-38151.firebaseapp.com",
  projectId: "sportbase-38151",
  storageBucket: "sportbase-38151.appspot.com",
  messagingSenderId: "329953458846",
  appId: "1:329953458846:web:98fbb33715430d1aa4998f",
  measurementId: "G-XN6ZS185C2"
}

!firebase.apps.length ? firebase.initializeApp(config) : ''
export const GoogleProvider = new firebase.auth.GoogleAuthProvider()
export const auth = firebase.auth()
export default firebase

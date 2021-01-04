import firebase from 'firebase/app'
import 'firebase/firestore'
import "firebase/storage";
import "firebase/auth";
// import firebaseui from 'firebaseui';

// let db;
// try {
//   const config = {
//         apiKey: process.env.FIREBASE_API_KEY,
//         authDomain: process.env.FIREBASE_AUTH_DOMAIN,
//         databaseURL: process.env.FIREBASE_DATABASE_URL,
//         projectId: process.env.FIREBASE_PROJECT_ID,
//         storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
//         messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
//         appId: process.env.FIREBASE_APP_ID,
//         measurementId: process.env.FIREBASE_MEASUREMENT_ID
//     };
//     // firebase.initializeApp(config);
//     if (firebase.apps.length === 0) {
//       firebase.initializeApp(config);
//     }

//     // Firestoreインスタンスを作成
//     db = firebase.firestore();
//   } catch (error) {
//     console.log(error);
//   }

const config = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
  measurementId: process.env.FIREBASE_MEASUREMENT_ID
};
// firebase.initializeApp(config);
if (firebase.apps.length === 0) {
  firebase.initializeApp(config);
}

  // export const ui = new firebaseui.auth.AuthUI(firebase.auth());
  // ui.start('#firebaseui-auth-container', {
    // signInOptions: [
      // firebase.auth.EmailAuthProvider.PROVIDER_ID
    // ],
    // Other config options...
  // });
  export const storage = firebase.storage();
  export const db = firebase.firestore();
  export const auth = firebase.auth();
  // module.exports = {
  //   // 本来、initializeAppによる初期化は一度きりのため、
  //   // 初期化の結果のみを切り出してexportする
  //   db,
  //   storage,
  //   auth
  // };
  export default firebase;


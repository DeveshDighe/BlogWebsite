import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage'
import { getAuth } from 'firebase/auth'

firebase.initializeApp({
    apiKey: "AIzaSyCCYoVUiyk2RngIYObPH_oCMNT1IXR7gOk",
    authDomain: "myblogweb-bc9f1.firebaseapp.com",
    projectId: "myblogweb-bc9f1",
    messagingSenderId: "650836863373",
    appId: "1:650836863373:web:8549252fa1264be6f775c4",
    measurementId: "G-Y519PPBZR0",
    storageBucket: "myblogweb-bc9f1.appspot.com"
});


const fb = firebase;

const auth = getAuth();

export { auth };

export default fb;
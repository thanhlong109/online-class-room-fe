import { initializeApp } from 'firebase/app';
//import { getAnalytics } from 'firebase/analytics';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: 'AIzaSyCoJGK5tLlnPTNsja1Kc-uxYxir1_DRIpM',
    authDomain: 'estudyhub-a1699.firebaseapp.com',
    projectId: 'estudyhub-a1699',
    storageBucket: 'estudyhub-a1699.appspot.com',
    messagingSenderId: '201130768752',
    appId: '1:201130768752:web:8d876eeb757027c376b7b5',
    measurementId: 'G-DEL5SJ10H5',
};

const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
export const firebaseStorage = getStorage(app);

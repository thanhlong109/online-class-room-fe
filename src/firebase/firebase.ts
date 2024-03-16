import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';

const firebaseConfig = {
    apiKey: import.meta.env.VITE_API_KEY,
    authDomain: import.meta.env.VITE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_APP_ID,
    measurementId: import.meta.env.VITE_MEASUREMENT_ID,
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const firebaseStorage = getStorage(app);

// firebase cloud message

const messaging = getMessaging(app);

export const getMessagingToken = async (setTokenFound: (arg0: boolean) => void) => {
    return getToken(messaging, {
        vapidKey:
            'BML4xtDJ-rSvYE7AJRQf1pntO3bP0hbwM6_ViT7b0Hv-5dFx0-MRRo17NrxCqSFFNOhIAZs5Wzekh1aey0j2dPI',
    })
        .then((currentToken) => {
            if (currentToken) {
                console.log('current token for client: ', currentToken);
                setTokenFound(true);
                if (localStorage.getItem('deviceToken') === null) {
                    localStorage.setItem('deviceToken', currentToken);
                }
            } else {
                console.log('No registration token available. Request permission to generate one.');
                setTokenFound(false);
            }
        })
        .catch((err) => {
            console.log('An error occurred while retrieving token. ', err);
        });
};

export const onMessageListener = () =>
    new Promise((resolve) => {
        onMessage(messaging, (payload) => {
            resolve(payload);
        });
    });

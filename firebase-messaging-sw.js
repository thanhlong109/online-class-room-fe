// Scripts for firebase and firebase messaging
// eslint-disable-next-line no-undef
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js');
// eslint-disable-next-line no-undef
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js');

// Initialize the Firebase app in the service worker by passing the generated config
const firebaseConfig = {
    apiKey: 'AIzaSyCoJGK5tLlnPTNsja1Kc-uxYxir1_DRIpM',
    authDomain: 'estudyhub-a1699.firebaseapp.com',
    projectId: 'estudyhub-a1699',
    storageBucket: 'estudyhub-a1699.appspot.com',
    messagingSenderId: '201130768752',
    appId: '1:201130768752:web:8d876eeb757027c376b7b5',
    measurementId: 'G-DEL5SJ10H5',
};

// eslint-disable-next-line no-undef
firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
// eslint-disable-next-line no-undef
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
    console.log('Received background message ', payload);

    const notificationTitle = payload.notification.title;
    const notificationOptions = {
        body: payload.notification.body,
    };

    // eslint-disable-next-line no-restricted-globals
    self.registration.showNotification(notificationTitle, notificationOptions);
});

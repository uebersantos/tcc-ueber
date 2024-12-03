const admin = require('firebase-admin');
const serviceAccountFirebaseConfig = require('../../firebaseConfig.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccountFirebaseConfig),
  // databaseURL: process.env.FIREBASE_DATABASE_URL,
});

const firestore = admin.firestore();
module.exports = firestore;
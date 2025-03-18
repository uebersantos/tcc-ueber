const admin = require('firebase-admin');
const serviceAccountFirebaseConfig = require('../../firebaseConfig.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccountFirebaseConfig),
});

const firestore = admin.firestore();
module.exports = firestore;
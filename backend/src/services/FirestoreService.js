const firestore = require('../config/firebaseConfig');

class FirestoreService {
  static async getUserDocumentByKey(pKey) {
    const collectionRef = firestore.collection('users');
    try {
      const snapshot = await collectionRef.where('key', '==', pKey).get();
      if (snapshot.empty) {
        console.log(`[getDocumentByKey] Documento com a key ${pKey} não encontrado`);
        return null;
      }
      let result = null;
      snapshot.forEach(doc => {
        result = { id: doc.id, ...doc.data() };
      });
      return result;
    } catch (error) {
      console.error('[getDocumentByKey] Error getting document by key:', error);
      return null;
    }
  }

  static async storeInHistoryByKey(pKey, data) {
    const collectionRef = firestore.collection('severity-assessment');
    try {
      const snapshot = await collectionRef.where('key', '==', pKey).get();
      if (snapshot.empty) {
        console.log('[storeInHistory] Documento com a key ${pKey} não encontrado');
        return null;
      }
      let docId = null;
      snapshot.forEach(doc => {
        docId = doc.id;
      });
      if (docId) {
        const docRef = collectionRef.doc(docId);
        const historyCollectionRef = docRef.collection('historico');
        const timestampInMillis = Date.now();
        await historyCollectionRef.doc(timestampInMillis.toString()).set({
          ...data,
          created_at: timestampInMillis
        });
        return true;
      } else {
        return null;
      }
    } catch (error) {
      console.error('[storeInHistory] Error storing data in history:', error);
      return null;
    }
  }
}

module.exports = FirestoreService;
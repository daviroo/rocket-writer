const functions = require('firebase-functions');

// The Firebase Admin SDK to access the Firebase Realtime Database.
const admin = require('firebase-admin');

exports.syncDocumentList = functions.region('europe-west1').firestore
    .document('accounts/{accountId}/documents/{documentId}')
    .onWrite(async (change, context) => {
      if(!change.after.exists){
        // Delete Event
        await admin.firestore().collection(`accounts/${context.params.accountId}/documentList`).doc(`${context.params.documentId}`).delete();
        return;
      }
var doc;
      const title = change.after.data().title;
      doc = await admin.firestore().collection(`accounts/${context.params.accountId}/documentList`).doc(`${context.params.documentId}`).set({
          title: title,
          lastUpdated: admin.firestore.FieldValue.serverTimestamp()
      });
    });

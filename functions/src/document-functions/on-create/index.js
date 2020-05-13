const functions = require('firebase-functions');

// The Firebase Admin SDK to access the Firebase Realtime Database.
const admin = require('firebase-admin');

exports.createDocument = functions.firestore
    .document('accounts/{accountId}/documents/{documentId]')
    .onCreate(async (snap, context) => {
      // Get an object representing the document
      // e.g. {'name': 'Marie', 'age': 66}
      const newValue = snap.data();

      // access a particular field as you would any JS property
      const title = newValue.title;

      await admin.firestore().collection(`accounts/${context.params.accountId}/documentList`).doc(`${documentId}`).create({
          title: title,
          lastUpdated: admin.firestore.FieldValue.serverTimestamp()
      });
    });

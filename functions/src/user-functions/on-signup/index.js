const functions = require('firebase-functions');

// The Firebase Admin SDK to access the Firebase Realtime Database.
const admin = require('firebase-admin');
admin.initializeApp();

exports.onUserSignup = functions.region('europe-west1').auth.user().onCreate(async (user) => {
    const account = await admin.firestore().collection("accounts").add({
        users: {
            [user.uid]: {
                role: "admin"
            }
        }
    })
    await admin.firestore().collection("users").doc(user.uid).set({
        account: account.id
    })
  });
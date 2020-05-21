const functions = require('firebase-functions');

// The Firebase Admin SDK to access the Firebase Realtime Database.
const admin = require('firebase-admin');

exports.calculateSeoScore = functions.region('europe-west1').firestore
    .document('accounts/{accountId}/documents/{documentId}')
    .onWrite(async (change, context) => {
      if(change.after.exists){
  // [START language_syntax_text]
  // Imports the Google Cloud client library
  const language = require('@google-cloud/language');

  // Creates a client
  const client = new language.LanguageServiceClient();
  const text = change.after.data().body.map(section => section.type === "paragraph" ? section.children.map(leaf => leaf.text) : "");

  // Prepares a document, representing the provided text
  const document = {
    content: text,
    type: 'PLAIN_TEXT',
  };

  // Need to specify an encodingType to receive word offsets
  const encodingType = 'UTF8';

  // Detects the sentiment of the document
  const [syntax] = await client.analyzeSyntax({document, encodingType});

  console.log("language:")
  console.log(syntax.language)
  console.log("sentences:")
  console.log(syntax.sentences)
  console.log('Tokens:');
  syntax.tokens.forEach(part => {
      console.log(`${part.dependencyEdge.headTokenIndex}: ${part.dependencyEdge.label}: ${syntax.tokens[part.dependencyEdge.headTokenIndex].text.content}`)
    console.log(`${part.partOfSpeech.tag}: ${part.text.content}`);
    console.log('Morphology:', part.partOfSpeech);
    console.log('lemma:', part.lemma)
  });
  // [END language_syntax_text]
      }
    });

const functions = require("firebase-functions");

// The Firebase Admin SDK to access the Firebase Realtime Database.
const admin = require("firebase-admin");

exports.calculateSeoScore = functions
  .region("europe-west1")
  .firestore.document("accounts/{accountId}/documents/{documentId}")
  .onWrite(async (change, context) => {
    if (change.after.exists) {
      // [START language_syntax_text]
      // Imports the Google Cloud client library
      const language = require("@google-cloud/language");

      // Creates a client
      const client = new language.LanguageServiceClient();
      const text = change.after
        .data()
        .body.map((section) =>
          section.type === "paragraph"
            ? section.children.map((leaf) => leaf.text)
            : ""
        );

      // Prepares a document, representing the provided text
      const document = {
        content: text,
        type: "PLAIN_TEXT",
      };

      // Need to specify an encodingType to receive word offsets
      const encodingType = "UTF8";

      // Detects the sentiment of the document
      const [syntax] = await client.analyzeSyntax({ document, encodingType });
      const results = [];
      let sentenceCount = 0;
      syntax.tokens.forEach((part) => {
          results.push({
              text: part.text.content,
              beginOffset: part.text.beginOffset,
              label: part.dependencyEdge.label,
              linkedWordBeginOffset: syntax.tokens[part.dependencyEdge.headTokenIndex].text.beginOffset,
              sentence: sentenceCount
          })
          if (part.text.content === "." || part.text.content === "!" || part.text.content === "?"){
              sentenceCount = ++sentenceCount;
          }
      });
      console.log(results)
    }
  });

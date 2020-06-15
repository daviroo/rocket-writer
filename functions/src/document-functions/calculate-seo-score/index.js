const functions = require("firebase-functions");
const stringSimilarity = require("string-similarity");
// The Firebase Admin SDK to access the Firebase Realtime Database.
const admin = require("firebase-admin");

// how close does the ROOT of sentence have to be to the end of the sentence to trigger a warning
const HARD_TO_READ_SENTENCE_RATIO = 0.5;
const VERY_HARD_TO_READ_SENTENCE_RATIO = 0.8;

const END_SENTENCE_CHARACTERS = [".", "!", "?"];

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
      const paragraphs = change.after
        .data()
        .body.filter((section) => section.type === "paragraph");
      var text = "";
      paragraphs.forEach((section) =>
        section.children.forEach(
          (leaf) => (text = text.concat(leaf.text))
        )
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

      const sentences = [];
      var sentenceCount = 0;
      var adverbCount = 0;
      var passiveVoiceCount = 0;
      const hardToReadSentences = [];
      const veryHardToReadSentences = [];
      const tooManyAdverbsSentences = [];
      const tooManyPassiveVoiceSentences = [];
      console.log(syntax.sentences)

      syntax.tokens.forEach((part) => {
        if (!sentences[sentenceCount]) {
          sentences[sentenceCount] = [];
        }
        sentences[sentenceCount].push({
          text: part.text.content,
          beginOffset: part.text.beginOffset,
          label: part.dependencyEdge.label,
          linkedWordBeginOffset:
            syntax.tokens[part.dependencyEdge.headTokenIndex].text.beginOffset,
        });

        if(["ADV","ADVCL","ADVMOD"].includes(part.dependencyEdge.label)){
            adverbCount = ++adverbCount;
        }

        if(["PASSIVE"].includes(part.partOfSpeech.voice)){
            passiveVoiceCount = ++passiveVoiceCount;
        }
        if (isEndOfSentence(part)) {
          if (!isEndOfSentenceCharactersRepeating(sentences, sentenceCount)) {
            const currentSentence = sentences[sentenceCount];
            const matchedSentences = stringSimilarity.findBestMatch(
              currentSentence
                .map((wordAttritubes) => wordAttritubes.text)
                .join(" "),
              syntax.sentences.map(
                (parsedSentences) => parsedSentences.text.content
              )
            );

            if(adverbCount > 2){
                tooManyAdverbsSentences.push(matchedSentences.bestMatch.target)
            }
            
            if(passiveVoiceCount > 2){
                tooManyPassiveVoiceSentences.push(matchedSentences.bestMatch.target)
            }
            
            if (matchedSentences.bestMatch.rating >= 0.9) {
              // if we can't accurately match a sentence then we probably won't analyze correctly.
              const sentenceWordLength = currentSentence.length;
              const rootWordPosition = currentSentence.findIndex(
                (wordAttributes) => wordAttributes.label === "ROOT"
              );
              const rootWordPositionInSentence =
                rootWordPosition / sentenceWordLength;

              const isVeryHardToReadSentence =
                rootWordPositionInSentence >= VERY_HARD_TO_READ_SENTENCE_RATIO;

              if (isVeryHardToReadSentence) {
                veryHardToReadSentences.push({
                  sentence: matchedSentences.bestMatch.target,
                  rootWordPosition: rootWordPosition,
                  rootWord: currentSentence.find(
                    (wordAttributes) => wordAttributes.label === "ROOT"
                  ).text,
                });
              } else {
                const isHardToReadSentence =
                  rootWordPositionInSentence >= HARD_TO_READ_SENTENCE_RATIO;
                if (isHardToReadSentence) {
                  hardToReadSentences.push({
                    sentence: matchedSentences.bestMatch.target,
                    rootWordPosition: rootWordPosition,
                    rootWord: currentSentence.find(
                      (wordAttributes) => wordAttributes.label === "ROOT"
                    ).text,
                  });
                }
              } 
            }
            sentenceCount = ++sentenceCount;
            adverbCount = 0;
            passiveVoiceCount = 0;
          }
        }
      });
      const warnings = {
        hardToReadSentences: hardToReadSentences,
        veryHardToReadSentences: veryHardToReadSentences,
        tooManyAdverbsSentences: tooManyAdverbsSentences,
        tooManyPassiveVoiceSentences: tooManyPassiveVoiceSentences
      };
      console.log(warnings);
      await admin.firestore().collection(`accounts/${context.params.accountId}/documentWarnings`).doc(`${context.params.documentId}`).set(warnings);
    }
  });

function isEndOfSentence(part) {
  return END_SENTENCE_CHARACTERS.includes(part.text.content);
}

function isEndOfSentenceCharactersRepeating(sentences, sentenceCount) {
  return (
    sentences[++sentenceCount] &&
    END_SENTENCE_CHARACTERS.includes(sentences[++sentenceCount].text)
  );
}

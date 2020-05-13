import { put, takeLatest, select } from "redux-saga/effects";
import {
  refreshReadibilityStatsSuccess,
  refreshReadibilityStatsFailed,
} from "../actions/ReadibilityActions";
import { UPDATE_DOCUMENT_CONTENT } from "../actions/EditorActions";

function* refreshStats(action) {
  try {
    const editorState = yield select(
      (state) => state.documentState.content.body
    );
    var charCounter = 0;
    var wordCounter = 0;
    var sentenceCounter = 0;
    var paragraphCounter = 0;
    editorState.forEach((section) => {
      section.children.forEach((child) => {
        charCounter = charCounter + child.text.length;
        wordCounter =
          wordCounter +
          (child.text.match(/[\w-]+/g) == null
            ? 0
            : child.text.match(/[\w-]+/g).length);
        if (section.type === "paragraph") {
          sentenceCounter =
            sentenceCounter +
            (child.text.match(/[\w|)][.?!:](\s|$)/g) == null
              ? 0
              : child.text.match(/[\w|)][.?!:](\s|$)/g).length);
        }
      });
      if (
        section.type === "paragraph" &&
        !section.children.every((child) => child.text.length === 0)
      ) {
        paragraphCounter += 1;
      }
    });

    yield put(
      refreshReadibilityStatsSuccess({
        charCount: charCounter,
        wordCount: wordCounter,
        sentenceCount: sentenceCounter,
        paragraphCount: paragraphCounter,
      })
    );
  } catch (e) {
      console.log(e)
    yield put(refreshReadibilityStatsFailed(e.message));
  }
}

export default function* readibilitySaga() {
  yield takeLatest(UPDATE_DOCUMENT_CONTENT, refreshStats);
}

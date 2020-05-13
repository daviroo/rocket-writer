import {
  REFRESH_READIBILITY_STATS,
  REFRESH_READIBILITY_STATS_SUCCESS,
  REFRESH_READIBILITY_STATS_FAILED,
  UPDATE_CHAR_COUNT,
  UPDATE_WORD_COUNT,
  UPDATE_SENTENCE_COUNT,
  UPDATE_PARAGRAPH_COUNT,
} from "../actions/ReadibilityActions";

const initialState = {
  refreshingReadibilityStats: false,
  stats: {
    charCount: 0,
    wordCount: 0,
    sentenceCount: 0,
    paragraphCount: 0,
  },
  refreshError: null,
};

export default function readibilityReducer(state = initialState, action) {
  switch (action.type) {
    case REFRESH_READIBILITY_STATS:
      return { ...state, refreshingReadibilityStats: true };
    case REFRESH_READIBILITY_STATS_SUCCESS:
      return { ...state, refreshingReadibilityStats: false, stats: action.payload };
    case REFRESH_READIBILITY_STATS_FAILED:
      return {
        ...state,
        refreshingReadibilityStats: false,
        refreshError: action.payload,
      };
    case UPDATE_CHAR_COUNT:
      return { ...state, stats: { ...state.stats, charCount: action.payload } };
    case UPDATE_WORD_COUNT:
      return { ...state, stats: { ...state.stats, wordCount: action.payload } };
    case UPDATE_SENTENCE_COUNT:
      return {
        ...state,
        stats: { ...state.stats, sentenceCount: action.payload },
      };
    case UPDATE_PARAGRAPH_COUNT:
      return {
        ...state,
        stats: { ...state.stats, paragraphCount: action.payload },
      };
    default:
      return state;
  }
}

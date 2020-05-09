import {
    REFRESH_READIBILITY_STATS,
    REFRESH_READIBILITY_STATS_SUCCESS,
    REFRESH_READIBILITY_STATS_FAILED,
  } from "../actions/ReadibilityActions";

  const initialState = { refreshingReadibilityStats: false, stats: {
    charCount: 0, 
    wordCount: 0, 
    sentenceCount: 0, 
    paragraphCount: 0
  },
    refreshError: null}
  
  export default function readibilityReducer(state = initialState, action) {
    switch (action.type) {
      case REFRESH_READIBILITY_STATS:
        return { ...state, refreshingReadibilityStats: true };
      case REFRESH_READIBILITY_STATS_SUCCESS:
        return { ...state, refreshingReadibilityStats: false, stats: action.payload };
      case REFRESH_READIBILITY_STATS_FAILED:
        return { ...state, refreshingReadibilityStats: false, refreshError: action.payload };
      default:
        return state;
    }
  }
  
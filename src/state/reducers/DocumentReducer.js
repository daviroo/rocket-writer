import {
  UPDATE_DOCUMENT_CONTENT,
  ADD_KEYWORD,
  REMOVE_KEYWORD,
  UPDATE_DOCUMENT_ID,
  SHOW_TITLE_REQUIRED,
  SET_TITLE,
  LOAD_DOCUMENT,
  LOAD_DOCUMENT_SUCCESS,
  LOAD_DOCUMENT_FAILED,
  RESET_EDITOR_STATE,
  UPDATE_DOCUMENT_WARNINGS,
  UPDATE_SELECTED_WARNING_SENTENCE,
} from "../actions/EditorActions";

const initialState = {
  id: "",
  content: {
    title: "",
    body: [
      {
        type: "paragraph",
        children: [{ text: "" }],
      },
    ],
    keywords: [],
  },
  titleRequired: false,
  loading: false,
  componentError: null,
  warnings: {},
  selectedWarningSentence: ""
};

export default function documentReducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_DOCUMENT_CONTENT:
      return { ...state, content: { ...state.content, body: action.payload } };
    case UPDATE_DOCUMENT_ID:
      return {...state, id: action.payload}
    case ADD_KEYWORD:
      return {
        ...state,
        content: {
          ...state.content,
          keywords: action.payload,
        },
      };
    case REMOVE_KEYWORD:
      return {
        ...state,
        content: {
          ...state.content,
          keywords:  action.payload,
        },
      };
    case SET_TITLE:
      return {...state, content: {...state.content, title: action.payload}, titleRequired: false}
    case SHOW_TITLE_REQUIRED:
      return {...state, titleRequired: true}
    case LOAD_DOCUMENT:
      return {...state, loading: true}
    case LOAD_DOCUMENT_SUCCESS:
      return {...state, loading: false, content: action.payload.content, id: action.payload.id}
    case LOAD_DOCUMENT_FAILED:
      return {...state, loading: false, componentError: action.payload}
    case RESET_EDITOR_STATE:
      return {...state, ...initialState}
    case UPDATE_DOCUMENT_WARNINGS:
      return {...state, warnings: action.payload}
    case UPDATE_SELECTED_WARNING_SENTENCE:
      return {...state, selectedWarningSentence: action.payload}
    default:
      return state;
  }
}

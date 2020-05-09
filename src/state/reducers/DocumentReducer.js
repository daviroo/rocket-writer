import {
  UPDATE_DOCUMENT_CONTENT,
  ADD_KEYWORD,
  REMOVE_KEYWORD,
} from "../actions/EditorActions";

const initialState = {
  content: {
    id: "",
    title: "",
    body: [
      {
        type: "paragraph",
        children: [{ text: "" }],
      },
    ],
    keywords: [],
  },
};

export default function documentReducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_DOCUMENT_CONTENT:
      return { ...state, content: { ...state.content, body: action.payload } };
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
    default:
      return state;
  }
}

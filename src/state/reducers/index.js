import documentReducer from "./DocumentReducer";
import readibilityReducer from "./ReadibilityReducer";
import documentListReducer from "./DocumentListReducer";
import { authReducer } from "./AuthReducer";

export default function reducers(state = {}, action) {
  return {
    documentState: documentReducer(state.documentState, action),
    readibilityState: readibilityReducer(state.readibilityState, action),
    documentListState: documentListReducer(state.documentListState, action),
    authState: authReducer(state.authState, action)
  };
}

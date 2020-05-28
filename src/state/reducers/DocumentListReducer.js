import { UPDATE_DOCUMENT_LIST, RESET_DOCUMENT_LIST_STATE, ADD_DOC_TO_DOC_LIST } from "../actions/DocumentListActions";
import { LOGOUT_SUCCESS } from "../actions/AuthActions";
import { DELETE_DOCUMENT_SUCCESS } from "../actions/EditorActions";

const initialState = {
    docs: []
}
export default function documentListReducer(state = initialState, action){
    switch(action.type){
        case UPDATE_DOCUMENT_LIST:
            return {...state, docs: action.payload};
        case DELETE_DOCUMENT_SUCCESS:
            return {...state, docs: state.docs.filter(doc => doc.id !== action.payload)}
        case ADD_DOC_TO_DOC_LIST:
            return {...state, docs: state.docs.concat([action.payload])}
        case RESET_DOCUMENT_LIST_STATE:
            return {...state, ...initialState}
        default:
            return state
    }
}
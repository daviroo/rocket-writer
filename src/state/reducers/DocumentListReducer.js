import { UPDATE_DOCUMENT_LIST, RESET_DOCUMENT_LIST_STATE } from "../actions/DocumentListActions";
import { LOGOUT_SUCCESS } from "../actions/AuthActions";

const initialState = {
    docs: []
}
export default function documentListReducer(state = initialState, action){
    switch(action.type){
        case UPDATE_DOCUMENT_LIST:
            return {...state, docs: action.payload};
        case RESET_DOCUMENT_LIST_STATE:
            return {...state, ...initialState}
        default:
            return state
    }
}
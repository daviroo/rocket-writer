import { UPDATE_DOCUMENT_LIST } from "../actions/DocumentListActions";

const initialState = {
    docs: []
}
export default function documentListReducer(state = initialState, action){
    switch(action.type){
        case UPDATE_DOCUMENT_LIST:
            return {...state, docs: action.payload};
        default:
            return state
    }
}
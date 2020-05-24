export const UPDATE_DOCUMENT_LIST = "UPDATE_DOCUMENT_LIST";
export function updateDocumentList(payload){
    return {
        type: UPDATE_DOCUMENT_LIST,
        payload: payload
    }
}

export const UPDATE_DOCUMENT_LIST_SUCCESS = "UPDATE_DOCUMENT_LIST_SUCCESS";
export function updateDocumentListSuccess(){
    return {
        type: UPDATE_DOCUMENT_LIST_SUCCESS
    }
}

export const UPDATE_DOCUMENT_LIST_FAILED = "UPDATE_DOCUMENT_LIST_FAILED";
export function updateDocumentListFailed(payload){
    return {
        type: UPDATE_DOCUMENT_LIST_FAILED,
        payload: payload
    }
}

export const SUBSCRIBE_TO_DOCUMENT_LIST = "SUBSCRIBE_TO_DOCUMENT_LIST";
export function subscribeToDocumentList(){
    return {
        type: SUBSCRIBE_TO_DOCUMENT_LIST
    }
}

export const UNSUBSCRIBE_FROM_DOCUMENT_LIST = "UNSUBSCRIBE_FROM_DOCUMENT_LIST";
export function unsubscribeFromDocumentList(){
    return {
        type: UNSUBSCRIBE_FROM_DOCUMENT_LIST
    }
}

export const RESET_DOCUMENT_LIST_STATE = "RESET_DOCUMENT_LIST_STATE";
export function resetDocumentListState(){
    return {
        type: RESET_DOCUMENT_LIST_STATE
    }
}

export const ADD_DOC_TO_DOC_LIST = "ADD_DOC_TO_DOC_LIST";
export function addDocToDocList(payload){
    return {
        type: ADD_DOC_TO_DOC_LIST,
        payload: payload
    }
}
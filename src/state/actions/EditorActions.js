export const UPDATE_DOCUMENT_CONTENT = "UPDATE_DOCUMENT_CONTENT";
export function updateDocumentContent(payload){
    return {
        type: UPDATE_DOCUMENT_CONTENT,
        payload: payload
    }
}

export const UPDATE_DOCUMENT_CONTENT_SUCCESS = "UPDATE_DOCUMENT_CONTENT_SUCCESS"
export function updateDocumentContentSuccess(){
    return {
        type: UPDATE_DOCUMENT_CONTENT_SUCCESS
    }
}

export const UPDATE_DOCUMENT_CONTENT_FAILED = "UPDATE_DOCUMENT_CONTENT_FAILED";
export function updateDocumentContentFailed(payload){
    return {
        type: UPDATE_DOCUMENT_CONTENT_FAILED,
        payload: payload
    }
}

export const UPDATE_DOCUMENT_ID = "UPDATE_DOCUMENT_ID";
export function updateDocumentId(payload){
    return {
        type: UPDATE_DOCUMENT_ID,
        payload: payload
    }
}

export const UPDATE_DOCUMENT_ID_SUCCESS = "UPDATE_DOCUMENT_ID_SUCCESS";
export function updateDocumentIdSuccess(){
    return {
        type: UPDATE_DOCUMENT_ID_SUCCESS
    }
}

export const UPDATE_DOCUMENT_ID_FAILED = "UPDATE_DOCUMENT_ID_FAILED";
export function updateDocumentIdFailed(){
    return {
        type: UPDATE_DOCUMENT_ID_FAILED
    }
}

export const SAVE_DOCUMENT = "SAVE_DOCUMENT";
export function saveDocument(payload){
    return {
        type: SAVE_DOCUMENT,
        payload: payload
    }
}

export const SAVE_DOCUMENT_SUCCESS = "SAVE_DOCUMENT_SUCCESS";
export function saveDocumentSuccess(){
    return {
        type: SAVE_DOCUMENT_SUCCESS
    }
}

export const SAVE_DOCUMENT_FAILED = "SAVE_DOCUMENT_FAILED";
export function saveDocumentFailed(payload){
    return {
        type: SAVE_DOCUMENT_FAILED,
        payload: payload
    }
}

export const ADD_KEYWORD = "ADD_KEYWORD";
export function addKeyword(payload){
    return {
        type: ADD_KEYWORD,
        payload: payload
    }
}

export const REMOVE_KEYWORD = "REMOVE_KEYWORD";
export function removeKeyword(payload){
    return {
        type: REMOVE_KEYWORD,
        payload: payload
    }
}
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
export function saveDocument(){
    return {
        type: SAVE_DOCUMENT
    }
}

export const SAVE_DOCUMENT_SUCCESS = "SAVE_DOCUMENT_SUCCESS";
export function saveDocumentSuccess(payload){
    return {
        type: SAVE_DOCUMENT_SUCCESS,
        payload: payload
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

export const SHOW_TITLE_REQUIRED = "SHOW_TITLE_REQUIRED";
export function showTitleRequired(){
    return {
        type: SHOW_TITLE_REQUIRED
    }
}

export const SET_TITLE = "SET_TITLE";
export function setTitle(payload){
    return {
        type: SET_TITLE,
        payload: payload
    }
}

export const LOAD_DOCUMENT = "LOAD_DOCUMENT";
export function loadDocument(payload){
    return {
        type: LOAD_DOCUMENT,
        payload: payload
    }
}

export const LOAD_DOCUMENT_SUCCESS = "LOAD_DOCUMENT_SUCCESS";
export function loadDocumentSuccess(payload){
    return {
        type: LOAD_DOCUMENT_SUCCESS,
        payload: payload
    }
}

export const LOAD_DOCUMENT_FAILED = "LOAD_DOCUMENT_FAILED";
export function loadDocumentFailed(payload){
    return {
        type: LOAD_DOCUMENT_FAILED,
        payload: payload
    }
}

export const RESET_EDITOR_STATE = "RESET_EDITOR_STATE";
export function resetEditorState(){
    return {
        type: RESET_EDITOR_STATE
    }
}

export const DELETE_DOCUMENT = "DELETE_DOCUMENT";
export function deleteDocument(payload){
    return{
        type: DELETE_DOCUMENT,
        payload: payload
    }
}

export const DELETE_DOCUMENT_SUCCESS = "DELETE_DOCUMENT_SUCCESS";
export function deleteDocumentSuccess(payload){
    return{
        type: DELETE_DOCUMENT_SUCCESS,
        payload: payload
    }
}

export const DELETE_DOCUMENT_FAILED = "DELETE_DOCUMENT_FAILED";
export function deleteDocumentFailed(payload){
    return{
        type: DELETE_DOCUMENT_FAILED,
        payload: payload
    }
}

export const UPDATE_DOCUMENT_WARNINGS = "UPDATE_DOCUMENT_WARNINGS";
export function updateDocumentWarnings(payload){
    return {
        type: UPDATE_DOCUMENT_WARNINGS,
        payload: payload
    }
}

export const UPDATE_SELECTED_WARNING_SENTENCE = "UPDATE_SELECTED_WARNING_SENTENCE";
export function updateSelectedWarningSentence(payload){
    return {
        type: UPDATE_SELECTED_WARNING_SENTENCE,
        payload: payload
    }
}
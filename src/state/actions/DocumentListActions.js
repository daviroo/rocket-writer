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
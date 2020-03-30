export function updateEditorContent(payload) {
    return {
        type: 'UPDATE_EDITOR_CONTENT',
        payload: payload
    }
}

export function updateEditorState(payload) {
    return {
        type: 'UPDATE_EDITOR_STATE',
        payload: payload
    }
}
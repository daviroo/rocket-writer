import * as EditorActions from '../actions/EditorActions'
const MainReducer = (state, action) => {
console.log(action)
  switch(action.type){
        case EditorActions.updateEditorContent().type:
            return {...state, editorContent: action.payload}
        case EditorActions.updateEditorState().type:
            return {...state, editorState: action.payload}
        default:
            return {...state}
  }
}

export default MainReducer
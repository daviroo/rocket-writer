import * as EditorActions from '../actions/EditorActions'
import * as UserActions from '../actions/UserActions';

const MainReducer = (state, action) => {
  switch(action.type){
        case EditorActions.updateEditorState().type:
            return {...state, editorState: action.payload }
        case UserActions.userLoggedIn().type:
            return {...state, authenticated: true, showLoginScreen: false}
        case UserActions.userLoggedOut().type:
            return {...state, authenticated: false}
        case UserActions.showLoginScreen().type:
            return {...state, showLoginScreen: true}
        case UserActions.hideLoginScreen().type:
            return {...state, showLoginScreen: false}
        default:
            return {...state}
  }
}

export default MainReducer
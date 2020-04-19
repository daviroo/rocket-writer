
import { List } from 'immutable';

const InitialState = {
    editorState: null,
    documentList: List(),
    documentListLength: 0,
    authenticated: false,
    showLoginScreen: false
}

export default InitialState;
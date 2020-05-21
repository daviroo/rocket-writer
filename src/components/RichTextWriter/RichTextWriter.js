import React, { useCallback, useMemo } from 'react'
import isHotkey from 'is-hotkey'
import { Editable, withReact, Slate } from 'slate-react'
import { Editor, createEditor } from 'slate'
import { withHistory } from 'slate-history'
import RichTextWriterStyles from './RichTextWriterStyles';
import {TextField} from "@material-ui/core";
import KeyboardEventHandler from 'react-keyboard-event-handler';
import { shallowEqual, useSelector, useDispatch } from 'react-redux'
import { updateDocumentContent, setTitle } from '../../state/actions/EditorActions'
import CircularProgress from "@material-ui/core/CircularProgress";
import Toolbar from '../toolbar/Toolbar'

const HOTKEYS = {
  'mod+b': 'bold',
  'mod+i': 'italic',
  'mod+u': 'underline',
  'mod+`': 'code',
}

const LIST_TYPES = ['numbered-list', 'bulleted-list']

const RichTextWriter = () => {
  const classes = RichTextWriterStyles();
  const renderElement = useCallback(props => <Element {...props} />, [])
  const renderLeaf = useCallback(props => <Leaf {...props} />, [])
  const editor = useMemo(() => withHistory(withReact(createEditor())), [])
  const editorState = useSelector((state) => state.documentState, shallowEqual);
  const user = useSelector(state => state.authState.user, shallowEqual);
  const dispatch = useDispatch()

  if(editorState.loading){
    return(<div className={classes.spinner}>
      <CircularProgress />
    </div>);
  }

  return (
    <Slate editor={editor} value={editorState.content.body} onChange={value => dispatch(updateDocumentContent(value))} >
      <div className={classes.root}>
        <div className="text-editor-components">
      <Toolbar />
      <KeyboardEventHandler
    handleKeys={['tab']}
    onKeyEvent={(key, e) => {
      e.preventDefault()
      handleTab(editor)
      }} >
      <Editable
        className="editable"
        renderElement={renderElement}
        renderLeaf={renderLeaf}
        placeholder="Start writing your document"
        spellCheck
        autoFocus
        onKeyDown={event => {
          for (const hotkey in HOTKEYS) {
            if (isHotkey(hotkey, event)) {
              event.preventDefault()
              const mark = HOTKEYS[hotkey]
              toggleMark(editor, mark)
            }
          }
        }}
      />
      </KeyboardEventHandler>
      </div>
      </div>
    </Slate>
  )
}

const handleTab = (editor) => {
  editor.insertText("\t");
}

const isMarkActive = (editor, format) => {
  const marks = Editor.marks(editor)
  return marks ? marks[format] === true : false
}

const toggleMark = (editor, format) => {
  const isActive = isMarkActive(editor, format)

  if (isActive) {
    Editor.removeMark(editor, format)
  } else {
    Editor.addMark(editor, format, true)
  }
}



const Element = ({ attributes, children, element }) => {
  switch (element.type) {
    case 'block-quote':
      return <blockquote {...attributes}>{children}</blockquote>
    case 'bulleted-list':
      return <ul {...attributes}>{children}</ul>
    case 'heading-one':
      return <h1 {...attributes}>{children}</h1>
    case 'heading-two':
      return <h2 {...attributes}>{children}</h2>
    case 'list-item':
      return <li {...attributes}>{children}</li>
    case 'numbered-list':
      return <ol {...attributes}>{children}</ol>
    default:
      return <p {...attributes}>{children}</p>
  }
}

const Leaf = ({ attributes, children, leaf }) => {
  if (leaf.bold) {
    children = <strong>{children}</strong>
  }

  if (leaf.code) {
    children = <code>{children}</code>
  }

  if (leaf.italic) {
    children = <em>{children}</em>
  }

  if (leaf.underline) {
    children = <u>{children}</u>
  }

  return <span {...attributes}>{children}</span>
}

export default RichTextWriter
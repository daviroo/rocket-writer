import React, { useCallback, useMemo } from 'react'
import isHotkey from 'is-hotkey'
import { Editable, withReact, useSlate, Slate } from 'slate-react'
import { Editor, Transforms, createEditor } from 'slate'
import { withHistory } from 'slate-history'
import RichTextWriterStyles from './RichTextWriterStyles';
import {FormatListNumbered, List, Save} from '@material-ui/icons';
import {Button, TextField} from "@material-ui/core";
import KeyboardEventHandler from 'react-keyboard-event-handler';
import { shallowEqual, useSelector, useDispatch } from 'react-redux'
import { updateDocumentContent, saveDocument, showTitleRequired, setTitle } from '../../state/actions/EditorActions'
import { showLoginScreen } from '../../state/actions/AuthActions';
import CircularProgress from "@material-ui/core/CircularProgress";

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
    <TextField 
    fullWidth 
    placeholder="Title" 
    className={classes.titleInput} 
    onChange={event => dispatch(setTitle(event.target.value))}
    error={editorState.titleRequired}
    helperText={editorState.titleRequired ? "Please enter a title" : ""}
    value={editorState.content.title}
    />
      <div className={classes.root}>
      <Button
        color="primary"
        startIcon={<Save />}
        className={classes.saveButton}
        onClick={() => {
          if(!user){
            // not logged in
            dispatch(showLoginScreen())
            return;
          }
          if(!editorState.content.title){
            dispatch(showTitleRequired())
            return;
          }
          dispatch(saveDocument())
          }}
      >
        Save
      </Button>
      <div className={classes.toolbar}>
        <MarkButton format="bold" icon={<b>B</b>} />
        <MarkButton format="italic" icon={<i>I</i>} />
        <MarkButton format="underline" icon={<u>U</u>} />
        <MarkButton format="code" icon={<span>&lt;&gt;</span>} />
        <BlockButton format="heading-one" icon={<b>H1</b>} />
        <BlockButton format="heading-two" icon={<b>H2</b>} />
        <BlockButton format="block-quote" icon={<span>"</span>} />
        <BlockButton format="numbered-list" icon={<FormatListNumbered />} />
        <BlockButton format="bulleted-list" icon={<List />} />
      </div>
      <KeyboardEventHandler
    handleKeys={['tab']}
    onKeyEvent={(key, e) => {
      e.preventDefault()
      handleTab(editor)
      }} >
      <Editable
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
    </Slate>
  )
}

const handleTab = (editor) => {
  editor.insertText("\t");
}

const toggleBlock = (editor, format) => {
  const isActive = isBlockActive(editor, format)
  const isList = LIST_TYPES.includes(format)

  Transforms.unwrapNodes(editor, {
    match: n => LIST_TYPES.includes(n.type),
    split: true,
  })

  Transforms.setNodes(editor, {
    type: isActive ? 'paragraph' : isList ? 'list-item' : format,
  })

  if (!isActive && isList) {
    const block = { type: format, children: [] }
    Transforms.wrapNodes(editor, block)
  }
}

const toggleMark = (editor, format) => {
  const isActive = isMarkActive(editor, format)

  if (isActive) {
    Editor.removeMark(editor, format)
  } else {
    Editor.addMark(editor, format, true)
  }
}

const isBlockActive = (editor, format) => {
  const [match] = Editor.nodes(editor, {
    match: n => n.type === format,
  })
  return !!match
}

const isMarkActive = (editor, format) => {
  const marks = Editor.marks(editor)
  return marks ? marks[format] === true : false
}

const BlockButton = ({ format, icon }) => {
  const editor = useSlate()
  const classes = RichTextWriterStyles();
  return (
    <Button
    className={isBlockActive(editor, format) ? classes.activeButton : classes.inactiveButton}
      onMouseDown={event => {
        event.preventDefault()
        toggleBlock(editor, format)
      }}
    >
    {icon}
    </Button>
  )
}

const MarkButton = ({ format, icon }) => {
  const editor = useSlate()
  const classes = RichTextWriterStyles();
  return (
    <Button
    className={isMarkActive(editor, format) ? classes.activeButton : classes.inactiveButton}
      onMouseDown={event => {
        event.preventDefault()
        toggleMark(editor, format)
      }}
    >
    {icon}
    </Button>
  )
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
import React, { useCallback, useMemo, useState, useContext } from 'react'
import { DispatchContext, StateContext } from "../..//state/StateProvider";
import isHotkey from 'is-hotkey'
import { Editable, withReact, useSlate, Slate } from 'slate-react'
import { Editor, Transforms, createEditor } from 'slate'
import { withHistory } from 'slate-history'
import RichTextWriterStyles from './RichTextWriterStyles';
import { updateEditorState } from '../../state/actions/EditorActions';
import {FormatListNumbered, List} from '@material-ui/icons';
import {Button} from "@material-ui/core";
import KeyboardEventHandler from 'react-keyboard-event-handler';

const HOTKEYS = {
  'mod+b': 'bold',
  'mod+i': 'italic',
  'mod+u': 'underline',
  'mod+`': 'code',
}

const LIST_TYPES = ['numbered-list', 'bulleted-list']

const RichTextWriter = () => {
  const classes = RichTextWriterStyles();
  const dispatch = useContext(DispatchContext);
  const { editorState } = useContext(StateContext);
  const renderElement = useCallback(props => <Element {...props} />, [])
  const renderLeaf = useCallback(props => <Leaf {...props} />, [])
  const editor = useMemo(() => withHistory(withReact(createEditor())), [])

  return (
    <Slate editor={editor} value={editorState} onChange={value => dispatch(updateEditorState(value))} >
      <div className={classes.root}>
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
        placeholder="Enter some rich text…"
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





const initialValue = [
  {
    type: 'paragraph',
    children: [
      { text: 'This is editable ' },
      { text: 'rich', bold: true },
      { text: ' text, ' },
      { text: 'much', italic: true },
      { text: ' better than a ' },
      { text: '<textarea>', code: true },
      { text: '!' },
    ],
  },
  {
    type: 'paragraph',
    children: [
      {
        text:
          "Since it's rich text, you can do things like turn a selection of text ",
      },
      { text: 'bold', bold: true },
      {
        text:
          ', or add a semantically rendered block quote in the middle of the page, like this:',
      },
    ],
  },
  {
    type: 'block-quote',
    children: [{ text: 'A wise quote.' }],
  },
  {
    type: 'paragraph',
    children: [{ text: 'Try it out for yourself!' }],
  },
]

export default RichTextWriter
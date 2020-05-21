import React from 'react';
import {useSlate} from 'slate-react'
import {FormatListNumbered, List} from '@material-ui/icons';
import {Button} from "@material-ui/core";
import { Editor, Transforms } from 'slate'
import ToolbarStyles from './ToolbarStyles';

const Toolbar = () => {
return(<div className="toolbar flex-col">
    <MarkButton format="bold" icon={<b>B</b>} />
    <MarkButton format="italic" icon={<i>I</i>} />
    <MarkButton format="underline" icon={<u>U</u>} />
    <MarkButton format="code" icon={<span>&lt;&gt;</span>} />
    <BlockButton format="heading-one" icon={<b>H1</b>} />
    <BlockButton format="heading-two" icon={<b>H2</b>} />
    <BlockButton format="block-quote" icon={<span>"</span>} />
    <BlockButton format="numbered-list" icon={<FormatListNumbered />} />
    <BlockButton format="bulleted-list" icon={<List />} />
  </div>)
}

const LIST_TYPES = ['numbered-list', 'bulleted-list']

const BlockButton = ({ format, icon }) => {
  const classes = ToolbarStyles();
    const editor = useSlate()
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
    const classes = ToolbarStyles();
    const editor = useSlate()
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

export default Toolbar;
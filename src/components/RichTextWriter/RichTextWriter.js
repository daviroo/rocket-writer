import React, { useCallback, useMemo } from "react";
import isHotkey from "is-hotkey";
import { Editable, withReact, Slate, ReactEditor } from "slate-react";
import { Editor, createEditor, Text } from "slate";
import { withHistory } from "slate-history";
import RichTextWriterStyles from "./RichTextWriterStyles";
import KeyboardEventHandler from "react-keyboard-event-handler";
import { shallowEqual, useSelector, useDispatch } from "react-redux";
import {
  updateDocumentContent,
  setTitle,
} from "../../state/actions/EditorActions";
import CircularProgress from "@material-ui/core/CircularProgress";
import Toolbar from "../toolbar/Toolbar";

const HOTKEYS = {
  "mod+b": "bold",
  "mod+i": "italic",
  "mod+u": "underline",
  "mod+`": "code",
};

const LIST_TYPES = ["numbered-list", "bulleted-list"];

const RichTextWriter = () => {
  const classes = RichTextWriterStyles();
  const renderElement = useCallback((props) => <Element {...props} />, []);
  const renderLeaf = useCallback((props) => <Leaf {...props} />, []);
  const editor = useMemo(() => withHistory(withReact(createEditor())), []);
  const editorState = useSelector((state) => state.documentState, shallowEqual);
  const dispatch = useDispatch();
  const {selectedWarningSentence} = editorState;
  const decorate = useCallback(
    ([node, path]) => {
      const ranges = []
          if (selectedWarningSentence && Text.isText(node)) {
        const { text } = node
        
        const textWithoutNewlines = text.replace(/\r?\n|\r/g, "")
        const parts = textWithoutNewlines.split(selectedWarningSentence)
        let offset = 0

        parts.forEach((part, i) => {
          if (i !== 0) {
            ranges.push({
              anchor: { path, offset: offset - text.length },
              focus: { path, offset },
              highlight: true,
            })
          }

          offset = offset + part.length + text.length
        })
      }

      return ranges
    },
    [selectedWarningSentence]
  )

  if (editorState.loading) {
    return (
      <div className={classes.spinner}>
        <CircularProgress />
      </div>
    );
  }

  return (
    <Slate
      editor={editor}
      value={editorState.content.body}
      onChange={(value) => dispatch(updateDocumentContent(value))}
    >
      <div className={classes.root}>
        <div className="text-editor-components">
          <Toolbar />
          <KeyboardEventHandler
            handleKeys={["tab"]}
            onKeyEvent={(key, e) => {
              e.preventDefault();
              handleTab(editor);
            }}
          >
            <Editable
              className="editable"
              renderElement={renderElement}
              renderLeaf={renderLeaf}
              placeholder="Start writing your document"
              spellCheck
              autoFocus
              onKeyDown={(event) => {
                for (const hotkey in HOTKEYS) {
                  if (isHotkey(hotkey, event)) {
                    event.preventDefault();
                    const mark = HOTKEYS[hotkey];
                    toggleMark(editor, mark);
                  }
                }
              }}
              decorate={decorate}
            />
          </KeyboardEventHandler>
        </div>
      </div>
    </Slate>
  );
};

const handleTab = (editor) => {
  editor.insertText("\t");
};

const isMarkActive = (editor, format) => {
  const marks = Editor.marks(editor);
  return marks ? marks[format] === true : false;
};

const toggleMark = (editor, format) => {
  const isActive = isMarkActive(editor, format);

  if (isActive) {
    Editor.removeMark(editor, format);
  } else {
    Editor.addMark(editor, format, true);
  }
};

const Element = ({ attributes, children, element }) => {
  switch (element.type) {
    case "block-quote":
      return <blockquote {...attributes}>{children}</blockquote>;
    case "bulleted-list":
      return <ul style={{
        backgroundColor: element.highlight && '#ffeeba'
      }} {...attributes}>{children}</ul>;
    case "heading-one":
      return <h1 style={{
        backgroundColor: element.highlight && '#ffeeba'
      }} {...attributes}>{children}</h1>;
    case "heading-two":
      return <h2 style={{
        backgroundColor: element.highlight && '#ffeeba'
      }} {...attributes}>{children}</h2>;
    case "list-item":
      return <li style={{
        backgroundColor: element.highlight && '#ffeeba'
      }} {...attributes}>{children}</li>;
    case "numbered-list":
      return <ol style={{
        backgroundColor: element.highlight && '#ffeeba'
      }} {...attributes}>{children}</ol>;
    default:
      return <p style={{
        backgroundColor: `${element.highlight && '#ffeeba'}`
      }} {...attributes}>{children}</p>;
  }
};

const Leaf = ({ attributes, children, leaf }) => {
  if (leaf.bold) {
    children = <strong style={{
      backgroundColor: leaf.highlight && '#ffeeba'
    }}>{children}</strong>;
  }
  if (leaf.code) {
    children = <code>{children}</code>;
  }

  if (leaf.italic) {
    children = <em>{children}</em>;
  }

  if (leaf.underline) {
    children = <u>{children}</u>;
  }

  return <span style={{
    backgroundColor: `${leaf.highlight && '#ffeeba'}`
  }} {...attributes}>{children}</span>;
};

export default RichTextWriter;

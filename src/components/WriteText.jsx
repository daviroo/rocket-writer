import React, { useContext } from "react";
import { DispatchContext, StateContext } from "../state/StateProvider";
import { updateEditorState } from "../state/actions/EditorActions";
import Editor from 'draft-js-plugins-editor';
import createRichButtonsPlugin from "draft-js-richbuttons-plugin";

const richButtonsPlugin = createRichButtonsPlugin();
/* import only the ones you need; all available shown */
const {
  // inline buttons
  ItalicButton,
  BoldButton,
  MonospaceButton,
  UnderlineButton,
  // block buttons
  ParagraphButton,
  BlockquoteButton,
  CodeButton,
  OLButton,
  ULButton,
  H1Button,
  H2Button,
  H3Button,
  H4Button,
  H5Button,
  H6Button
} = richButtonsPlugin;

function WriteText() {
  const { editorState } = useContext(StateContext);
  const dispatch = useContext(DispatchContext);
console.log(editorState)
  return (
    <>
      <div className="myToolbar">
        <BoldButton />
        <ItalicButton />
        <MonospaceButton />
        <UnderlineButton />

        <ParagraphButton />
        <BlockquoteButton />
        <CodeButton />
        <H1Button />
        <H2Button />
        <H3Button />
        <H4Button />
        <H5Button />
        <H6Button />
        <ULButton />
        <OLButton />
      </div>
      <Editor
        editorState={editorState}
        onChange={state => dispatch(updateEditorState(state))}
        plugins={[richButtonsPlugin]}
      />
    </>
  );
}

export default WriteText;

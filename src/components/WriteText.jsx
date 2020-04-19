import React, { useContext } from "react";
import { DispatchContext } from "../state/StateProvider";
import { SlateEditor, SlateToolbar, SlateContent } from 'slate-editor'
import { BoldPlugin, BoldButton } from '@slate-editor/bold-plugin'
import { ItalicPlugin, ItalicButton } from '@slate-editor/italic-plugin'
import { UnderlinePlugin, UnderlineButton } from '@slate-editor/underline-plugin'
import { StrikethroughPlugin, StrikethroughButton } from '@slate-editor/strikethrough-plugin'
import { AlignmentPlugin, AlignmentButtonBar } from '@slate-editor/alignment-plugin'
import { LinkPlugin, LinkButton } from '@slate-editor/link-plugin'
import { ListPlugin, ListButtonBar } from '@slate-editor/list-plugin'
import { FontFamilyPlugin, FontFamilyDropdown } from '@slate-editor/font-family-plugin'
import { FontSizePlugin, FontSizeInput } from '@slate-editor/font-size-plugin'
import { ColorPlugin, ColorButton, ColorStateModel } from '@slate-editor/color-plugin'
import { updateEditorState } from '../state/actions/EditorActions'
import { makeStyles } from "@material-ui/core/styles";

const fontSizePluginOptions = { initialFontSize: 16 }
const colorPluginOptions = new ColorStateModel().rgba({ r: 100, g: 100, b: 100, a: 1 }).gen()
const plugins = [
  AlignmentPlugin(),
  BoldPlugin(),
  ColorPlugin(),
  FontFamilyPlugin(),
  FontSizePlugin(fontSizePluginOptions),
  ItalicPlugin(),
  LinkPlugin(),
  ListPlugin(),
  StrikethroughPlugin(),
  UnderlinePlugin()
]

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(2),
    '& .header': {
      margin: "10px auto 15px",
      textAlign: "center"
    },
    '& .editor--root': {
      width: "100%",
      margin: "0 auto"
    },
    '& .editor--content': {
      margin: "0 auto",
      border: "1px solid #ccc",
      padding: ".2rem",
      height: "100%",
      '& > div': {
        minHeight: "200px"
      }
    },
    '& .editor--toolbar': {
      backgroundColor: "#0275d8",
      '> *': {
        float: "right"
      }
    },
    '& .footer': {
      float: "left",
      marginTop: "10px"
    }
  },
  dropdown: {
    position: 'relative',
    top: 1,
    backgroundColor: 'white',
    height: 38,
    paddingLeft: 20,
    border: '3px solid #0275d8',
    color: '#0275d8',
    margin: '0',
    WebkitAppearance: 'none',
    padding: '0 10px 0 15px'
  },
  input: {
    position: 'relative',
    top: 1,
    backgroundColor: 'white',
    borderRadius: 0,
    height: 16,
    margin: 0,
    color: '#0275d8',
    border: '3px solid #0275d8'
  }
}));

const classNames = {
  button: 'btn btn-primary not-rounded border border-gray',
  dropdown: 'select col-3 inline-block mx1 not-rounded',
  input: 'input col-3 inline-block mr1',
  lastButton: 'btn btn-primary not-rounded border border-gray linebreak'
}

const initialState = {
  document: {
    nodes: [{
      kind: 'block',
      type: 'paragraph',
      nodes: [{ kind: 'text', leaves: [{ text: '' }] }]
    }]
  }
};
function WriteText() {
  const dispatch = useContext(DispatchContext);
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <SlateEditor plugins={plugins} initialState={initialState} onChange={state => dispatch(updateEditorState(state.get('document')))} >
        <SlateToolbar>
          <BoldButton className={classNames.button}/>
          <ItalicButton className={classNames.button} />
          <UnderlineButton className={classNames.button} />
          <StrikethroughButton className={classNames.button} />
          <AlignmentButtonBar className={classNames.button} />
          <LinkButton className={classNames.button} />
          <ListButtonBar className={classNames.button} />
          <FontFamilyDropdown className={`${classNames.dropdown} ${classes.dropdown}`} />
          <FontSizeInput
            {...fontSizePluginOptions}
            className={`${classNames.input} ${classes.input}`}
          />
          <ColorButton
            className={classNames.button}
            initialState={colorPluginOptions}
            pickerDefaultPosition={{ x: -520, y: 17 }}
          />
        </SlateToolbar>

        <SlateContent />
      </SlateEditor>
      </div>
  );
}

export default WriteText;

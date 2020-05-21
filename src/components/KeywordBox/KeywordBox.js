import React from 'react'
import Chip from '@material-ui/core/Chip';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import KeywordBoxStyles from './KeywordBoxStyles';
import {useSelector, useDispatch} from 'react-redux';
import { addKeyword, removeKeyword } from '../../state/actions/EditorActions';
const KeywordBox = () => {
    const classes = KeywordBoxStyles();
    const keywords = useSelector(state => state.documentState.content.keywords);
    const dispatch = useDispatch();

    return (
        <div>
        <Autocomplete
        className={classes.autoCompleteBox}
        multiple
        id="tags-filled"
        freeSolo
        renderTags={(value, getTagProps) =>
          value.map((option, index) => (
            <Chip variant="outlined" label={option} {...getTagProps({ index })} />
          ))
        }
        value={keywords}
        onChange={(e, v, r) => {
          switch(r){
            case "create-option" || "select-option":
              dispatch(addKeyword(v))
              break;
            case "remove-option":
              dispatch(removeKeyword(v))
              break;
            case "clear":
              dispatch(removeKeyword([]))
              break;
            default:
              return;
          }

        }}
        options={[]}
        renderInput={(params) => (
          <TextField className={classes.textField} {...params} placeholder="Enter Keywords" />
        )}
      />
        </div>
    )
}

export default KeywordBox;
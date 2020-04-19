import React from 'react'
import Chip from '@material-ui/core/Chip';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import KeywordBoxStyles from './KeywordBoxStyles';

const KeywordBox = () => {
    const classes = KeywordBoxStyles();
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
        options={[]}
        renderInput={(params) => (
          <TextField {...params} variant="filled" placeholder="Targeted Keywords" />
        )}
      />
        </div>
    )
}

export default KeywordBox;
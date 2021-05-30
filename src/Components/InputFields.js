import React from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

const styles = {
    input: {
      margin: '18px 0px'
    }
}

const InputFields = (props) => {
    return (
    <div className="input-boxes">
    <form onSubmit={(e) => e.preventDefault()}>
      <TextField
      id="outlined-basic"
        fullWidth={true}
        style={styles.input}
        type="number"
        placeholder="Weight (kg)"
        onChange={props.onWeightChange}
        variant="outlined"
        
        />       
      <TextField
      id="outlined-basic"
        style={styles.input}
        fullWidth={true}
        type="number"
        onChange={props.onHeightChangeFt}
        placeholder="Height (Feet)"
        variant="outlined"
        />
        
      <TextField
      id="outlined-basic"
        style={styles.input}
        fullWidth={true}
        type="number"
        onChange={props.onHeightChangeIn}
        placeholder="Height (Inchs)"
        variant="outlined"
        />

      <RaisedButton
        type="submit"
        onClick={props.generateBMI} 
        className="raisedButton"
        fullWidth={true} > CALCULATE </RaisedButton>
    </form>
  </div>
    )
}

export default InputFields;
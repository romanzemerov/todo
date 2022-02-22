import { useState } from 'react';
import { TextField, Button, Checkbox } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const defaultState = { isCompleted: false, text: '' };

export const AddField = ({ onAdd }) => {
  const [state, setState] = useState(defaultState);

  const changeValueHandler = (e) => {
    const { name, value, checked } = e.target;

    setState((prev) => {
      return e.target.type === 'text'
        ? { ...prev, [name]: value }
        : { ...prev, [name]: checked };
    });
  };

  const clickButtonHandler = () => {
    if (!state.text.length) {
      return;
    }

    onAdd(state);
    setState(defaultState);
  };

  return (
    <div className="field">
      <Checkbox
        className="checkbox"
        icon={<RadioButtonUncheckedIcon />}
        checkedIcon={<CheckCircleIcon />}
        name={'isCompleted'}
        onChange={changeValueHandler}
      />
      <TextField
        placeholder="Введите текст задачи..."
        variant="standard"
        name={'text'}
        value={state.text}
        fullWidth
        onChange={changeValueHandler}
      />
      <Button onClick={clickButtonHandler}>
        <AddIcon />
      </Button>
    </div>
  );
};

import { Paper, Divider, Button, List, Tabs, Tab } from '@mui/material';
import { useReducer } from 'react';
import { AddField } from './components/AddField';
import { Item } from './components/Item';

const todos = [
  { id: 1, text: 'Задача 1', isCompleted: true },
  { id: 2, text: 'Задача 2', isCompleted: false },
  { id: 3, text: 'Задача 3', isCompleted: false },
];

const reducer = (state, { type, payload }) => {
  switch (type) {
    case 'ADD_TASK': {
      return [
        ...state,
        {
          id: state.at(-1).id + 1,
          text: payload.text,
          isCompleted: payload.isCompleted,
        },
      ];
    }
    case 'CHANGE_COMPLETED': {
      const idx = state.findIndex(({ id }) => id === payload);
      const newTodo = { ...state[idx], isCompleted: !state[idx].isCompleted };

      return [...state.slice(0, idx), newTodo, ...state.slice(idx + 1)];
    }
    default: {
      throw Error('Unknown action: ' + type);
    }
  }
};

function App() {
  const [state, dispatch] = useReducer(reducer, todos);

  const addTodoHandler = (todo) => {
    dispatch({ type: 'ADD_TASK', payload: todo });
  };

  const changeCompletedHandler = (id) => {
    dispatch({ type: 'CHANGE_COMPLETED', payload: id });
  };

  return (
    <div className="App">
      <Paper className="wrapper">
        <Paper className="header" elevation={0}>
          <h4>Список задач</h4>
        </Paper>
        <AddField onAdd={addTodoHandler} />
        <Divider />
        <Tabs value={0}>
          <Tab label="Все" />
          <Tab label="Активные" />
          <Tab label="Завершённые" />
        </Tabs>
        <Divider />
        <List>
          {state.map(({ id, text, isCompleted }) => {
            return (
              <Item
                key={id}
                id={id}
                text={text}
                isCompleted={isCompleted}
                onChangeCompleted={changeCompletedHandler}
              />
            );
          })}
        </List>
        <Divider />
        <div className="check-buttons">
          <Button>Отметить всё</Button>
          <Button>Очистить</Button>
        </div>
      </Paper>
    </div>
  );
}

export default App;

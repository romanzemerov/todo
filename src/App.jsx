import { Paper, Divider, Button, List, Tabs, Tab } from '@mui/material';
import { useReducer, useState } from 'react';
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
    case 'REMOVE_TODO': {
      return state.filter((obj) => obj.id !== payload);
    }
    case 'REVERT_ALL_TASKS': {
      if (state.every((obj) => obj.isCompleted === true)) {
        return state.map((obj) => ({
          ...obj,
          isCompleted: false,
        }));
      }

      return state.map((obj) => ({
        ...obj,
        isCompleted: true,
      }));
    }
    case 'CLEAR_TASKS': {
      return [];
    }
    case 'CHANGE_COMPLETED': {
      return state.map((obj) => ({
        ...obj,
        isCompleted: obj.id === payload ? !obj.isCompleted : obj.isCompleted,
      }));
    }
    default: {
      return state;
    }
  }
};

function App() {
  const [state, dispatch] = useReducer(reducer, todos);
  const [activeTab, setActiveTab] = useState(0);

  const addTodoHandler = (todo) => {
    dispatch({ type: 'ADD_TASK', payload: todo });
  };

  const removeTodoHandler = (id) => {
    dispatch({ type: 'REMOVE_TODO', payload: id });
  };

  const changeCompletedHandler = (id) => {
    dispatch({ type: 'CHANGE_COMPLETED', payload: id });
  };

  const clearAllButtonHandler = () => {
    dispatch({ type: 'CLEAR_TASKS' });
  };

  const revertAllTasksButtonHandler = () => {
    dispatch({ type: 'REVERT_ALL_TASKS' });
  };

  const getTodoTasks = (activeTab) => {
    const activeTabToFilterFunction = {
      0: () => true,
      1: (obj) => obj.isCompleted === false,
      2: (obj) => obj.isCompleted === true,
    };

    return state.filter(activeTabToFilterFunction[activeTab]);
  };

  return (
    <div className="App">
      <Paper className="wrapper">
        <Paper className="header" elevation={0}>
          <h4>Список задач</h4>
        </Paper>
        <AddField onAdd={addTodoHandler} />
        <Divider />
        <Tabs value={activeTab} onChange={(_, value) => setActiveTab(value)}>
          <Tab label="Все" />
          <Tab label="Активные" />
          <Tab label="Завершённые" />
        </Tabs>
        <Divider />
        <List>
          {getTodoTasks(activeTab).map(({ id, text, isCompleted }) => {
            return (
              <Item
                key={id}
                id={id}
                text={text}
                isCompleted={isCompleted}
                onChangeCompleted={changeCompletedHandler}
                onRemove={removeTodoHandler}
              />
            );
          })}
        </List>
        <Divider />
        <div className="check-buttons">
          <Button onClick={revertAllTasksButtonHandler}>
            {state.every((obj) => obj.isCompleted === true)
              ? 'Снять всё'
              : 'Отметить всё'}
          </Button>
          <Button onClick={clearAllButtonHandler}>Очистить</Button>
        </div>
      </Paper>
    </div>
  );
}

export default App;

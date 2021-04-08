import { useEffect, useState } from 'react';
import './App.css';
import ToDoList from './ToDoList';

function App() {
  // initalize a db with the seed data
  // retrieve seed data from db, along with filter text
  // populate state with data

  const [listData, setListData] = useState({});

  useEffect(() => {
    fetch('/toDoData')
    .then((res) => {
      return res.json()
    })
    .then((data) => setListData(data.data));
  }, []);

  // filter todo items by filter text input
  const [filterText, setFilterText] = useState('');
  const handleFilterText = (e) => {
    setFilterText(e.target.value);
    // use a debounced function to set the filter input on be
  };

  // iterate over person list
  // create to-do list for each person
  // to-do list contains ordered list of tasks and 'add task' button
  // each task has handlers for moving task left or right
  // moving a task preserves its place in list
  // edges of list can't move beyond list
  // 'add task' uses window.prompt
  // each list has 25px space between, and takes up equal amount of leftover space

  const handleArrowClick = (variant, itemId, userId, order) => {
    const subsequentTodos = listData[userId].todos.reduce((todoIds, todo) => {
      if (todo.order >= order) {
        return [...todoIds, todo.id];
      }
      return todoIds;
    }, [])
    fetch('/toDoItem', {
      method: 'put',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ variant, itemId, userId, order, subsequentTodos })
    })
    .then((res) => {
      return res.json()
    })
    .then((data) => setListData(data.data));
  }

  const handleAddTask = (userId) => {
    const response = window.prompt('add a task');
    fetch('/toDoItem', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ userId, text: response, order: listData[userId].todos.length })
    })
    .then((res) => {
      return res.json()
    })
    .then((data) => setListData(data.data));
  }

  const ToDoLists = Object.entries(listData).sort((a,b) => a[0] < b[0] ? -1 : 1).map((entry, i) => {
    const leftBound = i === 0;
    const rightBound = i === listData.length - 1;
    const tasks = entry[1].todos;
    return (
      <ToDoList name={entry[1].userName} userId={entry[0]} tasks={tasks} handleArrowClick={handleArrowClick} handleAddTask={handleAddTask} key={`list_${entry[1].userName}_${i}`} leftBound={leftBound} rightBound={rightBound} filterText={filterText} />
    )
  });

  return (
    <div className="App">
      <header className="App-header">
        <input type="text" value={filterText} onChange={handleFilterText} />
        <div style={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'row', minWidth: '100vw' }}>{ToDoLists}</div>
      </header>
    </div>
  );
}

export default App;

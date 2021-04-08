import { useEffect, useState } from 'react';
import './App.css';
import ToDoList from './ToDoList';

const seedData = [
  {name: 'Winnie', tasks: ['buy eggs', 'buy milk']},
  {name: 'Brad', tasks: ['buy meat', 'buy vegi']},
  {name: 'Bob', tasks: ['buy eggs', 'buy apples']},
  {name: 'Thomas', tasks: ['buy ham', 'buy bananas']}
];
function App() {
  // initalize a db with the seed data
  // retrieve seed data from db, along with filter text
  // populate state with data


  const currentData = seedData;
  const [listData, setListData] = useState(currentData);

  useEffect(() => {
    fetch('/toDoData')
    .then((res) => {
      console.log('&&&res', res)
      return res.json()
    })
    .then((data) => console.log('$$data', data));
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

  const handleArrowClick = (variant, itemIndex, personIndex) => {
    const newData = [...listData];
    const receivingIndex = variant === 'left' ? personIndex - 1 : personIndex + 1;
    const tempStore = newData[personIndex].tasks[itemIndex];
    newData[personIndex].tasks = [...newData[personIndex].tasks.slice(0, itemIndex), ...newData[personIndex].tasks.slice(itemIndex + 1)];
    newData[receivingIndex].tasks = [...newData[receivingIndex].tasks.slice(0, itemIndex),tempStore, ...newData[receivingIndex].tasks.slice(itemIndex)];

    // setListData(newData);
    // send new data to be, update state with response
  }

  const handleAddTask = (personIndex) => {
    const response = window.prompt('add a task');
    const newData = [...listData];
    newData[personIndex].tasks.push(response);
    // setListData(newData);
    // send new data to be, update state with response
  }

  const ToDoLists = listData.map((person, i) => {
    const leftBound = i === 0;
    const rightBound = i === listData.length - 1;
    const tasks = person.tasks;
    return (
      <ToDoList name={person.name} tasks={tasks} handleArrowClick={handleArrowClick} handleAddTask={handleAddTask} key={`list_${person.name}_${i}`} personIndex={i} leftBound={leftBound} rightBound={rightBound} filterText={filterText} />
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

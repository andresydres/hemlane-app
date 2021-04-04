import { useState } from 'react';
import './App.css';
import ToDoList from './ToDoList';

const seedData = {
  Winnie: ['buy eggs', 'buy milk'],
  Brad: ['buy meat', 'buy vegi'],
  Bob: ['buy eggs', 'buy apples'],
  Thomas: ['buy ham', 'buy bananas']
};
function App() {
  const [listData, setListData] = useState(seedData);

  // iterate over person list
  // create to-do list for each person
  // to-do list contains ordered list of tasks and 'add task' button
  // each task has handlers for moving task left or right
  // moving a task preserves its place in list
  // edges of list can't move beyond list
  // 'add task' uses window.prompt
  // each list has 25px space between, and takes up equal amount of leftover space

  const handleArrowClick = (variant, name, itemIndex) => {
    // check left and right bound
    const newData = {...listData};
    const persons = Object.keys(newData);
    const indexToEdit = persons.indexOf(name);
    const receivingIndex = variant === 'left' ? indexToEdit - 1 : indexToEdit + 1;
    const receivingPerson = persons[receivingIndex];
    const tempStore = newData[name][itemIndex];
    newData[name] = [...newData[name].slice(0, itemIndex), ...newData[name].slice(itemIndex + 1)];
    newData[receivingPerson] = [...newData[receivingPerson].slice(0, itemIndex),tempStore, ...newData[receivingPerson].slice(itemIndex)];

    setListData(newData);
  }

  const handleAddTask = (name) => {
    const response = window.prompt('add a task');
    const newData = {...listData};
    newData[name].push(response);
    setListData(newData);
  }

  const ToDoLists = Object.keys(listData).map((name, i) => {
    const leftBound = i === 0;
    const rightBound = i === Object.keys(listData).length - 1;
    const tasks = listData[name];
    return (
      <ToDoList name={name} tasks={tasks} handleArrowClick={handleArrowClick} handleAddTask={handleAddTask} key={`list_${name}_${i}`} leftBound={leftBound} rightBound={rightBound} />
    )
  });

  return (
    <div className="App">
      <header className="App-header">
        To-Do List
        <div style={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'row', minWidth: '100vw' }}>{ToDoLists}</div>
      </header>
      {/* TODO: make space between 25px */}
    </div>
  );
}

export default App;

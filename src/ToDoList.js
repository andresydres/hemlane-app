import React from 'react';
import ToDoItem from './ToDoItem';

const ToDoList = (props) => {
  const { name, tasks, handleArrowClick, handleAddTask, leftBound, rightBound } = props;

  const TaskList = tasks.map((task, i) => <ToDoItem task={task} handleArrowClick={handleArrowClick} name={name} itemIndex={i} key={`task_${name}_${i}`} leftBound={leftBound} rightBound={rightBound} /> );
  // create a list with header as name, toDoItems for each task
  return (
    <div style={{ flexGrow: 1, marginRight: rightBound ? '' : '25px' }}>
      <h1>{name}</h1>
      {TaskList}
      <button onClick={() => handleAddTask(name)}>add task</button>
    </div>
  )
};

export default ToDoList;
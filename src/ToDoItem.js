import React from 'react';

const ToDoItem = (props) => {
  const { task, handleArrowClick, leftBound, rightBound} = props;
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '5px' }}>
      <button disabled={leftBound} onClick={() => handleArrowClick('left', task.id, task.userId, task.order)}>{'<'}</button>
      {task.text}
      <button disabled={rightBound} onClick={() => handleArrowClick('right', task.id, task.userId, task.order)}>{'>'}</button>
    </div>
  )
};

export default ToDoItem;
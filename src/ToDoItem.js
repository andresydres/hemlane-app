import React from 'react';

const ToDoItem = (props) => {
  const { task, handleArrowClick, name, itemIndex, leftBound, rightBound } = props;
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between'}}>
      <button disabled={leftBound} onClick={() => handleArrowClick('left', name, itemIndex)}>{'<'}</button>
      {task}
      <button disabled={rightBound} onClick={() => handleArrowClick('right', name, itemIndex)}>{'>'}</button>
    </div>
  )
};

export default ToDoItem;
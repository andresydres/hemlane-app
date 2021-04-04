import React from 'react';

const ToDoItem = (props) => {
  const { task, handleArrowClick, itemIndex, leftBound, rightBound, personIndex } = props;
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '5px' }}>
      <button disabled={leftBound} onClick={() => handleArrowClick('left', itemIndex, personIndex)}>{'<'}</button>
      {task}
      <button disabled={rightBound} onClick={() => handleArrowClick('right', itemIndex, personIndex)}>{'>'}</button>
    </div>
  )
};

export default ToDoItem;
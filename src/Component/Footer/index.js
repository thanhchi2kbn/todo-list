import React from 'react';
import "./style.scss";

export default function Footer({ tasks, handleClearAllPendingTasks }) {
  const pendingTasks = tasks.filter((task) => !task.isDone);

  const handleClearAll = () => {
    handleClearAllPendingTasks();
  };

  return (
    <div className='todo-list-footer'>
      <h4 className='foot-notify'>
        You have {pendingTasks.length} pending tasks. Let's Try Hard!
      </h4>
      <button className='btn-clear-all' onClick={handleClearAll}>
        ClearALL
      </button>
    </div>
  );
}

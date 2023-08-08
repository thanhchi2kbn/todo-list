import { EditOutlined, DeleteOutlined, SaveOutlined, CloseOutlined, UndoOutlined, CheckOutlined } from "@ant-design/icons";
import "./style.scss";
import Dividers from "../Divider";
import { useState } from "react";

const Task = (props) => {
  const { taskName, isDone, id, createAt } = props.task;
  const { handleRemoveTask, handleToggleTask, handleEditTask } = props;
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState({ taskName, isDone, createAt });

  const handleToggle = () => {
    handleToggleTask(id);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    setIsEditing(false);
    handleEditTask(id, editedTask);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedTask({ taskName, isDone, createAt });
  };

  const handleDelete = () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this task?");
    if (confirmDelete) {
      handleRemoveTask(id);
    }
  };

  return (
    <>
      <div className='task'>
        {isEditing ? (
          <>
            <textarea
              className="task__edit-input"
              value={editedTask.taskName}
              onChange={(e) => setEditedTask({ ...editedTask, taskName: e.target.value })}
            />
            <div className="task__edit-btn">
              <button onClick={handleSave} className='task__btn-done'><SaveOutlined /></button>
              <button onClick={handleCancel} className='task__btn-del'><CloseOutlined /></button>
            </div>
          
          </>
        ) : (
          <>
            <p className={`task__name ${isDone ? "task__name--done" : ""}`}>{taskName}</p>
            <div className='task__groups-btn'>
              <button onClick={handleToggle} className={`${isDone ? 'task__btn-reverse' : 'task__btn-done'}`}>
                {isDone ? <UndoOutlined /> : <CheckOutlined />}
              </button>
              <button onClick={handleEdit} className='task__btn-edit'><EditOutlined /></button>
              <button onClick={handleDelete} className='task__btn-del'><DeleteOutlined /></button>
            </div>
          </>
        )}
      </div>
      <Dividers />
    </>
  );
};

export default Task;

import { CheckOutlined, DeleteOutlined, UndoOutlined } from "@ant-design/icons";
import "./style.scss";
import Dividers from "../Divider";

const Task = (props) => {
  const { taskName, isDone, id } = props.task;
  const { handleRemoveTask, handleToggleTask } = props;
  const toggleIcon = isDone ? <UndoOutlined /> : <CheckOutlined />;

  const handleToggle = () => {
    handleToggleTask(id);
  };

  return (
    <>
      <div className='task'>
        <p className={`task__name ${isDone ? "task__name--done" : ""}`}>{taskName}</p>
        <div className='task__groups-btn'>
          <button onClick={handleToggle} className={`${isDone ? 'task__btn-reverse' : 'task__btn-done'}`}>
            {toggleIcon}
          </button>
          <button onClick={() => handleRemoveTask(id)} className='task__btn-del'><DeleteOutlined /></button>
        </div>
      </div>
      <Dividers />
    </>
  );
};

export default Task;

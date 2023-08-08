import { Pagination, Spin } from 'antd';
import './App.scss';
import "antd/dist/reset.css"
import Task from './Component/Task';
import FormInput from './Component/FormInput';
import Dividers from './Component/Divider/';
import { useEffect, useState } from 'react';
import { TaskApi } from './Apis/TaskApi';
import Footer from './Component/Footer';


function App() {
  const [tasks, setTasks] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [pagination, setPagination] = useState({
    currentPage: 1,
    limitPerPage: 5,
    totalTask: 0,
  });

  const fetchAllTask = async (params) => {
    setIsLoading(true);
    const res = await TaskApi.getAllTasks(params);
    setTasks(res.data);
    setPagination({
      ...pagination,
      totalTask: res.headers["x-total-count"],
    })
    setIsLoading(false);
  }

  useEffect(() => {
    fetchAllTask({
      _page: pagination.currentPage,
      _limit: pagination.limitPerPage,
    });
  }, [pagination.currentPage])
  
  const handleAddTask = async (taskName) => {
    const newTask = {
      taskName: taskName,
      isDone: false,
      createAt: new Date().getTime(),
    };
    await TaskApi.createTask(newTask)
    fetchAllTask({
      _page: pagination.currentPage,
      _limit: pagination.limitPerPage,
    });
  };

  const handleRemoveTask = async (taskId) => {
    await TaskApi.removeTask(taskId);
    const currentPageTaskCount = tasks.length;
    const isLastPageAndNoTask = currentPageTaskCount === 1 && pagination.currentPage > 1;
    if (isLastPageAndNoTask) {
      // Nếu không còn task và đang ở trang cuối, chuyển về trang trước đó
      setPagination((prevPagination) => ({
        ...prevPagination,
        currentPage: prevPagination.currentPage - 1,
      }));
    } else {
      // Nếu còn task hoặc không ở trang cuối, gọi lại fetchAllTask để cập nhật danh sách task mới
      fetchAllTask({
        _page: pagination.currentPage,
        _limit: pagination.limitPerPage,
      });
    }
  };
  

  const handleToggleTask = async (taskId) => {
    const taskToUpdate = tasks.find(task => task.id === taskId);
    if (taskToUpdate) {
      const updatedTask = { ...taskToUpdate, isDone: !taskToUpdate.isDone };
      await TaskApi.updateTask(taskId, updatedTask);
      const updatedTaskList = tasks.map(task => (task.id === taskId ? updatedTask : task));
      setTasks(updatedTaskList);

     

      // Sau khi cập nhật thành công, gọi lại fetchAllTask để đồng bộ hóa danh sách công việc mới
      fetchAllTask({
        _page: pagination.currentPage,
        _limit: pagination.limitPerPage,
      });
    }
  }

  const handleEditTask = async (taskId, updatedTask) => {
    await TaskApi.updateTask(taskId, updatedTask);
    fetchAllTask({
      _page: pagination.currentPage,
      _limit: pagination.limitPerPage,
    });
  };


  const handleChangePage = (page) => {
    setPagination({
      ...pagination,
      currentPage: page,
    });
  }

  const handleClearAllPendingTasks = async () => {
    try {
      const pendingTasks = tasks.filter((task) => !task.isDone);
      for (const task of pendingTasks) {
        await TaskApi.removeTask(task.id);
      }
      fetchAllTask({
        _page: pagination.currentPage,
        _limit: pagination.limitPerPage,
      });
    } catch (error) {
      console.log(error);
    }
  };
  // 
  const renderTaskList = (taskList) => {
    if (!tasks.length) {
      return <div style={{ textAlign: "center" }}>Please input your task</div>
    }
    return taskList.map((task) => (
      <Task
        key={task.id}
        task={task}
        handleRemoveTask={handleRemoveTask}
        handleToggleTask={handleToggleTask}
        handleEditTask = {handleEditTask}
      />
    ))
  };


  return (
    <div className="App">
      <div className='todo-list-container'>
        <div className='todo-list-wapper'>
          <FormInput handleAddTask={handleAddTask} />

          <div className='todo-list-main'>
            {isLoading ? <Spin /> : (renderTaskList(tasks))}

          </div>

          <Dividers />
          <div className='todo-list-panigation'>
            <Pagination
              defaultCurrent={pagination.currentPage}
              current={pagination.currentPage}
              total={pagination.totalTask}
              pageSize={pagination.limitPerPage}
              onChange={(page) => handleChangePage(page)}
            />
          </div>
            
          <Footer tasks={tasks} handleClearAllPendingTasks={handleClearAllPendingTasks}/>
          
        </div>
      </div>
    </div>
  );
}

export default App;

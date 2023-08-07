import { PlusCircleOutlined } from '@ant-design/icons'
import Dividers from '../Divider/';
import { Input } from 'antd'
import React, { useState } from 'react'
import "./style.scss"

const FormInput= (props) => {
    const [inputTaskName, setInputTaskName] = useState("")
    const {handleAddTask} = props

    const handleChangeTaskName = (e) =>{
        setInputTaskName(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const trimmedTaskName = inputTaskName.trim();
        if (!trimmedTaskName) return; // Kiểm tra taskName rỗng hoặc chỉ chứa dấu cách
        handleAddTask(trimmedTaskName);
        setInputTaskName("");
      };

  return (
    <>
    <div className='todo-list-header'>
            <h2 className='todo-list-header__title'>Todo List Application</h2>

            <form  className='todo-list-header__form' onSubmit={handleSubmit}>
              <Input 
                size="large" 
                placeholder="Please input task name..." 
                value={inputTaskName}    
                onChange={handleChangeTaskName}
                />
              <button 
                className='todo-list-header__btn-add'
                type='submit'
                >
                <PlusCircleOutlined />
              </button>
            </form>
            <Dividers/>
          </div>
    </>
  )
}

export default FormInput
import { useEffect } from "react"
import { useRef } from "react"
import { useState } from "react"


function Agenda({onSubmit, onChange, taskList, task, editIndex, handleOnEdit, setEditIndex, onEditChange, setEditTask, editTask , editInputRef}){
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input type="text" name="addTask"  onChange={onChange} value={task}/>
        <button type="submit">Add</button>

      </form>
      <div>
        <ul>

        {taskList.map((task, index) => (
          editIndex !== index ? <li key={index}>{task} <button onClick={(e) => {setEditIndex(index),setEditTask(task)
          }}>edit</button> <button>delete</button></li> :(
            <>
            <form onSubmit={(e) => handleOnEdit(e,index)}>
            <input type="text" name="editTask" onChange={onEditChange} key={index} value={editTask} onBlur={(e) => handleOnEdit(e, index)} ref={editInputRef}/>
            <button type="submit" disabled={!editTask}>submit</button>
            </form>
            
            </>
            
            
          ) 
          

          
        ))}
        </ul>
        

      </div>
    </div>
  )
}





function App() {
  const [task, setTask] = useState('')
  const [taskList, setTaskList] = useState([])
  const [editIndex, setEditIndex] = useState(null)
  const [editTask, setEditTask] = useState(null)
  const editInputRef = useRef(null)
 

  function onEditChange(e) {
    let value = e.target.value
    setEditTask(value)
  }


  function handleOnEdit(e, index){
    e.preventDefault()
    if (index != null && editTask.trim() !== ''){
      const newTaskList = structuredClone(taskList)
      newTaskList[Number(index)] = editTask
      setTaskList(newTaskList)
      setEditIndex(null)
      setEditTask(null)
    }
     

    
  }

  function handleOnChange(e){
    let value = e.target.value
    setTask(value)
  }
  function handleOnSubmit(e){
    e.preventDefault()
    
    if (task !== ''){
      setTaskList(prev => ([
        ...prev, task
      ]))
      setTask('')
    }
  }

  useEffect(() => {
    if (editIndex !== null){
      editInputRef.current?.focus()
    }
  }, [editIndex])
  return (
   <>
  <h1>
    Agenda
  </h1>
    <Agenda onChange={handleOnChange} onSubmit={handleOnSubmit} taskList={taskList} task={task} editIndex={editIndex} handleOnEdit={handleOnEdit} setEditIndex={setEditIndex} onEditChange={onEditChange} setEditTask={setEditTask} editTask={editTask} editInputRef={editInputRef}/>
   
   
   
   </>
  )
}

export default App

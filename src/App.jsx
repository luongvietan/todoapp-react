import { useEffect } from "react";
import { useState } from "react";
import classes from "./styles.module.css"
import TodoItem from "./components/todo-item"
import todoDetail from "./components/todo-detail"

function App() {
  const [loading, setLoading] = useState(false)
  const [todoList, setTodoList] = useState([])
  const [errorMsg, setErrorMSg] = useState(null)

  const [todoDetail, setTodoDetail] = useState(null)
  const [openDialog, setOpenDialog] = useState(false)

  async function fetchToDoList() {
    try {
      setLoading(true);
      const apiResponse = await fetch('https://dummyjson.com/todos')
      const result = await apiResponse.json()
      console.log(result);
      if (result?.todos && result?.todos.length > 0) {
        setTodoList(result?.todos)
        setLoading(false)
        setErrorMSg('')
      } else {
        setTodoList([])
        setLoading(false)
        setErrorMSg('')
      }
    } catch (error) {
      console.log(error);
      setErrorMSg('Error Occured')
    }
  }

  async function fetchDetail(getCurrentTodoId) {
    
    try {
      const apiResponse = await fetch(`https://dummyjson.com/todos/${getCurrentTodoId}`)
      const details = await apiResponse.json()
      if (details) {
        setTodoDetail(details);
        setOpenDialog(true);
        console.log(details);
      } else {
        setTodoDetail(null);
        setOpenDialog(false);
      }
      
    } catch (error) {
      console.log(`error : `, error);
      
    }
  }

  useEffect(() => {
    fetchToDoList()
  }, [])
    
  return (
    <div className={classes.mainWrapper}>
      <h1 className={classes.headerTitle}>TodoApp using Material UI</h1>
      <div className={classes.todoListWrapper}>
        {
          todoList && todoList.length > 0 ?
            todoList.map((todoItems) => <TodoItem
              fetchDetail={fetchDetail}
              todo={todoItems}></TodoItem>)
          : null
        }
      </div>
      <todoDetail
        setOpenDialog={setOpenDialog}
        openDialog={openDialog}
        todoDetail={todoDetail}
        setTodoDetail={setTodoDetail}></todoDetail>
    </div>
  );
}
export default App;

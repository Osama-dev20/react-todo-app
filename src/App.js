import './App.css';
import ToDoList from "./components/ToDoList";
import MySnackBar from "./components/MySnackBar"
import ToastContext  from "./Context/ToastContext";

// Hooks
import { useState } from "react";

// Context
import TodosContext from "./Context/todosContext";

// Create a UUID
import { v4 as uuidv4 } from 'uuid';

const initialToDos = [
  {
    id: uuidv4(),
    title: "قراءة كتاب",
    details: "يجب ان انجزه",
    isCompleted: false
  },

  {
    id: uuidv4(),
    title: "قراءة كتاب",
    details: "يجب ان انجزه",
    isCompleted: false
  },

  {
    id: uuidv4(),
    title: "قراءة كتاب",
    details: "يجب ان انجزه",
    isCompleted: false
  }
];

function App() {
  const [todos, setTodos] = useState(initialToDos);
  const [open, setOpen] = useState(false)
  const [message, setmessage] = useState("")
  
  function showHideToast(message){
   setOpen(true)
   setmessage(message)
   setTimeout( () => {
     setOpen(false)
   },2000) 
  }


  function handleCloseToast() {
   setOpen(false);
  }

  return (
  <ToastContext.Provider value={{showHideToast}}>  
      <div
        className="App"
        style={{
          background: "#191b1f",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <MySnackBar open={open} message={message} onClose={handleCloseToast} />
        <TodosContext.Provider value={{ todos, setTodos }}>
          <ToDoList />
        </TodosContext.Provider>
      </div>
  </ToastContext.Provider>  
  );
}

export default App;
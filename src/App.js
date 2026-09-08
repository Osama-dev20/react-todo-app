import './App.css';
import ToDoList from "./components/ToDoList"

// Hooks
import { useState } from "react";
import TodosContext from "./Context/todosContext"

// Create a UUID
import { v4 as uuidv4 } from 'uuid';

const initialToDos = [
  {id:uuidv4(), title:"قراءة كتاب", details:"يجب ان انجزه", isCompleted:false},
  {id:uuidv4(), title:"قراءة كتاب", details:"يجب ان انجزه", isCompleted:false},
  {id:uuidv4(), title:"قراءة كتاب", details:"يجب ان انجزه", isCompleted:false}
]

function App() {
  const [todos, setTodos] = useState(initialToDos)

  return (
    <div className="App" 
         style={{
          background:"#191b1f",
          display:'flex',
          justifyContent:"center",
          alignItems:"center",
          height:"100vh",
          
        }}
          >

        <TodosContext.Provider value={{todos, setTodos}}> 
          <ToDoList /> 
       </TodosContext.Provider>
    </div>
  );
}

export default App;

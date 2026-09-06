import './App.css';
import ToDoList from "./components/ToDoList"

function App() {
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

      <ToDoList /> 
    </div>
  );
}

export default App;

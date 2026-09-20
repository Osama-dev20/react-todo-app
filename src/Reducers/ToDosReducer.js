// Create a UUID
import { v4 as uuidv4 } from "uuid";

export default function reducer(currentTodos, action){
  switch(action.type){
    case "added":{

    const newTodo = {
      id: uuidv4(),
      title: action.payload.newTitle,
      details: "",
      isCompleted: false,
    };

    const updatedTodos = [...currentTodos, newTodo];

    localStorage.setItem("todos", JSON.stringify(updatedTodos));
    return updatedTodos;
  }

   case "deleted":{
    const deleteTodos = currentTodos.filter((t) => {
      return t.id !== action.payload.id;
    });

    localStorage.setItem(
      "todos",
      JSON.stringify(deleteTodos)
    );
   
    return deleteTodos; 
  }
  
  case "update":{
    
  const updatedTodos = currentTodos.map((t) => {
    if (t.id === action.payload.id) {
      return {
        ...t,
        title: action.payload.title,
        details: action.payload.details,
      };
    }

    return t;
  });

  localStorage.setItem(
    "todos",
    JSON.stringify(updatedTodos)
  );
  return updatedTodos;

  }

      default: {
        throw Error("Unknown Erorr" + action.type) 
    
  }
   }

  return []
}
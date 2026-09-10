// MUI Components
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

// Hooks
import { useState, useContext, useEffect } from "react";

// Create a UUID
import { v4 as uuidv4 } from "uuid";

// Components
import ToDo from "./ToDo";
import TodosContext from "../Context/todosContext";

// Styles
import "../App.css";

const theme = createTheme({
  typography: {
    fontFamily: "Alexandria"
  },
});

export default function ToDoList() {
  const { todos, setTodos } = useContext(TodosContext);

  const [titleInput, setTitleInput] = useState("");
  const [displayTodoType, setdisplayTodoType] = useState("all")

  const completedTodos = todos.filter( (e) =>{
     return e.isCompleted
  })

  const notcompletedTodos = todos.filter( (e) =>{
     return !e.isCompleted
  })

  let todosToBeRender = todos

  if(displayTodoType == "completed"){
    todosToBeRender = completedTodos
  }else if(displayTodoType == "notcompletedTodos"){
    todosToBeRender = notcompletedTodos
  }else{
    todosToBeRender = todos
  }

  function ChangDispalyTodoType(e){
    setdisplayTodoType(e.target.value);
  }

  // Get todos from localStorage
  useEffect(() => {
    const storageTodos = JSON.parse(localStorage.getItem("todos"));

    if (storageTodos) {
      setTodos(storageTodos);
    }
  }, [setTodos]);

  // Create JSX for todos
  const todosjsx = todosToBeRender.map((t) => {
    return <ToDo key={t.id} todo={t} />;
  });

  // Add Todo
  function handleAddClick() {
    if (titleInput.trim() === "") {
      return;
    }

    const newTodo = {
      id: uuidv4(),
      title: titleInput,
      details: "",
      isCompleted: false
    };

    const updatedTodos = [...todos, newTodo];

    setTodos(updatedTodos);

    localStorage.setItem("todos", JSON.stringify(updatedTodos));
    setTitleInput("");
  }

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="sm">
        <Box sx={{ minWidth: 275 }}>
          <Card variant="outlined" sx={{ minHeight: 200 }}>

            {/* ===== Header ===== */}

            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                padding: "20px",
              }}
            >
              <Typography
                variant="h3"
                style={{
                  fontWeight: "bold",
                  transform: "translateY(10px)"
                }}
              >
                مهامي
              </Typography>

              <Divider sx={{ width: "100%", my: 2 }} />

              {/* ===== Filters ===== */}

              <ToggleButtonGroup 
               exclusive
               value={displayTodoType}
               onChange={ChangDispalyTodoType} 
              >
                <ToggleButton value="notcompleted">غير منجز</ToggleButton>
                <ToggleButton value='completed'>منجز</ToggleButton>
                <ToggleButton value="all">الكل</ToggleButton>
              </ToggleButtonGroup>
            </Box>

            {/* ===== ALL TODOS ===== */}

            {todosjsx}

            {/* ===== Input + ADD Button ===== */}

            <Box
              sx={{
                display: "flex",
                gap: 1,
                padding: "0 20px 20px",
                direction: "rtl",
              }}
            >
              <TextField
                fullWidth
                size="small"
                placeholder="أضف مهمة جديدة..."
                value={titleInput}
                onChange={(e) => {
                  setTitleInput(e.target.value);
                }}
              />

              <Button
                variant="contained"
                sx={{
                  fontFamily: "Alexandria",
                  fontWeight: "bold",
                  padding: "0 20px",
                }}
                onClick={handleAddClick}
              >
                إضافة
              </Button>
            </Box>

          </Card>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
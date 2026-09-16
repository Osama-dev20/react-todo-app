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
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

// Hooks
import { useState, useContext, useEffect, useMemo } from "react";

// Create a UUID
import { v4 as uuidv4 } from "uuid";

// Components
import ToDo from "./ToDo";
import TodosContext from "../Context/todosContext";

// Styles
import "../App.css";

const theme = createTheme({
  typography: {
    fontFamily: "Alexandria",
  },
  palette: {
    primary: {
      main: "#d50000",
    },
    secondary: {
      main: "#304ffe",
    },
    success: {
      main: "#00c853",
    },
  },
});

export default function ToDoList() {
  const { todos, setTodos } = useContext(TodosContext);

  const [titleInput, setTitleInput] = useState("");
  const [displayTodoType, setdisplayTodoType] = useState("all");

  // Delete Dialog State
  const [showDeleteDialog, setshowDeleteDialog] = useState(false);

  // The Todo that the user wants to delete
  const [selectedTodo, setSelectedTodo] = useState(null);

  const [showUpdateDialog, setshowUpdateDialog] = useState(false);
  const [updateTodo, setUpdateTodo] = useState({ title: "", details: ""});

  // ============================
  // Filter Todos
  // ============================

  const completedTodos = useMemo(() => {
    return todos.filter((e) => {
      return e.isCompleted;
    });
  }, [todos]);

  const notcompletedTodos = useMemo(() => {
    return todos.filter((e) => {
      return !e.isCompleted;
    });
  }, [todos]);

  let todosToBeRender = todos;

  if (displayTodoType === "completed") {
    todosToBeRender = completedTodos;
  } else if (displayTodoType === "notcompletedTodos") {
    todosToBeRender = notcompletedTodos;
  } else {
    todosToBeRender = todos;
  }

  function ChangDispalyTodoType(e) {
    setdisplayTodoType(e.target.value);
  }

  // ============================
  // Get Todos from localStorage
  // ============================

  useEffect(() => {
    const storageTodos = JSON.parse(localStorage.getItem("todos"));

    if (storageTodos) {
      setTodos(storageTodos);
    }
  }, [setTodos]);

  // ============================
  // Add Todo
  // ============================

  function handleAddClick() {
    if (titleInput.trim() === "") {
      return;
    }

    const newTodo = {
      id: uuidv4(),
      title: titleInput,
      details: "",
      isCompleted: false,
    };

    const updatedTodos = [...todos, newTodo];

    setTodos(updatedTodos);

    localStorage.setItem("todos", JSON.stringify(updatedTodos));

    setTitleInput("");
  }

  // ============================
  // Delete Todo
  // ============================

  // Open Delete Dialog
  const handleDeleteOpen = (todo) => {
    setSelectedTodo(todo);
    setshowDeleteDialog(true);
  };

  // Close Delete Dialog
  const handleDeleteClose = () => {
    setshowDeleteDialog(false);
    setSelectedTodo(null);
  };

  // Confirm Delete
  function handleDeleteConfirm() {
    if (!selectedTodo) {
      return;
    }

    const deleteTodos = todos.filter((t) => {
      return t.id !== selectedTodo.id;
    });

    setTodos(deleteTodos);

    localStorage.setItem(
      "todos",
      JSON.stringify(deleteTodos)
    );

    setshowDeleteDialog(false);
    setSelectedTodo(null);
  }

  // ============================
  // Update Todo
  // ============================  
  const handleUpdateOpen = (todo) => {
    setSelectedTodo(todo);    
    
    setUpdateTodo({
      title:todo.title,
      details: todo.details,
    })
    setshowUpdateDialog(true);
  };

  const handleUpdateClose = () => {
    setshowUpdateDialog(false);
    setSelectedTodo(null);
  };

function handleUpdateConfirm() {
  if (!selectedTodo) {
    return;
  }

  const updatedTodos = todos.map((t) => {
    if (t.id === selectedTodo.id) {
      return {
        ...t,
        title: updateTodo.title,
        details: updateTodo.details,
      };
    }

    return t;
  });

  setTodos(updatedTodos);

  localStorage.setItem(
    "todos",
    JSON.stringify(updatedTodos)
  );

  setshowUpdateDialog(false);
  setSelectedTodo(null);
}


  // ============================
  // Create JSX for Todos
  // ============================

  const todosjsx = todosToBeRender.map((t) => {
    return (
      <ToDo
        key={t.id}
        todo={t}
        ShowDelete = {handleDeleteOpen}
        showUpdate = {handleUpdateOpen} 

      />
    );
  });

  // ============================
  // JSX
  // ============================

  return (
    <ThemeProvider theme={theme}>

<Dialog
  open={showUpdateDialog}
  onClose={handleUpdateClose}
  aria-labelledby="update-dialog-title"
  sx={{
    "& .MuiDialog-paper": {
      width: "400px",
      maxWidth: "90%",
    },
    direction: "rtl",
  }}
>
  <DialogTitle id="update-dialog-title">
    تعديل مهمة
  </DialogTitle>

  <DialogContent>
    <TextField
      autoFocus
      required
      margin="dense"
      name="Title"
      label="عنوان المهمة"
      type="text"
      fullWidth
      variant="standard"
      value={updateTodo.title}
      onChange={(e) => {
        setUpdateTodo({
          ...updateTodo,
          title: e.target.value,
        });
      }}
    />

    <TextField
      required
      margin="dense"
      name="Details"
      label="تفاصيل المهمة"
      type="text"
      fullWidth
      variant="standard"
      value={updateTodo.details}
      onChange={(e) => {
        setUpdateTodo({
          ...updateTodo,
          details: e.target.value,
        });
      }}
    />
  </DialogContent>

  <DialogActions>
    <Button onClick={handleUpdateClose}>
      إغلاق
    </Button>

    <Button onClick={handleUpdateConfirm}>
      تأكيد التعديل
    </Button>
  </DialogActions>
</Dialog>


      {/* ================= Delete Dialog ================= */}

      <Dialog
        open={showDeleteDialog}
        onClose={handleDeleteClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        role="alertdialog"
        style={{
          direction: "rtl",
        }}
      >
        <DialogTitle id="alert-dialog-title">
          هل انت متأكد من حذف هذه المهمة؟
        </DialogTitle>

        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            لا يمكنك التراجع عن الحذف بعد اتمامه
          </DialogContentText>
        </DialogContent>

        <DialogActions>
          <Button
            onClick={handleDeleteClose}
            autoFocus
          >
            اغلاق
          </Button>

          <Button onClick={handleDeleteConfirm}>
            تأكيد الحذف
          </Button>
        </DialogActions>
      </Dialog>

      {/* ================= Todo List ================= */}

      <Container maxWidth="sm">
        <Box sx={{ minWidth: 275 }}>
          <Card
            variant="outlined"
            style={{
              maxHeight: "80vh",
              overflow: "scroll",
            }}
          >
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
                  transform: "translateY(10px)",
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
                <ToggleButton
                  value="notcompletedTodos"
                  sx={{
                    color: "text.secondary",
                    "&.Mui-selected": {
                      color: "#fff",
                      backgroundColor: "#757575",
                    },
                    "&.Mui-selected:hover": {
                      backgroundColor: "#616161",
                    },
                  }}
                >
                  غير منجز
                </ToggleButton>

                <ToggleButton
                  value="completed"
                  sx={{
                    color: "text.secondary",
                    "&.Mui-selected": {
                      color: "#fff",
                      backgroundColor: "success.main",
                    },
                    "&.Mui-selected:hover": {
                      backgroundColor: "success.dark",
                    },
                  }}
                >
                  منجز
                </ToggleButton>

                <ToggleButton
                  value="all"
                  sx={{
                    color: "text.secondary",
                    "&.Mui-selected": {
                      color: "#fff",
                      backgroundColor: "secondary.main",
                    },
                    "&.Mui-selected:hover": {
                      backgroundColor: "secondary.dark",
                    },
                  }}
                >
                  الكل
                </ToggleButton>
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
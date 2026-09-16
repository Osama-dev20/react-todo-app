// MUI components
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";

// Icons
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";

// Hooks
import { useContext, useState } from "react";

// Context
import TodosContext from "../Context/todosContext";

// CSS
import "./ToDo.css";

export default function ToDo({ todo, ShowDelete, showUpdate}) {
  const { todos, setTodos } = useContext(TodosContext);

  // ============================
  // Update Todo
  // ============================

  const handleUpdateOpen = () => {
     showUpdate(todo)
  };

  // ============================
  // Delete click
  // ============================

  function handDeleteClick() {
    ShowDelete(todo);
  }

  // ============================
  // Check Todo
  // ============================

  function handCheckClick() {
    const updateTodos = todos.map((t) => {
      if (t.id === todo.id) {
        return {
          ...t,
          isCompleted: !t.isCompleted,
        };
      } else {
        return t;
      }
    });

    setTodos(updateTodos);

    localStorage.setItem(
      "todos",
      JSON.stringify(updateTodos)
    );
  }

  // ============================
  // JSX
  // ============================

  return (
    <div>
      {/* ================= Todo Card ================= */}

      <Card
        className="todoCard"
        sx={{
          minWidth: 275,
          background: "#283593",
          color: "#fff",
          margin: "10px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "7px",
          marginTop: "15px",
          direction: "rtl",
        }}
      >
        <div className="Title">
          <Typography
            variant="h5"
            gutterBottom
          >
            {todo.title}
          </Typography>

          <Typography
            component="div"
            sx={{ fontSize: 17 }}
          >
            {todo.details}
          </Typography>
        </div>

        <div
          className="ButtonsControl"
          style={{
            display: "flex",
            gap: "6px",
            alignItems: "center",
          }}
        >
          {/* CHECK */}

          <IconButton
            aria-label="check"
            size="large"
            sx={{
              color: todo.isCompleted
                ? "#fff"
                : "#4CAF50",

              background: todo.isCompleted
                ? "#4CAF50"
                : "#fff",

              border: "1px solid #4CAF50",

              "&:hover": {
                background: "#C8E6C9",
              },
            }}
            onClick={handCheckClick}
          >
            <CheckOutlinedIcon />
          </IconButton>

          {/* EDIT */}

          <IconButton
            onClick={handleUpdateOpen}
            aria-label="edit"
            size="large"
            sx={{
              color: "#42A5F5",
              background: "#fff",
              border: "2px solid #42A5F5",

              "&:hover": {
                background: "#BBDEFB",
              },
            }}
          >
            <EditOutlinedIcon />
          </IconButton>

          {/* DELETE */}

          <IconButton
            aria-label="delete"
            size="large"
            onClick={handDeleteClick}
            sx={{
              color: "#EF5350",
              background: "#fff",
              border: "2px solid #EF5350",

              "&:hover": {
                background: "#FFCDD2",
              },
            }}
          >
            <DeleteOutlineOutlinedIcon />
          </IconButton>
        </div>
      </Card>
    </div>
  );
}
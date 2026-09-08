// MUI Components
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from '@mui/material';
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

// Hooks
import { useState } from "react";
import { useContext } from "react";

// Create a UUID
import { v4 as uuidv4 } from 'uuid';

// Components
import ToDo from "./ToDo";
import TodosContext from "../Context/todosContext"

// Styles
import "../App.css";


const theme = createTheme({
  typography: {
    fontFamily: "Alexandria"
  },
});

export default function ToDoList() {
   const {todos, setTodos} = useContext(TodosContext)
   const [titleInput, setTitleInput] = useState("")
   
    function handCheckClick(todoid){

    }

   const todosjsx = todos.map((t) => {
     return <ToDo key={t.id} todo={t} />
   });

   function handleAddClick(){
     const newTodo = {
       id:uuidv4(),
       title:titleInput,
       dedetails:"",
       isCompleted:false
     }

     setTodos([...todos, newTodo]);
     setTitleInput("")

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
            <Typography variant="h3" style={{fontWeight:"bold",transform:"translateY(10px)"}}>
              مهامي
            </Typography>

            <Divider sx={{ width: "100%", my: 2 }} />

            {/* ===== Filters ===== */}
            <ToggleButtonGroup exclusive>
              <ToggleButton>غير منجز</ToggleButton>
              <ToggleButton>منجز</ToggleButton>
              <ToggleButton>الكل</ToggleButton>
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
                direction:"rtl",
                
              }}
            >

              <TextField
                fullWidth
                size="small"
                placeholder="أضف مهمة جديدة..."
                value={titleInput}
                onChange={ (e) => {
                   setTitleInput(e.target.value) 
                }}
              /> 
            
              <Button
                variant="contained"
                sx={{
                  fontFamily: "Alexandria",
                  fontWeight: "bold",
                  padding: "0 20px",
                }}
                onClick={ () => {
                  handleAddClick()
                }}
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
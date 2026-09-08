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

// Components
import ToDo from "./ToDo";

// Styles
import "../App.css";

// Create a UUID
import { v4 as uuidv4 } from 'uuid';

// Hooks
import { useState } from "react";


const theme = createTheme({
  typography: {
    fontFamily: "Alexandria"
  },
});


const initialToDos = [
  {id:uuidv4(), title:"قراءة كتاب", details:"يجب ان انجزه", isCompleted:false},
  {id:uuidv4(), title:"قراءة كتاب", details:"يجب ان انجزه", isCompleted:false},
  {id:uuidv4(), title:"قراءة كتاب", details:"يجب ان انجزه", isCompleted:false}
]

export default function ToDoList() {
   
   const [todos, setTodos] = useState(initialToDos)
   const [titleInput, setTitleInput] = useState("")
   
    function handCheckClick(todoid){
      const updateTodos = todos.map( (t) => {
         if(t.id == todoid){
            if(t.isCompleted == true){
                t.isCompleted = false
            }else{
              t.isCompleted = true
            }
         }
         return t;
      })
      setTodos(updateTodos)
    }

   const todosjsx = todos.map((t) => {
     return <ToDo key={t.id} todo={t} handCheck = {handCheckClick}/>
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
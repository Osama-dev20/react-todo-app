// MUI components
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';

// Icons
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';

// Hooks
import { useContext } from 'react';
import { useState } from 'react';

// Components
import TodosContext from "../Context/todosContext"

// CSS
import "./ToDo.css";


export default function ToDo({todo, handCheck}){
  const {todos, setTodos} = useContext(TodosContext)
  const [showDeleteDialog, setshowDeleteDialog] = useState(false);
  
  // function for Delete Button
  const handleDeleteOpen = () => {
    setshowDeleteDialog(true);
  };

  const handleDeleteClose = () => {
    setshowDeleteDialog(false);
  };

  function handleDeleteConfirm(){
    const updatedTodos = todos.filter( (t) => {
       if(t.id == todo.id){
         return false
       }else{
         return true 
       }
    })
      setTodos(updatedTodos)
  }

  // function for Check Button
  function handCheckClick(){
    const updateTodos = todos.map( (t) => {
         if(t.id == todo.id){
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

    return(
      <div>
          <Dialog          
              open={showDeleteDialog}
              onClose={handleDeleteClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
              role="alertdialog"
              style={{
                direction:"rtl"
              }}
            >
              <DialogTitle id="alert-dialog-title">
                {"هل انت متأكد من حذف هذه المهمة؟"}
              </DialogTitle>
               <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  لا يمكنك التراجع عن الحذف بعد اتمامه 
                </DialogContentText>
               </DialogContent>
               <DialogActions>
                <Button onClick={handleDeleteClose} autoFocus >
                  اغلاق
                </Button>
                <Button onClick={handleDeleteConfirm}>تأكيد الحذف</Button>
               </DialogActions>
            </Dialog>
       <Card 
         className='todoCard'
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

         <div className='Title'> 
           <Typography variant='h5' gutterBottom>
             {todo.title}
           </Typography>
           
           <Typography  component="div" sx={{ fontSize: 17 }}>
             {todo.details}
           </Typography>
         </div>

         <div className='ButtonsControl' style={{display:"flex", gap:"6px", alignItems: "center"}}>
           
           {/* CHECK ICON BUTTON */}
          <IconButton 
           aria-label="delete"
           size="large" 
           sx={{color: todo.isCompleted?"#fff":"#4CAF50",
                background: todo.isCompleted?"#4CAF50":"#fff",
                border: "1px solid #4CAF50",
                "&:hover": {background: "#C8E6C9",} }}
           onClick={ () => {
               handCheckClick();
           }}
          >
            <CheckOutlinedIcon />
          </IconButton>
          
           {/* IDET ICON  BUTTON */}
          <IconButton aria-label="delete" size="large" sx={{color:"#42A5F5", background:"#fff", border: "2px solid #42A5F5" ,"&:hover": {background: "#BBDEFB"}}}>
            <EditOutlinedIcon />
          </IconButton>
          
           {/* DELETE ICON BUTTON */}
          <IconButton 
            aria-label="delete"
            size="large"
            onClick={handleDeleteOpen}
            sx={{
              color:"#EF5350",
              background:"#fff",
              border: "2px solid #EF5350",
              "&:hover": {background: "#FFCDD2"
            }}}>
            <DeleteOutlineOutlinedIcon />
          </IconButton>
         
         </div>

         </Card>
       </div>
    );
}
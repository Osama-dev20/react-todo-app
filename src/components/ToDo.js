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
import TextField from '@mui/material/TextField';


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
  const [showUpdateDialog, setshowUpdateDialog] = useState(false);
  const [updateTodo, setUpdateTodo] = useState({title: todo.title, details:todo.details});
  
  // function for Update Button
  const handleUpdateClose = () => {
    setshowUpdateDialog(false);
  };  
  
  const handleUpdateOpen = () => {
    setshowUpdateDialog(true);
  };

  function handleUpdateConfirm(){
    const UpdateTodos = todos.map( (t) =>{
       if(t.id == todo.id){
         return {...t, title: updateTodo.title , details: updateTodo.details}
       }else{
         return t
       }
    })
    setTodos(UpdateTodos)
    setshowUpdateDialog(false)
  }
 //============================

   
  // function for Delete Button
  const handleDeleteOpen = () => {
    setshowDeleteDialog(true);
  };

  const handleDeleteClose = () => {
    setshowDeleteDialog(false);
  };

  function handleDeleteConfirm(){
    const DeleteTodos = todos.filter( (t) => {
       if(t.id == todo.id){
         return false
       }else{
         return true 
       }
    })
      setTodos(DeleteTodos)
  }
 //============================


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
  //============================

    return(
      <div>
         {/* Update Dialog */}
           <Dialog
             open={showUpdateDialog}
             onClose={handleUpdateClose}
             aria-labelledby="update-dialog-title"
             sx={{
               "& .MuiDialog-paper": {
                 width: "400px",
                 maxWidth: "90%",
               },
               direction:"rtl"
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
                 onChange={ (e) =>{
                  setUpdateTodo({...updateTodo, title:e.target.value})
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
                 onChange={ (e) => {
                  setUpdateTodo({...updateTodo, details:e.target.value})
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
          {/*===== Delete Dialog =====*/}

          {/*Delete Dialog*/}
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
          {/*===== Update Dialog =====*/}
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
           sx={{
                color: todo.isCompleted?"#fff":"#4CAF50",
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
          <IconButton
           onClick={handleUpdateOpen} 
           aria-label="delete"
           size="large"
          sx={{
               color:"#42A5F5",
               background:"#fff",
               border: "2px solid #42A5F5",
               "&:hover": {background: "#BBDEFB"}}}
              >
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
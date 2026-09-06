// MUI components
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

// Icons
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';

// CSS
import "./ToDo.css";


export default function ToDo(){
    return(
      <div>  
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
             قرائة 3 كتب
           </Typography>
           
           <Typography  component="div" sx={{ fontSize: 17 }}>
             الانجاز قبل نهاية الشهر
           </Typography>
         </div>

         <div className='ButtonsControl' style={{display:"flex", gap:"6px", alignItems: "center"}}>
          <IconButton aria-label="delete" size="large" sx={{color:"#fff", background:"#4CAF50", border: "1px solid #4CAF50" ,"&:hover": {background: "#C8E6C9",} }}>
            <CheckOutlinedIcon />
          </IconButton>
          <IconButton aria-label="delete" size="large" sx={{color:"#42A5F5", background:"#fff", border: "2px solid #42A5F5" ,"&:hover": {background: "#BBDEFB"}}}>
            <EditOutlinedIcon />
          </IconButton>
          <IconButton aria-label="delete" size="large" sx={{color:"#EF5350", background:"#fff", border: "2px solid #EF5350", "&:hover": {background: "#FFCDD2"}}}>
            <DeleteOutlineOutlinedIcon />
          </IconButton>
         </div>

         </Card>
       </div>
    );
}
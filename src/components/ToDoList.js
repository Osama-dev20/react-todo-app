import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';



export default function ToDoList() {
  return (
    <Container maxWidth="sm">
      <Box sx={{ minWidth: 275 }}>
        <Card variant="outlined" sx={{ minHeight: 200 }}>
            
           {/* ===== Header ===== */}
           <Typography variant='h2' sx={{transform: "translateY(10px)"}}>مهامي</Typography>
           <Divider />
           

           

        </Card>
      </Box>
    </Container>
  );
}
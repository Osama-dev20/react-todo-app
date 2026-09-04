import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import ToggleButton from '@mui/material/ToggleButton';



export default function ToDoList() {
  return (
    <Container maxWidth="sm">
      <Box sx={{ minWidth: 275 }}>
        <Card variant="outlined" sx={{ minHeight: 200 }}>
            
           {/* ===== Header ===== */}
           <Typography variant='h2' sx={{transform: "translateY(10px)"}}>مهامي</Typography>
           <Divider />
           
           {/* ===== Filters =====  */}
           <ToggleButtonGroup sx={{m:2}} style={{direction:"ltr"}} exclusive>
              <ToggleButton>غير منجز</ToggleButton>
              <ToggleButton>منجز</ToggleButton>
              <ToggleButton>الكل</ToggleButton>
           </ToggleButtonGroup>
           

        </Card>
      </Box>
    </Container>
  );
}
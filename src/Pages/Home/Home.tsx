import { Box, Button, Grid, Typography } from '@mui/material';
import Logo from '../../Assets/Logo.png';

export const Home: React.FC<{}> = (): JSX.Element => {
  return (
		<>
		<Grid container direction="column" sx={{ height: "calc(100%)", overflow: "hidden" }}>
      <Grid item sx={{ height: '60%', position: 'relative', zIndex: 0, color: "white", overflow: "hidden" }}>
			<video src="https://video.wixstatic.com/video/11062b_456cb078f5fb4deaa2845361aa665cf0/1080p/mp4/file.mp4" autoPlay muted loop style={{ position: 'absolute', width: '100%', top: 0, left: 0, overflowY: "hidden" , zIndex: 0}} />
        <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center' }}>
          <img src={Logo} alt="Ticket System" style={{ height: 50 }} />
          <Box sx={{ fontSize: '3rem', fontFamily: "'Poppins', sans-serif", fontWeight: 'bold', mt: 2 }}>Ticket System</Box>
          <Box sx={{ mt: 2, zIndex: 2 }}>
            <Button variant="contained" color="primary">Register</Button>
            <Button variant="outlined" color="primary" sx={{ ml: 2 }}>Login</Button>
          </Box>
        </Box>
      </Grid>
      <Grid item sx={{ height: '40%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', zIndex: 1, backgroundColor: "#fffff" }}>
				<Box sx={{ width: '400px', ml: 40, mr: 'auto', textAlign: 'left' }}>
					<Typography variant="h3" sx={{ mb: 2, fontFamily: "'Poppins', sans-serif", }}>About the Ticket System</Typography>
					<Typography variant="body1" sx={{ textAlign: 'left' }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vitae risus auctor, auctor ipsum nec, tempus neque. Donec sagittis quam at eros hendrerit euismod. Fusce finibus ultrices est, id varius nibh. </Typography>
				</Box>
      </Grid>
    </Grid>
		</>
	);
};

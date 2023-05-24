import { Box, Button, Grid, Typography } from '@mui/material';
import { createUseStyles } from 'react-jss';
import { Link } from 'react-router-dom';
import Logo from '../../Assets/Logo.png';
import Illustration from '../../Assets/Home.svg';
import { useSelector } from 'react-redux';
import { getToken } from '../../Redux/Selectors';

const useStyles = createUseStyles({
  root: {
    height: 'calc(100%)',
    overflow: 'hidden',
  },
  videoWrapper: {
    height: '60%',
    position: 'relative',
    zIndex: 0,
    color: 'white',
    overflow: 'hidden',
  },
  video: {
    position: 'absolute',
    width: '100%',
    top: 0,
    left: 0,
    overflowY: 'hidden',
    zIndex: 0,
  },
  logoWrapper: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    textAlign: 'center',
  },
  logo: {
    height: 50,
  },
  title: {
    fontSize: '3rem',
    fontFamily: "'Poppins', sans-serif",
    fontWeight: 'bold',
    marginTop: 2,
  },
  buttonsWrapper: {
    zIndex: 2,
		marginTop: 40,
  },
  registerButton: {
    backgroundColor: 'primary.main',
    '&:hover': {
      backgroundColor: 'primary.dark',
    },
  },
  loginButton: {
    borderColor: 'primary.main',
    color: 'primary.main',
    '&:hover': {
      borderColor: 'primary.dark',
      color: 'primary.dark',
    },
  },
  aboutWrapper: {
    height: '40%',
    zIndex: 1,
    backgroundColor: '#fffff',
  },
  aboutBox: {
    width: '450px',
    textAlign: 'left',
  },
  aboutTitle: {
    marginBottom: 2,
    fontFamily: "'Poppins', sans-serif",
  },
  aboutText: {
    textAlign: 'left',
  },
});

export const Home: React.FC<{}> = (): JSX.Element => {
	const classes = useStyles();
  const token = useSelector(getToken);

  return (
		<>
      <Grid container direction="column" className={classes.root}>
        <Grid item className={classes.videoWrapper}>
          <video
            src="https://video.wixstatic.com/video/11062b_456cb078f5fb4deaa2845361aa665cf0/1080p/mp4/file.mp4"
            autoPlay
            muted
            loop
            className={classes.video}
          />
          <Box className={classes.logoWrapper}>
            <img src={Logo} alt="Ticket System" className={classes.logo} />
            <Box className={classes.title}>Ticket System</Box>
            <Box className={classes.buttonsWrapper}>
              {!token && <>
                <Button
                  variant="contained"
                  className={classes.registerButton}
                  component={Link}
                  to="/register"
                >
                  Register
                </Button>
                <Button
                  variant="outlined"
                  className={classes.loginButton}
                  sx={{ ml: 2 }}
                  component={Link}
                  to="/login"
                >
                  Login
                </Button>
              </>
              }
            </Box>
          </Box>
        </Grid>
        <Grid item className={classes.aboutWrapper}>
          <Grid container direction="row" justifyContent="center" gap={20} sx={{ marginTop: "min(8vh, 3vw)" }}>
            <Grid item justifyContent={"center"}>
              <Box className={classes.aboutBox}>
                <Typography variant="h4" className={classes.aboutTitle}>
                  About the Ticket System
                </Typography>
                <Typography variant="body1" className={classes.aboutText}>
                Amaceit Ticket System is a powerful and easy-to-use tool that helps to track and manage tickets. With Amaceit, you can easily create and assign tickets, track their progress, and communicate with customers. Amaceit is perfect for both internal and external use. You can use it to track tickets for your own team, as well as tickets from your customers.
                </Typography>
              </Box>
            </Grid>
            <Grid item>
              <img src={Illustration} alt="Home Illustration" width={250} />
            </Grid>
          </Grid>
        </Grid>
			</Grid>
		</>
	);
};
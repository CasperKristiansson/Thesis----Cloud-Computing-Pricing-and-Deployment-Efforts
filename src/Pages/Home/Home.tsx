import { Box, Button, Grid, Typography } from '@mui/material';
import { createUseStyles } from 'react-jss';
import { Link } from 'react-router-dom';
import Logo from '../../Assets/Logo.png';
import Illustration from '../../Assets/Home.svg';
import { useMsal } from "@azure/msal-react";
import { loginRequest } from '../../authConfig';
import { useSelector } from 'react-redux';
import { getToken } from '../../Redux/Selectors';
import { LoginButton } from '../../Components/LoginButton';

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

export const Home: React.FC<{ dispatch: any }> = ({ dispatch }): JSX.Element => {
  const classes = useStyles();

  const token = useSelector(getToken);

  console.log(token);

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
              {token === '' ? <LoginButton dispatch={dispatch} /> : null}
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
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                  quis nisl euismod, aliquam nisl eu, aliquet nisl. Donec
                  condimentum, nisl eget aliquam lacinia, nisl nisl aliquet
                  ligula, eget aliquam nisl nisl eget nisl. Donec condimentum,
                  nisl eget aliquam lacinia, nisl nisl aliquet ligula, eget
                  aliquam nisl nisl eget nisl.
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

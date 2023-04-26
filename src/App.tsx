import { Theme, initializeTheme } from './Styling/Theme';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from './store';
import { ThemeProvider } from 'react-jss';
import { ComponentRouting } from './ComponentRouting';
import { createUseStyles } from 'react-jss';
import { getOperationInProgress, getToken } from './Redux/Selectors';
import { Toaster } from 'react-hot-toast';
import { ThemeProvider as MuiThemeProvider, createTheme } from '@mui/material/styles';
import { Backdrop, CircularProgress } from '@mui/material';
import './App.css'
import { Navigation } from './Pages/Navigation/Navigation';
import React from 'react';
import { useNavigate } from 'react-router-dom';


const useStyles = createUseStyles((theme: Theme) => {
  return {
    section: {
      display: 'flex',
      height: '100%',
      minHeight: '100vh',
      overflow: 'hidden',
    }
  }
})

export const App = (): JSX.Element => {
  const navigate = useNavigate();

  const operationInProgress = useSelector(getOperationInProgress);
  const token = useSelector(getToken);

  const dispatch: AppDispatch = useDispatch();
  const classes = useStyles();

  const theme = initializeTheme();

  const MuiTheme = createTheme({
    palette: {
      primary: {
        main: theme.buttonPrimary,
      },
    },
  });

  // If requesting any other page than '/' or '/login' and the token is empty, redirect to login.
  React.useEffect(() => {
    if(token === '' && window.location.pathname !== '/login' && window.location.pathname !== '/' && window.location.pathname !== '/register'){
      navigate('/login');
    }
  }, [navigate, token]);

  return (
    <ThemeProvider theme={theme}>
      <div className={classes.section}>
        <Toaster />
        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={operationInProgress}
        >
          <CircularProgress color="primary" size={100} />
        </Backdrop>
        <MuiThemeProvider theme={MuiTheme}>
          <div>
            <Navigation />
            <ComponentRouting
              dispatch={dispatch}
            />
          </div>
        </MuiThemeProvider>
      </div>
    </ThemeProvider>
  );
}

export default App;

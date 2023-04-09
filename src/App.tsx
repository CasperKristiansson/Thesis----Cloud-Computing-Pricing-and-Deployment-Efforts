import { Theme, initializeTheme } from './Styling/Theme';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from './store';
import { ThemeProvider } from 'react-jss';
import { ComponentRouting } from './ComponentRouting';
import { createUseStyles } from 'react-jss';
import { getOperationInProgress } from './Redux/Selectors';
import { Toaster } from 'react-hot-toast';
import { ThemeProvider as MuiThemeProvider, createTheme } from '@mui/material/styles';
import { Backdrop, CircularProgress } from '@mui/material';
import './App.css'
import { Navigation } from './Pages/Navigation/Navigation';


const useStyles = createUseStyles((theme: Theme) => {
  return {
    section: {
      display: 'flex',
      height: '100%',
      minHeight: '100vh',
    }
  }
})

export const App = (): JSX.Element => {
  const operationInProgress = useSelector(getOperationInProgress);

  const dispatch: AppDispatch = useDispatch();
  const classes = useStyles();

  const MuiTheme = createTheme({
    palette: {
      // background: {
      //   default: theme.backgroundPrimary,
      //   paper: theme.backgroundPrimary,
      // },
    },
  });

  return (
    <ThemeProvider theme={initializeTheme}>
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

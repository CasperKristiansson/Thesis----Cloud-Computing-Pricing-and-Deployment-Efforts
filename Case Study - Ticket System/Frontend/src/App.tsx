import { Theme, initializeTheme } from './Styling/Theme';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from './store';
import { ThemeProvider } from 'react-jss';
import { ComponentRouting } from './ComponentRouting';
import { createUseStyles } from 'react-jss';
import { getOperationInProgress, getToken, getUploadFile } from './Redux/Selectors';
import { Toaster } from 'react-hot-toast';
import { ThemeProvider as MuiThemeProvider, createTheme } from '@mui/material/styles';
import { Backdrop, Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import './App.css'
import { Navigation } from './Pages/Navigation/Navigation';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { UploadFile } from './Components/UploadFile';
import { requestApi } from './Utils/Fetch';
import { User } from './Models/BackendModels/User';
import { SET_OPERATION_IN_PROGRESS } from './Redux/Actions';
import { Company } from './Models/BackendModels/Company';

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
  const uploadFile = useSelector(getUploadFile);
  const token = useSelector(getToken);

  const [selectCompanyDialogOpen, setSelectCompanyDialogOpen] = React.useState(false);
  const [companies, setCompanies] = React.useState<Company[]>([]);
  const [selectedCompany, setSelectedCompany] = React.useState<string>('');
  const [selectCompanySaveLoading, setSelectCompanySaveLoading] = React.useState<boolean>(false);

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
    dispatch({ type: SET_OPERATION_IN_PROGRESS, payload: true });

    if (token === '' && window.location.pathname !== '/login' && window.location.pathname !== '/' && window.location.pathname !== '/register') {
      navigate('/login');
    } else if (token !== '') {
      requestApi('authenticate', "GET", token).then(response => {
        if (response) { // Token valid, i.e we get valid response from backend
          const user = response as User;

          dispatch({ type: 'SET_USER', payload: user });
          console.log(user)
          if (user.companyId == null) {
            requestApi('companies', "GET", token).then(response => {
              if (response) {
                const companies = response as Company[];
                setCompanies(companies);
                setSelectCompanyDialogOpen(true);
              } else {
                setSelectCompanyDialogOpen(false);
              }
            });
          } else {
            setSelectCompanyDialogOpen(false);
          }
        } else { // Token not valid
          dispatch({ type: 'CLEAR_TOKEN' });
          navigate('/login');
        }
        dispatch({ type: SET_OPERATION_IN_PROGRESS, payload: false });
      })
    } else {
      dispatch({ type: SET_OPERATION_IN_PROGRESS, payload: false });
    }
  }, [token]);

  const handleSelectCompany = () => {
    if(selectedCompany === '') return;

    setSelectCompanySaveLoading(true);

    requestApi('setCompany', "PUT", token, { companyId: selectedCompany }).then(response => {
      if (response) {
        setSelectCompanyDialogOpen(false);
      }
      setSelectCompanySaveLoading(false);
    });
  }

  const selectCompanyDialog = <Dialog open={selectCompanyDialogOpen}>
    <DialogTitle>Please select your company</DialogTitle>
    <DialogContent>
      <DialogContentText>
        To use this service we need to know which company you are working for.
        If your company is not listed, please contact anyone from amaceit.
      </DialogContentText>

      <FormControl fullWidth margin='normal'>
        <InputLabel id="demo-simple-select-label">Choose company</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={selectedCompany}
          onChange={(e) => setSelectedCompany(e.target.value as string)}
          label="Choose company"
        >
          {companies.map(company => {
            return <MenuItem key={company.id} value={company.id}>{company.name}</MenuItem>
          })}
        </Select>
      </FormControl>
    </DialogContent>

    <DialogActions>
      {!selectCompanySaveLoading ? <Button onClick={handleSelectCompany}>Save</Button> : <CircularProgress />}
    </DialogActions>
  </Dialog>

  return (
    <ThemeProvider theme={theme}>

      {selectCompanyDialog}

      <div className={classes.section}>
        <Toaster />
        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={operationInProgress}
        >
          <CircularProgress color="primary" size={100} />
        </Backdrop>
        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1, cursor: 'pointer' }}
          open={uploadFile.open}
        >
          <UploadFile dispatch={dispatch} />
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

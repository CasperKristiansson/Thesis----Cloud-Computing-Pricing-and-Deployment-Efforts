import { Theme } from '../../../Styling/Theme';
import { createUseStyles } from 'react-jss';
import { TextField, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { AppDispatch } from '../../../store';
import { getCreateCompanyEmail, getCreateCompanyName, getCreateCompanyPrimaryContact } from '../../../Redux/Selectors';
import { SET_CREATE_COMPANY_EMAIL, SET_CREATE_COMPANY_NAME, SET_CREATE_COMPANY_PRIMARY_CONTACT } from '../../../Redux/Actions';

const useStyles = createUseStyles((theme: Theme) => {
  return {
    root: {
      '& > :not(style)': { width: '100%', marginBottom: "10px"},
    },
  };
});

export const StepOne: React.FC<{dispatch: AppDispatch}> = ({ dispatch }) => {
  const companyName = useSelector(getCreateCompanyName);
	const companyEmail = useSelector(getCreateCompanyEmail);
	const companyPrimaryContact = useSelector(getCreateCompanyPrimaryContact);
  const classes = useStyles();

  return (
		<>
    <div className={classes.root}>
      <Typography variant="h5" textAlign={"center"}>
				Company Information
			</Typography>
      <TextField
        id="project-name-input"
        label="Company Name"
        value={companyName ? companyName : ''}
        onChange={(e) => {
          dispatch({ type: SET_CREATE_COMPANY_NAME, payload: e.target.value });
        }}
      />
      <TextField
        id="company-description-input"
        label="Company Email"
        multiline
        value={companyEmail ? companyEmail : ''}
        onChange={(e) => {
          dispatch({ type: SET_CREATE_COMPANY_EMAIL, payload: e.target.value });
        }}
      />
      <TextField
        id="company-description-input"
        label="Company Contact Person (Name)"
        multiline
        value={companyPrimaryContact ? companyPrimaryContact : ''}
        onChange={(e) => {
          dispatch({ type: SET_CREATE_COMPANY_PRIMARY_CONTACT, payload: e.target.value });
        }}
      />
    </div>
    </>
  );
}
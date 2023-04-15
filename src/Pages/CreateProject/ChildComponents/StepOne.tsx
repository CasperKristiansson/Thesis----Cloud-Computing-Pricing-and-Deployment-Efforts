import { Theme } from '../../../Styling/Theme';
import { createUseStyles } from 'react-jss';
import { FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { useSelector } from 'react-redux';
import { getCreateProjectAssociatedCompany, getCreateProjectDescription, getCreateProjectName } from '../../../Redux/Selectors';
import { AppDispatch } from '../../../store';
import { SET_CREATE_PROJECT_ASSOCIATED_COMPANY, SET_CREATE_PROJECT_DESCRIPTION, SET_CREATE_PROJECT_NAME } from '../../../Redux/Actions';

const useStyles = createUseStyles((theme: Theme) => {
  return {
    root: {
      '& > :not(style)': { width: '100%', marginBottom: "10px" },
    },
  };
});

export const StepOne: React.FC<{dispatch: AppDispatch}> = ({ dispatch }) => {
  const projectName = useSelector(getCreateProjectName);
  const associatedCompany = useSelector(getCreateProjectAssociatedCompany);
  const companyDescription = useSelector(getCreateProjectDescription);
  const classes = useStyles();

  return (
		<>
    <div className={classes.root}>
      <TextField
        id="project-name-input"
        label="Project Name"
        value={projectName ? projectName : ''}
        onChange={(e) => {
          dispatch({ type: SET_CREATE_PROJECT_NAME, payload: e.target.value });
        }}
      />
      <FormControl>
        <InputLabel id="company-dropdown-label">Company</InputLabel>
        <Select
          labelId="company-dropdown-label"
          id="company-dropdown"
          value={associatedCompany ? associatedCompany : ''}
          onChange={(e) => {
            dispatch({ type: SET_CREATE_PROJECT_ASSOCIATED_COMPANY, payload: e.target.value });
          }}
          label="Company"
        >
          <MenuItem value={1}>Company 1</MenuItem>
          <MenuItem value={2}>Company 2</MenuItem>
          <MenuItem value={3}>Company 3</MenuItem>
        </Select>
      </FormControl>
      <TextField
        id="company-description-input"
        label="Company Description"
        multiline
        rows={4}
        value={companyDescription ? companyDescription : ''}
        onChange={(e) => {
          dispatch({ type: SET_CREATE_PROJECT_DESCRIPTION, payload: e.target.value });
        }}
      />
    </div>
    </>
  );
}
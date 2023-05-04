import { Theme } from '../../../Styling/Theme';
import { createUseStyles } from 'react-jss';
import { FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import { AppDispatch } from '../../../store';
import { Company } from '../../../Models/BackendModels/Company';
import { CreateProjectRequest } from '../../../Models/RequestModels/CreateProjectRequest';

const useStyles = createUseStyles((theme: Theme) => {
  return {
    root: {
      '& > :not(style)': { width: '100%', marginBottom: "10px"},
    },
  };
});

export const StepOne: React.FC<{dispatch: AppDispatch, companies: Company[], createProjectRequest: CreateProjectRequest, setCreateProjectRequest: (val: CreateProjectRequest) => void}> = ({ dispatch, companies, createProjectRequest, setCreateProjectRequest }) => {
  const classes = useStyles();

  return (
		<>
    <div className={classes.root}>
      <Typography variant="h5" textAlign={"center"}>
				Project Information
			</Typography>
      <TextField
        id="project-name-input"
        label="Project Name"
        value={createProjectRequest.name}
        onChange={(e) => setCreateProjectRequest({ ...createProjectRequest, name: e.target.value })}
      />
      <FormControl>
        <InputLabel id="company-dropdown-label">Company</InputLabel>
        <Select
          labelId="company-dropdown-label"
          id="company-dropdown"
          value={createProjectRequest.companyId}
          onChange={(e) => setCreateProjectRequest({ ...createProjectRequest, companyId: e.target.value as string})}
          label="Company"
        >
          {companies.map((company) => {
            return <MenuItem key={company.id} value={company.id}>{company.name}</MenuItem>
          })
          }
        </Select>
      </FormControl>
      <TextField
        id="company-description-input"
        label="Company Description"
        multiline
        rows={4}
        value={createProjectRequest.description}
        onChange={(e) => setCreateProjectRequest({ ...createProjectRequest, description: e.target.value })}
      />
    </div>
    </>
  );
}
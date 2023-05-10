import { Theme } from '../../../Styling/Theme';
import { createUseStyles } from 'react-jss';
import { Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import { ProjectResponse } from '../../../Models/ResponseModels/ProjectResponse';
import { Company } from '../../../Models/BackendModels/Company';

const useStyles = createUseStyles((theme: Theme) => {
  return {
    root: {
      '& > :not(style)': { width: '100%', marginBottom: "10px"},
    },
  };
});

export const StepOne: React.FC<{ project: ProjectResponse, setProject: (val: ProjectResponse) => void, companies: Company[], handleOpenDialog: () => void }> = ({ project, setProject, companies, handleOpenDialog }) => {
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
        value={project.name}
        onChange={(e) => setProject({ ...project, name: e.target.value })}
      />
      <FormControl>
        <InputLabel id="company-dropdown-label">Company</InputLabel>
        <Select
          labelId="company-dropdown-label"
          id="company-dropdown"
          value={project.companyId}
          onChange={(e) => setProject({ ...project, companyId: e.target.value })}
          label="Company"
        >
          {companies.map((company) => (
            <MenuItem key={company.id} value={company.id}>{company.name}</MenuItem>
          ))}
        </Select>
      </FormControl>
      <TextField
        id="company-description-input"
        label="Project Description"
        multiline
        rows={4}
        value={project.description}
        onChange={(e) => setProject({ ...project, description: e.target.value })}
      />
      <Button
        variant="contained"
        color="error"
        style={{width: "200px", margin: "0 auto", display: "block", marginTop: "25px"}}
        onClick={handleOpenDialog}
      >
        Delete Project
      </Button>
    </div>
    </>
  );
}
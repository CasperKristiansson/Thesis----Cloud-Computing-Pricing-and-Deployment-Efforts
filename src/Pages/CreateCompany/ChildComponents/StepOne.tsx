import { Theme } from '../../../Styling/Theme';
import { createUseStyles } from 'react-jss';
import { TextField, Typography } from '@mui/material';
import { Company } from '../../../Models/BackendModels/Company';

const useStyles = createUseStyles((theme: Theme) => {
  return {
    root: {
      '& > :not(style)': { width: '100%', marginBottom: "10px" },
    },
  };
});

export const StepOne: React.FC<{ company: Company, setCompany: (val: Company) => void }> = ({ company, setCompany }) => {
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
          value={company.name}
          onChange={(e) => setCompany({ ...company, name: e.target.value })}
        />
        <TextField
          id="company-description-input"
          label="Company Email"
          multiline
          value={company.email}
          onChange={(e) => setCompany({ ...company, email: e.target.value })}
        />
        <TextField
          id="company-description-input"
          label="Company Contact Person (Name)"
          multiline
          value={company.contactPersonName}
          onChange={(e) => setCompany({ ...company, contactPersonName: e.target.value })}
        />
      </div>
    </>
  );
}
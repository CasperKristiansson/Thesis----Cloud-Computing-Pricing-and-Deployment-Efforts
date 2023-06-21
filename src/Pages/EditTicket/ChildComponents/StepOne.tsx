import { Theme } from '../../../Styling/Theme';
import { createUseStyles } from 'react-jss';
import { Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import { TicketResponse } from '../../../Models/ResponseModels/TicketResponse';
import { ProjectResponse } from '../../../Models/ResponseModels/ProjectResponse';
import { User } from '../../../Models/BackendModels/User';

const useStyles = createUseStyles((theme: Theme) => {
  return {
    root: {
      '& > :not(style)': { width: '100%', marginBottom: "10px"},
    },
  };
});

export const StepOne: React.FC<{ ticket: TicketResponse, setTicket: (val: TicketResponse) => void, projects: ProjectResponse[], users: User[], handleOpenDialog: () => void }> = ({ ticket, setTicket, projects, users, handleOpenDialog }) => {
  const classes = useStyles();

  return (
		<>
    <div className={classes.root}>
      <Typography variant="h5" textAlign={"center"}>
				Project Information
			</Typography>

      <TextField
        label="Ticket Name"
        value={ticket.title}
        onChange={(e) => setTicket({ ...ticket, title: e.target.value })}
      />

      <FormControl>
        <InputLabel id="company-dropdown-label">Ticket Priority</InputLabel>
        <Select
          value={ticket.priority}
          onChange={(e) => setTicket({ ...ticket, priority: e.target.value })}
          label="Ticket Priority"
        >
          <MenuItem value={"Low"}>Low</MenuItem>
          <MenuItem value={"Medium"}>Medium</MenuItem>
          <MenuItem value={"High"}>High</MenuItem>
        </Select>
      </FormControl>

      <FormControl>
        <InputLabel id="company-dropdown-label">Ticket Assignee</InputLabel>

        <Select
          value={users.find((user) => user.id === ticket.assignedId)?.id}
          onChange={(e) => setTicket({ ...ticket, assignedId: e.target.value })}
          label="Ticket Assignee"
        >
          {users.map((user) => {
            return <MenuItem value={user.id}>{user.name}</MenuItem>
          })}
        </Select>
      </FormControl>

      <FormControl>
        <InputLabel id="company-dropdown-label">Ticket Project</InputLabel>

        <Select
          value={projects.find((project) => project.id === ticket.projectId)?.id}
          onChange={(e) => setTicket({ ...ticket, projectId: e.target.value })}
          label="Ticket Project"
        >
          {projects.map((project) => {
            return <MenuItem value={project.id}>{project.name} ({project.companyName})</MenuItem>
          })}
        </Select>
      </FormControl>

      <Button
        variant="contained"
        color="error"
        style={{width: "200px", margin: "0 auto", display: "block", marginTop: "25px"}}
        onClick={handleOpenDialog}
      >
        Delete Ticket
      </Button>
    </div>
    </>
  );
}
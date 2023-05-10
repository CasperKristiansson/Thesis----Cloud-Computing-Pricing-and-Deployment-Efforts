import { Theme } from '../../../Styling/Theme';
import { createUseStyles } from 'react-jss';
import { FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { AppDispatch } from '../../../store';
import { SET_CREATE_TICKET_ASSIGNEE, SET_CREATE_TICKET_NAME, SET_CREATE_TICKET_PRIORITY, SET_CREATE_TICKET_PROJECT } from '../../../Redux/Actions';
import { getCreateTicketAssignee, getCreateTicketName, getCreateTicketPriority, getCreateTicketProject } from '../../../Redux/Selectors';
import { ProjectResponse } from '../../../Models/ResponseModels/ProjectResponse';
import { User } from '../../../Models/BackendModels/User';
import { CreateTicketRequest } from '../../../Models/RequestModels/CreateTicketRequest';

const useStyles = createUseStyles((theme: Theme) => {
  return {
    root: {
      '& > :not(style)': { width: '100%', marginBottom: "10px"},
    },
  };
});

interface StepOneProps {
  projects: ProjectResponse[], 
  users: User[], 
  createTicketRequest: CreateTicketRequest, 
  setCreateTicketRequest: (createTicketRequest: CreateTicketRequest) => void
}

export const StepOne: React.FC<StepOneProps> = ({ projects, users, createTicketRequest, setCreateTicketRequest }) => {
  const classes = useStyles();

  return (
		<>
    <div className={classes.root}>
      <Typography variant="h5" textAlign={"center"}>
				Project Information
			</Typography>

      <TextField
        label="Ticket Name"
        value={createTicketRequest.name}
        onChange={(e) => setCreateTicketRequest({ ...createTicketRequest, name: e.target.value })}
      />

      <FormControl>
        <InputLabel id="company-dropdown-label">Ticket Priority</InputLabel>

        <Select
          value={createTicketRequest.priority}
          onChange={(e) => setCreateTicketRequest({ ...createTicketRequest, priority: e.target.value })}
          label="Ticket Priority"
        >
          <MenuItem value={'Low'}>Low</MenuItem>
          <MenuItem value={'Medium'}>Medium</MenuItem>
          <MenuItem value={'High'}>High</MenuItem>
        </Select>
      </FormControl>

      <FormControl>
        <InputLabel id="company-dropdown-label">Ticket Assignee</InputLabel>
        <Select
          value={createTicketRequest.assignedId}
          onChange={(e) => setCreateTicketRequest({ ...createTicketRequest, assignedId: e.target.value })}
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
          value={createTicketRequest.projectId}
          onChange={(e) => setCreateTicketRequest({ ...createTicketRequest, projectId: e.target.value })}
          label="Ticket Project"
        >
          {projects.map((project) => {
            return <MenuItem value={project.id}>{project.name} ({project.companyName})</MenuItem>
          })
          }
        </Select>
      </FormControl>
    </div>
    </>
  );
}
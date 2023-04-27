import { Theme } from '../../../Styling/Theme';
import { createUseStyles } from 'react-jss';
import { FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { AppDispatch } from '../../../store';
import { SET_CREATE_TICKET_ASSIGNEE, SET_CREATE_TICKET_NAME, SET_CREATE_TICKET_PRIORITY, SET_CREATE_TICKET_PROJECT } from '../../../Redux/Actions';
import { getCreateTicketAssignee, getCreateTicketName, getCreateTicketPriority, getCreateTicketProject } from '../../../Redux/Selectors';

const useStyles = createUseStyles((theme: Theme) => {
  return {
    root: {
      '& > :not(style)': { width: '100%', marginBottom: "10px"},
    },
  };
});

export const StepOne: React.FC<{dispatch: AppDispatch}> = ({ dispatch }) => {
  const ticketName = useSelector(getCreateTicketName);
  const ticketPriority = useSelector(getCreateTicketPriority);
  const ticketAssignee = useSelector(getCreateTicketAssignee);
  const ticketProject = useSelector(getCreateTicketProject);

  const classes = useStyles();

  return (
		<>
    <div className={classes.root}>
      <Typography variant="h5" textAlign={"center"}>
				Project Information
			</Typography>
      <TextField
        label="Ticket Name"
        value={ticketName ? ticketName : ''}
        onChange={(e) => {
          dispatch({ type: SET_CREATE_TICKET_NAME, payload: e.target.value });
        }}
      />
      <FormControl>
        <InputLabel id="company-dropdown-label">Ticket Priority</InputLabel>
        <Select
          value={ticketPriority ? ticketPriority : ''}
          onChange={(e) => {
            dispatch({ type: SET_CREATE_TICKET_PRIORITY, payload: e.target.value });
          }}
          label="Ticket Priority"
        >
          <MenuItem value={1}>Low</MenuItem>
          <MenuItem value={2}>Medium</MenuItem>
          <MenuItem value={3}>High</MenuItem>
        </Select>
      </FormControl>
      {/* Do the same for assignne, project */}
      <FormControl>
        <InputLabel id="company-dropdown-label">Ticket Assignee</InputLabel>
        <Select
          value={ticketAssignee ? ticketAssignee : ''}
          onChange={(e) => {
            dispatch({ type: SET_CREATE_TICKET_ASSIGNEE, payload: e.target.value });
          }}
          label="Ticket Assignee"
        >
          <MenuItem value={1}>Low</MenuItem>
          <MenuItem value={2}>Medium</MenuItem>
          <MenuItem value={3}>High</MenuItem>
        </Select>
      </FormControl>
      <FormControl>
        <InputLabel id="company-dropdown-label">Ticket Project</InputLabel>
        <Select
          value={ticketProject ? ticketProject : ''}
          onChange={(e) => {
            dispatch({ type: SET_CREATE_TICKET_PROJECT, payload: e.target.value });
          }}
          label="Ticket Project"
        >
          <MenuItem value={1}>Low</MenuItem>
          <MenuItem value={2}>Medium</MenuItem>
          <MenuItem value={3}>High</MenuItem>
        </Select>
      </FormControl>
    </div>
    </>
  );
}
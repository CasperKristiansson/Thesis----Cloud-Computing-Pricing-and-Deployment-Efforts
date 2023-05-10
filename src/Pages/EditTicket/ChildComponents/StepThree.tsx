import { Theme } from '../../../Styling/Theme';
import { createUseStyles } from 'react-jss';
import { Typography, Grid, Paper } from '@mui/material';
import { useSelector } from 'react-redux';
import { AppDispatch } from '../../../store';
import { getCreateTicket } from '../../../Redux/Selectors';
import { TicketResponse } from '../../../Models/ResponseModels/TicketResponse';
import { ProjectResponse } from '../../../Models/ResponseModels/ProjectResponse';
import { User } from '../../../Models/BackendModels/User';

const useStyles = createUseStyles((theme: Theme) => {
  return {
    root: {
			height: 'calc(100% - 80px)',
    },
		paper: {
      height: '100%',
			padding: 5,
			backgroundColor: theme.backgroundSecondaryLight,
    },
		paperInner: {
			display: 'flex',
      flexDirection: 'column',
		},
    row: {
      textAlign: 'left',
    },
  };
});

export const StepThree: React.FC<{ ticket: TicketResponse, projects: ProjectResponse[], users: User[] }> = ({ ticket, projects, users }) => {
	//const createTicket = useSelector(getCreateTicket);
  const classes = useStyles();

  return (
		<>
		<div className={classes.root}>
			<Typography variant="h5" textAlign={"center"} sx={{ paddingBottom: 2 }}>
				Project Information
			</Typography>
      <Paper className={classes.paper}>
        <div className={classes.paperInner}>
          <Grid container spacing={3} height="100%">
            <Grid item xs={12} sm={6} className={classes.row}>
              <Typography variant="h6">
                Name
              </Typography>
              <Typography variant="body1">{ticket.title}</Typography>
            </Grid>
            <Grid item xs={12} sm={6} className={classes.row}>
              <Typography variant="h6">
                Priority
              </Typography>
              <Typography variant="body1">{ticket.priority}</Typography>
            </Grid>
            <Grid item xs={12} sm={6} className={classes.row}>
              <Typography variant="h6">
                Assignee
              </Typography>
              <Typography variant="body1">{users.find(u => u.id === ticket.assignedId)?.name}</Typography>
            </Grid>
            <Grid item xs={12} sm={6} className={classes.row}>
              <Typography variant="h6">
                Project
              </Typography>
              <Typography variant="body1">{projects.find(p => p.id === ticket.projectId)?.name}</Typography>
            </Grid>
            <Grid item xs={12} className={classes.row}>
              <Typography variant="h6">
                Description
              </Typography>
              <Typography variant="body1">{ticket.description}</Typography>
            </Grid>
          </Grid>
        </div>
      </Paper>
    </div>
    </>
  );
}
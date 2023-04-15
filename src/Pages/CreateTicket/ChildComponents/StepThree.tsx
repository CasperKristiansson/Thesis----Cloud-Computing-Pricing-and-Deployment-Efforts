import { Theme } from '../../../Styling/Theme';
import { createUseStyles } from 'react-jss';
import { Typography, Grid, Paper } from '@mui/material';
import { useSelector } from 'react-redux';
import { AppDispatch } from '../../../store';
import { getCreateTicket } from '../../../Redux/Selectors';

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

export const StepThree: React.FC<{dispatch: AppDispatch}> = ({ dispatch }) => {
	const createTicket = useSelector(getCreateTicket);
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
              <Typography variant="body1">{createTicket.name}</Typography>
            </Grid>
            <Grid item xs={12} sm={6} className={classes.row}>
              <Typography variant="h6">
                Priority
              </Typography>
              <Typography variant="body1">{createTicket.priority}</Typography>
            </Grid>
            <Grid item xs={12} sm={6} className={classes.row}>
              <Typography variant="h6">
                Assignee
              </Typography>
              <Typography variant="body1">{createTicket.assignee}</Typography>
            </Grid>
            <Grid item xs={12} sm={6} className={classes.row}>
              <Typography variant="h6">
                Project
              </Typography>
              <Typography variant="body1">{createTicket.project}</Typography>
            </Grid>
            <Grid item xs={12} className={classes.row}>
              <Typography variant="h6">
                Description
              </Typography>
              <Typography variant="body1">{createTicket.description}</Typography>
            </Grid>
          </Grid>
        </div>
      </Paper>
    </div>
    </>
  );
}
import { Theme } from '../../../Styling/Theme';
import { createUseStyles } from 'react-jss';
import { Typography, Grid, Paper } from '@mui/material';
import { useSelector } from 'react-redux';
import { AppDispatch } from '../../../store';
import { getCreateProjectAssociatedCompany, getCreateProjectDescription, getCreateProjectName } from '../../../Redux/Selectors';

const useStyles = createUseStyles((theme: Theme) => {
  return {
    root: {
			height: 'calc(100% - 80px)',
    },
		paper: {
      height: '100%',
			padding: 5,
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

export const StepTwo: React.FC<{dispatch: AppDispatch}> = ({ dispatch }) => {
  const projectName = useSelector(getCreateProjectName);
  const associatedCompany = useSelector(getCreateProjectAssociatedCompany);
  const companyDescription = useSelector(getCreateProjectDescription);
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
								Project Name
							</Typography>
							<Typography variant="body1">{projectName}</Typography>
						</Grid>
						<Grid item xs={12} sm={6} className={classes.row}>
							<Typography variant="h6">
								Associated Company
							</Typography>
							<Typography variant="body1">{associatedCompany}</Typography>
						</Grid>
						<Grid item xs={12} className={classes.row}>
							<Typography variant="h6">
								Company Description
							</Typography>
							<Typography variant="body1">{companyDescription}</Typography>
						</Grid>
					</Grid>
				</div>
      </Paper>
    </div>
    </>
  );
}
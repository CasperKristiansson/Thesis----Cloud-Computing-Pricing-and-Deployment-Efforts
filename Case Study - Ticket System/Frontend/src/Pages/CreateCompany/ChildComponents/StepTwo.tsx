import { Theme } from '../../../Styling/Theme';
import { createUseStyles } from 'react-jss';
import { Typography, Grid, Paper } from '@mui/material';
import { Company } from '../../../Models/BackendModels/Company';

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

export const StepTwo: React.FC<{ company: Company }> = ({ company }) => {
	const classes = useStyles();

	return (
		<>
			<div className={classes.root}>
				<Typography variant="h5" textAlign={"center"} sx={{ paddingBottom: 2 }}>
					Company Information
				</Typography>
				<Paper className={classes.paper}>
					<div className={classes.paperInner}>
						<Grid container spacing={3} height="100%">
							<Grid item xs={12} sm={6} className={classes.row}>
								<Typography variant="h6">
									Company Name
								</Typography>
								<Typography variant="body1">{company.name}</Typography>
							</Grid>
							<Grid item xs={12} sm={6} className={classes.row}>
								<Typography variant="h6">
									Company Email
								</Typography>
								<Typography variant="body1">{company.email}</Typography>
							</Grid>
							<Grid item xs={12} className={classes.row}>
								<Typography variant="h6">
									Company Primary Contact
								</Typography>
								<Typography variant="body1">{company.contactPersonName}</Typography>
							</Grid>
						</Grid>
					</div>
				</Paper>
			</div>
		</>
	);
}
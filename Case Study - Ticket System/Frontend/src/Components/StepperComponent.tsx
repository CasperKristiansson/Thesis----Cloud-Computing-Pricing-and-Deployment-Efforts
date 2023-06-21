import React from 'react';
import { Box, StepIconProps, Typography } from '@mui/material';
import { createUseStyles } from 'react-jss';
import { Theme } from '../Styling/Theme';

const useStyles = createUseStyles((theme: Theme) => ({
  circle: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '50%',
    width: '60px',
    height: '60px',
    color: theme.textWhite,
		marginTop: -17,
		zIndex: 10,
  },
}));

export function StepperComponent(props: StepIconProps) {
	const { active, completed } = props;
  const classes = useStyles();
  
	return (
		<Box className={classes.circle} sx={{ backgroundColor: active ? '#75BC5B' : completed ? '#AFE29D' : '#D9D9D9' }}>
			<Typography variant="body1">{props.icon}</Typography>
		</Box>
	);
}

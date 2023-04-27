import React, { useEffect, useRef } from 'react';
import { createUseStyles } from 'react-jss';
import { Theme } from '../Styling/Theme';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloudArrowDown } from '@fortawesome/free-solid-svg-icons';
import { Typography } from '@mui/material';
import { UPLOAD_FILE_OPEN } from '../Redux/Actions';

const useStyles = createUseStyles((theme: Theme) => ({
	downloadBox: {
		borderColor: theme.backgroundSecondary,
		border: '1px solid',
		borderStyle: 'dashed',
		borderRadius: '5px',
		height: '50%',
		width: '35%',
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
		background: "white",
		color: "black"
	},
}));

export const UploadFile: React.FC<{ dispatch: any }> = ({ dispatch }) => {
  const classes = useStyles();

	const backdropRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (backdropRef.current && !backdropRef.current.contains(event.target as Node)) {
        dispatch({ type: UPLOAD_FILE_OPEN, payload: false });
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dispatch]);
  
	return (
		<div className={classes.downloadBox} ref={backdropRef}>
			<FontAwesomeIcon icon={faCloudArrowDown} size='4x' color={"#75BC5B"} />
			<Typography variant="body1" textAlign={"center"} sx={{ paddingLeft: 2 }}>
				Drag and Drop, or browse your files
			</Typography>
		</div>
	);
}

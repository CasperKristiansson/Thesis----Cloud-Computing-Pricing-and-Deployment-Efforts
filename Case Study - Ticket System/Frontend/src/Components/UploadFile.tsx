import React, { useEffect, useRef, useState } from 'react';
import { createUseStyles } from 'react-jss';
import { Theme } from '../Styling/Theme';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloudArrowDown } from '@fortawesome/free-solid-svg-icons';
import { Typography } from '@mui/material';
import { SET_OPERATION_IN_PROGRESS, UPLOAD_FILE_OPEN } from '../Redux/Actions';
import uploadFileToBlob from '../blobConfig';
import { getUploadFile } from '../Redux/Selectors';
import { useSelector } from 'react-redux';

const useStyles = createUseStyles((theme: Theme) => ({
	downloadBox: {
		borderColor: theme.backgroundSecondary,
		border: '2px solid',
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

	const input = React.useRef<HTMLInputElement>(null);

	const uploadFile = useSelector(getUploadFile);
	//const [fileUploaded, setFileUploaded] = useState<string>('');

	const onFileChange = (event: any) => {
		// capture file into state
		onFileUpload(event.target.files[0]);
	};

	const onFileUpload = async (file: File) => {
		console.log(uploadFile.id)
		console.log(file)
		if (file && file?.name && uploadFile.id) {
			dispatch({ type: SET_OPERATION_IN_PROGRESS, payload: true });

			// *** UPLOAD TO AZURE STORAGE ***
			await uploadFileToBlob(file, uploadFile.id);

			//setFileUploaded(fileSelected.name);
			dispatch({ type: SET_OPERATION_IN_PROGRESS, payload: false });
		}
		
		dispatch({ type: UPLOAD_FILE_OPEN, payload: false });
	};

	return (
		<div 
			className={classes.downloadBox} 
			ref={backdropRef}
			onClick={() => {
				if (input && input.current) {
					input.current.click();
				}
			}}
		>
			<FontAwesomeIcon icon={faCloudArrowDown} size='4x' color={"#75BC5B"} />
			<Typography variant="body1" textAlign={"center"}>
				Browse your files
			</Typography>
			<input 
				type="file"
				ref={input} 
				onChange={onFileChange} 
				style={{ display: 'none' }}
			/>
		</div>
	);
}

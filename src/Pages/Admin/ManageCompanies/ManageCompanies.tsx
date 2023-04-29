import { Grid, Box, Typography, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import { CustomTableAdmin } from "../../../Components/CustomTableAdmin";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from 'react-router-dom';

const columns = [
	'Company Name',
	'Primary Contact',
	'Email',
	'Projects',
	'Remove',
];

export const ManageCompanies: React.FC<{ dispatch: any }> = ({ dispatch }) => {
	const [isOpen, setIsOpen] = useState(false);
	const navigate = useNavigate();

  const handleOpenDialog = () => {
    setIsOpen(true);
  };

  const handleCloseDialog = () => {
    setIsOpen(false);
  };

  const handleDelete = () => {
    handleCloseDialog();
  };

	const rows = [
		{
			'Company Name': 'Saab',
			'Primary Contact': 'John Doe',
			'Email': 'john@yahoo.com',
			'Projects': '#123, #456',
			'Delete': <Button variant="contained" color="error" onClick={handleOpenDialog}>Delete</Button>,
		},
	];
	
	for (let i = 0; i < 10; i++) {
		const userNumber = i + 1;
		const userName = `Company ${userNumber}`;
		const email = `company${userNumber}@example.com`;
	
		const newRow = {
			'Company Name': userName,
			'Primary Contact': userName,
			'Email': email,
			'Projects': '#123, #456',
			'Delete': <Button variant="contained" color="error" onClick={handleOpenDialog}>Delete</Button>,
		};
	
		rows.push(newRow);
	}

	return (
		<>
		<Grid item sx={{ height: "100%", paddingTop: "25px" }}>
			<Box
				display="flex"
				alignItems="center"
				justifyContent="space-between"
				mb={2}
				width={"80%"}
				sx={{ margin: "0 auto" }}
			>
				<Typography variant="h4" component="h1" mb={1} sx={{ marginLeft: -3 }}>
					Ticket System Companies
				</Typography>
				<Box display="flex" alignItems="center">
					<Button
						variant="contained"
						color="primary"
						startIcon={<FontAwesomeIcon icon={faPlus} />}
						sx={{ color: "white", marginRight: 1 }}
						onClick={() => navigate('/create-company')}
					>
						Create Company
					</Button>
					<TextField
						label="Search Company"
						variant="outlined"
						size="small"
						margin="dense"
						sx={{ marginBottom: 1, marginRight: 1 }}
					/>
				</Box>
			</Box>
			<Box>
				<CustomTableAdmin rows={rows} columns={columns} maxHeight='calc(100vh - 175px)'/>
			</Box>
		</Grid>
		<Dialog open={isOpen} onClose={handleCloseDialog}>
			<DialogTitle>Confirmation</DialogTitle>
			<DialogContent>
				<p>Are you sure you want to delete the company?</p>
			</DialogContent>
			<DialogActions>
				<Button onClick={handleCloseDialog} variant={"contained"} color="info">
					Cancel
				</Button>
				<Button onClick={handleDelete} color="error" variant={"contained"} autoFocus>
					Delete
				</Button>
			</DialogActions>
		</Dialog>
		</>
	);
};

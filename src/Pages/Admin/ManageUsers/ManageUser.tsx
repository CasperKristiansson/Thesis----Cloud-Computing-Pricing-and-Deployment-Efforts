import { Grid, Box, Typography, Button, FormControl, InputLabel, MenuItem, Select, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import { CustomTableAdmin } from "../../../Components/CustomTableAdmin";
import { useState } from "react";

const columns = [
	'User Name',
	'Email',
	'CurrentRole',
	'Created',
	'Last Login',
	'Change Role',
	'Delete',
];

export const ManageUsers: React.FC<{ dispatch: any }> = ({ dispatch }) => {
	const [isOpen, setIsOpen] = useState(false);

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
			'User Name': 'John Doe',
			'Email': 'john@yahoo.se',
			'CurrentRole': 'Admin',
			'Created': '2021-09-01',
			'Last Login': '2021-09-01',
			'Change Role': 
				<Box sx={{ minWidth: 120 }}>
				<FormControl fullWidth>
					<InputLabel id="demo-simple-select-label">Role</InputLabel>
					<Select
						labelId="demo-simple-select-label"
						id="demo-simple-select"
						label="Role"
						value={"admin"}
					>
						<MenuItem value={"admin"}>Admin</MenuItem>
						<MenuItem value={"user"}>User</MenuItem>
					</Select>
				</FormControl>
			</Box>,
			'Delete': <Button variant="contained" color="error" onClick={handleOpenDialog}>Delete</Button>,
		},
	];
	
	for (let i = 0; i < 10; i++) {
		const userNumber = i + 1;
		const userName = `User ${userNumber}`;
		const email = `user${userNumber}@example.com`;
		const role = userNumber % 2 === 0 ? 'Admin' : 'User';
		const created = '2021-09-01';
		const lastLogin = '2021-09-01';
	
		const newRow = {
			'User Name': userName,
			'Email': email,
			'CurrentRole': role,
			'Created': created,
			'Last Login': lastLogin,
			'Change Role': (
				<Box sx={{ minWidth: 120 }}>
					<FormControl fullWidth>
						<InputLabel id={`demo-simple-select-label-${userNumber}`}>Role</InputLabel>
						<Select
							labelId={`demo-simple-select-label-${userNumber}`}
							id={`demo-simple-select-${userNumber}`}
							label="Role"
							value={role.toLowerCase()}
						>
							<MenuItem value={'admin'}>Admin</MenuItem>
							<MenuItem value={'user'}>User</MenuItem>
						</Select>
					</FormControl>
				</Box>
			),
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
					Ticket System Users
				</Typography>
				<Box display="flex" alignItems="center">
					<TextField
						label="Search Email"
						variant="outlined"
						size="small"
						margin="dense"
						sx={{ marginBottom: 1, marginRight: 1 }}
					/>
					<TextField
						label="Search Name"
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
				<p>Are you sure you want to delete the user?</p>
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

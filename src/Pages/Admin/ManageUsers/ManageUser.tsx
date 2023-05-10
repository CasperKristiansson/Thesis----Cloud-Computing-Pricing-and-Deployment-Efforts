import { Grid, Box, Typography, Button, FormControl, InputLabel, MenuItem, Select, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import { CustomTableAdmin } from "../../../Components/CustomTableAdmin";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getToken } from "../../../Redux/Selectors";
import { SET_OPERATION_IN_PROGRESS } from "../../../Redux/Actions";
import { requestApi } from "../../../Utils/Fetch";
import { User } from "../../../Models/BackendModels/User";

const columns = [
	'User Name',
	'Email',
	'Current Role',
	'Created',
	'Last Login',
	'Change Role',
	'Delete',
];

export const ManageUsers: React.FC<{ dispatch: any }> = ({ dispatch }) => {
	const [isOpen, setIsOpen] = useState(false);
	const [users, setUsers] = useState([]);

	const [currentId, setCurrentId] = useState('');

	const token = useSelector(getToken);

	const handleOpenDialog = () => {
		setIsOpen(true);
	};

	const handleCloseDialog = () => {
		setIsOpen(false);
	};

	const handleDelete = () => {
		deleteUser();
		handleCloseDialog();
	};
	
	function deleteUser() {
		dispatch({ type: SET_OPERATION_IN_PROGRESS, payload: true });

		requestApi(`/deleteUser/${currentId}`, 'DELETE', token).then(response => {
			if (response) {
				window.location.reload();
			} else {
				alert('Error deleting user');
			}
			dispatch({ type: SET_OPERATION_IN_PROGRESS, payload: false });
		});
	}

	function changeRole(id: string, role: string) {
		dispatch({ type: SET_OPERATION_IN_PROGRESS, payload: true });

		requestApi('/changeRole', 'POST', token, { id, role }).then(response => {
			if (response) {
				window.location.reload();
			} else {
				alert('Error changing role');
			}
			dispatch({ type: SET_OPERATION_IN_PROGRESS, payload: false });
		});
	}

	useEffect(() => {
		dispatch({ type: SET_OPERATION_IN_PROGRESS, payload: true });
		
		requestApi('/allUsers', 'GET', token).then(response => {
			if (response) {
				const users = response.map((user: User) => {
					return {
						'User Name': user.name,
						'Email': user.email,
						'CurrentRole': user.role,
						'Created': user.created,
						'Last Login': user.lastLogin,
						'Change Role': (
							<Box sx={{ minWidth: 120 }}>
								<FormControl fullWidth>
									<InputLabel id="demo-simple-select-label">Role</InputLabel>
									<Select
										labelId="demo-simple-select-label"
										id="demo-simple-select"
										label="Role"
										value={user.role}
										onChange={e => {
											changeRole(user.id, e.target.value as 'ADMIN' | 'USER')
										}}
									>
										<MenuItem value={"ADMIN"}>ADMIN</MenuItem>
										<MenuItem value={"USER"}>USER</MenuItem>
									</Select>
								</FormControl>
							</Box>
						),
						'Delete': <Button 
							variant="contained" 
							color="error" 
							onClick={() => {
								setCurrentId(user.id);
								handleOpenDialog()
							}}
						>
							Delete
						</Button>,
					}
				});
				setUsers(users);
				dispatch({ type: SET_OPERATION_IN_PROGRESS, payload: false });
			}
		});
	}, [token]);

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
					<CustomTableAdmin rows={users} columns={columns} maxHeight='calc(100vh - 175px)' />
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

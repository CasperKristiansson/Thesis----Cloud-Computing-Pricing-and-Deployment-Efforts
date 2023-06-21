import { Grid, Box, Typography, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import { CustomTableAdmin } from "../../../Components/CustomTableAdmin";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from 'react-router-dom';
import { SET_OPERATION_IN_PROGRESS } from "../../../Redux/Actions";
import { requestApi } from "../../../Utils/Fetch";
import { useSelector } from "react-redux";
import { getToken } from "../../../Redux/Selectors";
import { Company } from "../../../Models/BackendModels/Company";

const columns = [
	'Company Name',
	'Primary Contact',
	'Email',
	//'Projects',
	'Remove',
];

export const ManageCompanies: React.FC<{ dispatch: any }> = ({ dispatch }) => {
	const [isOpen, setIsOpen] = useState(false);
	const [currentCompanyId, setCurrentCompanyId] = useState<string>(""); 
	const navigate = useNavigate();
	const token = useSelector(getToken);
	const [companies, setCompanies] = useState<any[]>([]);

	const handleOpenDialog = (companyId: string) => {
		setCurrentCompanyId(companyId);
		setIsOpen(true);
	};

	const handleCloseDialog = () => {
		setIsOpen(false);
	};

	const handleDelete = () => {
		dispatch({ type: SET_OPERATION_IN_PROGRESS, payload: true });

		requestApi(`/deleteCompany/${currentCompanyId}`, "DELETE", token).then((response) => {
			if (response) {
				window.location.reload();
			} else {
				alert("Error deleting company");
			}
			dispatch({ type: SET_OPERATION_IN_PROGRESS, payload: false });
		});

		handleCloseDialog();
	};

	useEffect(() => {
		dispatch({ type: SET_OPERATION_IN_PROGRESS, payload: true });

		requestApi("/allCompanies", "GET", token).then((response) => {
			if (response) {
				const companies = (response as Company[]).map(c => {
					return {
						'Company Name': c.name,
						'Primary Contact': c.contactPersonName,
						'Email': c.email,
						'Delete': <Button variant="contained" color="error" onClick={() => handleOpenDialog(c.id)}>Delete</Button>,
					}
				})
				setCompanies(companies);
			} else {
				alert("Error loading companies");
				navigate('/');
			}
			dispatch({ type: SET_OPERATION_IN_PROGRESS, payload: false });
		});
	}, []);

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
							onClick={() => navigate('/admin/create-company')}
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
					<CustomTableAdmin rows={companies} columns={columns} maxHeight='calc(100vh - 175px)' />
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

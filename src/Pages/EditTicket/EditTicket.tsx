import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import { StepperComponent } from '../../Components/StepperComponent';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { StepOne } from './ChildComponents/StepOne';
import { AppDispatch } from '../../store';
import { createUseStyles } from 'react-jss';
import { Theme } from '../../Styling/Theme';
import { useSelector } from 'react-redux';
import { StepTwo } from './ChildComponents/StepTwo';
import { getCreateTicket, getToken } from '../../Redux/Selectors';
import { StepThree } from './ChildComponents/StepThree';
import { RESET_CREATE_TICKET, SET_OPERATION_IN_PROGRESS } from '../../Redux/Actions';
import { useNavigate, useParams } from 'react-router-dom';
import { requestApi } from '../../Utils/Fetch';
import { TicketResponse } from '../../Models/ResponseModels/TicketResponse';
import { ProjectResponse } from '../../Models/ResponseModels/ProjectResponse';
import { User } from '../../Models/BackendModels/User';

const useStyles = createUseStyles((theme: Theme) => {
	return {
		stepContent: {
			height: "calc(70% - 70px)",
			marginTop: "20px",
			width: 500,
			margin: "auto",
			overflowY: "auto",
		},
	};
});

export const EditTicket: React.FC<{ dispatch: AppDispatch }> = ({ dispatch }) => {
	const [currentStep, setCurrentStep] = useState(0);
	const createTicket = useSelector(getCreateTicket);

	const { id } = useParams();

	const token = useSelector(getToken);

	const [ticket, setTicket] = useState<TicketResponse>();
	const [projects, setProjects] = useState<ProjectResponse[]>([]);
	const [users, setUsers] = useState<User[]>([]);
	const [initialTicketName, setInitialTicketName] = useState<string>("");

	const classes = useStyles();

	const navigate = useNavigate();

	// Confirmation of deletion dialog
	const [isOpen, setIsOpen] = useState(false);

	const handleOpenDialog = () => {
		setIsOpen(true);
	};

	const handleCloseDialog = () => {
		setIsOpen(false);
	};

	const handleDeleteTicket = () => {
		dispatch({ type: SET_OPERATION_IN_PROGRESS, payload: true });
		requestApi(`/deleteTicket/${id}`, "DELETE", token).then((response) => {
			if (response) {
				navigate("/tickets");
			} else {
				alert("Error, could not delete ticket");
			}
			dispatch({ type: SET_OPERATION_IN_PROGRESS, payload: false });
		});
		handleCloseDialog();
	}

	const getCurrentStep = () => {
		switch (currentStep) {
			case 0:
				return ticket && <StepOne ticket={ticket} setTicket={setTicket} projects={projects} users={users} handleOpenDialog={handleOpenDialog} />
			case 1:
				return ticket && <StepTwo ticket={ticket} setTicket={setTicket} />
			case 2:
				return ticket && <StepThree ticket={ticket} projects={projects} users={users} />
		}
	}

	const getCondition = () => {
		switch (currentStep) {
			case 0:
				return ticket && ticket.title && ticket.priority && ticket.assignedId && ticket.projectId;
			case 1:
				return ticket && ticket.description;
			case 2:
				return true;
		}
	}

	useEffect(() => {
		return () => {
			dispatch({ type: RESET_CREATE_TICKET });
		}
	}, [dispatch])

	// Get ticket
	useEffect(() => {
		dispatch({ type: SET_OPERATION_IN_PROGRESS, payload: true })
		requestApi(`/ticket/${id}`, "GET", token).then((response) => {
			if (response) {
				console.log("Edit Ticket: ", response);
				setTicket(response as TicketResponse);
				setInitialTicketName((response as TicketResponse).title);
			} else {
				alert("Error, could not get ticket");
			}
			dispatch({ type: SET_OPERATION_IN_PROGRESS, payload: false });
		});
	}, [id, token]);

	useEffect(() => {
		requestApi("/myProjectsCreateTicket", "GET", token).then(response => {
			if (response) {
				setProjects(response);
			}
		})

		requestApi("/assignableUsers", "GET", token).then(response => {
			if (response) {
				setUsers(response);
			}
		})
	}, [token]);

	const handleEditTicket = () => {
		dispatch({ type: SET_OPERATION_IN_PROGRESS, payload: true });

		requestApi("/editTicket", "PUT", token, ticket).then((response) => {
			if(response){
				navigate("/ticket/" + ticket?.id);
			} else {
				alert("Error, could not edit ticket");
				setCurrentStep(0);
			}
			dispatch({ type: SET_OPERATION_IN_PROGRESS, payload: false });
		});
	}

	return (
		<Box sx={{ display: 'flex', justifyContent: 'center', paddingTop: "10px", overflowX: "hidden", height: "100%" }}>
			{ticket && users.length > 0 && projects.length > 0 && <Box sx={{ width: '700px' }}>
				<Typography variant="h3" textAlign={"center"}>
					Edit Ticket - {initialTicketName}
				</Typography>
				<Stepper activeStep={currentStep} alternativeLabel sx={{ marginTop: "35px" }}>
					{[1, 2, 3].map((label) => (
						<Step key={label}>
							<StepLabel StepIconComponent={StepperComponent} />
						</Step>
					))}
				</Stepper>
				<div className={classes.stepContent}>
					{getCurrentStep()}
				</div>
				<div>
					<Button
						sx={{ float: "left", color: "white" }}
						variant='contained'
						disabled={!currentStep}
						onClick={() => {
							setCurrentStep(currentStep - 1)
						}}
					>
						<FontAwesomeIcon icon={faArrowLeft} />
						&nbsp;Previous
					</Button>
					<Button
						sx={{ float: "right", color: "white" }}
						variant='contained'
						onClick={() => {
							setCurrentStep(currentStep + 1)
							if(currentStep === 2){
								handleEditTicket();
							}
						}}
						disabled={!getCondition()}
					>
						{currentStep === 2 ? "Create" : "Next"}&nbsp;
						<FontAwesomeIcon icon={faArrowRight} />
					</Button>
				</div>
			</Box>}

			<Dialog open={isOpen} onClose={handleCloseDialog}>
				<DialogTitle>Confirmation</DialogTitle>
				<DialogContent>
					<p>Are you sure you want to delete the ticket?</p>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleCloseDialog} variant={"contained"} color="info">
						Cancel
					</Button>
					<Button onClick={handleDeleteTicket} color="error" variant={"contained"} autoFocus>
						Delete
					</Button>
				</DialogActions>
			</Dialog>
		</Box>
	);
}
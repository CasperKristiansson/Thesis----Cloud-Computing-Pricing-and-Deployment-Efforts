import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import { StepperComponent } from '../../Components/StepperComponent';
import { Button, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { StepOne } from './ChildComponents/StepOne';
import { AppDispatch } from '../../store';
import { createUseStyles } from 'react-jss';
import { Theme } from '../../Styling/Theme';
import { useSelector } from 'react-redux';
import { StepTwo } from './ChildComponents/StepTwo';
import { getToken } from '../../Redux/Selectors';
import { StepThree } from './ChildComponents/StepThree';
import { SET_OPERATION_IN_PROGRESS } from '../../Redux/Actions';
import { CreateTicketRequest } from '../../Models/RequestModels/CreateTicketRequest';
import { requestApi } from '../../Utils/Fetch';
import { ProjectResponse } from '../../Models/ResponseModels/ProjectResponse';
import { User } from '../../Models/BackendModels/User';
import { useNavigate } from 'react-router-dom';

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

export const CreateTicket: React.FC<{ dispatch: AppDispatch }> = ({ dispatch }) => {
	const [currentStep, setCurrentStep] = useState(0);
	const token = useSelector(getToken);
	const navigate = useNavigate();

	const queryParameters = new URLSearchParams(window.location.search)
	const projectId = queryParameters.get("pid")

	const createTicketInitialState = {
		name: "",
		description: "",
		priority: "Low",
		assignedId: "",
		projectId: projectId || ""
	} as CreateTicketRequest;

	const [createTicketRequest, setCreateTicketRequest] = useState<CreateTicketRequest>(createTicketInitialState);
	const [projects, setProjects] = useState<ProjectResponse[]>([]);
	const [users, setUsers] = useState<User[]>([]);

	const classes = useStyles();

	const getCurrentStep = () => {
		switch (currentStep) {
			case 0:
				return <StepOne
					createTicketRequest={createTicketRequest}
					setCreateTicketRequest={setCreateTicketRequest}
					projects={projects}
					users={users}
				/>
			case 1:
				return <StepTwo
					dispatch={dispatch}
					createTicketRequest={createTicketRequest}
					setCreateTicketRequest={setCreateTicketRequest}
				/>
			case 2:
				return <StepThree
					dispatch={dispatch}
					createTicketRequest={createTicketRequest}
					projects={projects}
					users={users}
				/>
		}
	}

	const getCondition = () => {
		switch (currentStep) {
			case 0:
				return createTicketRequest.name && createTicketRequest.priority && createTicketRequest.assignedId && createTicketRequest.projectId;
			case 1:
				return createTicketRequest.description;
			case 2:
				return true;
		}
	}

	useEffect(() => {
		dispatch({ type: SET_OPERATION_IN_PROGRESS, payload: true });

		requestApi("/myProjectsCreateTicket", "GET", token).then(response => {
			if (response) {
				setProjects(response);
			}
			dispatch({ type: SET_OPERATION_IN_PROGRESS, payload: false });
		})

		requestApi("/assignableUsers", "GET", token).then(response => {
			if (response) {
				setUsers(response);
			}
			dispatch({ type: SET_OPERATION_IN_PROGRESS, payload: false });
		})
	}, [token]);

	const handleCreateTicket = () => {
		dispatch({ type: SET_OPERATION_IN_PROGRESS, payload: true });

		requestApi("/createTicket", "POST", token, createTicketRequest).then(response => {
			if (response) {
				if(projectId)
					navigate(`/project/${projectId}`)
				else 
					navigate("/tickets")
			} else {
				alert("Could not create ticket");
				setCurrentStep(currentStep - 1);
			}
			dispatch({ type: SET_OPERATION_IN_PROGRESS, payload: false });
		});
	}

	return (
		<Box sx={{ display: 'flex', justifyContent: 'center', paddingTop: "10px", overflowX: "hidden", height: "100%" }}>
			<Box sx={{ width: '700px' }}>
				<Typography variant="h2" textAlign={"center"}>
					Create Ticket
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
							if (currentStep === 2) handleCreateTicket();
						}}
						disabled={!getCondition()}
					>
						{currentStep === 2 ? "Create" : "Next"}&nbsp;
						<FontAwesomeIcon icon={faArrowRight} />
					</Button>
				</div>
			</Box>
		</Box>
	);
}
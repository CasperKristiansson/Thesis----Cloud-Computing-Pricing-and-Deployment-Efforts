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
import { getCreateProject, getOperationInProgress, getToken } from '../../Redux/Selectors';
import { StepTwo } from './ChildComponents/StepTwo';
import { RESET_CREATE_PROJECT, SET_OPERATION_IN_PROGRESS } from '../../Redux/Actions';
import { requestApi } from '../../Utils/Fetch';
import { useNavigate, useParams } from 'react-router-dom';
import { ProjectResponse } from '../../Models/ResponseModels/ProjectResponse';
import { Company } from '../../Models/BackendModels/Company';

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

export const EditProject: React.FC<{ dispatch: AppDispatch }> = ({ dispatch }) => {
	const [currentStep, setCurrentStep] = useState(0);
	const token = useSelector(getToken);

	const [project, setProject] = useState<ProjectResponse | null>(null);
	const [companies, setCompanies] = useState<Company[]>([]);
	const [initialProjectName, setInitialProjectName] = useState<string>("");

	const navigate = useNavigate();

	const { id } = useParams();

	const classes = useStyles();

	// Confirmation of deletion dialog
	const [isOpen, setIsOpen] = useState(false);

	const handleOpenDialog = () => {
		setIsOpen(true);
	};

	const handleCloseDialog = () => {
		setIsOpen(false);
	};

	const handleDeleteProject = () => {
		dispatch({ type: SET_OPERATION_IN_PROGRESS, payload: true });
		requestApi(`/deleteProject/${id}`, "DELETE", token).then((response) => {
			if (response) {
				navigate("/projects");
			} else {
				alert("Error, could not delete project");
			}
			dispatch({ type: SET_OPERATION_IN_PROGRESS, payload: true });
		});
		handleCloseDialog();
	}

	const handleEditProject = () => {
		dispatch({ type: SET_OPERATION_IN_PROGRESS, payload: true });
		if (project) {
			requestApi(`/editProject`, "PUT", token, project).then((response) => {
				if(response){
					navigate(`/project/${id}`);
				} else {
					alert("Error, could not edit project");
					setCurrentStep(0);
				}
				dispatch({ type: SET_OPERATION_IN_PROGRESS, payload: false });
			});
		}
	}

		const getCurrentStep = () => {
			switch (currentStep) {
				case 0:
					return project && <StepOne project={project} setProject={setProject} companies={companies} handleOpenDialog={handleOpenDialog} />
				case 1:
					return project && <StepTwo project={project} companies={companies} />
			}
		}

		const getCondition = () => {
			switch (currentStep) {
				case 0:
					return project?.name && project?.companyId && project?.description;
				case 1:
					return true;
			}
		}

		useEffect(() => {
			return () => {
				dispatch({ type: RESET_CREATE_PROJECT });
			}
		}, [dispatch]);

		// Fetch project
		useEffect(() => {
			dispatch({ type: SET_OPERATION_IN_PROGRESS, payload: true })
			requestApi(`/project/${id}`, "GET", token).then((response) => {
				if (response) {
					setProject(response as ProjectResponse);
					setInitialProjectName(response.name);
				} else {
					navigate(-1);
					alert("Error, could not get project");
				}
				dispatch({ type: SET_OPERATION_IN_PROGRESS, payload: false })
			});
		}, [id, token]);

		// Fetch companies
		useEffect(() => {
			requestApi('/myCompanies', 'GET', token).then((response) => {
				if (response) {
					setCompanies(response as Company[]);

				} else {
					navigate(-1);
					alert('Could not fetch companies');
				}
			})
		}, [token]);

		return (
			<Box sx={{ display: 'flex', justifyContent: 'center', paddingTop: "10px", overflowX: "hidden", height: "100%" }}>
				{project && companies.length != 0 && <Box sx={{ width: '700px' }}>
					<Typography variant="h2" textAlign={"center"}>
						Edit Project - {initialProjectName}
					</Typography>
					<Stepper activeStep={currentStep} alternativeLabel sx={{ marginTop: "35px" }}>
						{[1, 2].map((label) => (
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
								if(currentStep === 1){
									handleEditProject();
								}
							}}
							disabled={!getCondition()}
						>
							{currentStep === 1 ? "Confirm" : "Next"}&nbsp;
							<FontAwesomeIcon icon={faArrowRight} />
						</Button>
					</div>
				</Box>}

				<Dialog open={isOpen} onClose={handleCloseDialog}>
					<DialogTitle>Confirmation</DialogTitle>
					<DialogContent>
						<p>Are you sure you want to delete the project?</p>
					</DialogContent>
					<DialogActions>
						<Button onClick={handleCloseDialog} variant={"contained"} color="info">
							Cancel
						</Button>
						<Button onClick={handleDeleteProject} color="error" variant={"contained"} autoFocus>
							Delete
						</Button>
					</DialogActions>
				</Dialog>
			</Box>
		);
	}
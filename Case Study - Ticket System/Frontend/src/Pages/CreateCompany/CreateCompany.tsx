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
import { getCreateCompany, getToken } from '../../Redux/Selectors';
import { StepTwo } from './ChildComponents/StepTwo';
import { RESET_CREATE_COMPANY, SET_OPERATION_IN_PROGRESS } from '../../Redux/Actions';
import { Company } from '../../Models/BackendModels/Company';
import { requestApi } from '../../Utils/Fetch';
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

export const CreateCompany: React.FC<{ dispatch: AppDispatch }> = ({ dispatch }) => {
	const [currentStep, setCurrentStep] = useState(0);

	const [company, setCompany] = useState<Company>({ id: "", name: "", email: "", contactPersonName: "" });

	const classes = useStyles();

	const navigate = useNavigate();

	const token = useSelector(getToken);

	const getCurrentStep = () => {
		switch (currentStep) {
			case 0:
				return <StepOne company={company} setCompany={setCompany} />
			case 1:
				return <StepTwo company={company} />
		}
	}

	const getCondition = () => {
		switch (currentStep) {
			case 0:
				return company.name && company.contactPersonName && company.email;
			case 1:
				return true;
		}
	}

	const handleCreateCompany = () => {
		if (company) {
			dispatch({ type: SET_OPERATION_IN_PROGRESS, payload: true });

			requestApi("/createCompany", "POST", token, company).then((res) => {
				if (res == null) {
					alert("Error creating company");
				}
				navigate("/admin/manage-companies");
				dispatch({ type: SET_OPERATION_IN_PROGRESS, payload: false });
			});
		}
	}

	return (
		<Box sx={{ display: 'flex', justifyContent: 'center', paddingTop: "10px", overflowX: "hidden", height: "100%" }}>
			<Box sx={{ width: '700px' }}>
				<Typography variant="h2" textAlign={"center"}>
					Create Company
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
							if (currentStep === 1) {
								handleCreateCompany();
							}
						}}
						disabled={!getCondition()}
					>
						{currentStep === 1 ? "Create" : "Next"}&nbsp;
						<FontAwesomeIcon icon={faArrowRight} />
					</Button>
				</div>
			</Box>
		</Box>
	);
}
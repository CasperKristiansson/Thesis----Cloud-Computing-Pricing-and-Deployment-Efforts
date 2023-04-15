import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import { StepperComponent } from '../../Components/StepperComponent';
import { Button, Typography } from '@mui/material';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { StepOne } from './ChildComponents/StepOne';
import { AppDispatch } from '../../store';
import { createUseStyles } from 'react-jss';
import { Theme } from '../../Styling/Theme';
import { useSelector } from 'react-redux';
import { getCreateProject } from '../../Redux/Selectors';
import { StepTwo } from './ChildComponents/StepTwo';

const useStyles = createUseStyles((theme: Theme) => {
	return {
		stepContent: {
			height: "calc(60vh - 70px)",
			marginTop: "20px",
			width: 500,
			margin: "auto",
		},
	};
});

export const CreateProject: React.FC<{dispatch: AppDispatch}> = ({ dispatch }) => {
	const [currentStep, setCurrentStep] = useState(0);
	const createProject = useSelector(getCreateProject);

	const classes = useStyles();

	const getCurrentStep = () => {
		switch(currentStep) {
			case 0:
				return <StepOne dispatch={dispatch} />
			case 1:
				return <StepTwo dispatch={dispatch} />
		}
	}

	const getCondition = () => {
		switch(currentStep) {
			case 0:
				return createProject.name && createProject.associatedCompany && createProject.description;
			case 1:
				return true;
		}
	}

  return (
		<Box sx={{ display: 'flex', justifyContent: 'center', paddingTop: "10px" }}>
			<Box sx={{ width: '700px' }}>
				<Typography variant="h2" textAlign={"center"}>
					Create Project
				</Typography>
				<Stepper activeStep={currentStep} alternativeLabel sx={{ marginTop: "35px" }}>
					{[1,2].map((label) => (
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
							setCurrentStep(currentStep-1)
						}}
					>
						<FontAwesomeIcon icon={faArrowLeft} />
						&nbsp;Previous
					</Button>
					<Button
						sx={{ float: "right", color: "white" }}
						variant='contained'
						onClick={() => {
							setCurrentStep(currentStep+1)
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
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import { StepperComponent } from '../../Components/StepperComponent';
import { Button, Typography } from '@mui/material';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';

export const CreateProject: React.FC<{}> = () => {
	const [currentStep, setCurrentStep] = useState(0);

  return (
		<Box sx={{ display: 'flex', justifyContent: 'center', paddingTop: "10px" }}>
			<Box sx={{ width: '700px' }}>
				<Typography variant="h2" textAlign={"center"}>
					Create Project
				</Typography>
				<Stepper activeStep={currentStep} alternativeLabel sx={{ marginTop: "35px", height: "70vh"}}>
					{[1,2].map((label) => (
						<Step key={label}>
								<StepLabel StepIconComponent={StepperComponent} />
						</Step>
					))}
				</Stepper>
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
					>
						{currentStep === 1 ? "Create" : "Next"}&nbsp;
						<FontAwesomeIcon icon={faArrowRight} />
					</Button>
				</div>
			</Box>
		</Box>
  );
}
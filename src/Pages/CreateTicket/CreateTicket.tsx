import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import { StepperComponent } from '../../Components/StepperComponent';

export const CreateTicket: React.FC<{}> = () => {
  return (
		<Box sx={{ display: 'flex', justifyContent: 'center' }}>
			<Box sx={{ width: '700px' }}>
				<Stepper activeStep={0} alternativeLabel>
					{[1,2,3].map((label) => (
						<Step key={label}>
								<StepLabel StepIconComponent={StepperComponent} />
						</Step>
					))}
				</Stepper>
			</Box>
		</Box>
  );
}
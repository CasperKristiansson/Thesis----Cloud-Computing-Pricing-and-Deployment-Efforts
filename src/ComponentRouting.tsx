import React from 'react';
import { Routes} from 'react-router-dom';

export const ComponentRouting: React.FC<{dispatch: any}> = ({ dispatch }) => {
	return (
		<div>
			<Routes>
				{/* <Route path="/" element={<Home dispatch={dispatch} darkMode={darkMode} />} /> */}
			</Routes>
		</div>
	);
}

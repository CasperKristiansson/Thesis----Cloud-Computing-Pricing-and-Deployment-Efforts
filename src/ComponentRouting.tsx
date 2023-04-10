import React from 'react';
import { Route, Routes} from 'react-router-dom';
import { Home } from './Pages/Home/Home';

export const ComponentRouting: React.FC<{dispatch: any}> = ({ dispatch }) => {
	return (
		<div style={{ height: "calc(100% - 90px)" }}>
			<Routes>
				<Route path="/" element={<Home />} />
			</Routes>
		</div>
	);
}

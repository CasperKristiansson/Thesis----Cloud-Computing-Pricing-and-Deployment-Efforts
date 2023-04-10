import React from 'react';
import { Route, Routes} from 'react-router-dom';
import { Home } from './Pages/Home/Home';
import { Tickets } from './Pages/Tickets/Tickets';
import { Projects } from './Pages/Projects/Projects';

export const ComponentRouting: React.FC<{dispatch: any}> = ({ dispatch }) => {
	return (
		<div style={{ height: "calc(100vh - 80px)" }}>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/tickets" element={<Tickets />} />
				<Route path="/projects" element={<Projects />} />
			</Routes>
		</div>
	);
}

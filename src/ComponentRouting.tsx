import React from 'react';
import { Route, Routes} from 'react-router-dom';
import { Home } from './Pages/Home/Home';
import { Tickets } from './Pages/Tickets/Tickets';

export const ComponentRouting: React.FC<{dispatch: any}> = ({ dispatch }) => {
	return (
		<div style={{ height: "calc(100% - 80px)" }}>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/tickets" element={<Tickets />} />
			</Routes>
		</div>
	);
}

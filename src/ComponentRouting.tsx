import React from 'react';
import { Route, Routes} from 'react-router-dom';
import { Home } from './Pages/Home/Home';
import { Tickets } from './Pages/Tickets/Tickets';
import { Projects } from './Pages/Projects/Projects';
import { CreateTicket } from './Pages/CreateTicket/CreateTicket';
import { CreateProject } from './Pages/CreateProject/CreateProject';
import { Login } from './Pages/Login/Login';
import { IndividualTicket } from './Pages/IndividualTicket/IndividualTicket';
import { EditTicket } from './Pages/EditTicket/EditTicket';
import { EditProject } from './Pages/EditProject/EditProject';

export const ComponentRouting: React.FC<{dispatch: any}> = ({ dispatch }) => {
	return (
		<div style={{ height: "calc(100vh - 70px)" }}>
			<Routes>
				<Route path="/" element={<Home dispatch={dispatch} />} />
				<Route path="/tickets" element={<Tickets />} />
				<Route path="/projects" element={<Projects />} />
				<Route path="/create-ticket" element={<CreateTicket dispatch={dispatch} />} />
				<Route path="/create-project" element={<CreateProject dispatch={dispatch} />} />
				<Route path="/login" element={<Login dispatch={dispatch} />} />
				<Route path="/ticket/:id" element={<IndividualTicket dispatch={dispatch} />} />
				<Route path="/edit-ticket/:id" element={<EditTicket dispatch={dispatch} />} />
				<Route path="edit-project/:id" element={<EditProject dispatch={dispatch} />} />
			</Routes>
		</div>
	);
}

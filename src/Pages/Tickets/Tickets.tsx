import React from 'react';
import { CustomTable } from '../../Components/CustomTable';

const rows = [
  { 
    subject: 'Issue with payment processing',
    lastUpdated: '2022-03-28T15:00:00.000Z',
		status: <span style={{color: 'blue'}}>In Progress</span>,
		priority: <span style={{color: 'red'}}>High</span>,
    ticketNr: 'TCKT-12345',
    assigned: 'John Doe',
  },
  { 
    subject: 'Login page not working',
    lastUpdated: '2022-03-29T10:30:00.000Z',
		status: <span style={{color: 'green'}}>Open</span>,
		priority: <span style={{color: 'orange'}}>Medium</span>,
    ticketNr: 'TCKT-12346',
    assigned: 'Jane Smith',
  },
  { 
    subject: 'Unable to access account',
    lastUpdated: '2022-03-30T16:45:00.000Z',
		status: <span style={{color: 'red'}}>Closed</span>,
		priority: <span style={{color: 'green'}}>Low</span>,
    ticketNr: 'TCKT-12347',
    assigned: 'Bob Johnson',
  },
];

const columns = [
	'Subject', 
	'Last Updated',
	'Status',
	'Priority',
	'Ticket Nr.',
	'Assigned',
];

export const Tickets: React.FC<{}> = () => {
  return (
    <div style={{marginTop: 10}}>
      <CustomTable rows={rows} columns={columns} />
    </div>
  );
};

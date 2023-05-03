import React from 'react';
import { CustomTable } from '../../Components/CustomTable';
import { Box, Button, Grid, TextField, Typography } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

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

const rows_d = [
  { 
    subject: 'Forgot password',
    lastUpdated: '2022-04-01T12:15:00.000Z',
		status: <span style={{color: 'green'}}>Open</span>,
		priority: <span style={{color: 'orange'}}>Medium</span>,
    ticketNr: 'TCKT-12348',
    assigned: 'Samantha Lee',
  },
  { 
    subject: 'Error message when trying to checkout',
    lastUpdated: '2022-04-02T14:20:00.000Z',
		status: <span style={{color: 'blue'}}>In Progress</span>,
		priority: <span style={{color: 'red'}}>High</span>,
    ticketNr: 'TCKT-12349',
    assigned: 'David Kim',
  },
  { 
    subject: 'Missing order confirmation email',
    lastUpdated: '2022-04-03T09:55:00.000Z',
		status: <span style={{color: 'green'}}>Open</span>,
		priority: <span style={{color: 'green'}}>Low</span>,
    ticketNr: 'TCKT-12350',
    assigned: 'Michael Chen',
  },
  { 
    subject: 'Product not delivered on time',
    lastUpdated: '2022-04-04T17:30:00.000Z',
		status: <span style={{color: 'blue'}}>In Progress</span>,
		priority: <span style={{color: 'orange'}}>Medium</span>,
    ticketNr: 'TCKT-12351',
    assigned: 'Jessica Lee',
  },
  { 
    subject: 'Wrong item received',
    lastUpdated: '2022-04-05T11:10:00.000Z',
		status: <span style={{color: 'red'}}>Closed</span>,
		priority: <span style={{color: 'green'}}>Low</span>,
    ticketNr: 'TCKT-12352',
    assigned: 'Kevin Chen',
  },
	{ 
    subject: 'Wrong item received',
    lastUpdated: '2022-04-05T11:10:00.000Z',
		status: <span style={{color: 'red'}}>Closed</span>,
		priority: <span style={{color: 'green'}}>Low</span>,
    ticketNr: 'TCKT-12352',
    assigned: 'Kevin Chen',
  },
	{ 
    subject: 'Wrong item received',
    lastUpdated: '2022-04-05T11:10:00.000Z',
		status: <span style={{color: 'red'}}>Closed</span>,
		priority: <span style={{color: 'green'}}>Low</span>,
    ticketNr: 'TCKT-12352',
    assigned: 'Kevin Chen',
  },
	{ 
    subject: 'Wrong item received',
    lastUpdated: '2022-04-05T11:10:00.000Z',
		status: <span style={{color: 'red'}}>Closed</span>,
		priority: <span style={{color: 'green'}}>Low</span>,
    ticketNr: 'TCKT-12352',
    assigned: 'Kevin Chen',
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
  const navigate = useNavigate();

  return (
    <Grid container spacing={2} direction="column" pt={2} sx={{ height: "100%" }}>
      <Grid item sx={{ height: "45%" }}>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          mb={2}
          width={"80%"}
          sx={{ margin: "0 auto" }}
        >
          <Typography variant="h4" component="h1" mb={1} sx={{ marginLeft: -3 }}>
            My Tickets
          </Typography>
          <Button
            variant="contained"
            color="primary"
            startIcon={<FontAwesomeIcon icon={faPlus} />}
						sx={{ color: "white", marginBottom: 1 }}
            onClick={() => navigate("/create-ticket")}
          >
            Create Ticket
          </Button>
        </Box>
        <Box>
          <CustomTable rows={rows} columns={columns} maxHeight='calc(46vh - 90px)'/>
        </Box>
      </Grid>
      <Grid item sx={{ height: "55%" }}>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          mb={3}
          width={"80%"}
          sx={{ margin: "0 auto" }}
        >
          <Typography variant="h4" component="h1"  mb={1} sx={{ marginLeft: -3 }}>
            All Tickets
          </Typography>
          <Box display="flex" alignItems="center">
            <TextField
              label="Search Subject"
              variant="outlined"
              size="small"
              margin="dense"
							sx={{ marginBottom: 1, marginRight: 1 }}
            />
            <TextField
              label="Search Assignee"
              variant="outlined"
              size="small"
              margin="dense"
							sx={{ marginBottom: 1, marginRight: 1 }}
            />
            <TextField
              label="Search Ticket nr"
              variant="outlined"
              size="small"
              margin="dense"
							sx={{ marginBottom: 1 }}
            />
          </Box>
        </Box>
        <Box flexGrow={1}>
          <CustomTable rows={rows_d} columns={columns} maxHeight='calc(53vh - 90px)'/>
        </Box>
      </Grid>
    </Grid>
  );
};

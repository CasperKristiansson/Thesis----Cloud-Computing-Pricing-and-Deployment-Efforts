import React, { useEffect, useState } from 'react';
import { CustomTable } from '../../Components/CustomTable';
import { Box, Button, Grid, TextField, Typography } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { requestApi } from '../../Utils/Fetch';
import { getToken, getUser } from '../../Redux/Selectors';
import { SET_OPERATION_IN_PROGRESS } from '../../Redux/Actions';
import { TicketResponse } from '../../Models/ResponseModels/TicketResponse';
import { Status } from '../../Components/Status';
import { Priority } from '../../Components/Priority';
import { formatTime, formatTimeAgo } from '../../Utils/Other';

const columns = [
	'Ticket Name', 
	'Last Updated',
	'Status',
	'Priority',
	'ID',
	'Assigned',
];

export const Tickets: React.FC<{}> = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const token = useSelector(getToken);
  const user = useSelector(getUser);

  const [myTickets, setMyTickets] = useState<any[]>([]);
  const [allTickets, setAllTickets] = useState<any[]>([]);

  // Fetch
  useEffect(() => {
    dispatch({ type: SET_OPERATION_IN_PROGRESS, payload: true });

    async function getTickets() {
      // Get myProjects
        requestApi("/myTickets", "GET", token).then((response) => {
          if (response) {
            const myTickets = response.sort((a: TicketResponse, b: TicketResponse) => a.lastUpdated > b.lastUpdated ? -1 : 1).map((t: TicketResponse) => {
              return {
                ticketname: t.title,
                lastUpdated: formatTimeAgo(t.lastUpdated),
                status: <Status value={t.status} />,
                priority: <Priority value={t.priority} />,
                ID: t.id,
                assigned: t.assignedName
              }
            })
            setMyTickets(myTickets);
            if(user?.role !== 'ADMIN'){
              dispatch({ type: SET_OPERATION_IN_PROGRESS, payload: false });
            }
          }
        });

      // Get allProjects if admin
      if (user?.role === 'ADMIN') {
        requestApi("/allTickets", "GET", token).then((response) => {
          if (response) {
            const allTickets = response.sort((a: TicketResponse, b: TicketResponse) => a.lastUpdated > b.lastUpdated ? -1 : 1).map((t: TicketResponse) => {
              return {
                ticketname: t.title,
                lastUpdated: formatTimeAgo(t.lastUpdated),
                status: <Status value={t.status} />,
                priority: <Priority value={t.priority} />,
                ID: t.id,
                assigned: t.assignedName
              }
            })
            setAllTickets(allTickets);
            dispatch({ type: SET_OPERATION_IN_PROGRESS, payload: false });
          }
        });
      }
    }

    getTickets();
  }, [token, user]);

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
            onClick={() => navigate("/ticket/create")}
          >
            Create Ticket
          </Button>
        </Box>
        <Box>
          <CustomTable rowOnClickDestination='/ticket/' rows={myTickets} columns={columns} maxHeight='calc(46vh - 90px)'/>
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
        {user?.role === 'ADMIN' && <Box flexGrow={1}>
          <CustomTable rowOnClickDestination='/ticket/' rows={allTickets} columns={columns} maxHeight='calc(53vh - 90px)'/>
        </Box>}
      </Grid>
    </Grid>
  );
};

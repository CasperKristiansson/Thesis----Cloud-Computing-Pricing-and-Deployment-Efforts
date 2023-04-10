import React from 'react';
import { CustomTable } from '../../Components/CustomTable';
import { Box, Button, Grid, TextField, Typography } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

const rows = [
  {
    projectName: "Project A",
    lastUpdated: "2023-04-09T12:30:00.000Z",
    customer: "ABC Corp",
    projectID: "PRJ-9876431",
  },
  {
    projectName: "Project B",
    lastUpdated: "2023-04-08T15:45:00.000Z",
    customer: "XYZ Corp",
    projectID: "PRJ-5432572",
  },
  {
    projectName: "Project C",
    lastUpdated: "2023-04-07T10:15:00.000Z",
    customer: "123 Inc",
    projectID: "PRJ-2468239",
  },
];

const rows_d = [
  {
    projectName: "Project D",
    lastUpdated: "2023-04-06T13:20:00.000Z",
    customer: "DEF Corp",
    projectID: "PRJ-1357235",
  },
  {
    projectName: "Project E",
    lastUpdated: "2023-04-05T09:55:00.000Z",
    customer: "456 Inc",
    projectID: "PRJ-7890135",
  },
  {
    projectName: "Project F",
    lastUpdated: "2023-04-04T17:30:00.000Z",
    customer: "GHI Corp",
    projectID: "PRJ-2468123",
  },
	{
    projectName: "Project B",
    lastUpdated: "2023-04-08T15:45:00.000Z",
    customer: "XYZ Corp",
    projectID: "PRJ-5432123",
  },
  {
    projectName: "Project C",
    lastUpdated: "2023-04-07T10:15:00.000Z",
    customer: "123 Inc",
    projectID: "PRJ-2468222",
  },
];

const columns = ["Project Name", "Last Updated", "Customer", "Project ID"];

export const Projects: React.FC<{}> = () => {
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
            My Projects
          </Typography>
          <Button
            variant="contained"
            color="primary"
            startIcon={<FontAwesomeIcon icon={faPlus} />}
						sx={{ color: "white", marginBottom: 1 }}
          >
            Create Project
          </Button>
        </Box>
        <Box>
          <CustomTable rows={rows} columns={columns} maxHeight='calc(46vh - 90px)' columnSpacing='45px'/>
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
            All Projects
          </Typography>
          <Box display="flex" alignItems="center">
            <TextField
              label="Search Project"
              variant="outlined"
              size="small"
              margin="dense"
							sx={{ marginBottom: 1, marginRight: 1 }}
            />
            <TextField
              label="Search Customer"
              variant="outlined"
              size="small"
              margin="dense"
							sx={{ marginBottom: 1 }}
            />
          </Box>
        </Box>
        <Box flexGrow={1}>
          <CustomTable rows={rows_d} columns={columns} maxHeight='calc(53vh - 90px)' columnSpacing='45px'/>
        </Box>
      </Grid>
    </Grid>
  );
};

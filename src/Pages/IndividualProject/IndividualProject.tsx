import { Button, InputBase, Paper, Typography, Avatar, Box } from "@mui/material";
import { createUseStyles } from "react-jss";
import { AppDispatch } from "../../store";
import { RefObject, useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faPlus } from "@fortawesome/free-solid-svg-icons";
import { CustomTableIndividual } from "../../Components/CustomTableIndividual";
import { UPLOAD_FILE_OPEN } from "../../Redux/Actions";
import { useNavigate } from "react-router-dom";

const useStyles = createUseStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "2px 20px",
    marginBottom: "10px",
    height: "calc(100% - 10px)",
  },
  paperContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    height: "100%",
    overflowX: "hidden",
    "& > *": {
      margin: "0 2px",
    },
  },
  paper: {
    width: "30%",
    height: "100%",
    "&:last-child": {
      width: "70%",
    },
    position: "relative",
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    justifyContent: 'flex-end',
  },
  chatMessages: {
    height: 'calc(100% - 93px)',
    position: "absolute",
    overflowY: "hidden",
  },
  inputBoxContainer: {
    position: "absolute",
    bottom: 0,
    width: 'calc(100% - 20px)',
    margin: "5px 10px",
    zIndex: 1,
  },
  inputBox: {
    flexGrow: 1,
    marginRight: '1rem',
  },
  growUpwards: {
    flexGrow: 1,
  },
  chatContainer: {
    position: 'relative',
    height: '100%',
  },
  chatBox: {
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
    overflowY: 'scroll',
    height: '100%',
    padding: '0 8px',
    "& > *:last-child": {
      marginBottom: 25,
    },
  },
  commentContainer: {
    display: 'flex',
    gap: 8,
  },
  commentImage: {
    width: 32,
    height: 32,
    borderRadius: '50%',
    marginTop: 7,
  },
  commentContent: {
    display: 'flex',
    flexDirection: 'column',
    gap: 4,
    maxWidth: '100%',
  },
  commentName: {
    fontWeight: 'bold',
  },
  commentNameAuthor: {
    fontWeight: 'bold',
    alignSelf: 'flex-end',
  },
  commentDate: {
    fontSize: 12,
    color: '#666',
  },
  commentDateAuthor: {
    fontSize: 12,
    color: '#666',
    alignSelf: 'flex-end',
  },
  commentBubble: {
    backgroundColor: '#e6e6e6',
    borderRadius: 10,
    padding: '8px 16px',
    width: "100%",
    marginLeft: -30,
  },
  authorCommentBubble: {
    backgroundColor: '#75BC5B',
    color: '#fff',
    paddingRight: 15,
    marginLeft: 0,
  },
  authorComment: {
    alignSelf: 'flex-end',
  },
  projectManageButtons: {
    position: "absolute",
    right: 0,
    top: 0,
  },
  containerInformation: {
    display: 'flex',
    flexWrap: 'wrap',
    padding: '10px 15px',
    rowGap: 10,
    columnGap: 50,
  },
  label: {
    marginRight: '5px',
  },
  data: {
    overflowWrap: 'anywhere',
    fontWeight: 'bold',
  },
  containerProjectExtended: {
    display: 'flex',
    flexDirection: 'row',
    margin: '10px 15px',
    columnGap: 20,
    "& > *:first-child": {
      width: '33%',
      height: '100%',
      overflowY: 'scroll',
    },
    "& > *:last-child": {
      width: '66%',
      height: '100%',
      overflowY: 'scroll',
    },
  },
  projectAttachmentHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    columnGap: 20,
  },
});

const comments = [
  {
    id: 1,
    name: "John Doe",
    date: "2021-09-01",
    comment: "This is a comment. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla euismod, nisl eget ultricies ultricies, nunc nisl aliquam nunc, quis ultricies nisl nunc eget nunc.",
    isAuthor: true,
    image: 'https://i.pravatar.cc/300?img=1',
  },
  {
    id: 2,
    name: "Jane Doe",
    date: "2021-09-01",
    comment: "This is a comment",
    isAuthor: true,
    image: 'https://i.pravatar.cc/300?img=2',
  },
  {
    id: 3,
    name: "John Doe",
    date: "2021-09-01",
    comment: "This is a comment lorem ipsum dolor sit amet",
    isAuthor: true,
    image: 'https://i.pravatar.cc/300?img=3',
  },
  {
    id: 4,
    name: "Jane Doe",
    date: "2021-09-01",
    comment: "This is a comment",
    isAuthor: false,
    image: 'https://i.pravatar.cc/300?img=4',
  },
  {
    id: 5,
    name: "Jane Doe",
    date: "2021-09-01",
    comment: "This is a comment",
    isAuthor: false,
    image: 'https://i.pravatar.cc/300?img=4',
  },
  {
    id: 6,
    name: "Jane Doe",
    date: "2021-09-01",
    comment: "This is a comment",
    isAuthor: false,
    image: 'https://i.pravatar.cc/300?img=4',
  },
  {
    id: 7,
    name: "Jane Doe",
    date: "2021-09-01",
    comment: "This is a comment",
    isAuthor: true,
    image: 'https://i.pravatar.cc/300?img=4',
  },
  {
    id: 8,
    name: "Jane Doe",
    date: "2021-09-01",
    comment: "This is a comment",
    isAuthor: true,
    image: 'https://i.pravatar.cc/300?img=4',
  },
  {
    id: 9,
    name: "Jane Doe",
    date: "2021-09-01",
    comment: "This is a comment. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla euismod, nisl eget ultricies ultricies, nunc nisl aliquam nunc, quis ultricies nisl nunc eget nunc.",
    isAuthor: true,
    image: 'https://i.pravatar.cc/300?img=4',
  },
];

const columns = [
	'Subject', 
	'Last Updated',
	'Status',
	'Priority',
	'Assigned',
];

const rows_d = [
  { 
    subject: 'Forgot password',
    lastUpdated: '2022-04-01T12:15:00.000Z',
		status: <span style={{color: 'green'}}>Open</span>,
		priority: <span style={{color: 'orange'}}>Medium</span>,
    assigned: 'Samantha Lee',
  },
  { 
    subject: 'Error message when trying to checkout',
    lastUpdated: '2022-04-02T14:20:00.000Z',
		status: <span style={{color: 'blue'}}>In Progress</span>,
		priority: <span style={{color: 'red'}}>High</span>,
    assigned: 'David Kim',
  },
  { 
    subject: 'Missing order confirmation email',
    lastUpdated: '2022-04-03T09:55:00.000Z',
		status: <span style={{color: 'green'}}>Open</span>,
		priority: <span style={{color: 'green'}}>Low</span>,
    assigned: 'Michael Chen',
  },
  { 
    subject: 'Product not delivered on time',
    lastUpdated: '2022-04-04T17:30:00.000Z',
		status: <span style={{color: 'blue'}}>In Progress</span>,
		priority: <span style={{color: 'orange'}}>Medium</span>,
    assigned: 'Jessica Lee',
  },
  { 
    subject: 'Wrong item received',
    lastUpdated: '2022-04-05T11:10:00.000Z',
		status: <span style={{color: 'red'}}>Closed</span>,
		priority: <span style={{color: 'green'}}>Low</span>,
    assigned: 'Kevin Chen',
  },
	{ 
    subject: 'Wrong item received',
    lastUpdated: '2022-04-05T11:10:00.000Z',
		status: <span style={{color: 'red'}}>Closed</span>,
		priority: <span style={{color: 'green'}}>Low</span>,
    assigned: 'Kevin Chen',
  },
	{ 
    subject: 'Wrong item received',
    lastUpdated: '2022-04-05T11:10:00.000Z',
		status: <span style={{color: 'red'}}>Closed</span>,
		priority: <span style={{color: 'green'}}>Low</span>,
    assigned: 'Kevin Chen',
  },
	{ 
    subject: 'Wrong item received',
    lastUpdated: '2022-04-05T11:10:00.000Z',
		status: <span style={{color: 'red'}}>Closed</span>,
		priority: <span style={{color: 'green'}}>Low</span>,
    assigned: 'Kevin Chen',
  },
];

export const IndividualProject: React.FC<{dispatch: AppDispatch}> = ({ dispatch }) => {
  const classes = useStyles();

  const divRef: RefObject<HTMLDivElement> = useRef(null);
  const divProjectInformationRef: RefObject<HTMLDivElement> = useRef(null);

  const [height, setHeight] = useState<number | null>(null);
  const [deviceWidthUpdate, setDeviceWidthUpdate] = useState<number | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    window.addEventListener('resize', () => {
      setDeviceWidthUpdate(window.innerWidth);
    });
  }, []);

  useEffect(() => {
    if (divProjectInformationRef.current) {
      const elementHeight = divProjectInformationRef.current.offsetHeight;
      setHeight(elementHeight);
    }
  }, [deviceWidthUpdate]);

  useEffect(() => {
    if (divRef.current) divRef.current.scrollTop = divRef.current.scrollHeight;
  }, []);

  return (
    <div className={classes.root}>
      <Typography variant="h2">Project</Typography>
      <div className={classes.paperContainer}>
        <Paper className={classes.paper}>
          <div className={classes.chatContainer}>
            <Typography variant="h5"
              sx={{ padding: "10px" }}
            >
              Discussion
            </Typography>
            <div className={classes.chatMessages}>
              <Box className={classes.chatBox} ref={divRef}>
                {comments.map((comment) => (
                  <Box key={comment.id} className={`${classes.commentContainer} ${comment.isAuthor ? classes.authorComment : ''}`}>
                    {comment.isAuthor ? (
                      <>
                        <Box className={classes.commentContent}>
                          <Typography variant="subtitle2" className={classes.commentNameAuthor}>
                            {comment.name}
                          </Typography>
                          <Typography variant="body2" className={classes.commentDateAuthor}>
                            {comment.date}
                          </Typography>
                          <Box className={`${classes.commentBubble} ${classes.authorCommentBubble}`}>
                            <Typography variant="body1">{comment.comment}</Typography>
                          </Box>
                        </Box>
                        <Avatar src={comment.image} alt={comment.name} className={classes.commentImage} />
                      </>
                    ) : (
                      <>
                        <Avatar src={comment.image} alt={comment.name} className={classes.commentImage} />
                        <Box className={classes.commentContent}>
                          <Typography variant="subtitle2" className={classes.commentName}>
                            {comment.name}
                          </Typography>
                          <Typography variant="body2" className={classes.commentDate}>
                            {comment.date}
                          </Typography>
                          <Box className={`${classes.commentBubble}`}>
                            <Typography variant="body1">{comment.comment}</Typography>
                          </Box>
                        </Box>
                      </>
                    )}
                  </Box>
                ))}
              </Box>
            </div>
            <div className={classes.inputBoxContainer}>
              <Paper
                component="form"
                sx={{ display: 'flex', alignItems: 'center' }}
              >
                <InputBase
                  sx={{ ml: 1, flex: 1 }}
                  placeholder="Add a comment"
                  inputProps={{ 'aria-label': 'Add a comment' }}
                />
                <Button variant="contained" color="primary"
                  sx={{ color: "white" }}
                >Send</Button>
              </Paper>
            </div>
          </div>
        </Paper>
        <Paper className={classes.paper}>
          <div ref={divProjectInformationRef}>
            <Typography variant="h5" sx={{ padding: "10px" }}>Project Details</Typography>
            <div className={classes.projectManageButtons}>
              <Button variant="contained" color="primary"
                endIcon={<FontAwesomeIcon icon={faEdit} style={{ "marginTop": -4 }}/>}
                sx={{ color: "white", marginTop: "8px", width: 160 }}
              >Edit Project</Button>
            </div>
            <div className={classes.containerInformation}>
              <Info label="Name" data="New Interface for Ticket System" />
              <Info label="Creator" data="John Doe" />
              <Info label="Contact Person" data="Jane Smith" />
              <Info label="Associated Company" data="Saab" />
            </div>
          </div>
          <div className={classes.containerProjectExtended} style={{ height: `calc(100% - ${height}px - 15px)`}}>
            <Paper>
              <Typography variant="h6" sx={{ padding: "10px" }}>Description</Typography>
              <Typography variant="body1" sx={{ padding: "10px" }}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla euismod, nisl eget ultricies ultricies, nunc nisl aliquam nunc, quis ultricies nisl nunc eget nunc. Donec euismod, nisl eget ultricies ultricies, nunc nisl aliquam nunc, quis ultricies nisl nunc eget nunc. Donec euismod, nisl eget ultricies ultricies, nunc nisl aliquam nunc, quis ultricies nisl nunc eget nunc. Donec euismod, nisl eget ultricies ultricies, nunc nisl aliquam nunc, quis ultricies nisl nunc eget nunc.
              </Typography>
            </Paper>
            <Paper>
              <div className={classes.projectAttachmentHeader}>
                <Typography variant="h6" sx={{ padding: "10px" }}>Tickets</Typography>
                <Button variant="contained" color="primary"
                  endIcon={<FontAwesomeIcon icon={faPlus}/>}
                  sx={{ color: "white", marginTop: "8px", width: 160 }}
                  onClick={() => navigate('/create-ticket')}
                >Create Ticket</Button>
              </div>
              <CustomTableIndividual rows={rows_d} columns={columns} maxHeight='calc(100% - 55px)'/>
            </Paper>
          </div>
        </Paper>
      </div>
    </div>
  );
};

const Info: React.FC<{ label: string, data: string, color?: string }> = ({ label, data, color }) => {
  const classes = useStyles();

  return (
    <Box>
      <Typography variant="subtitle1" className={classes.label}>
        {label}
      </Typography>
      <Typography variant="body1" className={classes.data} sx={{ color: color ? color: ""}}>
        {data}
      </Typography>
    </Box>
  );
};
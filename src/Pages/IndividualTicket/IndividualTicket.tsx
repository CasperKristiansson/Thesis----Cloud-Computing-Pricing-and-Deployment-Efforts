import { Button, InputBase, Paper, Typography, Avatar, Box, MenuItem, FormControl, InputLabel, Select } from "@mui/material";
import { createUseStyles } from "react-jss";
import { AppDispatch } from "../../store";
import { RefObject, useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { CustomTableIndividual } from "../../Components/CustomTableIndividual";

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
    marginTop: "5px",
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
  ticketManageButtons: {
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
  containerTicketExtended: {
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
    id: 6,
    name: "Jane Doe",
    date: "2021-09-01",
    comment: "This is a comment",
    isAuthor: true,
    image: 'https://i.pravatar.cc/300?img=4',
  },
  {
    id: 6,
    name: "Jane Doe",
    date: "2021-09-01",
    comment: "This is a comment",
    isAuthor: true,
    image: 'https://i.pravatar.cc/300?img=4',
  },
  {
    id: 6,
    name: "Jane Doe",
    date: "2021-09-01",
    comment: "This is a comment. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla euismod, nisl eget ultricies ultricies, nunc nisl aliquam nunc, quis ultricies nisl nunc eget nunc.",
    isAuthor: true,
    image: 'https://i.pravatar.cc/300?img=4',
  },
];

const columns = [
  "File Name", "File Size", "Date Uploaded", "Uploaded By"
];

const data = [
  {
    name: "File 1.pdf",
    size: "1.5 MB",
    date: "2021-09-01",
    uploadedBy: "John Doe",
  },
  {
    name: "File 2.pdf",
    size: "1.5 MB",
    date: "2021-09-01",
    uploadedBy: "John Doe",
  },
  {
    name: "Image 1.png",
    size: "115 MB",
    date: "2021-09-01",
    uploadedBy: "John Doe",
  },
];

export const IndividualTicket: React.FC<{dispatch: AppDispatch}> = ({ dispatch }) => {
  const classes = useStyles();

  const divRef: RefObject<HTMLDivElement> = useRef(null);
  const divTicketInformationRef: RefObject<HTMLDivElement> = useRef(null);

  const [height, setHeight] = useState<number | null>(null);
  const [deviceWidthUpdate, setDeviceWidthUpdate] = useState<number | null>(null);

  useEffect(() => {
    window.addEventListener('resize', () => {
      setDeviceWidthUpdate(window.innerWidth);
    });
  }, []);

  useEffect(() => {
    if (divTicketInformationRef.current) {
      const elementHeight = divTicketInformationRef.current.offsetHeight;
      setHeight(elementHeight);
    }
  }, [deviceWidthUpdate]);

  useEffect(() => {
    if (divRef.current) divRef.current.scrollTop = divRef.current.scrollHeight;
  }, []);

  return (
    <div className={classes.root}>
      <Typography variant="h2">Ticket</Typography>
      <Typography variant="h5">Issue Regarding Project #5</Typography>
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
          <div ref={divTicketInformationRef}>
            <Typography variant="h5" sx={{ padding: "10px" }}>Ticket Details</Typography>
            <div className={classes.ticketManageButtons}>
              <Button variant="contained" color="primary"
                endIcon={<FontAwesomeIcon icon={faEdit} style={{ "marginTop": -4 }}/>}
                sx={{ color: "white", marginTop: "8px", width: 150 }}
              >Edit Ticket</Button>
              <FormControl sx={{ m: 1, width: 150}}>
                <InputLabel id="demo-simple-select-label">Status</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={"open"}
                  label="Status"
                  sx={{ height: 38}}
                >
                  <MenuItem value={"open"}>Open</MenuItem>
                  <MenuItem value={"inProgress"}>In Progress</MenuItem>
                  <MenuItem value={"closed"}>Closed</MenuItem>
                </Select>
              </FormControl>
            </div>
            <div className={classes.containerInformation}>
              <Info label="Name" data="Issue Regarding Project #5" />
              <Info label="Creator" data="John Doe" />
              <Info label="Assignee" data="Jane Smith" />
              <Info label="Project" data="My Project" />
              <Info label="Priority" data="High" color="red" />
              <Info label="Status" data="In Progress" color="blue" />
            </div>
          </div>
          <div className={classes.containerTicketExtended} style={{ height: `calc(100% - ${height}px - 15px)`}}>
            <Paper>
              <Typography variant="h6" sx={{ padding: "10px" }}>Description</Typography>
              <Typography variant="body1" sx={{ padding: "10px" }}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla euismod, nisl eget ultricies ultricies, nunc nisl aliquam nunc, quis ultricies nisl nunc eget nunc. Donec euismod, nisl eget ultricies ultricies, nunc nisl aliquam nunc, quis ultricies nisl nunc eget nunc. Donec euismod, nisl eget ultricies ultricies, nunc nisl aliquam nunc, quis ultricies nisl nunc eget nunc. Donec euismod, nisl eget ultricies ultricies, nunc nisl aliquam nunc, quis ultricies nisl nunc eget nunc.
              </Typography>
            </Paper>
            <Paper>
              <Typography variant="h6" sx={{ padding: "10px" }}>Attachments</Typography>
              <CustomTableIndividual rows={data} columns={columns} maxHeight='calc(100% - 55px)'/>
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
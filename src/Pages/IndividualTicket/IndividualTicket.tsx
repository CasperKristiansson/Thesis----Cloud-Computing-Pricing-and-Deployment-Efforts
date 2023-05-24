import { Button, InputBase, Paper, Typography, Avatar, Box, MenuItem, FormControl, InputLabel, Select, Link } from "@mui/material";
import { createUseStyles } from "react-jss";
import { AppDispatch } from "../../store";
import { RefObject, useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faPlus } from "@fortawesome/free-solid-svg-icons";
import { CustomTableIndividual } from "../../Components/CustomTableIndividual";
import { SET_OPERATION_IN_PROGRESS, UPLOAD_FILE_OPEN } from "../../Redux/Actions";
import { useNavigate, useParams } from "react-router-dom";
import { requestApi } from "../../Utils/Fetch";
import { useSelector } from "react-redux";
import { getToken, getUser } from "../../Redux/Selectors";
import { TicketResponse } from "../../Models/ResponseModels/TicketResponse";
import { Status } from "../../Components/Status";
import { Priority } from "../../Components/Priority";
import { Link as RouterLink } from "react-router-dom";
import { formatTime } from "../../Utils/Other";

const useStyles = createUseStyles({
  containerWrapper: {
    transformOrigin: 'top left',
    transition: 'transform 0.3s ease-in-out',
    height: "calc(100vh - 70px)",
    '@media (max-width: 1200px)': {
      height: "calc(145vh)",
      marginBottom: "-23vh",
      transform: 'scale(0.6)',
      width: '167%',
    },
  },
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "4px 10px",
    marginBottom: "10px",
    height: "calc(100% - 10px)",
  },
  paperContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    height: "inherit",
    maxHeight: "inherit",
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
    width: "100%",
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
    margin: '5px 10px',
    columnGap: 10,
    "& > *:first-child": {
      width: '33%',
      height: "inherit",
      overflowY: 'scroll',
    },
    "& > *:last-child": {
      width: '66%',
      height: "inherit",
      overflowY: 'scroll',
    },
  },
  ticketAttachmentHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    columnGap: 20,
  },
});

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

export const IndividualTicket: React.FC<{ dispatch: AppDispatch }> = ({ dispatch }) => {
  const classes = useStyles();

  const divRef: RefObject<HTMLDivElement> = useRef(null);

  const [ticket, setTicket] = useState<TicketResponse | null>(null);
  const [commentText, setCommentText] = useState<string>("");

  const { id } = useParams();

  const token = useSelector(getToken);
  const user = useSelector(getUser);

  const navigate = useNavigate();

  useEffect(() => {
    if (divRef.current) divRef.current.scrollTop = divRef.current.scrollHeight;
  }, []);

  useEffect(() => {
    dispatch({ type: SET_OPERATION_IN_PROGRESS, payload: true })
    requestApi(`/ticket/${id}`, "GET", token).then((response) => {
      if (response) {
        console.log("Ticket", response);

        setTicket(response as TicketResponse);
      } else {
        alert("Error, could not get ticket");
      }
      dispatch({ type: SET_OPERATION_IN_PROGRESS, payload: false });
    });
  }, [id, token]);

  const handleEditStatus = (status: string) => {
    dispatch({ type: SET_OPERATION_IN_PROGRESS, payload: true })
    requestApi('/editTicketStatus', "PUT", token, { id, status }).then((response) => {
      if (response) {
        setTicket({
          ...ticket,
          status: status
        } as TicketResponse);
      } else {
        alert("Error, could not edit ticket status");
      }
      dispatch({ type: SET_OPERATION_IN_PROGRESS, payload: false });
    });
  }

  const handleAddComment = () => {
    dispatch({ type: SET_OPERATION_IN_PROGRESS, payload: true })

    requestApi('/createTicketComment', "POST", token, { id, comment: commentText }).then((response) => {
      if (response && ticket) {
        setTicket({
          ...ticket,
          comments: ticket.comments?.concat({
            id: "newcomment",
            ticketId: id ?? "",
            userId: user.id,
            name: user?.name || "",
            time: new Date().toISOString(),
            comment: commentText,
          })
        } as TicketResponse);
        setCommentText("");
      } else {
        alert("Error, could not add comment");
      }
      dispatch({ type: SET_OPERATION_IN_PROGRESS, payload: false });
    });
  }

  return (
    <div className={classes.containerWrapper}>
      {ticket && <div className={classes.root}>
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
                  {ticket.comments.length > 0 ? ticket.comments.sort((a, b) => a.time > b.time ? 1 : -1).map((comment) => {
                    const isAuthor = comment.userId === user.id;
                    return (
                      <Box key={comment.id} className={`${classes.commentContainer} ${isAuthor ? classes.authorComment : ''}`}>
                        {isAuthor ? (
                          <>
                            <Box className={classes.commentContent}>
                              <Typography variant="subtitle2" className={classes.commentNameAuthor}>
                                {comment.name}
                              </Typography>
                              <Typography variant="body2" className={classes.commentDateAuthor}>
                                {formatTime(comment.time)}
                              </Typography>
                              <Box className={`${classes.commentBubble} ${classes.authorCommentBubble}`}>
                                <Typography variant="body1">{comment.comment}</Typography>
                              </Box>
                            </Box>
                            <Avatar src={"/profile.jpg"} alt={comment.name} className={classes.commentImage} />
                          </>
                        ) : (
                          <>
                            <Avatar src={"/profile.jpg"} alt={comment.name} className={classes.commentImage} />
                            <Box className={classes.commentContent}>
                              <Typography variant="subtitle2" className={classes.commentName}>
                                {comment.name}
                              </Typography>
                              <Typography variant="body2" className={classes.commentDate}>
                                {formatTime(comment.time)}
                              </Typography>
                              <Box className={`${classes.commentBubble}`}>
                                <Typography variant="body1">{comment.comment}</Typography>
                              </Box>
                            </Box>
                          </>
                        )}
                      </Box>
                    )
                  }) : (
                    <Typography variant="body1" sx={{ textAlign: "center" }}>No comments yet</Typography>
                  )}
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
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                  />

                  <Button
                    variant="contained"
                    color="primary"
                    sx={{ color: "white" }}
                    onClick={handleAddComment}
                  >Send</Button>
                </Paper>
              </div>
            </div>
          </Paper>
          <Paper className={classes.paper} style={{display: "flex", flexFlow: "column", height: "100%"}}>
            <div>
              <Typography variant="h4" sx={{ padding: "10px" }}>Ticket Details</Typography>
              <div className={classes.ticketManageButtons}>
                <Button
                  variant="contained"
                  color="primary"
                  endIcon={<FontAwesomeIcon icon={faEdit} style={{ "marginTop": -4 }} />}
                  sx={{ color: "white", marginTop: "8px", width: 150 }}
                  onClick={() => navigate(`/ticket/${id}/edit`)}
                >
                  Edit Ticket
                </Button>

                <FormControl sx={{ m: 1, width: 150 }}>
                  <InputLabel id="demo-simple-select-label">Status</InputLabel>

                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={ticket.status}
                    label="Status"
                    sx={{ height: 38 }}
                    onChange={(event) => handleEditStatus(event.target.value as string)}
                  >
                    <MenuItem value={"Open"}>Open</MenuItem>
                    <MenuItem value={"In Progress"}>In Progress</MenuItem>
                    <MenuItem value={"Closed"}>Closed</MenuItem>
                  </Select>
                </FormControl>
              </div>
              <div className={classes.containerInformation}>
                <Info label="Name" data={ticket.title} />
                <Info label="Project" data={<Link to={`/project/${ticket.projectId}`} component={RouterLink} >{ticket.projectName}</Link>} />
                <Info label="Creator" data={ticket.creatorName ?? ""} />
                <Info label="Assignee" data={ticket.assignedName} />
                <Info label="Last Updated" data={formatTime(ticket.lastUpdated)} />
                <Info label="Priority" data={ticket.priority} priority />
                <Info label="Status" data={ticket.status} status />
              </div>
            </div>
            <div className={classes.containerTicketExtended} style={{ flexGrow: 1 }}>
              <Paper>
                <Typography variant="h6" sx={{ padding: "10px" }}>Description</Typography>
                <Typography variant="body1" sx={{ padding: "10px" }}>
                  {ticket.description}
                </Typography>
              </Paper>
              <Paper>
                <div className={classes.ticketAttachmentHeader}>
                  <Typography variant="h6" sx={{ padding: "10px" }}>Attachments</Typography>
                  <Button variant="contained" color="primary"
                    endIcon={<FontAwesomeIcon icon={faPlus} />}
                    sx={{ color: "white", marginTop: "8px", width: 190 }}
                    onClick={() => dispatch({ type: UPLOAD_FILE_OPEN, payload: true })}
                  >Add Attachment</Button>
                </div>
                <CustomTableIndividual rows={data} columns={columns} maxHeight='calc(100% - 55px)' />
              </Paper>
            </div>
          </Paper>
        </div>
      </div>}
    </div>
  );
};

const Info: React.FC<{ label: string, data: string | JSX.Element, status?: boolean, priority?: boolean }> = ({ label, data, status, priority }) => {
  const classes = useStyles();
  let finalData: string | JSX.Element = data;

  if (status === true && typeof data === "string") {
    finalData = <Status value={data} />
  }

  if (priority === true && typeof data === "string") {
    finalData = <Priority value={data} />
  }

  return (
    <Box>
      <Typography variant="subtitle1" className={classes.label}>
        {label}
      </Typography>
      <Typography variant="body1" className={classes.data}>
        {finalData}
      </Typography>
    </Box>
  );
};
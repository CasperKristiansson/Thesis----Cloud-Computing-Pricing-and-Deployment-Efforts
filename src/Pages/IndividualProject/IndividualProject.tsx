import { Button, InputBase, Paper, Typography, Avatar, Box } from "@mui/material";
import { createUseStyles } from "react-jss";
import { AppDispatch } from "../../store";
import { RefObject, useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faPlus } from "@fortawesome/free-solid-svg-icons";
import { CustomTableIndividual } from "../../Components/CustomTableIndividual";
import { useNavigate, useParams } from "react-router-dom";
import { requestApi } from "../../Utils/Fetch";
import { useSelector } from "react-redux";
import { getOperationInProgress, getToken, getUser } from "../../Redux/Selectors";
import { SET_OPERATION_IN_PROGRESS } from "../../Redux/Actions";
import { ProjectResponse } from "../../Models/ResponseModels/ProjectResponse";
import { TicketResponse } from "../../Models/ResponseModels/TicketResponse";
import { Status } from "../../Components/Status";
import { Priority } from "../../Components/Priority";
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
    margin: '5px 10px',
    columnGap: 10,
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

const columns = [
  'Subject',
  'Last Updated',
  'Status',
  'Priority',
  'Assigned',
  'ID'
];

export const IndividualProject: React.FC<{ dispatch: AppDispatch }> = ({ dispatch }) => {
  const classes = useStyles();

  const divRef: RefObject<HTMLDivElement> = useRef(null);

  const [project, setProject] = useState<ProjectResponse | null>(null);
  const [commentText, setCommentText] = useState<string>("");
  const [tickets, setTickets] = useState([]);

  const { id } = useParams();

  const token = useSelector(getToken);
  const operationInProgress = useSelector(getOperationInProgress);
  const user = useSelector(getUser);

  const navigate = useNavigate();

  useEffect(() => {
    dispatch({ type: SET_OPERATION_IN_PROGRESS, payload: true })
    requestApi(`/project/${id}`, "GET", token).then((response) => {
      if (response) {
        console.log(response);

        setProject(response as ProjectResponse);

        const customTableTickets = response.tickets.map((ticket: TicketResponse) => {
          return {
            subject: ticket.title,
            lastUpdated: formatTime(ticket.lastUpdated),
            status: <Status value={ticket.status} />,
            priority: <Priority value={ticket.priority} />,
            assigned: ticket.assignedName,
            ID: ticket.id,
          }
        }) ?? [];

        console.log("customTableTickets", customTableTickets);

        setTickets(customTableTickets);
      } else {
        alert("Error, could not get project");
      }
      dispatch({ type: SET_OPERATION_IN_PROGRESS, payload: false });
    });
  }, [id, token]);

  const handleAddComment = () => {
    requestApi("/createProjectComment", "POST", token, { projectId: id, comment: commentText }).then((response) => {
      if (response && project) {
        console.log(response);
        setProject({
          ...project,
          comments: project.comments?.concat({
            id: "newcomment",
            projectId: id ?? "",
            userId: user.id,
            name: user?.name || "",
            time: new Date().toISOString(),
            comment: commentText,
          })
        });
        setCommentText("");
      } else {
        alert("Error, could not add comment");
        window.location.reload();
      }
    });
  }

  useEffect(() => {
    if (divRef.current) divRef.current.scrollTop = divRef.current.scrollHeight;
  }, []);

  return (
    <div className={classes.containerWrapper}>
      {!operationInProgress && project && <div className={classes.root}>
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
                  {project.comments && project.comments.length > 0 ? project.comments?.sort((a, b) => a.time > b.time ? 1 : -1).map((comment) => {
                    const isAuthor = user.id === comment.userId;

                    return <Box key={comment.id} className={`${classes.commentContainer} ${isAuthor ? classes.authorComment : ''}`}>
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
                    onClick={() => commentText.length > 0 ? handleAddComment() : null}
                  >Send</Button>
                </Paper>
              </div>
            </div>
          </Paper>
          <Paper className={classes.paper} style={{display: "flex", flexFlow: "column", height: "100%"}}>
            <div>
              <Typography variant="h5" sx={{ padding: "10px" }}>Project Details</Typography>

              <div className={classes.projectManageButtons}>
                <Button
                  variant="contained"
                  color="primary"
                  endIcon={<FontAwesomeIcon icon={faEdit} style={{ "marginTop": -4 }} />}
                  sx={{ color: "white", marginTop: "8px", width: 160 }}
                  onClick={() => navigate(`/project/${id}/edit`)}
                >
                  Edit Project
                </Button>
              </div>

              <div className={classes.containerInformation}>
                <Info label="Name" data={project.name} />
                <Info label="Creator" data={project.creatorName} />
                <Info label="Contact Person" data={project.contactPersonName} />
                <Info label="Associated Company" data={project.companyName} />
                <Info label="Last Edited" data={project.lastEdited} />
              </div>
            </div>

            <div className={classes.containerProjectExtended} style={{ flexGrow: 1 }}>
              <Paper>
                <Typography variant="h6" sx={{ padding: "10px" }}>Description</Typography>

                <Typography variant="body1" sx={{ padding: "10px" }}>
                  {project.description}
                </Typography>
              </Paper>

              <Paper>
                <div className={classes.projectAttachmentHeader}>
                  <Typography variant="h6" sx={{ padding: "10px" }}>Tickets</Typography>

                  <Button variant="contained" color="primary"
                    endIcon={<FontAwesomeIcon icon={faPlus} />}
                    sx={{ color: "white", marginTop: "8px", width: 160 }}
                    onClick={() => navigate(`/ticket/create?pid=${id}`)}
                  >
                    Create Ticket
                  </Button>
                </div>

                <CustomTableIndividual 
                  rows={tickets} 
                  columns={columns} 
                  maxHeight='calc(100% - 55px)' 
                  rowOnClickDestination="/ticket/"
                />
              </Paper>
            </div>
          </Paper>
        </div>
      </div>}
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
      <Typography variant="body1" className={classes.data} sx={{ color: color ? color : "" }}>
        {data}
      </Typography>
    </Box>
  );
};
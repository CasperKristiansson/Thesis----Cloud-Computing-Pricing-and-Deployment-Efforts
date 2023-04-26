import { Button, InputBase, Paper, Typography, Avatar, Box } from "@mui/material";
import { createUseStyles } from "react-jss";
import { AppDispatch } from "../../store";

const useStyles = createUseStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "20px",
    height: "calc(100% - 40px)",
    overflowY: "hidden",
  },
  paperContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    height: "100%",
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
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    justifyContent: 'flex-end',
  },
  chatMessages: {
    height: 'calc(100% - 185px)',
  },
  inputBoxContainer: {
    position: "absolute",
    top: "auto",
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
  },
  commentContainer: {
    display: 'flex',
    gap: 8,
  },
  commentImage: {
    width: 32,
    height: 32,
    borderRadius: '50%',
  },
  commentContent: {
    display: 'flex',
    flexDirection: 'column',
    gap: 4,
    maxWidth: '70%',
  },
  commentName: {
    fontWeight: 'bold',
  },
  commentDate: {
    fontSize: 12,
    color: '#666',
  },
  commentBubble: {
    backgroundColor: '#e6e6e6',
    borderRadius: 10,
    padding: '8px 16px',
    width: "fit-content",
  },
  authorCommentBubble: {
    backgroundColor: '#75BC5B',
    color: '#fff',
  },
  authorComment: {
    alignSelf: 'flex-end',
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
];

export const IndividualTicket: React.FC<{dispatch: AppDispatch}> = ({ dispatch }) => {
  const classes = useStyles();

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
              <Box className={classes.chatBox}>
                {comments.map((comment) => (
                  <Box key={comment.id} className={`${classes.commentContainer} ${comment.isAuthor ? classes.authorComment : ''}`}>
                    <Avatar src={comment.image} alt={comment.name} className={classes.commentImage} />
                    <Box className={classes.commentContent}>
                      <Typography variant="subtitle2" className={classes.commentName}>
                        {comment.name}
                      </Typography>
                      <Typography variant="body2" className={classes.commentDate}>
                        {comment.date}
                      </Typography>
                      <Box className={`${classes.commentBubble} ${comment.isAuthor ? classes.authorCommentBubble : ""}`}>
                        <Typography variant="body1">{comment.comment}</Typography>
                      </Box>
                    </Box>
                  </Box>
                ))}
              </Box>
            </div>
            <div className={classes.inputBoxContainer}>
              {/* <div className={classes.growUpwards}>
              </div> */}
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
         
        </Paper>
      </div>
    </div>
  );
};

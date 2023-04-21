import { Button, Divider, IconButton, Input, InputBase, Paper, TextField, Typography } from "@mui/material";
import { createUseStyles } from "react-jss";
import { AppDispatch } from "../../store";

const useStyles = createUseStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "20px",
    height: "calc(100% - 40px)",
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
    flexGrow: 1,
    overflowY: 'auto',
    padding: '1rem',
  },
  inputBoxContainer: {
    position: "absolute",
    bottom: 0,
    width: 'calc(100% - 20px)',
    margin: "5px 10px"
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
  }
});

const comments = [
  {
    id: 1,
    name: "John Doe",
    date: "2021-09-01",
    comment: "This is a comment",
    isAuthor: true,
  },
  {
    id: 2,
    name: "Jane Doe",
    date: "2021-09-01",
    comment: "This is a comment",
    isAuthor: false,
  },
  {
    id: 3,
    name: "John Doe",
    date: "2021-09-01",
    comment: "This is a comment lorem ipsum dolor sit amet",
    isAuthor: true,
  },
  {
    id: 4,
    name: "Jane Doe",
    date: "2021-09-01",
    comment: "This is a comment",
    isAuthor: false,
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
            </div>
            <div className={classes.inputBoxContainer}>
              <div className={classes.growUpwards}>
              </div>
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

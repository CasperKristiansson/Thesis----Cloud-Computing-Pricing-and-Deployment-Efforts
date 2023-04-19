import { useEffect, useState } from "react";
import { createUseStyles } from "react-jss";
import { Paper, Typography, TextField, Checkbox, Button, Link } from '@mui/material';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMicrosoft } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { getToken } from "../../Redux/Selectors";
import { InputAdornment } from "@mui/material";

const useStyles = createUseStyles({
	loginWrapper: {
    width: '500px',
    maxHeight: '800px',
    height: '80%',
    margin: '0 auto',
    padding: '2rem',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
	wrapper: {
		height: "100%",
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
	},
	title: {
		fontWeight: 600,
		marginBottom: 10,
	},
	inputWrapper: {
		display: "flex",
		flexDirection: "column",
		width: "100%",
		marginBottom: 10,
	},
	iconWrapper: {
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		width: 40,
		height: 40,
		marginRight: 10,
		borderRadius: "50%",
		backgroundColor: "#F2F2F2",
	},
	icon: {
		fontSize: 20,
		color: "#BDBDBD",
	},
	input: {
		width: "100%",
	},
	rememberWrapper: {
		display: "flex",
		alignItems: "center",
		marginBottom: 10,
	},
	forgotLink: {
		marginLeft: "auto",
		fontSize: 12,
		color: "#BDBDBD",
		textDecoration: "none",
		"&:hover": {
				textDecoration: "underline",
		},
	},
	signInButton: {
		backgroundColor: "#F2994A",
		color: "#FFFFFF",
		width: "100%",
		marginBottom: 10,
		"&:hover": {
				backgroundColor: "#F2994A",
		},
	},
	signUpWrapper: {
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
	},
	signUpText: {
		fontSize: 14,
		color: "#BDBDBD",
		marginRight: 5,
	},
	signUpLink: {
		fontSize: 14,
		color: "#F2994A",
		textDecoration: "none",
		"&:hover": {
				textDecoration: "underline",
		},
	},
});

export const Login: React.FC<{ dispatch: any }> = ({ dispatch }) => {
	const classes = useStyles();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

	const navigate = useNavigate();
	const token = useSelector(getToken);

	useEffect(() => {
		if (token !== "") {
			navigate("/");
		}
	});

	const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setEmail(event.target.value);
	};

	const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setPassword(event.target.value);
	};

	const handleRememberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setRememberMe(event.target.checked);
	};

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
	};

	return (
		<div className={classes.wrapper}>
			<Paper elevation={3} className={classes.loginWrapper}>
				<Typography variant="h5" className={classes.title}>
						Welcome Back
				</Typography>
				<Typography variant="body1">
						Welcome Back! Please enter your details
				</Typography>
				<form onSubmit={handleSubmit}>
					<div className={classes.inputWrapper}>
						<TextField
							label="Email"
							variant="outlined"
							className={classes.input}
							value={email}
							onChange={handleEmailChange}
							InputProps={{
								endAdornment: (
									<InputAdornment position="start">
										<FontAwesomeIcon
											icon={faEnvelope}
											className={classes.icon}
										/>
									</InputAdornment>
								),
							}}
						/>
					</div>
					<div className={classes.inputWrapper}>
						<TextField
							label="Password"
							variant="outlined"
							type="password"
							className={classes.input}
							value={password}
							onChange={handlePasswordChange}
							InputProps={{
								endAdornment: (
									<InputAdornment position="start">
										<FontAwesomeIcon
											icon={faLock}
											className={classes.icon}
										/>
									</InputAdornment>
								),
							}}
						/>
					</div>
					<Button
						type="submit"
						variant="contained"
						className={classes.signInButton}
					>
						Sign In
					</Button>
					<div className={classes.rememberWrapper}>
						<Checkbox
							checked={rememberMe}
							onChange={handleRememberChange}
							color="primary"
						/>
						<Typography variant="body2">Remember me</Typography>
						<Link href="#" className={classes.forgotLink}>
								Forgot password?
						</Link>
					</div>
					<Button
						startIcon={<FontAwesomeIcon icon={faMicrosoft} />}
						variant="outlined"
						fullWidth
					>
						Or sign in with Microsoft
					</Button>
					<div className={classes.signUpWrapper}>
						<Typography variant="body2" className={classes.signUpText}>
								Don't have an account?
						</Typography>
						<Link href="#" className={classes.signUpLink}>
								Sign Up
						</Link>
					</div>
				</form>
			</Paper>
		</div>
	);
};

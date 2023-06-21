import { useEffect, useState } from "react";
import { createUseStyles } from "react-jss";
import { Paper, Typography, TextField, Checkbox, Button, Link, Alert } from '@mui/material';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMicrosoft } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { getToken } from "../../Redux/Selectors";
import { InputAdornment } from "@mui/material";
import { Theme } from "../../Styling/Theme";
import { LOGIN } from "../../Redux/Actions";

const useStyles = createUseStyles((theme: Theme) => {
	return {
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
		formWrapper: {
			width: "80%",
			marginTop: 80,
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
		icon: {
			color: theme.backgroundPrimary,
		},
		input: {
			width: "100%",
		},
		rememberWrapper: {
			display: "flex",
			alignItems: "center",
			marginBottom: 30,
		},
		forgotLink: {
			marginLeft: "auto",
			fontSize: 12,
			color: theme.backgroundPrimary,
			textDecoration: "none",
			"&:hover": {
					textDecoration: "underline",
			},
		},
		signInButton: {
			color: theme.textWhite,
			width: "100%",
			marginBottom: 10,
		},
		signUpWrapper: {
			display: "flex",
			alignItems: "center",
			justifyContent: "center",
			marginTop: 5,
		},
		signUpText: {
			fontSize: 14,
			color: "#BDBDBD",
			marginRight: 5,
		},
		signUpLink: {
			fontSize: 14,
			color: theme.backgroundPrimary,
			textDecoration: "none",
			"&:hover": {
					textDecoration: "underline",
			},
		},
	};
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
				<Typography variant="h3" align="left" className={classes.title}>
						Welcome Back
				</Typography>
				<Typography variant="h5" align="center">
						Welcome back to the ticket system! Please sign in with your 
						microsoft account.
				</Typography>
				<form onSubmit={handleSubmit} className={classes.formWrapper}>
					{/*<div className={classes.inputWrapper}>
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
						type="submit"
						variant="contained"
						className={classes.signInButton}
					>
						Sign In
					</Button>*/}
					<Button
						startIcon={<FontAwesomeIcon icon={faMicrosoft} />}
						variant="contained"
						className={classes.signInButton}
						fullWidth
						sx={{ mt: 1 }}
						onClick={() => {
							dispatch({ type: LOGIN });
						}}
					>
						Sign in with Microsoft
					</Button>
					<div className={classes.signUpWrapper}>
						<Typography variant="body2" className={classes.signUpText} align="center">
								If you are not granted access please contact your contact
								at amaceit.
						</Typography>
						{/*<Link href="/register" className={classes.signUpLink}>
							Sign Up
					</Link>*/}
						
					</div>
					<br/>
					<Alert severity="warning">
						Known bug: Sometimes you have to press the login button twice to log in.
					</Alert>
					<br/>
					<Alert severity="warning" >
						If the pop-up window won't open, please disable your adblocker. 
					</Alert>
				</form>
			</Paper>
		</div>
	);
};

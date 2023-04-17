import { useMsal } from "@azure/msal-react";
import { loginRequest } from "../authConfig";
import { Button } from "@mui/material";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
    loginButton: {
        borderColor: 'primary.main',
        color: 'primary.main',
        '&:hover': {
            borderColor: 'primary.dark',
            color: 'primary.dark',
        },
    }
});

export const LoginButton: React.FC<{ dispatch: any }> = ({ dispatch }) => {
    const classes = useStyles();

    const { instance } = useMsal();

    async function handleLogin() {
        instance.loginPopup(loginRequest);
        const graphTokenResponse = await instance.acquireTokenSilent({
            ...loginRequest
        });
        console.log(graphTokenResponse);

        //setToken(graphTokenResponse.accessToken);

        dispatch({ type: "SET_TOKEN", payload: graphTokenResponse.accessToken });

        //const profileTokenResponse = await instance.acquireTokenSilent({ scopes: ["https://amaceit-ticket-system-api.azurewebsites.net/profile"]});

        //console.log(profileTokenResponse);
    };

    return <Button
        variant="contained"
        className={classes.loginButton}
        sx={{ ml: 2 }}
        onClick={handleLogin}
    >
        Login with Microsoft
    </Button>
}
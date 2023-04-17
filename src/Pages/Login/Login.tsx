import { useSelector } from "react-redux";
import { LoginButton } from "../../Components/LoginButton"
import { getToken } from "../../Redux/Selectors";
import { useNavigate } from "react-router-dom";
import React from "react";

export const Login: React.FC<{dispatch: any}> = ({ dispatch }) => {
    const navigate = useNavigate();

    const token = useSelector(getToken);

    React.useEffect(() => {if(token !== ''){
        navigate('/');
    }});

    return <div>
        <h1>Login</h1>
        <LoginButton dispatch={dispatch} />
    </div>
}
import React from "react";
import {LoginForm} from "./components/LoginForm";

const LoginPage = () => {
    return (
        <div>
            <div className = "flex h-svh items-center"><LoginForm/></div>
            <LoginForm />
        </div>
    );
};

export default LoginPage;
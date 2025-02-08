import React from "react";
import {SignUpForm} from "./components/SignUpForm";

const SignUpPage = () => {
    return (
        <div>
            <div className = "flex h-svh items-center"><SignUpForm/></div>
            <SignUpForm />
        </div>
    );
};

export default SignUpPage;
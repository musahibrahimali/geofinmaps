import React from 'react';
import { SignInForm } from "../../components/components";

const SignIn = (props) => {
    const {loginUrl} = props;
    return (
        <React.Fragment>
            <SignInForm loginUrl={loginUrl} />
        </React.Fragment>
    );
};

// get serverside props (this returns the api key)
export const getServerSideProps = async ({req}) => {
    const loginUrl = process.env.LOGINURL;
    let user = false;
    const cookie = req.cookies['access_token'];
    if (cookie !== undefined) {
        user = true;
    }

    return {
        props: {
            cookie: user,
            loginUrl: loginUrl,
        }
    }
};

export default SignIn;
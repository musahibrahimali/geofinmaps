import React from 'react';
import { SignUpForm } from "../../components/components";

const SignUp = (props) => {
    const {registerUrl} = props;
    return (
        <React.Fragment>
            <SignUpForm registerUrl={registerUrl} />
        </React.Fragment>
    );
};

// get serverside props (this returns the api key)
export const getServerSideProps = async ({ req }) => {
    const registerUrl = process.env.REGISTERURL;
    let user = false;
    const cookie = req.cookies['access_token'];
    if (cookie !== undefined) {
        user = true;
    }

    return {
        props: {
            cookie: user,
            registerUrl: registerUrl,
        }
    }
}

export default SignUp;
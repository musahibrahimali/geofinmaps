import React from 'react';
import { AdminSignInForm } from "../../../components/components";

const AdminSignIn = (props) => {
    const {loginUrl} = props;
    return (
        <React.Fragment>
            <AdminSignInForm loginUrl={loginUrl} />
        </React.Fragment>
    );
};

// get serverside props (this returns the api key)
export const getServerSideProps = async ({req}) => {
    const loginUrl = process.env.LOGIN_ADMIN_URL;
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

export default AdminSignIn;
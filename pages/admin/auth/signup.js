import React from 'react';
import { AdminSignUpForm } from "../../../components/components";

const AdminSignUp = (props) => {
    const {registerUrl} = props;
    return (
        <React.Fragment>
            <AdminSignUpForm registerUrl={registerUrl} />
        </React.Fragment>
    );
};

// get serverside props (this returns the api key)
export const getServerSideProps = async ({ req }) => {
    const registerUrl = process.env.REGISTER_ADMIN_URL;
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

export default AdminSignUp;
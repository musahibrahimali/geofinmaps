import React, {useEffect, useState} from 'react';
import Link from 'next/link';
import {
    Container,
    IconButton,
    InputAdornment,
    Paper,
    Typography,
    Box,
    Grid,
    Avatar,
} from "@mui/material";
import LockOpenOutlinedIcon from '@mui/icons-material/LockOpenOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import {
    CheckBox,
    CopyRight,
    Form,
    FormButton,
    InputField,
    Notification,
    UseForm
} from "../../../../global/global";
import { SignInFormStyles } from "./SignInFormStyles";
import { useRouter } from "next/router";
import axios from "axios";

const initialValues = {
    id: 0,
    emailAddress: '',
    password: '',
    rememberMe: false,
};

const SignInForm = (props) => {
    const {loginUrl} = props;

    const styles = SignInFormStyles();
    const router = useRouter();
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [notify, setNotify] = useState({ isOpen: false, message: "", type: "" });

    // notify user of successful log in or log out
    const notifyUser = () => {
        setNotify({
            isOpen: true,
            message: "Sign in Successful",
            type: "success"
        });
    }

    /* validate form */
    const handlePasswordVisible = (event) => {
        event.preventDefault();
        setPasswordVisible(!passwordVisible);
    }

    const validateForm = (fieldValues = values) => {
        let temp = { ...errors };
        if ('password' in fieldValues) {
            temp.password = fieldValues.password ? "" : "Invalid Password";
        }

        if ('emailAddress' in fieldValues) {
            temp.emailAddress = fieldValues.emailAddress ? "" : "This Field is Required";
        }

        setErrors({
            ...temp
        });

        if (fieldValues === values) {
            return Object.values(temp).every(x => x === "");
        }
    }

    const handleLogIn = async () => {
        const data = {
            email: values.emailAddress,
            password: values.password,
        }
        const user = await axios({
            url: loginUrl,
            method: "POST",
            withCredentials: true,
            data: data,
            headers: {
                "Accept": "application/json",
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
            },
        });
        if (user.data !== undefined || true) {
            notifyUser();
            handleResetForm();
            router.replace('/').then(() =>{});
        }else{
            setErrorMessage("An error occurred");
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (validateForm()) {
            await handleLogIn();
        }
    }

    const {
        values,
        setErrors,
        handleInputChange,
        handleResetForm,
        errors,
    } = UseForm(initialValues, true, validateForm);

    useEffect(() => {
        setErrorMessage("");
    }, [values]);

    return (
        <React.Fragment>
            <Paper classes={{ root: styles.root }} component="main" className={styles.image}>
                <Container component="main" maxWidth="xs"
                    className="bg-white dark:bg-gray-900 shadow-md border border-gray-400 border-opacity-0 dark:border-opacity-70 p-4 flex flex-col justify-center items-center">
                    <div className={styles.paper}>
                        <div className="mb-6 flex flex-col items-center justify-center">
                            <Avatar className={styles.avatar} />
                            <Typography component="h1" variant="h5">
                                SIGN IN
                            </Typography>
                        </div>
                        {/* Form */}
                        <Form onSubmit={handleSubmit}>
                            <Grid container>
                                <Grid item xs={12}>
                                    <InputField
                                        required
                                        label="Email Address"
                                        name="emailAddress"
                                        type="email"
                                        value={values.emailAddress}
                                        onChange={handleInputChange}
                                        error={errors.emailAddress}
                                        inputIcon={<EmailOutlinedIcon color="primary" />}
                                    />
                                    {/* password field */}
                                    <InputField
                                        required
                                        label="Password"
                                        name="password"
                                        type={passwordVisible ? "text" : "password"}
                                        value={values.password}
                                        onChange={handleInputChange}
                                        error={errors.password}
                                        inputIcon={<LockOpenOutlinedIcon color="primary" />}
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onMouseDown={handlePasswordVisible}
                                                >
                                                    {
                                                        passwordVisible ?
                                                            <VisibilityOutlinedIcon color="primary" /> :
                                                            <VisibilityOffOutlinedIcon color="primary" />
                                                    }
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                    />

                                    {/* remember me check box */}
                                    <CheckBox
                                        name="rememberMe"
                                        label="Remember Me"
                                        value={values.rememberMe}
                                        onChange={handleInputChange}
                                    />
                                </Grid>

                                <div className="flex flex-row justify-center items-center">
                                    <p className="text-red-500 dark:text-red-700">
                                        {errorMessage}
                                    </p>
                                </div>

                                <div className='flex w-full justify-center items-center'>
                                    <FormButton
                                        type="submit"
                                        text="Sign In"
                                        variant="outlined"
                                        color="primary"
                                    />
                                </div>

                                <Grid container>
                                    <Grid item xs>
                                        <Link href="/auth/forgot" variant="body2">
                                            <a className="text-brand hover:underline hover:text-brand-blue dark:text-brand dark:hover:text-brand-blue">
                                                Forgot password
                                            </a>
                                        </Link>
                                    </Grid>
                                    <Grid item>
                                        <div variant="body2" className='flex flex-row justify-between items-center'>
                                            <p>
                                                Don&apos;t have an account ?
                                            </p>
                                            <span
                                                className="text-brand hover:underline ml-2 hover:text-brand-blue dark:text-brand dark:hover:text-brand-blue">
                                                <Link href="/auth/signup">
                                                    <a>
                                                        Sign Up
                                                    </a>
                                                </Link>
                                            </span>
                                        </div>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Form>
                        <Box mt={4}>
                            <CopyRight />
                        </Box>
                    </div>
                </Container>
            </Paper>

            {/* Action Notification */}
            <Notification
                notify={notify}
                setNotify={setNotify}
            />
        </React.Fragment>
    );
}

export default SignInForm;

import React, {useEffect, useState} from 'react';
import Link from 'next/link';
import { useRouter } from "next/router";
import { SignUpFormStyles } from "./SignUpFormStyles";
import LockOpenOutlinedIcon from '@mui/icons-material/LockOpenOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import LocationCityOutlinedIcon from '@mui/icons-material/LocationCityOutlined';
import CallOutlinedIcon from '@mui/icons-material/CallOutlined';
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
import {
    CheckBox,
    CopyRight,
    CustomDatePicker,
    DropDown,
    Form,
    FormButton,
    getDepartmentCollection,
    InputField,
    Notification,
    RadioControls,
    UseForm,
} from "../../../../global/global";
import axios from "axios";

const genderItems = [
    { id: "male", title: "Male" },
    { id: "female", title: "Female" },
    { id: "other", title: "Other" },
];

const initialValues = {
    id: 0,
    fullName: '',
    emailAddress: '',
    password: '',
    confirmPassword: '',
    phoneNumber: '',
    city: '',
    gender: 'male',
    departmentId: '',
    hireDate: new Date(),
    isPermanent: false,
};

const SignUpForm = (props) => {
    const {registerUrl} = props;
    const styles = SignUpFormStyles();
    const [errorMessage, setErrorMessage] = useState("");
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
    const [notify, setNotify] = useState({ isOpen: false, message: "", type: "" });

    const router = useRouter();

    // notify user of successful log in or log out
    const notifyUser = () => {
        setNotify({
            isOpen: true,
            message: "Sign up Successful",
            type: "success"
        });
    }

    const handlePasswordVisible = (event) => {
        event.preventDefault();
        setPasswordVisible(!passwordVisible);
    }

    /* handle confirm password visible */
    const handleConfirmPasswordVisible = (event) => {
        event.preventDefault();
        setConfirmPasswordVisible(!confirmPasswordVisible);
    }

    const validateForm = (fieldValues = values) => {
        let temp = { ...errors };
        if ('fullName' in fieldValues) {
            temp.fullName = fieldValues.fullName ? "" : "This Field is Required";
        }
        if ('emailAddress' in fieldValues) {
            temp.emailAddress = (/$^|.+@.+..+/).test(fieldValues.emailAddress) ? "" : "Invalid Email";
        }
        if ('password' in fieldValues) {
            temp.password = fieldValues.password.length >= 8 ? "" : "Invalid Password (password must be at least 8 characters)";
        }
        if ('confirmPassword' in fieldValues) {
            temp.confirmPassword = fieldValues.confirmPassword.length >= 8 ? "" : "Passwords do not match";
        }
        if ('phoneNumber' in fieldValues) {
            temp.phoneNumber = fieldValues.phoneNumber.length > 9 ? "" : "Invalid Phone Number";
        }
        if ('departmentId' in fieldValues) {
            temp.departmentId = fieldValues.departmentId.length !== 0 ? "" : "This Field is Required";
        }
        setErrors({
            ...temp
        });

        if (fieldValues === values) {
            return Object.values(temp).every(x => x === "");
        }
    }

    const handleSignUP = async () => {
        const data = {
            email: values.emailAddress,
            password: values.password,
            fullName: values.fullName,
            phoneNumber: values.phoneNumber,
            gender: values.gender,
            city: values.city,
            isPermanent: values.isPermanent,
            departmentId: values.departmentId,
            hireDate: values.hireDate,
        };
        const user = await axios({
            url: registerUrl,
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
            router.replace('/').then(() =>{});
         }else{
             setErrorMessage("An error occurred");
         }
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (validateForm()) {
            await handleSignUP();
        }
    }

    const {
        values,
        setErrors,
        handleInputChange,
        handleResetForm,
        errors,
        // setValues,
    } = UseForm(initialValues, true, validateForm);

    useEffect(() => {
        setErrorMessage("");
    }, [values]);

    return (
        <React.Fragment>
            <Paper classes={{ root: styles.root }} className={styles.image}>
                <Container component="main" maxWidth="md" className="bg-white dark:bg-gray-900 mb-4 shadow-md border border-gray-400 border-opacity-0 dark:border-opacity-70 p-4 flex flex-col justify-center items-center">
                    <div className="mb-6 flex flex-col items-center justify-center">
                        <Avatar className={styles.avatar} />
                        <Typography component="h1" variant="h5">
                            SIGN UP
                        </Typography>
                    </div>
                    <Form onSubmit={handleSubmit}>
                        <Grid className={styles.container}>
                            <Grid container>
                                <Grid item xs={6} className={styles.space}>
                                    <InputField
                                        required
                                        label="Full Name"
                                        name="fullName"
                                        value={values.fullName}
                                        onChange={handleInputChange}
                                        error={errors.fullName}
                                        inputIcon={<PersonOutlineOutlinedIcon color="primary" />}
                                    />
                                    <InputField
                                        required
                                        label="Email Address"
                                        name="emailAddress"
                                        value={values.emailAddress}
                                        onChange={handleInputChange}
                                        error={errors.emailAddress}
                                        inputIcon={<EmailOutlinedIcon color="primary" />}
                                    />
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
                                    <InputField
                                        required
                                        label="Confirm Password"
                                        name="confirmPassword"
                                        type={confirmPasswordVisible ? "text" : "password"}
                                        value={values.confirmPassword}
                                        onChange={handleInputChange}
                                        error={errors.confirmPassword}
                                        inputIcon={<LockOpenOutlinedIcon color="primary" />}
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onMouseDown={handleConfirmPasswordVisible}
                                                >
                                                    {
                                                        confirmPasswordVisible ?
                                                            <VisibilityOutlinedIcon color="primary" /> :
                                                            <VisibilityOffOutlinedIcon color="primary" />
                                                    }
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                    />
                                    <InputField
                                        required
                                        label="Phone Number"
                                        name="phoneNumber"
                                        value={values.phoneNumber}
                                        onChange={handleInputChange}
                                        error={errors.phoneNumber}
                                        inputIcon={<CallOutlinedIcon color="primary" />}
                                    />
                                </Grid>

                                <Grid item xs={6} className={styles.space}>
                                    <RadioControls
                                        required
                                        name="gender"
                                        label="Gender"
                                        value={values.gender}
                                        items={genderItems}
                                        onChange={handleInputChange}
                                    />

                                    <InputField
                                        required
                                        label="City"
                                        name="city"
                                        value={values.city}
                                        onChange={handleInputChange}
                                        inputIcon={<LocationCityOutlinedIcon color="primary" />}
                                    />

                                    <DropDown
                                        required
                                        name="departmentId"
                                        label="Department"
                                        value={values.departmentId}
                                        options={getDepartmentCollection()}
                                        onChange={handleInputChange}
                                        error={errors.departmentId}
                                    />

                                    <CustomDatePicker
                                        required
                                        name="hireDate"
                                        label="Hire Date"
                                        value={values.hireDate}
                                        onChange={handleInputChange}
                                    />

                                    <CheckBox
                                        name="isPermanent"
                                        label="Permanent Employee"
                                        value={values.isPermanent}
                                        onChange={handleInputChange}
                                    />
                                </Grid>
                            </Grid>

                            <div className="flex flex-row justify-center items-center">
                                <p className="text-red-500 dark:text-red-700">
                                    {errorMessage}
                                </p>
                            </div>

                            <div className={styles.mainContainer}>
                                <FormButton
                                    type="submit"
                                    variant="outlined"
                                    text="Register"
                                    color="primary"
                                />
                                <FormButton
                                    type="submit"
                                    text="Reset"
                                    variant="outlined"
                                    color="secondary"
                                    onClick={handleResetForm}
                                />
                            </div>

                            {/* create account */}
                            <div className="flex flex-col justify-center items-center">
                                <Link href="/auth/signin">
                                    <a className="flex justify-center items-center text-lg">
                                        <p className="text-gray-700 dark:text-gray-50">Already have an account ?</p>
                                        <span className="flex justify-center items-center ml-4 text-brand dark:text-brand dark:hover:text-brand-blue hover:text-brand-blue">
                                            <p className="opacity-80">Sign in</p>
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                                            </svg>
                                        </span>
                                    </a>
                                </Link>
                            </div>
                        </Grid>

                        {/* copyright phrase on bottom of sheet */}
                        <Box>
                            <CopyRight />
                        </Box>
                    </Form>
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

export default SignUpForm;

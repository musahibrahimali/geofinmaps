import React from 'react';
import Link from 'next/link';
import Options from "./Options/Options";
import { Container, Paper } from "@mui/material";
import { WelcomeStyles } from "./WelcomeStyles";
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';

const AuthLanding = () => {
    const styles = WelcomeStyles();

    return (
        <Paper classes={{ root: styles.root }}>
            <div className="flex flex-col justify-center items-center p-8 h-screen w-full bg-auth-landing bg-no-repeat bg-cover">
                <Container component="main" maxWidth="sm" className="bg-white dark:bg-gray-800 shadow-md border border-gray-400 border-opacity-0 dark:border-opacity-70 p-4 flex flex-col justify-center items-center">
                    <div className="mb-6">
                        <h1 className="uppercase text-center text-black dark:text-gray-50 pt-8 font-black text-xl md:text-2xl lg:text-4xl">
                            Welcome to GeoFinMaps
                        </h1>
                    </div>
                    <div className="mb-12">
                        <h3 className="text-lg text-center md:text-xl lg:text-2xl text-gray-700 dark:text-gray-200">
                            Sign in to view all available fibre laying
                        </h3>
                    </div>

                    <div className="h-full w-full flex flex-col items-center">
                        {/* log in options */}
                        <div className="flex flex-col items-center w-full">
                            {/* twitter */}
                            <Options
                                url="#"
                                icon={
                                    <EmailOutlinedIcon className={styles.iconColor} />
                                }
                                title={"Sign in with Google"}
                            />

                            {/* email */}
                            <Options
                                url="/auth/signin"
                                icon={
                                    <EmailOutlinedIcon className={styles.iconColor} />
                                }
                                title={"Sign in with mail"}
                            />
                        </div>

                        <div className="flex justify-center items-center">
                            <Link href="/admin">
                                <a className="mt-4 text-blue-300 hover:text-blue-500">admin</a>
                            </Link>
                        </div>

                        {/* create account */}
                        <div className="flex flex-col justify-center items-center mt-4 mb-5">
                            <Link href="/auth/signup">
                                <a className="flex justify-center items-center text-lg">
                                    <p className="text-gray-700 dark:text-gray-50">No Account Yet?</p>
                                    <span className="flex justify-center items-center ml-4 text-brand dark:text-brand dark:hover:text-brand-blue hover:text-brand-blue">
                                        <p className="opacity-80">Create One</p>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                                        </svg>
                                    </span>
                                </a>
                            </Link>
                        </div>

                        {/* agreement and privacy policy */}
                        <div className="flex flex-col justify-center items-center px-4 md:px-2 cursor-default mt-4 mb-5 w-96">
                            <p className="text-gray-500 text-center dark:text-gray-300 text-lg italic">
                                To keep things smooth, we occasionally collect user data and cookies.
                                by signing in you accept our terms of service & privacy policy
                            </p>
                        </div>
                    </div>
                </Container>
            </div>
        </Paper>
    );
};

export default AuthLanding;
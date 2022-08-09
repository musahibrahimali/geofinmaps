import React from 'react';
import Link from 'next/link';
import { CopyRight, ToggleButton } from "../../global";
import { useSelector } from "react-redux";

const Footer = () => {
    const user = useSelector((state) => state.user.user);

    return (
        <>
            <footer className="bg-black dark:bg-gray-900 z-40 ">
                <div className="max-w-screen-xl mx-auto">
                    {/* details section */}
                    <div className="px-6 py-12 mx-auto">
                        <div className="lg:flex">
                            <div className="w-full -mx-6 lg:w-2/5">
                                <div className="px-6">
                                    <div>
                                        <Link href="/">
                                            <a>
                                                {/*<Image src={Logo} height={100} width={100} alt="ghana pre order"/>*/}
                                                <h1 className="text-gray-50 text-lg font-black">
                                                    Geofinmaps
                                                </h1>
                                            </a>
                                        </Link>
                                    </div>
                                    <div className="mt-2 mr-8">
                                        <p className="text-gray-300 dark:gray-200 text-justify">
                                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolorem laborum
                                            quibusdam sunt tempore tenetur? Consectetur dolor quos
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-6 lg:mt-0 lg:flex-1">
                                <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                                    <div>
                                        <h3 className="text-gray-300 hover:text-gray-400 cursor-default font-bold uppercase dark:text-gray-200 dark:hover:text-gray-300">About</h3>
                                        <a href="#"
                                            className="block mt-2 text-sm text-gray-400 hover:text-gray-200 dark:text-gray-400 hover:underline">Company</a>
                                        <a href="#"
                                            className="block mt-2 text-sm text-gray-400 hover:text-gray-200 dark:text-gray-400 hover:underline">community</a>
                                        <a href="#"
                                            className="block mt-2 text-sm text-gray-400 hover:text-gray-200 dark:text-gray-400 hover:underline">Services</a>
                                    </div>

                                    <div>
                                        <h3 className="text-gray-300 hover:text-gray-400 cursor-default font-bold uppercase dark:text-gray-200 dark:hover:text-gray-300">Services</h3>
                                        <a href="#"
                                            className="block mt-2 text-sm text-gray-400 hover:text-gray-200  dark:text-gray-400 hover:underline">Mega
                                            cloud</a>
                                        <a href="#"
                                            className="block mt-2 text-sm text-gray-400 hover:text-gray-200  dark:text-gray-400 hover:underline">Aperion
                                            UI</a>
                                        <a href="#"
                                            className="block mt-2 text-sm text-gray-400 hover:text-gray-200  dark:text-gray-400 hover:underline">Material
                                            UI</a>
                                    </div>

                                    <div>
                                        <h3 className="text-gray-300 hover:text-gray-400 cursor-default font-bold uppercase dark:text-gray-200 dark:hover:text-gray-300">Blog</h3>
                                        <a href="#"
                                            className="block mt-2 text-sm text-gray-400 hover:text-gray-200  dark:text-gray-400 hover:underline">Texh</a>
                                        <a href="#"
                                            className="block mt-2 text-sm text-gray-400 hover:text-gray-200  dark:text-gray-400 hover:underline">Next
                                            js</a>
                                        <a href="#"
                                            className="block mt-2 text-sm text-gray-400 hover:text-gray-200  dark:text-gray-400 hover:underline">Material
                                            UI</a>
                                    </div>

                                    <div>
                                        <h3 className="text-gray-300 hover:text-gray-400 cursor-default font-bold uppercase dark:text-gray-200 dark:hover:text-gray-300">Contact</h3>
                                        <span
                                            className="block mt-2 text-sm cursor-pointer text-gray-400 hover:text-gray-200  dark:text-gray-400 hover:underline">+1 526 654 8965</span>
                                        <span
                                            className="block mt-2 text-sm cursor-pointer text-gray-400 hover:text-gray-200  dark:text-gray-400 hover:underline">example@email.com</span>

                                        <div className="dark:bg-gray-900 mt-4 bg-black relative w-12 cursor-pointer">
                                            <ToggleButton />
                                        </div>

                                    </div>

                                </div>
                            </div>
                        </div>

                        <hr className="h-px my-6 bg-gray-700 border-none dark:bg-gray-700" />

                        <div className="flex justify-between items-center align-center">
                            <div>
                                <Link href="/">
                                    <a>
                                        {/*<Image src={Logo} height={50} width={50} alt="ghana pre order"/>*/}
                                        <h1 className="text-gray-50 mr-4 md:text-lg font-black">
                                            Geofinmaps
                                        </h1>
                                    </a>
                                </Link>
                            </div>

                            <div className="mb-4 md:mb-0">
                                <p className="cursor-default mt-6 text-center text-xs lg:text-sm leading-none text-gray-500 dark:text-gray-50">
                                    <CopyRight />
                                </p>
                            </div>

                            <div className="flex mb-4 md:mb-0">
                                <Link href={user?.isAdmin ? "/admin" : "/"}>
                                    <a className="text-gray-500 cursor-pointer">
                                        <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round"
                                            strokeWidth="2" className="w-5 h-5 hover:text-blue-700"
                                            viewBox="0 0 24 24">
                                            <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
                                        </svg>
                                    </a>
                                </Link>
                                <Link href="/">
                                    <a className="ml-3 text-gray-500 cursor-pointer">
                                        <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round"
                                            strokeWidth="2" className="w-5 h-5 hover:text-blue-700"
                                            viewBox="0 0 24 24">
                                            <path
                                                d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
                                        </svg>
                                    </a>
                                </Link>
                                <Link href="/">
                                    <a className="ml-3 text-gray-500 cursor-pointer">
                                        <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                                            strokeWidth="2"
                                            className="w-5 h-5 hover:text-blue-700" viewBox="0 0 24 24">
                                            <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                                            <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01" />
                                        </svg>
                                    </a>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    );
};

export default Footer;
import React from 'react';
import Link from 'next/link';

const Options = (props) => {
    /* title for the option title, icon for the specified icon and url which is required for the route*/
    const {title, icon, url} = props;
    return (
        <>
            <div className="w-80 md:w-96 my-2">
               <Link href={url}>
                   <a>
                       <p className="bg-brand-blue hover:bg-brand cursor-pointer font-bold md:text-lg py-2 px-8 w-full rounded flex justify-evenly items-center">
                           <div className="">
                               {icon}
                           </div>
                           <div className="">
                               <h3 className="text-gray-50">{title}</h3>
                           </div>
                       </p>
                   </a>
               </Link>
            </div>
        </>
    );
};

export default Options;
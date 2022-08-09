import React from 'react';
import Link from 'next/link';
import { Typography } from "@mui/material";

const CopyRight = () => {
    return (
        <React.Fragment>
            <Typography variant="body2" className="text-gray-700 dark:text-gray-100" align="center">
                {'Copyright © '}
                <Link href="/">
                    GeofinMaps
                </Link>{' '}
                {new Date().getFullYear()}
                {'.'}
            </Typography>
        </React.Fragment>
    );
}

export default CopyRight;

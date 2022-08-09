import React from 'react'
import { FormStyles } from './FormStyles';

function Form(props) {
    const styles = FormStyles();
    const { children, ...other } = props;
    return (
        <form className={styles.root} autoComplete="off" {...other}>
            {children}
        </form>
    )
}

export default Form;

import { useState } from 'react'

function UseForm(initialValues, validateOnChange = false, validateForm) {
    const [values, setValues] = useState(initialValues);
    const [errors, setErrors] = useState({});

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setValues({
            ...values,
            [name]: value,
        });
        if (validateOnChange) {
            validateForm({ [name]: value });
        }
    };

    // reset form
    const handleResetForm = () => {
        setValues(initialValues);
        setErrors({});
    };

    return {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        handleResetForm,
    }
}

export default UseForm;


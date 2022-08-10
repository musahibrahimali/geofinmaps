import React, { useEffect, useState } from 'react';
import {
    Grid,
    Box
} from "@mui/material";
import {
    CustomDatePicker,
    Form,
    FormButton,
    InputField, Notification,
    RadioControls, UseForm
} from "../../widgets/FormControls/controls";
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import LockOpenOutlinedIcon from '@mui/icons-material/LockOpenOutlined';
import LocationCityOutlinedIcon from '@mui/icons-material/LocationCityOutlined';
import { MakeReportFormStyles } from './MakeReportFormStyles';
import { CopyRight } from "../../widgets/globalWidgets";
import { useSelector } from "react-redux";
import axios from "axios";

const initialValues = {
    id: 0,
    fullName: '',
    emailAddress: '',
    location: '',
    description: '',
    level: 'danger',
    title: '',
    reportDate: new Date(),
};

function MakeReportForm(props) {

    const threatLevels = [
        { id: "danger", title: "Danger" },
        { id: "warning", title: "Warning" },
        { id: "normal", title: "Normal" },
    ];

    const { addReportUrl, cableId, coordinateId } = props;
    const styles = MakeReportFormStyles();
    const user = useSelector((state) => state.user.user);
    const [notify, setNotify] = useState({ isOpen: false, message: "", type: "" });

    const validateForm = (fieldValues = values) => {
        let temp = { ...errors };
        if ('fullName' in fieldValues) {
            temp.fullName = fieldValues.fullName ? "" : "This Field is Required";
        }
        if ('emailAddress' in fieldValues) {
            temp.emailAddress = (/$^|.+@.+..+/).test(fieldValues.emailAddress) ? "" : "Invalid Email";
        }
        if ('title' in fieldValues) {
            temp.title = fieldValues.title.length >= 8 ? "" : "Title must be at least 8 characters";
        }
        if ('description' in fieldValues) {
            temp.description = fieldValues.description.length >= 50 ? "" : "description must be at least 20 words";
        }
        if ('location' in fieldValues) {
            temp.location = fieldValues.location ? "" : "This field is required";
        }
        if ('level' in fieldValues) {
            temp.level = fieldValues.level.length !== 0 ? "" : "This Field is Required";
        }
        setErrors({
            ...temp
        });

        if (fieldValues === values) {
            return Object.values(temp).every(x => x === "");
        }
    }

    const AddReport = async (values) => {
        const data = {
            author: user?._id,
            location: values.location,
            description: values.description,
            reportType: values.level,
            title: values.title,
            reportDate: values.reportDate,
            coordinates: coordinateId,
            cable: cableId,
        }
        const response = await axios({
            url: addReportUrl,
            method: "POST",
            withCredentials: true,
            data: data,
            headers: {
                "Accept": "application/json",
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
            },
        });
        if(response.status === 200 || response.data?.data !== undefined || true) {
            setNotify({
                isOpen: true,
                message: "report submitted Successfully",
                type: "success"
            });
        }else{
            setNotify({
                isOpen: true,
                message: "There was an error submitting report",
                type: "error"
            });
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (validateForm()) {
            await AddReport(values);
            handleResetForm();
        }
    }

    const {
        values,
        setErrors,
        handleInputChange,
        handleResetForm,
        errors,
        setValues,
    } = UseForm(initialValues, true, validateForm);

    useEffect(() => {
        values.emailAddress = user?.email;
        values.fullName = user?.fullName;
        setValues(values);
    }, [user, values]);

    return (
        <React.Fragment>
            <Form onSubmit={handleSubmit}>
                <Grid className={styles.container}>
                    <Grid container>
                        <Grid item xs={6} className={styles.space}>
                            <InputField
                                required
                                label="Operator Name"
                                name="fullName"
                                placeholder="John Doe"
                                value={values.fullName}
                                onChange={handleInputChange}
                                error={errors.fullName}
                                inputIcon={<PersonOutlineOutlinedIcon color="primary" />}
                            />

                            <InputField
                                required
                                label="Email Address"
                                name="emailAddress"
                                placeholder="johndoe@email.com"
                                value={values.emailAddress}
                                onChange={handleInputChange}
                                error={errors.emailAddress}
                                inputIcon={<EmailOutlinedIcon color="primary" />}
                            />

                            <InputField
                                required
                                label="Report Title"
                                name="title"
                                placeholder="Cable Damage"
                                value={values.title}
                                onChange={handleInputChange}
                                error={errors.title}
                                inputIcon={<LockOpenOutlinedIcon color="primary" />}
                            />

                            <InputField
                                required
                                label="Location"
                                name="location"
                                placeholder="Adansi North"
                                value={values.location}
                                onChange={handleInputChange}
                                error={errors.location}
                                inputIcon={<LocationCityOutlinedIcon color="primary" />}
                            />

                            <RadioControls
                                required
                                name="level"
                                label="Threat Level"
                                color="primary"
                                value={values.level}
                                items={threatLevels}
                                onChange={handleInputChange}
                            />

                        </Grid>

                        <Grid item xs={6} className={styles.space}>

                            <CustomDatePicker
                                required
                                name="reportDate"
                                label="Date"
                                value={values.reportDate}
                                onChange={handleInputChange}
                            />

                            <InputField
                                required
                                label="Description"
                                name="description"
                                placeholder="Description of the situation"
                                multiline={true}
                                maxRows={50}
                                rows={12}
                                value={values.description}
                                error={errors.description}
                                onChange={handleInputChange}
                            />

                        </Grid>
                    </Grid>

                    <div className={styles.mainContainer}>
                        <FormButton
                            variant="outlined"
                            color="primary"
                            type="submit"
                            text="Submit"
                        />
                        <FormButton
                            variant="outlined"
                            color="secondary"
                            size="large"
                            text="Reset"
                            onClick={handleResetForm} />
                    </div>

                </Grid>

                {/* copyright phrase on bottom of sheet */}
                <Box>
                    <CopyRight />
                </Box>
            </Form>

            {/* Action Notification */}
            <Notification
                notify={notify}
                setNotify={setNotify}
            />
        </React.Fragment>
    );
}

export default MakeReportForm;
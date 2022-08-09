import React, {useEffect, useState} from 'react';
import { AdminHomeStyles } from "../AdminHomeStyles";
import {
    ActionButton, ConfirmDialog,
    FormButton,
    InputField,
    Notification,
    PopUp,
    UseTable
} from "../../../../global/widgets/FormControls/controls";
import {
    InputAdornment,
    Paper,
    TableBody,
    TableCell,
    TableRow,
    Toolbar
} from "@mui/material";
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import RecentActorsOutlinedIcon from '@mui/icons-material/RecentActorsOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { useRouter } from "next/router";
import {ReportForm} from "../../../../components";
import axios from "axios";

function ReportContent(props) {
    const { reports, deleteReportUrl} = props;
    const router = useRouter();
    const styles = AdminHomeStyles();
    const [openPopUp, setOpenPopUp] = useState(false);
    const [notify, setNotify] = useState({ isOpen: false, message: "", type: "" });
    const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: "", subTitle: "" });
    const [records, setRecords] = useState(null);
    const [filterFn, setFilterFn] = useState({
        fn: items => { return items; }
    });

    const headCells = [
        { id: "reportTitle", label: "Title" },
        { id: "reportType", label: "Level" },
        { id: "author", label: "Author" },
        { id: "location", label: "Location" },
        { id: "actions", label: "Actions", disableSorting: true },
    ];


    const {
        TableContainer,
        TableHeader,
        TablePaging,
        RecordsAfterPagingAndSorting,
    } = UseTable(records, headCells, filterFn);

    useEffect(() => {
        if(reports.length > 0){
            setRecords(reports);
        }
    }, [reports]);

    const handleSearch = (event) => {
        let target = event.target;
        setFilterFn({
            fn: items => {
                if (target.value === "") {
                    return items;
                } else {
                    return items?.filter(item => item?.title?.toLowerCase().includes(target.value));
                }
            }
        });
    }

    // close pop up
    const handleOpenPopUP = () => {
        setOpenPopUp(!openPopUp);
    }

    const onDelete = (id) => {
        setConfirmDialog({
            isOpen: true,
            title: "Are you sure you want to delete entry",
            subTitle: "Entry deleted cannot be restored. You cant undo this operation",
            onConfirm: () => { handleDelete(id).then(() => console.log()) }
        })
    }

    // handle delete operation
    const handleDelete = async (id) => {
        const results = await axios({
            url: `${deleteReportUrl}${id}`,
            method: "DELETE",
            withCredentials: true,
            data: data,
            headers: {
                "Accept": "application/json",
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
            },
        });
        // close the confirm dialog
        setConfirmDialog({
            ...confirmDialog,
            isOpen: false,
        });
        if(results.data === true || results.status === 200){
            setRecords(null);
            setNotify({
                isOpen: true,
                message: "Deleted Successfully",
                type: "success"
            })
        }else{
            setNotify({
                isOpen: true,
                message: "An Error Occurred",
                type: "error"
            })
        }
    }

    const handleOnClick = (item) => {
        router.push(`/admin/reports/${item._id}`).then(() => { });
    }

    return (
        <div className="pt-24">
            <Paper elevation={0} className={styles.employeePageContent}>
                <Toolbar>
                    <InputField
                        label="Search"
                        placeHolder={"search Title"}
                        className={styles.searchInput}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchOutlinedIcon />
                                </InputAdornment>
                            )
                        }}
                        onChange={handleSearch}
                    />
                    <FormButton
                        text="Add New"
                        variant="outlined"
                        startIcon={<AddOutlinedIcon />}
                        className={styles.newButton}
                        onClick={handleOpenPopUP}
                    />
                </Toolbar>

                <TableContainer>
                    <TableHeader />
                    <TableBody>
                        {
                            RecordsAfterPagingAndSorting()?.map((item) => (
                                <TableRow key={item?._id}>
                                    <TableCell>{item?.title}</TableCell>
                                    <TableCell>{item?.reportType?.toUpperCase()}</TableCell>
                                    <TableCell>{item?.author[0].fullName}</TableCell>
                                    <TableCell>{item?.location}</TableCell>
                                    <TableCell>
                                        {/* edit */}
                                        <ActionButton
                                            color="secondary"
                                            onClick={() => handleOnClick(item)}>
                                            <RecentActorsOutlinedIcon className="text-white" fontSize="small" />
                                        </ActionButton>
                                        {/* delete */}
                                        <ActionButton
                                            color="primary"
                                            onClick={
                                                () => { onDelete(item?._id) }
                                            }
                                        >
                                            <CloseOutlinedIcon className="text-white" fontSize="small" />
                                        </ActionButton>
                                    </TableCell>
                                </TableRow>
                            ))
                        }
                    </TableBody>
                </TableContainer>
                <TablePaging />
            </Paper>

            {/* pop up form */}
            <PopUp
                openPopUp={openPopUp}
                setOpenPopUp={setOpenPopUp}
                title={"Add Report Form"}>
                <ReportForm />
            </PopUp>

            {/* Action Notification */}
            <Notification
                notify={notify}
                setNotify={setNotify}
            />

            {/* confirm dialog */}
            <ConfirmDialog
                confirmDialog={confirmDialog}
                setConfirmDialog={setConfirmDialog}
            />
        </div>
    );
}

export default ReportContent;
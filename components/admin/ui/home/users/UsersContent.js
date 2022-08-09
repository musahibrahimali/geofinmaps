import React, {useEffect, useState} from 'react';
import {AdminHomeStyles} from "../AdminHomeStyles";
import {
    ActionButton,
    ConfirmDialog,
    InputField,
    Notification,
    PopUp,
    UseTable,
    FormButton,
} from "../../../../global/global";
import {InputAdornment, Paper, TableBody, TableCell, TableRow, Toolbar} from "@mui/material";
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import RecentActorsOutlinedIcon from '@mui/icons-material/RecentActorsOutlined';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import {useRouter} from "next/router";
import {SignUpForm} from "../../../../components";
import axios from "axios";

function UsersContent(props) {
    const { users, deleteUserUrl } = props;
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
        { id: "fullName", label: "Employee Name" },
        { id: "emailAddress", label: "Employee Email" },
        { id: "role", label: "Employee Role" },
        { id: "department", label: "Employee Department" },
        { id: "actions", label: "Actions", disableSorting: true },
    ];


    const {
        TableContainer,
        TableHeader,
        TablePaging,
        RecordsAfterPagingAndSorting,
    } = UseTable(records, headCells, filterFn);

    useEffect(() => {
        if(users.length > 0){
            setRecords(users);
        }
    }, [users]);

    const handleSearch = (event) => {
        let target = event.target;
        setFilterFn({
            fn: items => {
                if (target.value === "") {
                    return items;
                } else {
                    return items?.filter(item => item?.fullName?.toLowerCase().includes(target.value));
                }
            }
        });
    }

    // close pop up
    const handleOpenPopUP = () => {
        setOpenPopUp(!openPopUp);
    }

    const handleUserClick = (item) => {
        router.push(`/admin/operators/${item?._id}`).then(() => { });
    }

    // handle delete operation
    const handleDelete = async (id) => {
        const results = await axios({
            url: `${deleteUserUrl}${id}`,
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
            });
        }else{
            setNotify({
                isOpen: true,
                message: "An Error Occurred",
                type: "error"
            });
        }
    }

    // on delete
    const onDelete = (id) => {
        setConfirmDialog({
            isOpen: true,
            title: "Are you sure you want to delete entry",
            subTitle: "Entry deleted cannot be restored. You cant undo this operation",
            onConfirm: () => {handleDelete(id).then(() =>console.log() )}
        })
    }

    return (
        <div className="pt-24">
            <Paper elevation={0} className={styles.employeePageContent}>
                <Toolbar>
                    <InputField
                        label="Search"
                        placeHolder={"Search Name"}
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
                                <TableRow key={item?.email}>
                                    <TableCell>{item?.fullName}</TableCell>
                                    <TableCell>{item?.email}</TableCell>
                                    <TableCell>{item?.phoneNumber}</TableCell>
                                    <TableCell>{item?.departmentId}</TableCell>
                                    <TableCell>
                                        {/* edit */}
                                        <ActionButton
                                            color="secondary"
                                            onClick={() => {
                                                handleUserClick(item);
                                            }}>
                                            <RecentActorsOutlinedIcon className="text-white" color="action" fontSize="small" />
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
                title={"Employee Form"}>
                    <SignUpForm />
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

export default UsersContent;
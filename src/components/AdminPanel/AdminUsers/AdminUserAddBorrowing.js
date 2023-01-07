import React from 'react';
import {Grid} from "@mui/material";
import BookListWithSearch from "../../BookListWithSearch/BookListWithSearch";
import CustomModal from "../../CustomModal";


const AdminUserAddBorrowing = ({open, setOpen, user}) => {
    const borrow = (bookId) => {
        // todo api implementation
        console.log(bookId);
        setOpen(false);
    }
    return (
        <CustomModal open={open} setOpen={setOpen} customStyle={{minWidth: "50vw"}}>
            <Grid container alignItems="center" flexDirection="column" gap={1}>
                <BookListWithSearch inputWidth={6} includeCategory={false} onSelect={borrow} />
            </Grid>
        </CustomModal>
    );
};

export default AdminUserAddBorrowing;
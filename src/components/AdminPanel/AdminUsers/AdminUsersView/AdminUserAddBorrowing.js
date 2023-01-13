import React from 'react';
import {Grid} from "@mui/material";
import BookListWithSearch from "../../../BookListWithSearch/BookListWithSearch";
import CustomModal from "../../../CustomModal";
import {useMutation, useQueryClient} from "react-query";
import axios from "axios";
import useSnackbar from "../../../../context/SnackbarProvider";


const AdminUserAddBorrowing = ({open, setOpen, user}) => {
    const { addSnackbar } = useSnackbar();
    const queryClient = useQueryClient();
    const addBorrowingMutation = useMutation((bookId) => axios.post(`/api/borrowing/${user._id}/${bookId}`), {
        onSuccess: async () => {
            addSnackbar("Książka wypożyczona", "success");
            await queryClient.invalidateQueries({queryKey: [`user-${user._id}-borrowings`]});
        },
        onError: () => {
            addSnackbar("Nie udało się utworzyć wypożyczenia", "error")
        }
    })

    const borrow = (bookId) => {
        addBorrowingMutation.mutate(bookId);
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
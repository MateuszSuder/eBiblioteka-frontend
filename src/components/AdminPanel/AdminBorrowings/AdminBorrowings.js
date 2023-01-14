import React, {useState} from 'react';
import {
    Grid,
    Paper,
    Skeleton,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
    Tooltip,
    Typography
} from "@mui/material";
import {useMutation, useQuery, useQueryClient} from "react-query";
import axios from "axios";
import theme from "../../theme/theme";
import CustomTooltip from "../../CustomTooltip";
import {BorrowingStatusChip} from "../AdminUsers/AdminUsersView/AdminUserBorrowings";
import useSnackbar from "../../../context/SnackbarProvider";
import MoreTimeIcon from '@mui/icons-material/MoreTime';
import DoDisturbOnOutlinedIcon from "@mui/icons-material/DoDisturbOnOutlined";
import PriorityHighIcon from "@mui/icons-material/PriorityHigh";
import CustomModal from "../../CustomModal";
import DualButtonModalContent from "../../DualButtonModalContent";

const AdminBorrowingExtendModal = ({setOpen, open, userId, bookId}) => {
    const queryClient = useQueryClient();
    const { addSnackbar } = useSnackbar();

    const extendMutation = useMutation(() => axios.put(`/api/borrowing/${userId}/${bookId}/extend`), {
        onSuccess: async () => {
            addSnackbar(`Wypożyczenie przedłużone`, "success");
            await queryClient.invalidateQueries({queryKey: [`user-${userId}-borrowings`]});
            await queryClient.invalidateQueries({queryKey: [`borrowings`]});
            setOpen(false);
        },
        onError: () => {
            addSnackbar("Nie udało się przedłużyc rezerwacji", "error")
        }
    })

    return (
        <CustomModal setOpen={setOpen} open={open}>
            <DualButtonModalContent
                title="Zakończ wypożyczenie"
                leftText="Anuluj"
                rightText="Przedłuż"
                leftAction={() => setOpen(false)}
                rightAction={() => extendMutation.mutate()}
            />
        </CustomModal>
    )
}

const AdminBorrowingEndModal = ({setOpen, open, userId, bookId}) => {
    const queryClient = useQueryClient();
    const { addSnackbar } = useSnackbar();
    const endMutation = useMutation(() => axios.delete(`/api/borrowing/${userId}/${bookId}`), {
        onSuccess: async () => {
            addSnackbar("Wypożyczenie zakończone", "success");
            await queryClient.invalidateQueries({queryKey: [`user-${userId}-borrowings`]});
            await queryClient.invalidateQueries({queryKey: [`borrowings`]});
            setOpen(false);
        },
        onError: () => {
            addSnackbar("Nie udało się zakończysz przedłużenia", "error")
        }
    })

    return (
        <CustomModal setOpen={setOpen} open={open}>
            <DualButtonModalContent
                title="Zakończ wypożyczenie"
                leftText="Anuluj"
                rightText="Zakończ"
                leftAction={() => setOpen(false)}
                rightAction={() => endMutation.mutate()}
            />
        </CustomModal>
    )
}

const AdminBorrowingRow = ({borrowing: {userId, bookId, expiryDate, status, renewalRequest}}) => {
    const userQuery = useQuery(`user-${userId}`, () => axios.get(`/api/user?id=${userId}`));
    const bookQuery = useQuery(`book-${bookId}`, () => axios.get(`/api/book/${bookId}`));

    const [borrowModal, setBorrowModal] = useState(false);
    const [endModal, setEndModal] = useState(false);

    if (userQuery.isLoading || bookQuery.isLoading) {
        return (
            <></>
        )
    }

    if (userQuery.error || bookQuery.error) {
        return (
            <></>
        )
    }

    const user = userQuery.data.data;
    const book = bookQuery.data.data;

    return (
        <>
            <TableRow hover sx={{cursor: "pointer"}}>
                <TableCell width="20%">
                    <Grid container>
                        <Grid item xs={11}>
                            <CustomTooltip content={user.email}/>
                        </Grid>
                        {
                            renewalRequest && (
                                <Grid item xs={1}>
                                    <Tooltip title={"Prośba o przedłużenie"}>
                                        <PriorityHighIcon color="error" />
                                    </Tooltip>
                                </Grid>
                            )
                        }
                    </Grid>
                </TableCell>
                <TableCell width="20%">
                    <CustomTooltip content={book.title}/>
                </TableCell>
                <TableCell width="10%">
                    <CustomTooltip content={new Date(expiryDate).toLocaleDateString()}/>
                </TableCell>
                <TableCell width="10%">
                    <Grid container justifyContent="center">
                        <BorrowingStatusChip status={status}/>
                    </Grid>
                </TableCell>
                <TableCell width="10%">
                    <Grid container justifyContent="center" onClick={e => e.stopPropagation()}>
                        {
                            status !== "RETURNED" &&
                            <>
                                <Tooltip title={`Zakończ wypożyczenie`}>
                                    <DoDisturbOnOutlinedIcon onClick={() => setEndModal(true)}/>
                                </Tooltip>
                                <Tooltip title={`Przedłuż wypożyczenie`}>
                                    <MoreTimeIcon onClick={() => setBorrowModal(true)}/>
                                </Tooltip>
                            </>
                        }
                    </Grid>
                </TableCell>
                <AdminBorrowingEndModal
                    setOpen={setEndModal}
                    open={endModal}
                    userId={userId}
                    bookId={bookId}
                />
                <AdminBorrowingExtendModal
                    setOpen={setBorrowModal}
                    open={borrowModal}
                    userId={userId}
                    bookId={bookId}
                />
            </TableRow>
        </>
    )
}

const AdminBorrowings = () => {
    const {data, isLoading, error} = useQuery("borrowings", () => axios.get("/api/borrowing"), {
        refetchOnWindowFocus: false
    });

    if (isLoading) {
        return (
            <Grid maxWidth="xl">
                <Stack spacing={0.5}>
                    <Skeleton variant={"rounded"} animation={"wave"} height={60}/>
                    <Skeleton variant={"rounded"} animation={"wave"} height={60}/>
                    <Skeleton variant={"rounded"} animation={"wave"} height={60}/>
                </Stack>
            </Grid>
        )
    }

    if (error) {
        return (
            <Grid maxWidth="xl">
                <Typography align="center" variant="h5" color={theme.palette.error.main}>
                    Wystąpił błąd
                </Typography>
            </Grid>
        )
    }

    const userBorrowings = data.data.borrowings;

    return (
        <TableContainer component={Paper}>
            <Table aria-label="Lista wypożyczeń" sx={{tableLayout: "fixed"}}>
                <TableBody>
                    <>
                        {
                            userBorrowings.map((borrowing, i) => (
                                <AdminBorrowingRow borrowing={borrowing} key={`borrowing-${i}`}/>
                            ))
                        }
                    </>
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default AdminBorrowings;
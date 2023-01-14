import React, {useState} from "react";
import {
    Grid,
    Paper,
    Skeleton,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Tooltip,
    Typography,
} from "@mui/material";
import {useNavigate} from "react-router-dom";
import CustomModal from "./../CustomModal";
import CustomTooltip from "./../CustomTooltip";
import {BorrowingStatusChip} from "../AdminPanel/AdminUsers/AdminUsersView/AdminUserBorrowings";
import {useMutation, useQuery, useQueryClient} from "react-query";
import axios from "axios";
import theme from "../theme/theme";
import useAuth from "../../context/AuthProvider";
import BORROWING_STATUS from "../../enums/BORROWING_STATUS";
import MoreTimeIcon from '@mui/icons-material/MoreTime';
import useSnackbar from "../../context/SnackbarProvider";
import DualButtonModalContent from "../DualButtonModalContent";

const UserBorrowingExtendModal = ({setOpen, open, userId, bookId}) => {
    const queryClient = useQueryClient();
    const { addSnackbar } = useSnackbar();

    const extendMutation = useMutation(() => axios.post(`/api/borrowing/${userId}/${bookId}/ask`), {
        onSuccess: async (data) => {
            if(data.data.extended) {
                addSnackbar(`Wypożyczenie przedłużone`, "success");
            } else {
                addSnackbar(`Zapytanie o przedłużenie wysłane`, "success");
            }

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
                title="Przedłuż wypożyczenie"
                leftText="Anuluj"
                rightText="Przedłuż"
                leftAction={() => setOpen(false)}
                rightAction={() => extendMutation.mutate()}
            />
        </CustomModal>
    )
}

const UserBorrowRow = ({borrowing}) => {
    const {
        isLoading,
        data,
        error
    } = useQuery(`book-${borrowing.bookId}`, () => axios.get(`/api/book/${borrowing.bookId}`), {
        refetchOnWindowFocus: false
    });
    const [extendModal, setExtendModal] = useState(false);
    const navigate = useNavigate();

    if (isLoading) {
        return (
            <></>
        )
    }

    if (error) {
        return (
            <></>
        )
    }

    const book = data.data;

    const selectBook = (bookId) => {
        navigate(`/book/${bookId}`);
    };

    return (
        <TableRow
            hover
            sx={{cursor: "pointer"}}
            onClick={() => selectBook(borrowing.bookId)}
        >
            <TableCell width="20%">
                <CustomTooltip content={book.category}/>
            </TableCell>
            <TableCell width="20%">
                <CustomTooltip content={book.title}/>
            </TableCell>
            <TableCell width="10%">
                <CustomTooltip content={new Date(borrowing.expiryDate).toLocaleDateString()}/>
            </TableCell>
            <TableCell width="10%">
                <Grid container justifyContent="center">
                    <BorrowingStatusChip status={borrowing.status}/>
                </Grid>
            </TableCell>

            <TableCell width="10%">
                <Grid
                    container
                    justifyContent="center"
                    onClick={(e) => e.stopPropagation()}
                >
                    {
                        borrowing.status !== BORROWING_STATUS.RETURNED && (
                            <Tooltip title={`Przedłuż wypożyczenie`}>
                                <MoreTimeIcon
                                    onClick={() => setExtendModal(true)}
                                />
                            </Tooltip>
                        )
                    }
                </Grid>
            </TableCell>
            <UserBorrowingExtendModal
                setOpen={setExtendModal}
                open={extendModal}
                userId={borrowing.userId}
                bookId={borrowing.bookId}
            />
        </TableRow>
    );
};

const UserBorrowings = () => {
    const {user} = useAuth();
    const {
        data,
        isLoading,
        error
    } = useQuery(`user-${user._id}-borrowings`, () => axios.get(`/api/borrowing/${user._id}`), {
        refetchOnWindowFocus: false
    });

    if (isLoading) return (
        <Skeleton variant={"rounded"} animation={"wave"} height={60}/>
    )

    if (error) {
        return (
            <Typography align="center" variant="h5" color={theme.palette.error.main}>
                Wystąpił błąd
            </Typography>
        )
    }

    const userBorrows = data.data.borrowings;

    return (
        <TableContainer component={Paper}>
            <Table aria-label="Lista rezerwacji" sx={{tableLayout: "fixed"}}>
                <TableHead>
                    <TableRow>
                        <TableCell>Wydawnictwo</TableCell>
                        <TableCell>Tytuł</TableCell>
                        <TableCell>Data wygaśnięcia</TableCell>
                        <TableCell align="center">Status wypożyczenia</TableCell>
                        <TableCell align="center">Przedłuż</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {userBorrows.map((borrowing, i) => (
                        <UserBorrowRow key={`borrowing-${i}`} borrowing={borrowing}/>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default UserBorrowings;

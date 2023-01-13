import React, {useContext, useEffect, useState} from 'react';
import BookListWithSearch from "../../BookListWithSearch/BookListWithSearch";
import EditIcon from "@mui/icons-material/Edit";
import {Fab, FormControl, Grid, styled, TableCell, TextField, Tooltip, Typography} from "@mui/material";
import {BookContext} from "../../BookListWithSearch/BookListTable";
import {Add} from "@mui/icons-material";
import CustomModal from "../../CustomModal";
import {useNavigate} from "react-router-dom";
import FullWidthButton from "../../FullWidthButton";
import {useMutation, useQueryClient} from "react-query";
import axios from "axios";
import useSnackbar from "../../../context/SnackbarProvider";

const AbsoluteFab = styled(Fab)`
  ${({theme}) => `
    position: absolute;
    right: 2.5%;
    bottom: 2.5%;
  `}
`

const bookInputs = {
    isbn: "ISBN",
    title: "Tytuł",
    category: "Kategoria",
    amount: "Ilość",
    author: "Autor",
    publisher: "Wydawnictwo"
}

const AdminBookAddEdit = ({book, setModal}) => {
    const queryClient = useQueryClient();
    const { addSnackbar } = useSnackbar();
    const editBookMutation = useMutation((bookId) => axios.put(`/api/book/${bookId}`, {
        ...bookData
    }), {
        onSuccess: async () => {
            addSnackbar("Książka edytowana", "success");
            await queryClient.resetQueries({queryKey: ['books']})
            setModal(false);
        },
        onError: () => {
            addSnackbar("Błąd podczas edycji książki", "error");
        }
    })

    const addBookMutation = useMutation(() => axios.post(`/api/book`, {
        ...bookData
    }), {
        onSuccess: async () => {
            addSnackbar("Książka dodana", "success");
            await queryClient.resetQueries({queryKey: ['books']})
            setModal(false);
        },
        onError: () => {
            addSnackbar("Błąd podczas dodawania książki", "error");
        }
    })

    const edit = !!book;

    const [bookData, setBookData] = useState({
        isbn: "",
        title: "",
        category: "",
        amount: 0,
        author: "",
        publisher: ""
    })

    const [errors, setErrors] = useState({
        isbn: false,
        title: false,
        category: false,
        amount: false,
        author: false,
        publisher: false
    })

    useEffect(() => {
        if(book) {
            const { isbn, title, category, amount, author, publisher } = book;
            setBookData(prevState => ({
                ...prevState,
                isbn,
                title,
                category,
                amount,
                author,
                publisher
            }))
        }
    }, [book])

    const validate = () => {
        setErrors({
            isbn: false,
            title: false,
            category: false,
            amount: false,
            author: false,
            publisher: false
        })

        let sectionFailed = false;
        for(const [key] of Object.entries(bookInputs)) {
            if(!bookData[key]) {
                setErrors(prevState => ({
                    ...prevState,
                    [key]: true
                }))

                sectionFailed = true;
            }
        }

        if(sectionFailed) return false;

        if(bookData.amount < 0) {
            setErrors(prevState => ({
                ...prevState,
                amount: true
            }))

            return false;
        }

        return true;
    }

    const save = () => {
        const valid = validate();

        if(!valid) return;

        if(edit) {
            editBookMutation.mutate(book._id);
        } else {
            addBookMutation.mutate();
        }
    }

    return (
        <Grid container gap={2}>
            <Grid item xs={12}>
                <Typography align="center" variant="h5">
                    {edit ? "Edytuj książkę" : "Dodaj książkę"}
                </Typography>
            </Grid>
            {
                Object.entries(bookInputs).map(([key, label]) => (
                    <Grid item xs={12} key={key}>
                        <FormControl fullWidth>
                            <TextField
                                type={typeof bookData[key] === "number" ? "number" : "text"}
                                label={label} value={bookData[key]}
                                onChange={e => setBookData(prevState => ({
                                    ...prevState,
                                    [key]: typeof bookData[key] === "number" ? parseInt(e.target.value) : e.target.value
                                }))}
                                error={errors[key]}
                            />
                        </FormControl>
                    </Grid>
                ))
            }
            <Grid container item xs={12} justifyContent="space-between">
                <Grid item xs={5}>
                    <FullWidthButton variant="outlined" onClick={() => setModal(false)}>
                        Anuluj
                    </FullWidthButton>
                </Grid>
                <Grid item xs={5}>
                    <FullWidthButton variant="contained" onClick={save}>
                        Zapisz
                    </FullWidthButton>
                </Grid>
            </Grid>
        </Grid>
    )
}

const AdminBookAction = ({onEdit}) => {
    const book = useContext(BookContext);

    return (
        <TableCell width="5%" onClick={e => e.stopPropagation()}>
            <Tooltip title={`Edytuj książkę "${book.title}"`} followCursor>
                <EditIcon onClick={() => onEdit(book)} />
            </Tooltip>
        </TableCell>
    )
}

const AdminBooks = () => {
    const [selectedBook, setSelectedBook] = useState(null);
    const [openModal, setOpenModal] = useState(false);
    const navigate = useNavigate();

    const selectBook = (bookId) => {
        navigate(`/book/${bookId}`);
    }

    const editBook = (book) => {
        setSelectedBook(book);
        setOpenModal(true);
    }

    const addBook = () => {
        setSelectedBook(null);
        setOpenModal(true);
    }

    return (
        <>
            <Tooltip title="Dodaj książkę" followCursor>
                <AbsoluteFab color="primary" aria-label="add" sx={{position: "a"}} onClick={addBook}>
                    <Add />
                </AbsoluteFab>
            </Tooltip>

            <BookListWithSearch inputWidth={2} onSelect={selectBook}>
                <AdminBookAction onEdit={editBook} />
            </BookListWithSearch>

            <CustomModal open={openModal} setOpen={setOpenModal}>
                <AdminBookAddEdit book={selectedBook} setModal={setOpenModal} />
            </CustomModal>
        </>
    );
};

export default AdminBooks;
import {useEffect, useState} from 'react';
import bookList from "../mock/bookList";

const useFindBook = (bookId) => {
    const [book, setBook] = useState(null);

    useEffect(() => {
        if(bookId) {
            const b = bookList.books.find(it => it._id === bookId);
            setBook(b);
        }

        return () => setBook(null);
    }, [bookId]);


    return book;
};

export default useFindBook;
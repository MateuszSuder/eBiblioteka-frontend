import React from 'react';
import {Bookmarks, BookmarksOutlined, LibraryBooks, People} from "@mui/icons-material";
import AdminUsers from "../../components/AdminPanel/AdminUsers/AdminUsers";
import AdminBooks from "../../components/AdminPanel/AdminBooks/AdminBooks";
import AdminReservations from "../../components/AdminPanel/AdminReservations/AdminReservations";
import PageWithMenu from "../../components/PageWithMenu/PageWithMenu";
import AdminBorrowings from "../../components/AdminPanel/AdminBorrowings/AdminBorrowings";
import useAuth from "../../context/AuthProvider";
import {Navigate} from "react-router-dom";

const subPages = [
    {name: "Użytkownicy", path: "users", icon: <People/>, component: AdminUsers},
    {name: "Książki", path: "books", icon: <LibraryBooks />, component: AdminBooks},
    {name: "Rezerwacje", path: "reservations", icon: <BookmarksOutlined/>, component: AdminReservations},
    {name: "Wypożyczenia", path: "issues", icon: <Bookmarks/>, component: AdminBorrowings},
]


const AdminPanel = () => {
    const { user } = useAuth();

    if(!user || (user && user.role === "USER")) {
        return (
            <Navigate to="/" />
        )
    }

    return (
        <PageWithMenu subPages={subPages}/>
    );
};

export default AdminPanel;
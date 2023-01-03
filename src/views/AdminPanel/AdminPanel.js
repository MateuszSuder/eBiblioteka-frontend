import React from 'react';
import {Bookmarks, People, Bed, BugReport} from "@mui/icons-material";
import AdminUsers from "../../components/AdminPanel/AdminUsers";
import AdminBooks from "../../components/AdminPanel/AdminBooks";
import AdminReservations from "../../components/AdminPanel/AdminReservations";
import PageWithMenu from "../../components/PageWithMenu/PageWithMenu";
import AdminBorrowings from "../../components/AdminPanel/AdminBorrowings";

const subPages = [
    {name: "Użytkownicy", path: "users", icon: <People/>, component: AdminUsers},
    {name: "Książki", path: "books", icon: <Bed/>, component: AdminBooks},
    {name: "Rezerwacje", path: "reservations", icon: <Bookmarks/>, component: AdminReservations},
    {name: "Wypożyczenia", path: "issues", icon: <BugReport/>, component: AdminBorrowings},
]


const AdminPanel = () => {
    return (
        <PageWithMenu subPages={subPages}/>
    );
};

export default AdminPanel;
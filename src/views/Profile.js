import { People, BookmarksOutlined, Bookmarks } from "@mui/icons-material";
import React from "react";
import UserBorrowings from "../components/Profile/UserBorrowings";
import UserReservations from "../components/Profile/UserReservations";
import UserInfo from "../components/Profile/UserInfo/UserInfo";
import PageWithMenu from "../components/PageWithMenu/PageWithMenu";
const subPages = [
    {
        name: "Profil",
        path: "info",
        icon: <People />,
        component: UserInfo,
    },
    {
        name: "Rezerwacje",
        path: "reservations",
        icon: <BookmarksOutlined />,
        component: UserReservations,
    },
    {
        name: "Wypożyczenia",
        path: "borrowings",
        icon: <Bookmarks />,
        component: UserBorrowings,
    },
];
const Profile = () => {
    return <PageWithMenu subPages={subPages} />;
};

export default Profile;

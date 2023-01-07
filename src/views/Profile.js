import { People, BookmarksOutlined, Bookmarks } from "@mui/icons-material";
import React from "react";
import Borrowings from "../components/Profile/Borrowings";
import UserReservations from "../components/Profile/UserReservations";
import UserInfo from "./../components/Profile/UserInfo";
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
        component: Borrowings,
    },
];
const Profile = () => {
    return <PageWithMenu subPages={subPages} />;
};

export default Profile;

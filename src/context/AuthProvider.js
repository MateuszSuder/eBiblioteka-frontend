import {createContext, useContext, useEffect, useState} from "react";
import {useQuery} from "react-query";
import axios from "axios";
import useSnackbar from "./SnackbarProvider";

const AuthContext = createContext({});

export const AuthProvider = ({children}) => {
    const { addSnackbar } = useSnackbar();
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);
    const { data, refetch, status, error } = useQuery("user", () => axios.get("/api/user"), {
        retry: false,
        refetchOnWindowFocus: false
    });

    useEffect(() => {
        if(status === "success") {
            setUser(data.data);
            setLoading(false);
        } else if (status === "error") {
            if(error.response?.data?.errors?.length) {
                addSnackbar(error.response.data.errors[0], "error");
            }
            setUser(null);
            setLoading(false);
        }
    }, [data, loading, status])

    useEffect(() => {
        if(user) {
            if(user.isBanned) {
                setUser(null);
                addSnackbar("Użytkownik zbanowany", "error");
                return;
            }

            if(user.isDeleted) {
                setUser(null);
                addSnackbar("Użytkownik usunięty", "error");
            }
        }
    }, [user])

    return (
        <AuthContext.Provider value={{user,
            setUser,
            refetch}}>
            { !loading && children }
        </AuthContext.Provider>
    )
}

export default function useAuth() {
    return useContext(AuthContext);
};
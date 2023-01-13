import {createContext, useContext, useEffect, useState} from "react";
import {useQuery} from "react-query";
import axios from "axios";

const AuthContext = createContext({});

export const AuthProvider = ({children}) => {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);
    const { data, refetch, status } = useQuery("user", () => axios.get("/api/user"), {
        retry: false,
        refetchOnWindowFocus: false
    });

    useEffect(() => {
        console.log(loading, status, user)

        if(status === "success") {
            setUser(data.data);
            setLoading(false);
        } else if (status === "error") {
            setLoading(false);
        }
    }, [data, loading, status, user])

    // const memo = useMemo(
    //     () => ({
    //
    //     }), [user]
    // )

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
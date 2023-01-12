import {createContext, useContext, useEffect, useMemo, useState} from "react";
import {useQuery} from "react-query";
import axios from "axios";

const AuthContext = createContext({});

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const { data, isLoading } = useQuery("user", () => axios.get("/api/user"));

    useEffect(() => {
        if(data) {
            setUser(data.data);
        }
    }, [isLoading])

    const memo = useMemo(
        () => ({
            user,
            setUser
        }), [user]
    )

    return (
        <AuthContext.Provider value={memo}>
            { !isLoading && children }
        </AuthContext.Provider>
    )
}

export default function useAuth() {
    return useContext(AuthContext);
};
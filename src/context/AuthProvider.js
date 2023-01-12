import {createContext, useContext, useMemo, useState} from "react";

const AuthContext = createContext({});

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);

    const memo = useMemo(
        () => ({
            user,
            setUser
        }), [user]
    )

    return (
        <AuthContext.Provider value={memo}>
            { children }
        </AuthContext.Provider>
    )
}

export default function useAuth() {
    return useContext(AuthContext);
};
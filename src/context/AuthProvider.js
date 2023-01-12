import {createContext, useState} from "react";

const AuthContext = createContext({});

const AuthProvider = () => {
    const [user, setUser] = useState();

    const login = ({email, password}) => {
        console.log(email, password);
    }
}

export default AuthProvider;